open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _getVisualExtensionProtocolName = () => "meta3d-ui-view-visual-run-protocol"

  let _getVisualExtensionProtocolVersion = () => "0.5.0"

  let _getVisualExtensionVersion = () => "0.5.0"

  let _getVisualExtensionName = () => "meta3d-ui-view-visual-run"

  let getAndSetVisualExtension = (service, dispatch) => {
    UIVisualUtils.getAndSetVisualExtension(
      service,
      dispatch,
      extension => FrontendUtils.UIViewStoreType.SetRunVisualExtension(extension),
      (
        _getVisualExtensionProtocolName(),
        _getVisualExtensionProtocolVersion(),
        _getVisualExtensionName(),
        _getVisualExtensionVersion(),
      ),
    )
  }

  // TODO use indexDB instead
  let _saveToLocalStorage = appBinaryFile => {
    LocalStorageUtils.set(UIVisualUtils.getRunUIVisualAppName(), appBinaryFile)
  }

  let _buildURL = canvasData => j`RunUIVisual?canvasData=${canvasData}`

  let _openLink = url => {
    FrontendUtils.Window.\"open"(url, "_blank").focus()
  }

  let run = (
    service,
    (
      (canvasData, selectedExtensions, selectedContributes),
      (runVisualExtension, elementContribute),
    ),
  ) => {
    UIVisualUtils.generateApp(
      service,
      (
        selectedExtensions->Meta3dCommonlib.ListSt.toArray,
        selectedContributes->Meta3dCommonlib.ListSt.toArray,
      ),
      (runVisualExtension, elementContribute),
    )->_saveToLocalStorage

    _openLink(_buildURL(canvasData->Obj.magic->Js.Json.stringify))
  }

  let useSelector = ({apViewState, uiViewState}: FrontendUtils.AssembleSpaceStoreType.state) => {
    let {canvasData, selectedExtensions, selectedContributes} = apViewState
    let {runVisualExtension, elementContribute} = uiViewState

    ((canvasData, selectedExtensions, selectedContributes), (runVisualExtension, elementContribute))
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.UIView.useDispatch(service.react.useDispatch)

  let (
    (canvasData, selectedExtensions, selectedContributes),
    (runVisualExtension, elementContribute),
  ) = service.react.useSelector(Method.useSelector)

  service.react.useEffect1(. () => {
    switch runVisualExtension {
    | Some(_) => ()
    | None => Method.getAndSetVisualExtension(service, dispatch)->ignore
    }

    None
  }, [])

  {
    switch (runVisualExtension, elementContribute) {
    | (None, None) => <p> {React.string(`waiting...`)} </p>
    | (Some(runVisualExtension), Some(elementContribute)) =>
      <Button
        onClick={_ => {
          Method.run(
            service,
            (
              (canvasData, selectedExtensions, selectedContributes),
              (runVisualExtension, elementContribute),
            ),
          )
        }}>
        {React.string(`运行`)}
      </Button>
    }
  }
}
