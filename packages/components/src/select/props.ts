import { VNode } from "vue"
import { triggerProps } from "@/vc-trigger/trigger-props"
import PropTypes from "@/_util/vue-types"
import { VueTypeDef } from "vue-types"
import { SizeProp } from "../config-provider"

const optionsKey = {
  label: PropTypes.string,
  value: PropTypes.string,
}

export const selectProps = {
  ...triggerProps,
  options: PropTypes.arrayOf(PropTypes.any),
  optionKeys: PropTypes.shape(optionsKey),
  value: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  defautlValue: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  size: SizeProp,
  placeholder: PropTypes.string.def("请选择"),
  dropdownMatchSelectWidth: PropTypes.bool.def(false),
}
