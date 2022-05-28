import Dnd from "../src/dnd"

export default {
  title: "Dnd",
  component: Dnd,
  argTypes: {
  },
}

export const Primary = () => ({
  components: { Dnd },
  template: `<div>
  <dnd>
  <div class="left">
    <div class="left-item">1</div>
    <div class="left-item">2</div>
    <div class="left-item">3</div>
  </div>
</dnd>
<dnd>
  <div class="right">
    <div class="right-item">1</div>
    <div class="right-item">2</div>
    <div class="right-item">3</div>
  </div>
</dnd>
  </div>`,
})
