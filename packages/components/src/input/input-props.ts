import { SizeProp } from "@/config-provider"
import { number, oneOfType, string, bool } from "vue-types"

export const inputTypes = [
  "text",
  "input",
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "time",
  "url",
  "week",
] as const

export type InputType = typeof inputTypes[number]

const inputProps = {
  prefixCls: string(),
  value: oneOfType([string(), number()]),
  placeholder: string(),
  type: string<InputType>().def("text"),
  allowClear: bool(),
  size: SizeProp,
}

export default inputProps
