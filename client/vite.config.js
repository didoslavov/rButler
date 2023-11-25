/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['@emotion/styled'],
    },
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
        setupFiles: './setup.js',
    },
});
