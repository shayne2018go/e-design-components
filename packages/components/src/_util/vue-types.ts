import { createTypes, VueTypesInterface } from "vue-types";
import { PropType, VNodeChild } from "vue";

export const tuple = <T extends string[]>(...args: T) => args;

const PropTypes = createTypes();

PropTypes.extend([
  {
    name: "VNodeChild",
    getter: true,
    default: null,
  },
]);

export default PropTypes as VueTypesInterface & {
  readonly VNodeChild: VNodeChild;
};
