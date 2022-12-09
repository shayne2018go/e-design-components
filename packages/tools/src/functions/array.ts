export interface IteratorFunctionVoid<T> {
  (item: T, index: number, collection: T[]): void
  (item: T, index: number, collection: T[]): T
  (item: T, index: number, collection: T[]): boolean
}
function forEach<T>(callback: IteratorFunctionVoid<T>, collection: T[]): void
function forEach<T>(callback: IteratorFunctionVoid<T>, collection: T[]) {}

export const treeToArray = () => {}

export const arrayToTree = <T>(
  array: T[],
  opt: any = {
    parentKey: "parentId",
    key: "id",
    childrenKey: "children",
    rootId: undefined,
  }
) => {
  const { key, parentKey, childrenKey, rootId } = opt

  const tree = [] as T[] // 存放结果集

  const itemMap = {} //
  for (const item of array) {
    const id = item[key]
    const pid = item[parentKey]

    if (!itemMap[id]) {
      itemMap[id] = {
        [childrenKey]: [],
      }
    }

    itemMap[id] = {
      ...item,
      [childrenKey]: itemMap[id][childrenKey],
    }

    const treeItem = itemMap[id]

    if (pid === rootId) {
      tree.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          [childrenKey]: [],
        }
      }
      itemMap[pid][childrenKey].push(treeItem)
    }
  }
  return tree
}

export const baseEachTree = (
  iteratee: (node: any, parent: any, deep: number, index: number, iterable?: any[]) => any,
  tree: any[],
  newTree: any[],
  parent = null,
  opt: any = {
    parentKey: "parentId",
    key: "id",
    childrenKey: "children",
    deep: 1,
  }
) => {
  const { childrenKey = "children", deep = 1 } = opt || {}

  const iterable = Object(tree)
  const length = iterable.length

  let index = -1

  while (++index < length) {
    const iterableItem = iterable[index]

    let iterableItemTemp = iteratee(iterableItem, parent, deep, index, iterable) ?? iterableItem
    if (iterableItemTemp === false) {
      break
    }

    const newIterable = iterableItem[childrenKey]
    if (newIterable && newIterable.length) {
      iterableItemTemp[childrenKey] = []
      opt.deep = deep + 1

      baseEachTree(iteratee, newIterable, iterableItemTemp[childrenKey], iterableItemTemp, opt)
    }

    newTree.push(iterableItemTemp)
  }
}

export const eachTree = <T>(fn: (node: T, parent: T, deep: number, index: number) => any, tree: T[], opt?: any) => {
  baseEachTree(fn, tree, [], null, opt)
}

export const mapTree = <T>(fn: (node: T, parent: T, deep: number, index: number) => any, tree: T[], opt?: any) => {
  const newTree = []
  baseEachTree(fn, tree, newTree, null, opt)
  return newTree
}
