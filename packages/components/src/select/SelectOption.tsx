import { renderSlot } from "@/_util/render-node"
import PropTypes from "@/_util/vue-types"
import { computed, defineComponent } from "vue"

export default defineComponent({
  name: "ESelectOption",
  props: {
    prefixCls: PropTypes.string.def("e-select-option"),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  },
  setup(props, { emit }) {
    const { prefixCls } = props
    const classes = computed(() => {
      return {
        [`${prefixCls}-option`]: true,
      }
    })
    return { classes }
  },
  render() {
    return <div class={this.classes}>{renderSlot(this.$slots)}</div>
  },
})
