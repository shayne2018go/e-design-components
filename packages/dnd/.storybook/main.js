const path = require("path")
const vue = require("@vitejs/plugin-vue")
const vueJsx = require("@vitejs/plugin-vue-jsx")

module.exports = {
  framework: "@storybook/vue3",
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "@storybook/addon-actions",
  ],
  core: {
    // builder: "webpack5",
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config, { configType }) {
    config.resolve.dedupe = ["@storybook/client-api"]
    const plugins = config.plugins.filter(
      (plugin) => plugin.name !== "vite:vue"
    )
    config.plugins = [...plugins, vue(), vueJsx()]
    config.resolve.alias = Object.assign(config.resolve.alias, {
      "@": path.resolve(__dirname, "..", "/src"),
      "@/components": path.resolve(__dirname, "..", "/src/components"),
    })
    return config
    // return the customized config
  },
}
