import { shallowMount } from "@vue/test-utils"
import { expect, test } from "vitest"
import Button from "../Button"

test("mount component", () => {
  const wrapper = shallowMount(Button, {
    slots: {
      default: () => "1111111111",
    },
  })

  expect(wrapper.html()).toMatchSnapshot()
})
