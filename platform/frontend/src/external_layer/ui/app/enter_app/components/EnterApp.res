open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (~service: FrontendType.service) => {
  let dispatch = AppStore.useDispatch()

  let url = RescriptReactRouter.useUrl()

  let eventEmitter = AppStore.useSelector(({eventEmitter}: AppStoreType.state) => {
    eventEmitter
  })

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadFinish, setIsDownloadFinish) = React.useState(_ => false)

  let _addEnvToStartConfigData = ((meta3dState, startPackageProtocolName, configData)) => {
    let (canvasData, configData) = configData->Obj.magic

    configData["env"] = EnvUtils.getEnv()

    (meta3dState, startPackageProtocolName, (canvasData, configData))
  }

  React.useEffect1(() => {
    MessageUtils.showCatchedErrorMessage(() => {
      switch Meta3dMonacoUtils.Main.getMonaco()->Meta3dCommonlib.OptionSt.fromNullable {
      | None =>
        Meta3dMonacoUtils.Main.deferLoad()
        ->Js.Promise.catch(
          e => {
            service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
          },
          _,
        )
        ->ignore
      | Some(_) => ()
      }
    }, 5->Some)

    None
  }, [])

  React.useEffect1(() => {
    MessageUtils.showCatchedErrorMessage(() => {
      let account = UrlSearchUtils.get(url.search, "account")
      let appName = UrlSearchUtils.get(url.search, "appName")

      // TODO perf: if already init, not init again
      service.backend.init(InitUtils.getBackendEnv(EnvUtils.getEnv()))
      ->Meta3dBsMostDefault.Most.drain
      ->Js.Promise.then_(
        _ => {
          service.backend.findPublishApp(.
            progress => setDownloadProgress(_ => progress),
            account,
            appName,
            UserUtils.isDebugUser(UserUtils.readAccount()),
          )->Meta3dBsMostDefault.Most.observe(
            appBinaryFile => {
              setIsDownloadFinish(_ => true)

              Js.Nullable.isNullable(appBinaryFile)
                ? {
                    Meta3dCommonlib.Exception.throwErr(
                      Meta3dCommonlib.Exception.buildErr(
                        Meta3dCommonlib.Log.buildErrorMessage(
                          ~title={j`account: ${account} appName: ${appName} has no published app`},
                          ~description={
                            ""
                          },
                          ~reason="",
                          ~solution=j``,
                          ~params=j``,
                        ),
                      ),
                    )
                  }
                : {
                    eventEmitter.emit(.
                      EventUtils.getRunAppEventName(),
                      (account, appName)->Obj.magic,
                    )

                    Meta3dCommonlib.NullableSt.getExn(appBinaryFile)
                    ->Meta3d.Main.loadApp(
                      (allContributeDataArr, selectedElements) => {
                        let selectedElement: BackendCloudbaseType.elementAssembleData =
                          selectedElements->Obj.magic->Meta3dCommonlib.ArraySt.getExn(0)

                        let (
                          customInputs: array<ElementAssembleStoreType.customInput>,
                          customActions: array<ElementAssembleStoreType.customAction>,
                        ) = (selectedElement.customInputs, selectedElement.customActions)

                        let funcs = (
                          Meta3d.Main.generateContribute,
                          Meta3d.Main.loadContribute,
                          Meta3d.Main.convertContributeFuncData,
                        )

                        allContributeDataArr
                        ->Meta3dCommonlib.ListSt.fromArray
                        ->ElementUtils.addGeneratedInputContributesForRunApp(
                          funcs,
                          _,
                          account,
                          customInputs->Meta3dCommonlib.ListSt.fromArray,
                        )
                        ->ElementUtils.addGeneratedActionContributesForRunApp(
                          funcs,
                          _,
                          account,
                          customActions->Meta3dCommonlib.ListSt.fromArray,
                        )
                        ->Meta3dCommonlib.ListSt.toArray
                      },
                      _,
                    )
                    ->_addEnvToStartConfigData
                    ->Meta3d.Main.startApp
                  }
            },
            _,
          )
        },
        _,
      )
      ->Js.Promise.catch(
        e => {
          service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
        },
        _,
      )
      ->ignore
    }, 5->Some)

    None
  }, [])

  <>
    {!isDownloadFinish
      ? <Loading text={j`${downloadProgress->Js.Int.toString}% 下载中`} />
      : React.null}
  </>
}
