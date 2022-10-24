export type Mode = "multiple" | "tags" | "combobox"

export interface SelectorProps {
  prefixCls: string
  id: string
  mode: Mode
  placeholder?: string
  disabled?: boolean
  autofocus?: boolean
  autocomplete?: string
}
