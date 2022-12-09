import React from "react"
import Tooltip from "../src/tooltip"

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Tooltip",
  component: Tooltip,
  argTypes: {},
}

const Template = (args) => ({
  components: { Tooltip },
  setup() {
    return { args }
  },
  template: `<tooltip v-bind="args"></tooltip>`,
})

export const Primary = Template.bind({})

Primary.args = {
  popup: <div>popuppppp</div>,
  trigger: "click",
  style: {},
}

export const TriggerHover = Template.bind({})

TriggerHover.args = {
  popup: <div>popuppppp</div>,
  style: {
    marginLeft: "100px",
  },
}

export const PlacementTop = Template.bind({})

PlacementTop.args = {
  popup: <div>popuppppp</div>,
  trigger: "click",
  style: {
    display: "inline-block",
    marginLeft: "100px",
    marginTop: "100px",
  },
}
