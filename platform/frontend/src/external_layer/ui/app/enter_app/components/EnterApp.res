open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

let _getEnv = (): FrontendUtils.EnvType.env => #production

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let url = RescriptReactRouter.useUrl()

  let {account, appName} = AppStore.useSelector((
    {enterAppState}: FrontendUtils.AppStoreType.state,
  ) => enterAppState)

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadFinish, setIsDownloadFinish) = React.useState(_ => false)

  React.useEffect1(() => {
    FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
      let account = FrontendUtils.UrlSearchUtils.get(url.search, "account")
      let appName = FrontendUtils.UrlSearchUtils.get(url.search, "appName")

      // TODO perf: if already init, not init again
      service.backend.init(InitUtils.getBackendEnv(_getEnv()))
      ->Meta3dBsMostDefault.Most.drain
      ->// customData->Obj.magic

      // customData->Obj.magic

      // customData->Obj.magic

      // customData->Obj.magic

      Js.Promise.then_(
        _ => {
          service.backend.findPublishApp(.
            progress => setDownloadProgress(_ => progress),
            account,
            appName,
          )->Meta3dBsMostDefault.Most.observe(
            appBinaryFile => {
              setIsDownloadFinish(_ => true)

              Js.Nullable.isNullable(appBinaryFile)
                ? {
                    Message.error(.
                      {j`account: ${account} appName: ${appName} has no published app`},
                      10,
                    )
                  }
                : {
                    Meta3dCommonlib.NullableSt.getExn(appBinaryFile)
                    ->Meta3d.Main.loadApp(
                      (allContributeDataArr, selectedElements) => {
                        let selectedElement: FrontendUtils.BackendCloudbaseType.elementAssembleData =
                          selectedElements->Obj.magic->Meta3dCommonlib.ArraySt.getExn(0)

                        let (
                          customInputs: array<FrontendUtils.ElementAssembleStoreType.customInput>,
                          customActions: array<FrontendUtils.ElementAssembleStoreType.customAction>,
                        ) = (selectedElement.customInputs, [])

                        let funcs = (
                          Meta3d.Main.generateContribute,
                          Meta3d.Main.loadContribute,
                          Meta3d.Main.convertContributeFuncData,
                        )

                        allContributeDataArr
                        ->Meta3dCommonlib.ListSt.fromArray
                        ->FrontendUtils.ElementUtils.addGeneratedInputContributesForRunApp(
                          funcs,
                          _,
                          account,
                          customInputs->Meta3dCommonlib.ListSt.fromArray,
                        )
                        ->FrontendUtils.ElementUtils.addGeneratedActionContributesForRunApp(
                          funcs,
                          _,
                          account,
                          customActions->Meta3dCommonlib.ListSt.fromArray,
                        )
                        ->Meta3dCommonlib.ListSt.toArray
                      },
                      _,
                    )
                    ->Meta3d.Main.startApp
                  }
            },
            _,
          )
        },
        // customData->Obj.magic

        // customData->Obj.magic

        // customData->Obj.magic

        // customData->Obj.magic

        _,
      )
      ->Js.Promise.catch(
        e => {
          service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
        },
        _,
      )
      ->ignore
    }, 5->Some)

    None
  }, [])

  <>
    {!isDownloadFinish
      ? <p> {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})} </p>
      : React.null}
  </>
}
