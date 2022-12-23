open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

module Method = {
  let _getVisualExtensionProtocolName = () => "meta3d-element-assemble-visual-run-protocol"

  let _getInitData = (service: FrontendUtils.AssembleSpaceType.service, isDebug) => {
    {
      "isDebug": isDebug,
      "canvas": service.dom.querySelector("#ui-visual-run-canvas")->Meta3dCommonlib.OptionSt.getExn,
    }->Obj.magic
  }

  let _getUpdateData = (clearColor, skinName, time) => {
    {
      "clearColor": clearColor,
      "skinName": skinName,
      "time": time,
    }->Obj.magic
  }

  // let rec _loop = (service: FrontendUtils.AssembleSpaceType.service, meta3dState, update) => {
  //   update(meta3dState)->Js.Promise.then_(meta3dState => {
  //     service.other.requestAnimationFrame((time) =>
  //       _loop(service, meta3dState, update)
  //     )->Js.Promise.resolve
  //   }, _)->ignore
  // }

  let rec _loop = (
    service: FrontendUtils.AssembleSpaceType.service,
    {clearColor, skinName} as apInspectorData: FrontendUtils.ApAssembleStoreType.apInspectorData,
    time,
    meta3dState,
  ) => {
    service.meta3d.updateExtension(.
      meta3dState,
      _getVisualExtensionProtocolName(),
      _getUpdateData(clearColor, skinName, time),
    )
    ->Js.Promise.then_(meta3dState => {
      service.other.requestAnimationOtherFrame(time => {
        _loop(service, apInspectorData, time, meta3dState)
      })->Js.Promise.resolve
    }, _)
    ->ignore
  }

  let startApp = (
    service: FrontendUtils.AssembleSpaceType.service,
    {isDebug} as apInspectorData: FrontendUtils.ApAssembleStoreType.apInspectorData,
  ) => {
    service.storage.initForElementVisualApp()
    ->service.storage.getElementVisualApp(. _)
    ->Meta3dBsMost.Most.flatMap(appBinaryFile => {
      let (meta3dState, _, _) = service.meta3d.loadApp(. appBinaryFile)

      service.meta3d.initExtension(.
        meta3dState,
        _getVisualExtensionProtocolName(),
        _getInitData(service, isDebug),
      )
      ->Js.Promise.then_(meta3dState => {
        service.other.requestAnimationFirstFrame(
          time => {
            FrontendUtils.ErrorUtils.showCatchedErrorMessage(
              () => {
                _loop(service, apInspectorData, time, meta3dState)
              },
              5->Some,
            )
          },
        )->Js.Promise.resolve
      }, _)
      ->Meta3dBsMost.Most.fromPromise
    }, _)
    ->Meta3dBsMost.Most.drain
    ->Js.Promise.catch(e => {
      service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
    }, _)
  }

  let useSelector = (
    {apAssembleState, elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    let {canvasData, apInspectorData} = apAssembleState

    (canvasData, apInspectorData)
  }
}

@react.component
let make = (~service: FrontendUtils.AssembleSpaceType.service) => {
  let url = service.url.useUrl()

  let (canvasData, apInspectorData) = service.react.useSelector(Method.useSelector)

  // let canvasData: FrontendUtils.ApAssembleStoreType.canvasData =
  //   FrontendUtils.UrlSearchUtils.get(url.search, "canvasData")->Js.Json.parseExn->Obj.magic
  // let apInspectorData: FrontendUtils.ApAssembleStoreType.apInspectorData =
  //   FrontendUtils.UrlSearchUtils.get(url.search, "apInspectorData")->Js.Json.parseExn->Obj.magic

  React.useEffect1(() => {
    FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
      Method.startApp(service, apInspectorData)->ignore
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
