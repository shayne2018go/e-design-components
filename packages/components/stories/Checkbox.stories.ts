import { reactive } from "vue"
import Checkbox from "../src/checkbox"

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Checkbox",
  component: Checkbox,
  argTypes: {},
}

export const Primary = (args) => ({
  components: { Checkbox },
  template: `<Checkbox  v-bind="args" />`,
  setup() {
    return { args }
  },
})

Primary.args = {
  label: "可选项",
}
