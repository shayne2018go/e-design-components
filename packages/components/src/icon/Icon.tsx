import PropTypes from "@/_util/vue-types"
import { computed, CSSProperties, defineComponent } from "vue"

export default defineComponent({
  name: "EIcon",
  props: {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  },
  setup(props, {}) {
    const style = computed<CSSProperties>(() => {
      if (!props.size && !props.color) return {}

      return {
        fontSize: props.size ? addUnit(props.size) : undefined,
        "--color": props.color,
      }
    })
    return { style }
  },
  render() {
    return (
      <i class={{ "e-icon": true }} style={this.style}>
        {this.$slots.default?.()}
      </i>
    )
  },
})

const addUnit = (value: string | number, suffix: string = "px") => {
  if (typeof value === "string") {
    return value
  } else if (typeof value === "number") {
    return `${value}${suffix}`
  }
}
