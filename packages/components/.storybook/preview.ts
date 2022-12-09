// import "tailwindcss/tailwind.css"
import "../src/_style/index.css"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "default",
        value: "#f4f4f4",
      },
      {
        name: "white",
        value: "#fff",
      },
    ],
  },
}
