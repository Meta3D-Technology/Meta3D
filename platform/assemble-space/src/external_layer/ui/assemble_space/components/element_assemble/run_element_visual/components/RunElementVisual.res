open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

module Method = {
  let _getVisualExtensionName = () => "meta3d-element-assemble-visual-run"

  let _getInitData = (service: FrontendUtils.AssembleSpaceType.service) => {
    {
      "isDebug": true,
      "canvas": service.dom.querySelector("#ui-visual-run-canvas")->Meta3dCommonlib.OptionSt.getExn,
    }->Obj.magic
  }

  let _getUpdateData = time => {
    {
      "clearColor": (1., 1., 1., 1.),
      "time": time,
    }->Obj.magic
  }

  // let _updateApp = (service: FrontendUtils.AssembleSpaceType.service, updateData, meta3dState) => {
  //   service.meta3d.updateExtension(. meta3dState, _getVisualExtensionName(), updateData)
  // }

  // let rec _loop = (service: FrontendUtils.AssembleSpaceType.service, meta3dState, update) => {
  //   update(meta3dState)->Js.Promise.then_(meta3dState => {
  //     service.other.requestAnimationFrame((time) =>
  //       _loop(service, meta3dState, update)
  //     )->Js.Promise.resolve
  //   }, _)->ignore
  // }

  let rec _loop = (service: FrontendUtils.AssembleSpaceType.service, time, meta3dState) => {
    service.meta3d.updateExtension(. meta3dState, _getVisualExtensionName(), _getUpdateData(time))
    ->Js.Promise.then_(meta3dState => {
      service.other.requestAnimationOtherFrame(time => {
        _loop(service, time, meta3dState)
      })->Js.Promise.resolve
    }, _)
    ->ignore
  }

  let startApp = (service: FrontendUtils.AssembleSpaceType.service) => {
    service.storage.initForElementVisualApp()
    ->service.storage.getElementVisualApp(. _)
    ->Meta3dBsMost.Most.flatMap(appBinaryFile => {
      let (meta3dState, _, _) = service.meta3d.loadApp(. appBinaryFile)

      service.meta3d.initExtension(. meta3dState, _getVisualExtensionName(), _getInitData(service))
      ->Js.Promise.then_(meta3dState => {
        service.other.requestAnimationFirstFrame(time => {
          _loop(service, time, meta3dState)
        })->Js.Promise.resolve
      }, _)
      ->Meta3dBsMost.Most.fromPromise
    }, _)
    ->Meta3dBsMost.Most.drain
    ->Js.Promise.catch(e => {
      service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
    }, _)
  }
}

@react.component
let make = (~service: FrontendUtils.AssembleSpaceType.service) => {
  let url = service.url.useUrl()

  let canvasData: FrontendUtils.ApAssembleStoreType.canvasData =
    FrontendUtils.UrlSearchUtils.get(url.search, "canvasData")->Js.Json.parseExn->Obj.magic

  React.useEffect1(() => {
    FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
      Method.startApp(service)->ignore
    }, 5->Some)

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
