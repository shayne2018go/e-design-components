import useProvideInjectConfig from "@/_util/hooks/useProvideInjectConfig"
import { computed, defineComponent, provide, reactive, ref, toRef } from "vue"
import { selectProps } from "./props"
import VcTrigger from "@/vc-trigger"
import SelectOption from "./SelectOption"

export default defineComponent({
  name: "ESelect",
  components: { VcTrigger, SelectOption },
  props: selectProps,
  setup(props, { emit, slots, attrs, expose }) {
    const selectRef = ref()

    const state = reactive({
      unfold: false,
      value: "",
      selectorWidth: 0,
    })

    const { configProvider, prefixCls } = useProvideInjectConfig(
      "select",
      props
    )

    const classes = computed(() => {
      return {
        [prefixCls.value]: true,
        [`${prefixCls.value}-${props.size}`]: !!props.size,
      }
    })

    const triggerVisibleChange = (visible: boolean) => {
      state.unfold = visible

      if (visible) {
        state.selectorWidth = selectRef.value.offsetWidth
      }
    }

    const renderSelector = () => {
      const selectorProps = {
        class: {
          [`${prefixCls.value}-selector`]: true,
          ["focused"]: state.unfold,
        },
      }
      return (
        <div {...selectorProps}>
          {state.value === "" && (
            <span class={{ [`${prefixCls.value}__placeholder`]: true }}>
              {props.placeholder}
            </span>
          )}

          <input class={{ [`${prefixCls.value}__inner`]: true }} type="text" />
        </div>
      )
    }

    const getOptionWrapProps = (options: Record<string, any>) => {
      const style: Record<string, any> = {}

      if (typeof props.dropdownMatchSelectWidth === "number") {
        style["width"] = props.dropdownMatchSelectWidth
      } else if (
        typeof props.dropdownMatchSelectWidth === "boolean" &&
        props.dropdownMatchSelectWidth
      ) {
        style["width"] = options.selectorWidth + "px"
      } else {
        style["min-width"] = options.selectorWidth + "px"
      }

      return { style }
    }

    const renderSelectOptions = () => {
      if (slots.default?.()) {
        return slots.default?.()
      }
      if (props.options) {
        return props.options.map((option) => {
          return (
            <select-option value={option.key}>
              {slots[option.key]?.(option, option.key, props.options) ||
                option.label}
            </select-option>
          )
        })
      }
    }

    return {
      selectRef,
      classes,
      prefixCls,
      triggerVisibleChange,
      getOptionWrapProps,
      renderSelector,
      renderSelectOptions,
      selectorWidth: toRef(state, "selectorWidth"),
    }
  },
  render() {
    const optionNodes = this.renderSelectOptions()
    const optionWrapProps = this.getOptionWrapProps({
      selectorWidth: this.selectorWidth,
    })

    return (
      <div class={this.classes} ref="selectRef">
        <vc-trigger
          trigger="click"
          hideArrow
          placement="bottomLeft"
          v-slots={{ popup: () => optionNodes }}
          prefixCls={`${this.prefixCls}-options`}
          visibleChange={this.triggerVisibleChange}
          {...optionWrapProps}
        >
          {this.renderSelector()}
        </vc-trigger>
      </div>
    )
  },
})
