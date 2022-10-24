import PropTypes from "@/_util/vue-types"
import {
  computed,
  defineComponent,
  inject,
  PropType,
  ref,
  toRefs,
  Transition,
} from "vue"
import { TreeNode } from "./core/tree-node"
import { CaretRight } from "@element-plus/icons-vue"
import EIcon from "@/icon"
import ECollapseTransition from "@/transition/CollapseTransition"

export default defineComponent({
  name: "ETreeNode",
  components: { EIcon, CaretRight, ECollapseTransition },
  props: {
    node: PropTypes.instanceOf(TreeNode).isRequired,
    renderNode: PropTypes.func,
    showCheckbox: PropTypes.bool.def(false),
  },
  setup(props, { emit, slots }) {
    const expanded = ref(false)

    const toggleExpand = () => {
      expanded.value = !expanded.value
    }

    const toggleCheck = (e: MouseEvent) => {
      e.stopPropagation()
    }

    const renderNodeContent = () => {
      const { data, store } = props.node
      if (props.renderNode && typeof props.renderNode === "function") {
        return props.renderNode({ node: props.node, data, store })
      } else if (slots.default) {
        return slots.default({ node: props.node, data, store })
      } else {
        return props.node.label
      }
    }

    return { expanded, toggleExpand, toggleCheck, renderNodeContent }
  },
  render() {
    const { toggleExpand, toggleCheck, renderNodeContent } = this

    const { node, showCheckbox } = this.$props
    const { childNodes = [], level = 0, isLeaf } = node || {}

    return (
      <div class={{ "e-tree-node": true, "is-expanded": !!this.expanded }}>
        <div
          class={{ "e-tree-node__content": true }}
          style={{ paddingLeft: level * 16 + "px" }}
          onClick={toggleExpand}
        >
          <e-icon
            class={{ "e-tree-node__expand": true, "is-leaf": isLeaf }}
            size={12}
          >
            <CaretRight></CaretRight>
          </e-icon>
          {showCheckbox && (
            <div class={{ "e-tree-node__checkbox": true }}>
              <input type="checkbox" onClick={toggleCheck} />
            </div>
          )}
          {renderNodeContent()}
        </div>
        <ECollapseTransition>
          <div class={{ "e-tree-node__children": true }} v-show={this.expanded}>
            {getChildNodes(childNodes, this.$props)}
          </div>
        </ECollapseTransition>
      </div>
    )
  },
})

export const getChildNodes = (
  childNodes: TreeNode[],
  options?: Record<string, any>
) => {
  return childNodes.map((node) => (
    <e-tree-node node={node} showCheckbox={options?.showCheckbox}></e-tree-node>
  ))
}
