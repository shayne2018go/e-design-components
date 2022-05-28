import { PropType, VNode } from "vue"
import { triggerProps } from "@/vc-trigger/trigger-props"
import PropTypes from "@/_util/vue-types"

export const tooltipProps = {
  ...triggerProps,
  popup: PropTypes.any,
  destroyOnClose: PropTypes.bool.def(true),
}
