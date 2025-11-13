import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',  // Entry point React-mu
            ssr: 'resources/js/ssr.jsx',    // Jika pakai SSR (opsional, tapi standar Breeze)
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
});
