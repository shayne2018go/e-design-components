import { reactive } from "vue"
import Button from "../src/button"

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "radio",
      },
      options: ["base", "outline", "text", "dashed"],
    },
  },
}

export const Variants = (args) => ({
  components: { Button },
  template: `<div class="grid gap-2 grid-cols-4"><div v-for="btn in args"><Button background="#ff0" :label="btn.text" :variant="btn.variant"  /></div></div>`,
  setup() {
    console.log(args)
    return { args }
  },
})

Variants.args = [
  {
    text: "base",
    variant: "base",
  },
  {
    text: "outline",
    variant: "outline",
  },
  {
    text: "text",
    variant: "text",
  },
  {
    text: "dashed",
    variant: "dashed",
  },
]

export const Secondary = () => ({
  components: { Button },
  template: '<Button background="#ff0" label="😄👍😍💯" />',
})

export const Tertiary = () => ({
  components: { Button },
  template: '<Button background="#ff0" label="📚📕📈🤓" />',
})
