import { describe, expect, test, it } from "vitest"
import { arrayToTree, eachTree, mapTree } from "./array"

const _array = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
]

const _tree = [
  {
    children: [
      {
        children: [],
        id: 2,
        name: "部门2",
        pid: 1,
      },
      {
        children: [
          {
            children: [
              {
                children: [],
                id: 5,
                name: "部门5",
                pid: 4,
              },
            ],
            id: 4,
            name: "部门4",
            pid: 3,
          },
        ],
        id: 3,
        name: "部门3",
        pid: 1,
      },
    ],
    id: 1,
    name: "部门1",
    pid: 0,
  },
]

test("arrayToTree", () => {
  const res = arrayToTree(_array, {
    key: "id",
    childrenKey: "children",
    parentKey: "pid",
    rootId: 0,
  })

  expect(res).toMatchSnapshot(_tree)
})

test("eachTree", () => {
  const res = [] as any[]
  eachTree(
    (node, parent, deep, index) => {
      res.push({ node, parent, deep, index })
    },
    _tree,
    { childrenKey: "children" }
  )
  expect(res.length).toBe(5)

  expect(res).toMatchSnapshot()
})

test("mapTree", () => {
  const res = mapTree(
    (node, parent, deep, index) => {
      node.name = node.name + "哈哈哈"
      return node
    },
    _tree,
    { childrenKey: "children" }
  )

  expect(res.length).toBe(1)

  expect(res).toMatchSnapshot()
})
