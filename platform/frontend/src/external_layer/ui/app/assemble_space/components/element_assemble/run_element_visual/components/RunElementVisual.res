open Antd
%%raw("import 'antd/dist/reset.css'")

module Method = {
  // let _getVisualExtensionProtocolName = () => "meta3d-element-assemble-visual-run-protocol"

  let _getInitData = (service: AssembleSpaceType.service, isDebug) => {
    {
      "target": "visualRun",
      "isDebug": isDebug,
      "canvas": service.dom.querySelector("#ui-visual-run-canvas")->Meta3dCommonlib.OptionSt.getExn,
      "env": EnvUtils.getEnv(),
    }->Obj.magic
  }

  let _getUpdateData = (clearColor, skinName, time) => {
    {
      "target": "visualRun",
      "clearColor": clearColor,
      "skinName": skinName,
      "time": time,
    }->Obj.magic
  }

  // let rec _loop = (service: AssembleSpaceType.service, meta3dState, update) => {
  //   update(meta3dState)->Js.Promise.then_(meta3dState => {
  //     service.other.requestAnimationFrame((time) =>
  //       _loop(service, meta3dState, update)
  //     )->Js.Promise.resolve
  //   }, _)->ignore
  // }

  let rec _loop = (
    service: AssembleSpaceType.service,
    loopFrameID: React.ref<option<int>>,
    {clearColor, skinName} as apInspectorData: ApAssembleStoreType.apInspectorData,
    time,
    meta3dState,
  ) => {
    service.meta3d.updateExtension(.
      meta3dState,
      ElementVisualUtils.getEditorWholePackageProtocolName(),
      _getUpdateData(clearColor, skinName, time),
    )
    ->Js.Promise.then_(meta3dState => {
      loopFrameID.current =
        service.other.requestAnimationOtherFrame(time => {
          _loop(service, loopFrameID, apInspectorData, time, meta3dState)
        })->Some

      ()->Js.Promise.resolve
    }, _)
    ->Js.Promise.catch(e => {
      service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic

      (e->Obj.magic)["errorType"] === "script"
        ? {
            loopFrameID.current =
              service.other.requestAnimationOtherFrame(time => {
                _loop(service, loopFrameID, apInspectorData, time, meta3dState)
              })->Some

            ()->Js.Promise.resolve
          }
        : e->Js.Exn.anyToExnInternal->Js.Promise.reject
    }, _)
    ->ignore
  }

  let startApp = (
    service: AssembleSpaceType.service,
    loopFrameID: React.ref<option<int>>,
    {isDebug} as apInspectorData: ApAssembleStoreType.apInspectorData,
  ) => {
    service.storage.initForElementVisualApp()
    ->service.storage.getElementVisualApp(. _)
    ->Meta3dBsMostDefault.Most.flatMap(appBinaryFile => {
      let (meta3dState, _, _) = service.meta3d.loadApp(.
        ElementVisualUtils.buildEmptyAddGeneratedContributeFunc(),
        appBinaryFile,
      )

      service.meta3d.initExtension(.
        meta3dState,
        ElementVisualUtils.getEditorWholePackageProtocolName(),
        _getInitData(service, isDebug),
      )
      ->Js.Promise.then_(meta3dState => {
        loopFrameID.current =
          service.other.requestAnimationFirstFrame(
            time => {
              MessageUtils.showCatchedErrorMessage(
                () => {
                  _loop(service, loopFrameID, apInspectorData, time, meta3dState)
                },
                5->Some,
              )
            },
          )->Some

        ()->Js.Promise.resolve
      }, _)
      ->Meta3dBsMostDefault.Most.fromPromise
    }, _)
    ->Meta3dBsMostDefault.Most.drain
    ->Js.Promise.catch(e => {
      service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
    }, _)
  }

  // let useSelector = (
  //   {apAssembleState, elementAssembleState}: AssembleSpaceStoreType.state,
  // ) => {
  //   let {canvasData, apInspectorData} = apAssembleState

  //   (canvasData, apInspectorData)
  // }
}

@react.component
let make = (~service: AssembleSpaceType.service) => {
  // let url = service.url.useUrl()

  // let (canvasData, apInspectorData) = service.react.useSelector(. Method.useSelector)

  let loopFrameID = service.react.useRef(None)

  // let canvasData: ElementAssembleStoreType.canvasData =
  //   UrlSearchUtils.get(url.search, "canvasData")->Js.Json.parseExn->Obj.magic
  // let apInspectorData: ApAssembleStoreType.apInspectorData =
  //   UrlSearchUtils.get(url.search, "apInspectorData")->Js.Json.parseExn->Obj.magic
  let canvasData: ElementAssembleStoreType.canvasData =
    service.url.getUrlParam("canvasData")->Obj.magic
  let apInspectorData: ApAssembleStoreType.apInspectorData =
    service.url.getUrlParam("apInspectorData")->Obj.magic

  service.react.useEffect1(. () => {
    MessageUtils.showCatchedErrorMessage(() => {
      switch Meta3dMonacoUtils.Main.getMonaco() {
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
      Method.startApp(service, loopFrameID, apInspectorData)->ignore
    }, 5->Some)

    (
      () => {
        ElementVisualUtils.cancelAppLoop(service, loopFrameID)
      }
    )->Some
  }, [])

  // TODO duplicate with ElementVisual
  <canvas
    id="ui-visual-run-canvas"
    style={ReactDOM.Style.make(
      // ~borderStyle="solid",
      // ~borderColor="red",
      // ~borderWidth="2px",
      ~width={j`${canvasData.width->Js.Int.toString}px`},
      ~height={j`${canvasData.height->Js.Int.toString}px`},
      (),
    )}
    width={j`${canvasData.width->Js.Int.toString}px`}
    height={j`${canvasData.height->Js.Int.toString}px`}
  />
}
