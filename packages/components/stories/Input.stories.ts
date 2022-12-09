import { reactive } from "vue"
import Input from "../src/input"

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Input",
  component: Input,
  argTypes: {
    variant: {
      control: {
        type: "radio",
      },
      options: ["base", "outline", "text", "dashed"],
    },
  },
}

export const Base = (args) => ({
  components: { Input },
  template: `<Input />`,
  setup() {
    return { args }
  },
})

Base.args = {}
