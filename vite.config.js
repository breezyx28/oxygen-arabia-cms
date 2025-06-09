import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import reactRefresh from '@vitejs/plugin-react-refresh';
// import dotenv from 'dotenv';

// ----------------------------------------------------------------------
// dotenv.config({ path: '.env.production' });
export default defineConfig({
  plugins: [
    react(),
    checker({
      // eslint: {
      //   lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      // },
    }),
    reactRefresh(),
  ],
  resolve: {
    // extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
});
