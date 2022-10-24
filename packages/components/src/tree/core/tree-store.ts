import { TreeNode, TreeNodeData } from "./tree-node"

export interface NodesMap {
  [x: string]: TreeNode
}

export type TreeKey = string | number

export interface TreeOptionsProps {
  children?: "children"
  label?: string | ((data: TreeNodeData, node: TreeNode) => string)
  disabled?: string | ((data: TreeNodeData, node: TreeNode) => string)
  isLeaf?: boolean | ((data: TreeNodeData, node: TreeNode) => string)
  class?: (
    data: TreeNodeData,
    node: TreeNode
  ) => string | { [key: string]: boolean } | string
}

export class TreeStore {
  nodesMap: NodesMap = {}
  nodeKey: string = "id"
  root!: TreeNode
  defaultCheckedKeys!: TreeKey[]
  data!: TreeNodeData[]
  props: TreeOptionsProps = {}

  constructor(options: Record<string, any>) {
    this.data = options.data || []
  }

  initialize() {
    this.root = new TreeNode({
      store: this,
      data: this.data,
    })
    this.root.initialize()
  }

  registerNode(node: TreeNode) {}

  setData(data: TreeNodeData[]) {
    this.data = data
    this.initialize()
  }
}
