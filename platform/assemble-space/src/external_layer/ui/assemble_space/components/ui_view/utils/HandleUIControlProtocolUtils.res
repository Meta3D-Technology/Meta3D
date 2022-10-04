type eventName = [#click]

let generateUIControlDataStr = (
  protocolName,
  protocolVersion,
  data: FrontendUtils.UIViewStoreType.uiControlInspectorData,
) => {
  switch protocolName {
  | "meta3d-ui-control-button-protocol" =>
    j`
  {
    rect: ${data.rect->Obj.magic->Js.Json.stringify}
  }
  `
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title={j`unknown protocol name: ${protocolName}`},
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}

let generateUIControlName = protocolName => {
  switch protocolName {
  | "meta3d-ui-control-button-protocol" => "Button"
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title={j`unknown protocol name: ${protocolName}`},
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}

let getActionName = (event: FrontendUtils.UIViewStoreType.event, eventName) => {
  event
  ->Meta3dCommonlib.ArraySt.find(eventData => {
    eventData.eventName === eventName
  })
  ->Meta3dCommonlib.OptionSt.map(({actionName}) => actionName)
}

let generateHandleUIControlEventStr = (
  protocolName,
  protocolVersion,
  event: FrontendUtils.UIViewStoreType.event,
) => {
  switch protocolName {
  | "meta3d-ui-control-button-protocol" =>
    switch getActionName(event, #click) {
    | Some(actionName) =>
      j`
            let isClick = data[1]
            if (isClick) {
                let { trigger } = api.getExtensionService(meta3dState, meta3dEventExtensionName)

                return trigger(meta3dState, meta3dEventExtensionName, "${actionName}", null)
            }
`
    | None => ""
    }
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title={j`unknown protocol name: ${protocolName}`},
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}

let getUIControlSupportedEventNames = (protocolName, protocolVersion): array<
  FrontendUtils.UIControlInspectorType.eventName,
> => {
  switch protocolName {
  | "meta3d-ui-control-button-protocol" => [#click]
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title={j`unknown protocol name: ${protocolName}`},
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}
