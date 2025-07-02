const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2).join(' ').trim();
const logPath = path.join(__dirname, '.cli-history.json');

// === Utility: Find file by name and supported extensions ===
const findFile = (dir, baseName) => {
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  for (const ext of extensions) {
    const fullPath = path.join(dir, baseName + ext);
    if (fs.existsSync(fullPath)) return fullPath;
  }
  return null;
};

// === Save CLI history for undo ===
const saveHistory = (entry) => {
  const log = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf-8')) : [];
  log.push(entry);
  fs.writeFileSync(logPath, JSON.stringify(log, null, 2));
};

// === Undo the last create ===
if (args === 'undo') {
  if (!fs.existsSync(logPath)) return console.log('❌ Nothing to undo.');
  const logs = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
  const last = logs.pop();
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
  if (!last) return console.log('❌ No previous action.');

  if (fs.existsSync(last.path)) {
    fs.unlinkSync(last.path);
    console.log(`🗑️ Removed ${last.name}`);
  }

  const importLine = `import { ${last.service} } from '../endpoints/${last.name.replace(
    '.tsx',
    ''
  )}';\n`;
  const reducerLine = `  [${last.service}.reducerPath]: ${last.service}.reducer,\n`;
  const middlewareLine = `  ${last.service}.middleware,\n`;

  const cleanFile = (file, removeImport, removeEntry) => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(removeImport, '').replace(removeEntry, '');
    fs.writeFileSync(file, content);
  };

  const reducerPath = findFile(path.join(__dirname, 'src/redux/reducers'), 'RootReducers');
  const middlewarePath = findFile(path.join(__dirname, 'src/redux/middlewares'), 'RootMiddlewares');

  cleanFile(reducerPath, importLine, reducerLine);
  cleanFile(middlewarePath, importLine, middlewareLine);

  console.log('↩️ Undo complete.');
  process.exit(0);
}

// === Init base reducer/middleware files ===
if (args === 'init') {
  const reducerBoiler = path.join(__dirname, 'boilerplates/core/RootReducers.txt');
  const middlewareBoiler = path.join(__dirname, 'boilerplates/core/RootMiddlewares.txt');

  const reducerPath = path.join(__dirname, 'src', 'redux', 'reducers', 'RootReducers.tsx');
  const middlewarePath = path.join(__dirname, 'src', 'redux', 'middlewares', 'RootMiddlewares.tsx');

  if (!fs.existsSync(reducerPath)) {
    fs.mkdirSync(path.dirname(reducerPath), { recursive: true });
    fs.copyFileSync(reducerBoiler, reducerPath);
    console.log('✅ Created RootReducers.tsx from boilerplate.');
  }

  if (!fs.existsSync(middlewarePath)) {
    fs.mkdirSync(path.dirname(middlewarePath), { recursive: true });
    fs.copyFileSync(middlewareBoiler, middlewarePath);
    console.log('✅ Created RootMiddlewares.tsx from boilerplate.');
  }

  process.exit(0);
}

// === Create new service/validation/page/component ===
const matches = args.match(
  /create:(\w+)\/([\w-]+)\s+dir:(\w+)\s+name:([\w.]+)(?:\s+service:(\w+))?/
);

if (!matches) {
  console.error(
    '❌ Invalid command.\nExample:\ncli create:service/endpoint dir:endpoints name:Login.tsx service:loginApi'
  );
  process.exit(1);
}

const [_, category, template, dir, filename, serviceName] = matches;
const isService = category === 'service';

const boilerplatePath = path.join(__dirname, 'boilerplates', category, `${template}.txt`);
const baseDir = isService
  ? path.join(__dirname, 'src', 'redux', 'endpoints')
  : path.join(__dirname, 'src', dir);
const targetFile = path.join(baseDir, filename);

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

let content;
if (fs.existsSync(boilerplatePath)) {
  content = fs.readFileSync(boilerplatePath, 'utf-8');
} else if (isService && serviceName) {
  console.warn(`⚠️ Boilerplate not found. Generating default API for ${serviceName}.`);
  content = `
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ${serviceName} = createApi({
  reducerPath: "${serviceName}",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    example: builder.query({ query: () => "example" }),
  }),
});

export const { useExampleQuery } = ${serviceName};
`.trim();
} else {
  console.error(`❌ Missing boilerplate: ${boilerplatePath}`);
  process.exit(1);
}

if (isService && serviceName) {
  content = content.replace(/{{SERVICE_NAME}}/g, serviceName);
}

fs.writeFileSync(targetFile, content);
console.log(`✅ Created ${filename} at ${path.relative(__dirname, targetFile)}`);

// === Register to middleware/reducers ===
const reducerFile = findFile(path.join(__dirname, 'src/redux/reducers'), 'RootReducers');
const middlewareFile = findFile(path.join(__dirname, 'src/redux/middlewares'), 'RootMiddlewares');

const importPath = `../endpoints/${filename.replace('.tsx', '')}`;
const importLine = `import { ${serviceName} } from '${importPath}';\n`;
const reducerEntry = `  [${serviceName}.reducerPath]: ${serviceName}.reducer,\n`;
const middlewareEntry = `  ${serviceName}.middleware,\n`;

const insertIntoBlock = (filePath, importLine, entryLine, blockName) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');

  if (!content.includes(importLine)) {
    content = importLine + content;
  }

  const blockRegex =
    blockName === 'Middlewares'
      ? /(export\s+const\s+Middlewares\s*=\s*\[)([^]*?)\]/m
      : /(export\s+const\s+Reducers\s*=\s*{)([^]*?)}/m;

  const match = content.match(blockRegex);
  if (match && !match[0].includes(entryLine)) {
    const [whole, start, body] = match;
    const trimmed = body.trim().replace(/,+$/, '');
    const updated = `${start}\n${trimmed ? trimmed + ',\n' : ''}${entryLine}${
      blockName === 'Middlewares' ? ']' : '}'
    }`;
    content = content.replace(whole, updated);
    fs.writeFileSync(filePath, content);
  }
};

if (isService && serviceName) {
  insertIntoBlock(reducerFile, importLine, reducerEntry, 'Reducers');
  insertIntoBlock(middlewareFile, importLine, middlewareEntry, 'Middlewares');

  saveHistory({
    name: filename,
    path: targetFile,
    service: serviceName,
  });
}

console.log(`ℹ️ ${serviceName} registered and ready to use 🚀`);
