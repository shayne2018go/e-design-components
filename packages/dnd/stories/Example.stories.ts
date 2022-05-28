import Example from "../src/example"

export default {
  title: "Example",
  component: Example,
  argTypes: {
    variants: {
      control: {
        type: "radio",
      },
      options: ["base", "outline", "text"],
    },
  },
}

export const Primary = () => ({
  components: { Example },
  template: `<div>
 <Example />
  </div>`,
})
