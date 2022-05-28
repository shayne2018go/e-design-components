import { App, Plugin } from "vue"

export const withInstall = <T>(
  component: T,
  customName?: string
): withInstallType<T> => {
  const c = component as any

  c.install = function (app: App) {
    app.component(customName || c.name, c)
  }

  return c as withInstallType<typeof c>
}

export type withInstallType<T> = T & Plugin
