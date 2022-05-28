export const eventsListened = ["Start", "Add", "Remove", "Update", "End"]

export type eventsEmits = "start" | "end" | "add" | "remove" | "update"

export const events = {
  onDragStart: (event: CustomEvent) => {},
}
