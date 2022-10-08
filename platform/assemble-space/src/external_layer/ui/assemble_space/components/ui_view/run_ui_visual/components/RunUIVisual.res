open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

module Method = {
  let getVisualExtensionName = () => "meta3d-ui-view-visual-run"

  let getInitData = () => {
    {
      "isDebug": true,
      "canvas": DomExtend.querySelector(
        DomExtend.document,
        "#ui-visual-run-canvas",
      )->Meta3dCommonlib.OptionSt.getExn,
    }->Obj.magic
  }

  let updateApp = (service: FrontendUtils.AssembleSpaceType.service, updateData, meta3dState) => {
    service.meta3d.updateExtension(. meta3dState, getVisualExtensionName(), updateData)
  }

  let rec loop = (meta3dState, update) => {
    update(meta3dState)->Js.Promise.then_(meta3dState => {
      RequestAnimationFrameExtend.requestAnimationFrame(() =>
        loop(meta3dState, update)
      )->Js.Promise.resolve
    }, _)->ignore
  }
}

@react.component
let make = (~service: FrontendUtils.AssembleSpaceType.service) => {
  let url = RescriptReactRouter.useUrl()

  let canvasData: FrontendUtils.ApViewStoreType.canvasData =
    FrontendUtils.UrlSearchUtils.get(url.search, "canvasData")->Js.Json.parseExn->Obj.magic

  React.useEffect1(() => {
    let appBinaryFile = LocalStorageUtils.get(UIVisualUtils.getRunUIVisualAppName())

    Js.Nullable.isNullable(appBinaryFile)
      ? {
          service.console.error(. {j`appBinaryFile not exist`}, None)->Obj.magic
        }
      : {
          let meta3dState = service.meta3d.loadApp(. appBinaryFile)->Meta3dCommonlib.Tuple2.getFirst

          service.meta3d.initExtension(.
            meta3dState,
            Method.getVisualExtensionName(),
            Method.getInitData(),
          )
          ->Js.Promise.then_(meta3dState => {
            Method.loop(meta3dState, Method.updateApp(service, Obj.magic(1)))->Js.Promise.resolve
          }, _)
          ->ignore
        }

    None
  }, [])

  // TODO duplicate with UIVisual
  <canvas
    id="ui-visual-run-canvas"
    style={ReactDOM.Style.make(
      ~borderStyle="solid",
      ~borderColor="red",
      ~borderWidth="2px",
      ~width={j`${canvasData.width->Js.Int.toString}px`},
      ~height={j`${canvasData.height->Js.Int.toString}px`},
      (),
    )}
    width={j`${canvasData.width->Js.Int.toString}px`}
    height={j`${canvasData.height->Js.Int.toString}px`}
  />
}
