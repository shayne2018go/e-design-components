import { computed, ComputedRef, inject } from "vue"
import { defaultConfigProvider } from "../../config-provider"

type useProviderInjectConfigProps = {
  configProvider: typeof defaultConfigProvider
  prefixCls: ComputedRef<string>
} & Record<string, any>

export default (
  name: string,
  props: Record<string, any>
): useProviderInjectConfigProps => {
  const configProvider = inject("configProvider", defaultConfigProvider)

  const prefixCls = computed(() => {
    return configProvider.getPrefixCls(name, props.prefixCls)
  })

  return { configProvider, prefixCls }
}
