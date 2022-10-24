import { defineComponent, Transition } from "vue"

export default defineComponent({
  name: "ECollapseTransition",
  setup() {
    const events = {
      onBeforeEnter(el) {
        if (!el.dataset) el.dataset = {}

        el.dataset.oldPaddingTop = el.style.paddingTop
        el.dataset.oldPaddingBottom = el.style.paddingBottom

        el.style.maxHeight = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      },

      onEnter(el) {
        el.dataset.oldOverflow = el.style.overflow
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = `${el.scrollHeight}px`
          el.style.paddingTop = el.dataset.oldPaddingTop
          el.style.paddingBottom = el.dataset.oldPaddingBottom
        } else {
          el.style.maxHeight = 0
          el.style.paddingTop = el.dataset.oldPaddingTop
          el.style.paddingBottom = el.dataset.oldPaddingBottom
        }

        el.style.overflow = "hidden"
      },

      onAfterEnter(el) {
        el.style.maxHeight = ""
        el.style.overflow = el.dataset.oldOverflow
      },

      onBeforeLeave(el) {
        if (!el.dataset) el.dataset = {}
        el.dataset.oldPaddingTop = el.style.paddingTop
        el.dataset.oldPaddingBottom = el.style.paddingBottom
        el.dataset.oldOverflow = el.style.overflow

        el.style.maxHeight = `${el.scrollHeight}px`
        el.style.overflow = "hidden"
      },

      onLeave(el) {
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = 0
          el.style.paddingTop = 0
          el.style.paddingBottom = 0
        }
      },

      onAfterLeave(el) {
        el.style.maxHeight = ""
        el.style.overflow = el.dataset.oldOverflow
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      },
    }
    return { events }
  },
  render() {
    const { events } = this
    return (
      <Transition name="collapse-transition" {...events}>
        {this.$slots.default?.()}
      </Transition>
    )
  },
})
