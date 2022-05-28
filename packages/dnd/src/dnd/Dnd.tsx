import { events, eventsEmits, eventsListened } from "@/core/events"
import { createDnd } from "@/core/sortable"
import { PropTypes, tuple } from "@e-design/utils"
import { cloneVNode, defineComponent, nextTick, onMounted, ref } from "vue"

export default defineComponent({
  name: "EDnd",
  emits: ["start", "end", "add", "remove", "update"],
  props: {
    group: {
      type: Object,
      required: true,
    },
    store: {
      type: Object,
    },
    sort: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit, slots }) {
    const dndRoot = ref()

    const renderChild = () => {
      let children
      if (slots.default?.()) {
        children = cloneVNode(slots.default?.()[0], { ref: "dndRoot" })
      } else {
        console.info("need slots.default")
      }
      return children
    }

    const onAdd = () => {}

    const buildDndOptions = () => {
      const dndOptions = {}
      if (props.group) {
        dndOptions["group"] = props.group
        dndOptions["sort"] = props.sort
      }
    }

    const emitBind = (evt: string, evtData: any) => {
      events[`onDrag${evt}`] && events[`onDrag${evt}`](evtData)
      emit(evt.toLowerCase() as eventsEmits, evtData)
    }

    onMounted(() => {
      const listeners = {}

      eventsListened.forEach((evt) => {
        listeners[`on${evt}`] = emitBind.bind({}, evt)
      })

      createDnd(dndRoot.value, {
        group: props.group,
        sort: props.sort,
        ...listeners,
      })
    })

    return { dndRoot, renderChild }
  },
  render() {
    return this.renderChild()
  },
})
