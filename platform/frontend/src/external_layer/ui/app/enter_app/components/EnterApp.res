open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let url = RescriptReactRouter.useUrl()

  React.useEffect1(() => {
    let account = FrontendUtils.UrlSearchUtils.get(url.search, "account")
    let appName = FrontendUtils.UrlSearchUtils.get(url.search, "appName")

    service.backend.findPublishApp(. account, appName)
    ->Meta3dBsMost.Most.observe(appBinaryFile => {
      Js.Nullable.isNullable(appBinaryFile)
        ? {
            Message.error(. {j`account: ${account} appName: ${appName} has no published app`}, 10)
          }
        : {
            Meta3dCommonlib.NullableSt.getExn(appBinaryFile)
            ->Meta3d.Main.loadApp
            ->Meta3d.Main.startApp
          }
    }, _)
    ->ignore

    None
  }, [])

  <> </>
}
