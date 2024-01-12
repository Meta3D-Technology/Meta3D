open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (~service: FrontendType.service) => {
  let dispatch = AppStore.useDispatch()

  let url = RescriptReactRouter.useUrl()

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadFinish, setIsDownloadFinish) = React.useState(_ => false)

  let rec _loop = ((updateFunc, renderFunc), meta3dState) => {
    updateFunc(meta3dState)->Js.Promise.then_(meta3dState => {
      renderFunc(meta3dState)
    }, _)->Js.Promise.then_(meta3dState => {
      RequestAnimationFrameExtend.requestAnimationFrame(_ => {
        _loop((updateFunc, renderFunc), meta3dState)
      })->ignore

      ()->Js.Promise.resolve
    }, _)->Js.Promise.catch(e => {
      MessageUtils.errorWithExn(e->Error.promiseErrorToExn, None)->Obj.magic
    }, _)->ignore
  }

  let _startFinalApp = (service: FrontendType.service, version, sceneGLB) => {
    open Js.Typed_array

    let isDebug = true

    let float9Array1 = Float32Array.fromLength(9)
    let float32Array1 = Float32Array.fromLength(32)
    let transformCount = 100000
    let geometryCount = 100000
    let geometryPointCount = 10000000
    let pbrMaterialCount = 100000

    let canvas =
      DomExtend.querySelector(DomExtend.document, "#canvas")->Meta3dCommonlib.OptionSt.getExn

    CacheUtils.getPackages(version->Some)
    ->Meta3dCommonlib.PromiseSt.map(Meta3dCommonlib.NullableSt.getExn)
    ->Js.Promise.then_(((_, files)) => {
      let enginePackageBinaryFile = files->Obj.magic->Meta3dCommonlib.ArraySt.getExn(1)

      let (meta3dState, _, entryExtensionProtocolName) = Meta3d.Main.loadPackage(
        enginePackageBinaryFile,
      )

      entryExtensionProtocolName !== "meta3d-engine-whole-protocol"
        ? Meta3dCommonlib.Exception.throwErr(
            Meta3dCommonlib.Exception.buildErr(
              Meta3dCommonlib.Log.buildErrorMessage(
                ~title={
                  j`entryExtensionProtocolName: ${entryExtensionProtocolName} should be meta3d-engine-whole-protocol`
                },
                ~description={
                  ""
                },
                ~reason="",
                ~solution=j``,
                ~params=j``,
              ),
            ),
          )
        : {
            let {
              loadScene,
              prepare,
              init,
              update,
              render,
            }: Meta3dEngineWholeProtocol.ServiceType.service =
              Meta3d.Main.getExtensionService(meta3dState, entryExtensionProtocolName)->Obj.magic

            let meta3dState = prepare(
              meta3dState,
              isDebug,
              {
                "float9Array1": float9Array1,
                "float32Array1": float32Array1,
                "transformCount": transformCount,
                "geometryCount": geometryCount,
                "geometryPointCount": geometryPointCount,
                "pbrMaterialCount": pbrMaterialCount,
              }->Obj.magic,
            )

            loadScene(meta3dState, sceneGLB)->Js.Promise.then_(meta3dState => {
              init(meta3dState, canvas)
            }, _)->Js.Promise.then_(meta3dState => {
              MessageUtils.showCatchedErrorMessage(
                () => {
                  _loop((update, render), meta3dState)
                },
                5->Some,
              )

              ()->Js.Promise.resolve
            }, _)
          }
    }, _)
    ->Js.Promise.catch(e => {
      service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
    }, _)
    ->ignore
  }

  React.useEffect1(() => {
    MessageUtils.showCatchedErrorMessage(() => {
      let account = UrlSearchUtils.get(url.search, "account")
      let appName = UrlSearchUtils.get(url.search, "appName")
      let version = UrlSearchUtils.get(url.search, "version")

      // TODO perf: if already init, not init again
      service.backend.init(InitUtils.getBackendEnv(EnvUtils.getEnv()))
      ->Meta3dBsMostDefault.Most.drain
      ->Js.Promise.then_(
        _ => {
          service.backend.findPublishFinalApp(.
            progress => setDownloadProgress(_ => progress),
            account,
            appName,
            UserUtils.isDebugUser(UserUtils.readAccount()),
          )->Meta3dBsMostDefault.Most.observe(
            sceneGLB => {
              setIsDownloadFinish(_ => true)

              Js.Nullable.isNullable(sceneGLB)
                ? {
                    Meta3dCommonlib.Exception.throwErr(
                      Meta3dCommonlib.Exception.buildErr(
                        Meta3dCommonlib.Log.buildErrorMessage(
                          ~title={
                            j`account: ${account} appName: ${appName} has no published final app->content`
                          },
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
                    _startFinalApp(service, version, sceneGLB->Meta3dCommonlib.NullableSt.getExn)
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
      : // TODO full screen
        <canvas id="canvas" width="800" height="800" />}
  </>
}
