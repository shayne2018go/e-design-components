/// <reference types="vitest" />
import path, { resolve } from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/*": resolve(__dirname, "src/*"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Tools",
      fileName: "index",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {},
      },
    },
    sourcemap: true,
  },
  esbuild: { pure: ["console.log"], minify: true },
  plugins: [
    dts({
      outputDir: "./dist/types",
    }),
  ],
  test: {
    globals: true,
    environment: "node",
    // environment: "jsdom",
    // transformMode: {
    //   web: [/.[tj]sx$/],
    // },
  },
})
