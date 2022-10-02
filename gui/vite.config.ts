import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import checker from "vite-plugin-checker";
import progress from "vite-plugin-progress";
import topLevelAwait from "vite-plugin-top-level-await";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        checker({ typescript: true, eslint: { lintCommand: "eslint src" } }),
        progress(),
        topLevelAwait(),
        tsconfigPaths()
    ],

    // Vite optons tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    // prevent vite from obscuring rust errors
    clearScreen: false,
    // tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        watch: {
            usePolling: true
        }
    },
    // to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"],
    build: {
        // Tauri supports es2021
        target: ["es2021", "chrome100", "safari13"],
        // don't minify for debug builds
        minify: !process.env.TAURI_DEBUG ? "esbuild" : false,

        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("chakra-ui") || id.includes("emotion") || id.includes("framer-motion")) {
                        return "ui";
                    } else if (id.includes("react") || id.includes("hookform")) {
                        return "react";
                    } else if (id.includes("node_modules")) {
                        return "vendor";
                    }
                },
                entryFileNames: "assets/[name].[hash].js",
                chunkFileNames: mode === "production" ? "assets/[hash].js" : "assets/[name]-[hash].js",
                assetFileNames: mode === "production" ? "assets/[hash][extname]" : "assets/[name]-[hash][extname]"
            },
            plugins: [
                mode === "analyze" &&
                    visualizer({
                        open: true,
                        filename: "dist/stats.html"
                    })
            ]
        },

        // produce sourcemaps for debug builds
        sourcemap: !!process.env.TAURI_DEBUG
    }
}));
