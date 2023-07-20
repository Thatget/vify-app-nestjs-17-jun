import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
        plugins: [react()],
        build: {
            outDir: '../../extensions/request-quote',
            rollupOptions: {
                output: {
                    dir: './../../extensions/request-quote/assets',
                    entryFileNames: `[name].js`,
                    chunkFileNames: `[name].js`,
                    assetFileNames: `[name].[ext]`

                },
                onwarn(warning, warn) {
                    if (
                        warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
                        warning.message.includes(`'use client'`)
                    ) {
                        return;
                    }
                    warn(warning);
                }

            }

        },
    }
)
