import PropTypes from "@/_util/vue-types"
import { computed, defineComponent, provide, reactive, watch } from "vue"
import { TreeNode } from "./core/tree-node"
import { TreeStore } from "./core/tree-store"
import ETreeNode, { getChildNodes } from "./TreeNode"

export default defineComponent({
  name: "ETree",
  components: {
    ETreeNode,
  },
  props: {
    treeData: PropTypes.array,
    showCheckbox: PropTypes.bool.def(false),
  },
  setup(props, { emit }) {
    const store = reactive(new TreeStore({ data: props.treeData }))

    store.initialize()

    const root = reactive<TreeNode>(store.root)

    console.log(root)

    const classes = computed(() => ({ "e-tree": true }))

    return { store, root, classes }
  },
  render() {
    return (
      <div class={this.classes}>
        {getChildNodes(this.root.childNodes, this.$props)}
      </div>
    )
  },
})
