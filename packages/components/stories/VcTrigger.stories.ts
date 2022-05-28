import { reactive } from "vue"
import VcTrigger from "../src/vc-trigger"

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "VcTrigger",
  component: VcTrigger,
}

export const Primary = (args) => ({
  components: { VcTrigger },
  setup() {
    const state = reactive(args)
    return { state }
  },
  template: `<div class="flex justify-center w-24"><vc-trigger v-bind="state">button<template #popup>popup</template></vc-trigger></div>`,
})

Primary.args = {
  trigger: "click",
}
