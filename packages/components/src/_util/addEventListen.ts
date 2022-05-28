type EventTypes =
  | "click"
  | "mousedown"
  | "mouseup"
  | "mouseenter"
  | "mouseleave"
  | "mousemove"

export default (
  target: Element | Document,
  eventType: EventTypes,
  cb: (ev: Event) => void,
  options?: any
) => {
  if (target && target.addEventListener) {
    target.addEventListener(eventType, cb)
  }
  return {
    remove: () => {
      target.removeEventListener(eventType, cb)
    },
  }
}
