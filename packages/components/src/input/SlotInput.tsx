import { defineComponent } from "vue"
import { any, bool, string } from "vue-types"
import inputProps from "./input-props"

export default defineComponent({
  name: "SlotInput",
  props: {
    prefixCls: string(),
    addonBefore: any(),
    addonAfter: any(),
    disabled: bool(),
  },
  setup(props, { slots }) {
    const renderInput = () => {
      const {
        addonBefore = slots.addonBefore?.(),
        addonAfter = slots.addonAfter?.(),
        disabled,
      } = props

      const inputProps = {
        disabled,
      }

      return <input {...inputProps} />
    }

    return () => renderInput()
  },
})
