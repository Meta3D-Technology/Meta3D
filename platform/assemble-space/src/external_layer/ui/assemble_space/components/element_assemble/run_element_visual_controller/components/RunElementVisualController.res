open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _getVisualExtensionProtocolName = () => "meta3d-element-assemble-visual-run-protocol"

  let _getVisualExtensionName = () => "meta3d-element-assemble-visual-run"

  let getAndSetNewestVisualExtension = (service, dispatch) => {
    ElementVisualUtils.getAndSetNewestVisualExtension(
      service,
      dispatch,
      extension => FrontendUtils.ElementAssembleStoreType.SetRunVisualExtension(extension),
      (_getVisualExtensionProtocolName(), _getVisualExtensionName()),
    )
  }

  let _saveToLocalStorage = (service, appBinaryFile) => {
    service.storage.initForElementVisualApp()->service.storage.setElementVisualApp(.
      _,
      appBinaryFile,
    )
  }

  let _buildURL = canvasData => j`RunElementVisual?canvasData=${canvasData}`

  let _openLink = (service, url) => {
    service.tab.openUrl(. url)
  }

  let run = (
    service,
    (
      (canvasData, selectedExtensions, selectedContributes),
      (runVisualExtension, elementContribute),
    ),
  ) => {
    ElementVisualUtils.generateApp(
      service,
      (
        selectedExtensions->Meta3dCommonlib.ListSt.toArray,
        selectedContributes->Meta3dCommonlib.ListSt.toArray,
      ),
      (runVisualExtension, elementContribute),
    )
    ->_saveToLocalStorage(service, _)
    ->Meta3dBsMost.Most.tap(_ => {
      _openLink(service, _buildURL(canvasData->Obj.magic->Js.Json.stringify))
    }, _)
    ->Meta3dBsMost.Most.drain
    ->Js.Promise.catch(e => {
                service.console.errorWithExn(.
                  e->FrontendUtils.Error.promiseErrorToExn,
                  None,
                )->Obj.magic
    }, _)
  }

  let useSelector = (
    {isDebug, apAssembleState, elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    let {canvasData, selectedExtensions, selectedContributes} = apAssembleState
    let {runVisualExtension, elementContribute} = elementAssembleState

    // let (_, elementContribute) = elementContribute

    (
      isDebug,
      (canvasData, selectedExtensions, selectedContributes),
      (runVisualExtension, elementContribute),
    )
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (
    isDebug,
    (canvasData, selectedExtensions, selectedContributes),
    (runVisualExtension, elementContribute),
  ) = service.react.useSelector(Method.useSelector)

  service.react.useEffect1(. () => {
    switch runVisualExtension {
    | Some(_) => ()
    | None => Method.getAndSetNewestVisualExtension(service, dispatch, isDebug)->ignore
    }

    None
  }, [])

  {
    switch (runVisualExtension, elementContribute) {
    | (Some(runVisualExtension), Some(elementContribute)) =>
      <Button
        onClick={_ => {
          Method.run(
            service,
            (
              (canvasData, selectedExtensions, selectedContributes),
              (runVisualExtension, elementContribute),
            ),
          )->ignore
        }}>
        {React.string(`运行`)}
      </Button>
    | _ => <p> {React.string(`waiting...`)} </p>
    }
  }
}
