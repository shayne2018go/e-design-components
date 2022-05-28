const path = require("path")
const vueJsx = require("@vitejs/plugin-vue-jsx")
const vue = require("@vitejs/plugin-vue")

const autoprefixer = require("autoprefixer")
const tailwindcss = require("tailwindcss")
// import("@storybook/addon-postcss")
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
    // {
    //   name: "@storybook/addon-postcss",
    //   options: {
    //     postcssLoaderOptions: {
    //       implementation: require("postcss"),
    //     },
    //   },
    // },
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config, { configType }) {
    const _config = Object.assign(config, {
      css: {
        postcss: "../postcss.config.js",
      },

      plugins: [...config.plugins, vue(), vueJsx()],
      resolve: {
        dedupe: ["@storybook/client-api"],
        alias: [
          {
            find: "vue",
            replacement: "vue/dist/vue.esm-bundler.js",
          },
          {
            find: "@",
            replacement: path.resolve(__dirname, "../src"),
          },
        ],
      },
    })
    return {
      ..._config,
    }
  },
}
