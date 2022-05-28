import { defineConfig } from "vitest/config"
import dts from "vite-plugin-dts"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vueJsx(), vue()],
  test: {
    globals: true,
    environment: "jsdom",
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
})
