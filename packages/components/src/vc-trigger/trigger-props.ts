import { placements, triggerActions } from "@/_util/common"
import PropTypes from "@/_util/vue-types"

export const triggerProps = {
  getPopupContainer: PropTypes.func,
  placement: PropTypes.oneOf(placements).def("top"),
  trigger: PropTypes.oneOfType([
    PropTypes.oneOf(triggerActions),
    PropTypes.arrayOf(PropTypes.oneOf(triggerActions)),
  ]).def("hover"),
  destroyOnClose: PropTypes.bool,
}
