import { describe, expect, it } from "vitest"
import { reactive } from "vue"
import { TreeStore } from "../core/tree-store"

describe("tree", () => {
  const treeData = [
    {
      label: "Level one 1",
      children: [
        {
          label: "Level two 1-1",
          children: [
            {
              label: "Level three 1-1-1",
            },
          ],
        },
      ],
    },
    {
      label: "Level one 2",
      children: [
        {
          label: "Level two 2-1",
          children: [
            {
              label: "Level three 2-1-1",
            },
          ],
        },
        {
          label: "Level two 2-2",
          children: [
            {
              label: "Level three 2-2-1",
            },
          ],
        },
      ],
    },
    {
      label: "Level one 3",
      children: [
        {
          label: "Level two 3-1",
          children: [
            {
              label: "Level three 3-1-1",
            },
          ],
        },
        {
          label: "Level two 3-2",
          children: [
            {
              label: "Level three 3-2-1",
            },
          ],
        },
      ],
    },
  ]
  it("initial", () => {
    console.log(111)
    const store = reactive(
      new TreeStore({
        data: treeData,
      })
    )
    store.initialize()
    console.log(store.root)
    expect(1).toEqual(1)
  })
})
