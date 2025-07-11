import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import reactRefresh from '@vitejs/plugin-react-refresh';

// Define the output folder
const outputDir = 'oxygenarabia-cms';

// Custom plugin to copy .htaccess after build
function copyHtaccessPlugin() {
  return {
    name: 'copy-htaccess',
    closeBundle() {
      const source = path.resolve(process.cwd(), '.htaccess');
      const destination = path.resolve(process.cwd(), outputDir, '.htaccess');
      if (fs.existsSync(source)) {
        fs.copyFileSync(source, destination);
        console.log('✅ .htaccess copied to build folder.');
      } else {
        console.warn('⚠️ .htaccess file not found.');
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    checker(),
    reactRefresh(),
    copyHtaccessPlugin(), // ✅ Add the plugin here
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
  build: {
    outDir: outputDir, // ✅ Output to 'oxygenarabia-cms'
  },
});
