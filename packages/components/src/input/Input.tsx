import { defineComponent } from "vue"
import inputProps from "./input-props"
import SlotInput from "./SlotInput"

export default defineComponent({
  name: "EInput",
  props: {
    ...inputProps,
  },
  setup(props, { emit }) {
    return () => <SlotInput />
  },
})
