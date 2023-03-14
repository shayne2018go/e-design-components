export class Events<EventArgs extends Events.EventArgs = any> {}

export namespace Events {
  export type EventArgs = { [key: string]: any }

  export type EventNames<M extends EventArgs> = Extract<keyof M, string>
}
