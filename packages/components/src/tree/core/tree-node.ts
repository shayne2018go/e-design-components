import { reactive } from "vue"
import { TreeStore } from "./tree-store"

export interface FakeNode {
  data: TreeNodeData
}

export interface TreeNodeData {
  [key: string]: any
}

let nodeIdSeed = 0

export class TreeNode {
  id!: string | number
  data!: TreeNodeData
  isLeaf!: boolean
  checked!: boolean
  level: number = 0

  parent!: TreeNode
  store!: TreeStore
  childNodes: TreeNode[] = []

  constructor(options: Record<string, any>) {
    this.id = nodeIdSeed++
    for (let key in options) {
      this[key] = options[key]
    }
  }

  initialize() {
    if (!this.store)
      throw new Error("initialize error: store is cannt be null.")
    this.initialLevel()
    this.initialChildren()
    this.updateLeafState()
  }

  initialLevel() {
    this.level = this.parent ? this.parent.level + 1 : 0
  }

  initialChildren() {
    let children: any[]
    if (this.data instanceof Array) {
      children = this.data
    } else {
      children = getPropertyFromData(this, "children")
    }
    if (children.length === 0) return
    for (let i = 0; i < children.length; i++) {
      this.insertChild({ data: children[i] })
    }
  }

  insertChild(child: FakeNode | TreeNode, index?: number, batch?: boolean) {
    if (!child) throw new Error("InsertChild error: child is required.")
    let childNode: TreeNode
    if (!(child instanceof TreeNode)) {
      Object.assign(child, {
        parent: this,
        store: this.store,
      })
      childNode = reactive(new TreeNode(child))
      if (childNode instanceof TreeNode) {
        childNode.initialize()
      }
    } else {
      childNode = child
    }
    if (typeof index === "undefined" || index < 0) {
      this.childNodes.push(childNode)
    } else {
      this.childNodes.splice(index, 0, childNode)
    }
  }

  updateLeafState() {
    // if (this.store.lazy)
    this.isLeaf = !this.childNodes || !(this.childNodes.length > 0)
  }

  get label() {
    return getPropertyFromData(this, "label")
  }
}

const getPropertyFromData = (node: TreeNode, prop: string) => {
  const { props } = node.store
  const config = props[prop]
  const data = node.data || {}
  if (typeof config === "function") {
    return config(data, node)
  } else if (typeof config === "string") {
    return data[config]
  } else if (typeof config === "undefined") {
    return data[prop] ?? ""
  } else {
    return ""
  }
}
