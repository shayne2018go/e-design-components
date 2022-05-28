import Select from "../src/select"

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Select",
  component: Select,
  argTypes: {},
}

const Template = (args) => ({
  components: { Select },
  setup() {
    console.log(args)
    return { args }
  },
  template: `<Select class="w-24" v-bind="args">
    <template #key="{option, key}">{{option}}aaa</template>
  </Select>`,
})

export const Primary = Template.bind({})

Primary.args = {
  options: [
    { key: "a", label: 1 },
    { key: "b", label: 2 },
  ],
}
