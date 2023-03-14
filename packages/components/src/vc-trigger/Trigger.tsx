import { placementMap, placements } from "@/_util/common"
import PropTypes from "@/_util/vue-types"
import { cloneVNode, computed, defineComponent, nextTick, Ref, ref, StyleValue, Teleport, Text, Transition, watch } from "vue"
// import { createPopper, Instance, Placement } from "@popperjs/core"
import { isFunction } from "@/_util/tools/validators"
import { renderNode, renderSlot } from "@/_util/render-node"
import { triggerProps } from "./trigger-props"
import addEventListen from "@/_util/addEventListen"
import { arrow, computePosition, flip, inline, offset, Placement, shift } from "@floating-ui/dom"

export default defineComponent({
  name: "VcTrigger",
  slots: ["popup"],
  props: {
    ...triggerProps,
    visible: PropTypes.bool.def(false),
    prefixCls: PropTypes.string,
    hideArrow: PropTypes.bool.def(false),
    visibleChange: PropTypes.func,
  },
  setup(props, { emit, slots, attrs }) {
    const visible = ref(false)

    const triggerRef = ref<HTMLElement>()
    const popupRef = ref<HTMLElement>()
    const popupArrowRef = ref<HTMLElement>()

    const popupContainer = computed(() => {
      return props.getPopupContainer && isFunction(props.getPopupContainer) ? props.getPopupContainer() : "body"
    })

    const visibleChange = (visibleValue: boolean) => {
      if (visible.value === visibleValue) {
        return
      }
      visible.value = visibleValue
      props.visibleChange && props.visibleChange(visible)
    }

    const open = () => {
      visibleChange(true)
    }

    const close = () => {
      visibleChange(false)
    }

    watch(
      () => props.visible,
      (nv, ov) => {
        visibleChange(nv)
      },
      {
        immediate: true,
      }
    )

    watch(
      () => visible.value,
      (nv, ov) => {
        if (nv) {
          nextTick(() => {
            updatePopuper()
          })
        }
      },
      {
        immediate: true,
      }
    )

    const onTriggerClick = () => {
      if (visible.value) {
        close()
        outsideClick?.remove?.()
      } else {
        open()
        hideOnOutsideClick()
      }
    }

    /**
     *
     * @param triggerDom  触发dom
     * @param popupDom 弹窗dom
     * @param target 当前点击dom
     * @returns {boolean}
     */
    const handleInSide = (triggerDom: HTMLElement, popupDom: HTMLElement, target: HTMLElement) => {
      return !triggerDom.contains(target) && !popupDom.contains(target)
    }

    const onOutsideClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target || !triggerRef.value || !popupRef.value) {
        return
      }
      if (handleInSide(triggerRef.value, popupRef.value, target)) {
        close()
      }
    }

    const onOutsideMove = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target || !triggerRef.value || !popupRef.value) {
        return
      }
      if (handleInSide(triggerRef.value, popupRef.value, target)) {
        close()
        outsideMove.remove?.()
      }
    }

    let outsideClick
    let outsideMove

    const hideOnOutsideClick = () => {
      outsideClick = addEventListen(document, "click", onOutsideClick)
    }

    const hideOnOutsideMove = () => {
      outsideMove = addEventListen(document, "mousemove", onOutsideMove)
    }

    const onTriggerMouseenter = () => {
      open()
      hideOnOutsideMove()
    }

    const onTriggerMouseleave = () => {}

    const onPopupMouseetner = (e: MouseEvent) => {}

    const finalyPlacement = ref("")

    const createPopuper = () => {
      const placement = placementMap[props.placement] as Placement
      const triggerElm = triggerRef.value as HTMLElement
      const popuperElm = popupRef.value as HTMLElement
      if (!triggerElm || !popuperElm) {
        return false
      }

      const container = props.getPopupContainer ? props.getPopupContainer(triggerRef.value) : document.body

      if (!container.contains(popuperElm)) {
        container.appendChild(popuperElm)
      }

      computePosition(triggerElm, popuperElm, {
        placement,
        middleware: [offset(), flip(), shift(), inline(), arrow({ element: popupArrowRef.value! })],
      }).then(({ x, y, placement }) => {
        Object.assign(popuperElm.style, {
          left: `${x}px`,
          top: `${y}px`,
        })
        finalyPlacement.value = placement
      })
    }

    const updatePopuper = () => {
      createPopuper()
    }

    const isClickShow = () => {
      return props.trigger.includes("click")
    }

    const isClickHide = () => {
      return props.trigger.includes("click")
    }

    const isMouseEnterShow = () => {
      return props.trigger.includes("hover")
    }

    const isMouseLeaveHide = () => {
      return props.trigger.includes("hover")
    }

    const triggerRender = () => {
      const events: Record<string, any> = {}
      if (isMouseEnterShow()) {
        events.onMouseenter = onTriggerMouseenter
      }
      if (isMouseLeaveHide()) {
        events.onMouseleave = onTriggerMouseleave
      }
      if (isClickShow() && isClickHide()) {
        events.onClick = onTriggerClick
      }
      // renderNode()
      return renderSlot(slots, "default", {
        ref: triggerRef,
        ...events,
        style: attrs.style,
      })
    }

    const popupProps = () => {
      const events = {
        onMouseenter: onPopupMouseetner,
      }

      return {
        class: {
          ["e-popup"]: true,
          [`e-popup__placement-${finalyPlacement.value}`]: !!finalyPlacement.value,
          [`${props.prefixCls}`]: !!props.prefixCls,
        },
        ...events,
        style: {
          position: "absolute",
        } as StyleValue,
      }
    }

    const destroyPopup = () => {
      if (props.destroyOnClose) {
        const popperElm = popupRef.value as HTMLElement
        popperElm.parentNode?.removeChild(popperElm)
      }
    }
    return {
      visible,
      triggerRef,
      triggerRender,
      popupRef,
      popupContainer,
      popupProps,
      destroyPopup,
      popupArrowRef,
    }
  },
  render() {
    const { prefixCls, hideArrow } = this.$props
    const popupProps = this.popupProps()
    const popupInnerProps = {
      class: {
        [`e-popup-inner`]: true,
        [`${prefixCls}-inner`]: !!prefixCls,
      },
    }

    return (
      <>
        {this.triggerRender()}
        <Teleport to={this.popupContainer}>
          <Transition name={`${prefixCls}--animation`} onAfterLeave={this.destroyPopup}>
            <div v-show={this.visible && !!this.$slots.popup} ref="popupRef" {...popupProps}>
              <div {...popupInnerProps}>
                {this.$slots.popup?.()}
                {!hideArrow && (
                  <span
                    ref="popupArrowRef"
                    class={{
                      [`${prefixCls}-arrow`]: true,
                      "e-popup-arrow": true,
                    }}
                  ></span>
                )}
              </div>
            </div>
          </Transition>
        </Teleport>
      </>
    )
  },
})
