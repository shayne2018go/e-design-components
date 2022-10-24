import { reactive } from "vue"
import Tree from "../src/tree"

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Tree",
  component: Tree,
  argTypes: {},
}

export const Primary = (args) => ({
  components: { Tree },
  template: `<Tree  v-bind="args" />`,
  setup() {
    return { args }
  },
})

Primary.args = {
  treeData: [
    {
      id: 1,
      label: "Level one 1",
      children: [
        {
          id: 4,
          label: "Level two 1-1",
          children: [
            {
              id: 9,
              label: "Level three 1-1-1",
            },
            {
              id: 10,
              label: "Level three 1-1-2",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Level one 2",
      children: [
        {
          id: 5,
          label: "Level two 2-1",
        },
        {
          id: 6,
          label: "Level two 2-2",
        },
      ],
    },
    {
      id: 3,
      label: "Level one 3",
      children: [
        {
          id: 7,
          label: "Level two 3-1",
        },
        {
          id: 8,
          label: "Level two 3-2",
        },
      ],
    },
  ],
  showCheckbox: true,
}
