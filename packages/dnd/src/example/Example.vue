<template>
  <div class="example-root">
    <dnd
      :group="{ name: 'base', pull: 'clone', put: false }"
      :sort="false"
      @start="start"
      @end="end"
    >
      <div class="left grid-start-1 grid-span-1">
        <div class="left-item">left 1</div>
        <div class="left-item">left 2</div>
        <div class="left-item">left 3</div>
      </div>
    </dnd>
    <dnd :group="{ name: 'base' }">
      <div class="right grid-start-3 grid-span-9">
        <div class="right-item">right 1</div>
        <div class="right-item">right 2</div>
        <div class="right-item">right 3</div>
      </div>
    </dnd>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Dnd from "../dnd"

export default defineComponent({
  name: "Example",
  components: { Dnd },
  setup() {
    const start = (...args) => {
      console.log("start")
    }
    const end = (...args) => {
      console.log("end")
    }
    return { start, end }
  },
})
</script>

<style lang="less" scoped>
.example-root {
  display: grid;
  grid-template-columns: 300px 600px;
  height: calc(100vh - 50px);
  grid-gap: 10px;
  .left {
    height: 100%;
    border: 1px solid #eee;
    padding: 10px;
    &-item {
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      background-color: #eee;
      text-align: center;
      color: #999;
      margin-bottom: 10px;
    }
  }
  .right {
    height: 100%;
    border: 1px solid #eee;
    padding: 10px;
    &-item {
      width: 100px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      background-color: #eee;
      text-align: center;
      color: #999;
      margin-bottom: 10px;
    }
  }
}
</style>
