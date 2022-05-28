import VueTypes, {
  createTypes,
  VueTypesInterface,
  VueTypeValidableDef,
} from "vue-types"
import { PropType, VNode, VNodeChild } from "vue"

export const tuple = <T extends string[]>(...args: T) => args

export const tupleNumber = <T extends number[]>(...args: T) => args

declare type VNodeChildAtom =
  | VNode
  | string
  | number
  | boolean
  | null
  | undefined
  | void
export type VueNode = VNodeChildAtom | VNodeChildAtom[] | JSX.Element

const PropTypes = createTypes({
  string: undefined,
  number: undefined,
  object: undefined,
  array: undefined,
  bool: undefined,
  func: undefined,
})

PropTypes.extend([
  {
    name: "VNodeChild",
    getter: true,
    type: VueTypes.any,
  },
])

export default PropTypes as VueTypesInterface & {
  readonly VNodeChild: VueTypeValidableDef<VueNode>
}
