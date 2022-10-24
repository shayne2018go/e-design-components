import { computed, defineComponent } from "vue"
import { SelectorProps } from "./selectorProps"

const SingleSelector = defineComponent<SelectorProps>({
  name: "SingleSelector",
  setup(props, { emit }) {
    const classes = computed(() => {
      return {
        [`${props.prefixCls}-selector`]: true,
      }
    })

    return { classes }
  },
  render() {
    return <div></div>
  },
})

export default SingleSelector
