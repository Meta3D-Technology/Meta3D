open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

module Method = {
  let _getVisualExtensionName = () => "meta3d-ui-view-visual-run"

  let _getInitData = (service: FrontendUtils.AssembleSpaceType.service) => {
    {
      "isDebug": true,
      "canvas": service.dom.querySelector("#ui-visual-run-canvas")->Meta3dCommonlib.OptionSt.getExn,
    }->Obj.magic
  }

  let _updateApp = (service: FrontendUtils.AssembleSpaceType.service, updateData, meta3dState) => {
    service.meta3d.updateExtension(. meta3dState, _getVisualExtensionName(), updateData)
  }

  let rec _loop = (service: FrontendUtils.AssembleSpaceType.service, meta3dState, update) => {
    update(meta3dState)->Js.Promise.then_(meta3dState => {
      service.other.requestAnimationFrame(() =>
        _loop(service, meta3dState, update)
      )->Js.Promise.resolve
    }, _)->ignore
  }

  let startApp = (service: FrontendUtils.AssembleSpaceType.service) => {
    service.storage.initForElementVisualApp()
    ->service.storage.getElementVisualApp(. _)
    ->Meta3dBsMost.Most.flatMap(appBinaryFile => {
      let meta3dState = service.meta3d.loadApp(. appBinaryFile)->Meta3dCommonlib.Tuple2.getFirst

      service.meta3d.initExtension(. meta3dState, _getVisualExtensionName(), _getInitData(service))
      ->Js.Promise.then_(meta3dState => {
        _loop(service, meta3dState, _updateApp(service, Obj.magic(1)))->Js.Promise.resolve
      }, _)
      ->Meta3dBsMost.Most.fromPromise
    }, _)
    ->Meta3dBsMost.Most.drain
    ->Js.Promise.catch(e => {
      service.console.error(.
        e->Obj.magic->Js.Exn.message->Meta3dCommonlib.OptionSt.getExn->Obj.magic,
        None,
      )->Obj.magic
    }, _)
  }
}

@react.component
let make = (~service: FrontendUtils.AssembleSpaceType.service) => {
  let url = service.url.useUrl()

  let canvasData: FrontendUtils.ApAssembleStoreType.canvasData =
    FrontendUtils.UrlSearchUtils.get(url.search, "canvasData")->Js.Json.parseExn->Obj.magic

  React.useEffect1(() => {
    Method.startApp(service)->ignore

    None
  }, [])

  // TODO duplicate with ElementVisual
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
