import { reactive, UnwrapRef } from "vue";
import Proptypes, { tuple } from "../_util/vue-types";

interface ConfigProviderProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
}

export const defaultConfigProvider: UnwrapRef<ConfigProviderProps> = reactive({
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `e-${suffixCls}` : "e";
  },
});

export const sizeEnum = tuple("small", "middle", "large");

export const SizeProp = Proptypes.oneOf(sizeEnum).def("middle");
