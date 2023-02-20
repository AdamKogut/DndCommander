import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { checker } from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ exclude: [/\.worker\.(t|j)sx?$/] }),
    viteTsconfigPaths(),
    svgrPlugin(),
    checker({ overlay: false, typescript: true }),
  ],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    host: true,
    hmr: {
      protocol: 'ws',
      port: 3000,
    },
  },
});