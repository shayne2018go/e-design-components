import { computed, defineComponent, inject, toRaw } from "vue"
import VcTrigger from "@/vc-trigger"
import { defaultConfigProvider } from "@/config-provider"
import { tooltipProps } from "./props"
import useProvideInjectConfig from "@/_util/hooks/useProvideInjectConfig"
import { renderNode } from "@/_util/render-node"

export default defineComponent({
  name: "ETooltip",
  components: { VcTrigger },
  props: tooltipProps,
  setup(props, { attrs }) {
    const { configProvider, prefixCls } = useProvideInjectConfig("tooltip", props)

    const triggerProps = computed(() => {
      return {
        getPopupContainer: props.getPopupContainer,
        placement: props.placement,
        trigger: props.trigger,
        style: attrs.style || {},
        prefixCls: toRaw(prefixCls.value),
        destroyOnClose: props.destroyOnClose,
      }
    })
    return { triggerProps }
  },
  render() {
    const { triggerProps } = this
    const pupopNode = renderNode(this, "popup")
    return (
      <vc-trigger {...triggerProps} v-slots={{ popup: () => pupopNode }}>
        123
      </vc-trigger>
    )
  },
})
