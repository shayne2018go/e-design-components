import { computed, defineComponent } from "vue"
import { SizeProp } from "../config-provider"
import PropTypes, { tuple } from "../_util/vue-types"

const buttonVariants = tuple("base", "outline", "dashed", "text")
const buttonThemes = tuple("default", "primary", "danger", "warning", "success")

const buttonShapes = tuple("square", "round", "circle")
const ButtonHTMLTypes = tuple("submit", "button", "reset")

const buttonProps = {
  variant: PropTypes.oneOf(buttonVariants).def("base"),
  theme: PropTypes.oneOf(buttonThemes).def("default"),
  shape: PropTypes.oneOf(buttonShapes),
  size: SizeProp,
  disabled: PropTypes.bool.def(false),
  htmlType: PropTypes.oneOf(ButtonHTMLTypes).def("button"),
  loading: PropTypes.bool.def(false),
  block: PropTypes.bool.def(false),
  label: PropTypes.string,
}

export default defineComponent({
  name: "EButton",
  props: buttonProps,
  setup(props) {
    const btnClasses = computed(() => {
      return {
        [`e-btn`]: true,
        [`e-btn-${props.variant}`]: !!props.variant,
      }
    })
    return { btnClasses }
  },
  render() {
    return (
      <div class={this.btnClasses}>
        {this.$slots.default?.() || this.$props.label}
      </div>
    )
  },
})
