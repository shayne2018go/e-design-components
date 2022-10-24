import PropTypes from "@/_util/vue-types"
import { defineComponent } from "vue"

export default defineComponent({
  name: "ECheckbox",
  props: { label: PropTypes.string },
  setup() {
    const prefixCls = "e-checkbox"

    return { prefixCls }
  },
  render() {
    const { prefixCls } = this
    const { label } = this.$props
    return (
      <div class={{ [`${prefixCls}`]: true }}>
        <span class={{ [`${prefixCls}-input`]: true }}>
          <input
            type="checkbox"
            class={{ [`${prefixCls}-input__original`]: true }}
            aria-hidden
          />
          <span class={{ [`${prefixCls}-input__inner`]: true }}></span>
        </span>
        <span class={{ [`${prefixCls}-label`]: true }}>{label}</span>
      </div>
    )
  },
})
