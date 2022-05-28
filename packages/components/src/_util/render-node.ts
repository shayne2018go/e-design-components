import {
  cloneVNode,
  ComponentPublicInstance,
  Fragment,
  Slot,
  Slots,
  VNode,
  VNodeProps,
  createVNode,
  Text,
} from "vue"
import { isFunction } from "./tools/validators"

export const renderNode = (
  vm: ComponentPublicInstance,
  name: string = "default",
  options?: any
) => {
  // props
  console.log(vm.$props)
  if (name in vm.$props && vm.$props[name]) {
    if (isFunction(vm.$props[name])) {
      return vm.$props[name](options)
    }

    return vm.$props[name]
  }

  // slots
  return vm.$slots[name]?.(options)
}

export const renderSlot = (
  slots: Slots,
  name: string = "default",
  slotProps: Record<string, unknown> & VNodeProps = {},
  slotScope = {},
  mergeRef?: boolean
): VNode | null => {
  const defaultNode = slots[name]?.(slotScope)
  if (!defaultNode || !defaultNode.length) {
    return null
  }
  if (
    defaultNode.length > 1 ||
    Text === defaultNode[0].type ||
    Fragment === defaultNode[0].type
  ) {
    return createVNode("span", { ...slotProps }, defaultNode)
  }
  return cloneVNode(defaultNode[0], { ...slotProps })
}
