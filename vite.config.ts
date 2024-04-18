/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest';

export default defineConfig({
    server: {
        port: 5175,
        strictPort: true,
        hmr: {
            port: 5175,
        },
    },
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
    },
    plugins: [react(), crx({ manifest })],

    test: {
        globals: true,
        // environment: 'jsdom',
        environment: 'happy-dom',
        // browser: { enabled: false, //name: 'chrome', // browser name is required },
        // setupFiles: './setup-vitest.ts',
    },
});
