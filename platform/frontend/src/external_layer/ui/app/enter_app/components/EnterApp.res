open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  React.useEffect1(() => {
    let username = FrontendUtils.UrlSearchUtils.get(url.search, "username")
    let appName = FrontendUtils.UrlSearchUtils.get(url.search, "appName")

    BackendCloudbase.findPublishApp(. username, appName)
    ->Meta3dBsMost.Most.observe(appBinaryFile => {
      Js.Nullable.isNullable(appBinaryFile)
        ? {
            Message.error(.{j`username: ${username} appName: ${appName} has no published app`}, 10)
          }
        : {
            Meta3dCommonlib.NullableSt.getExn(appBinaryFile)->Meta3d.Main.loadApp->ignore
          }
    }, _)
    ->ignore

    None
  }, [])

  <> </>
}
