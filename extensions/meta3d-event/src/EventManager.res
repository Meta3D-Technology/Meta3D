let onCustomEvent = (state: Meta3dEventProtocol.StateType.state, eventName, eventHandler) => {
  {
    ...state,
    eventHandlerMap: state.eventHandlerMap->Meta3dCommonlib.ImmutableHashMap.set(
      eventName,
      eventHandler,
    ),
  }
}

let trigger = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
  eventName,
  eventData: Meta3dEventProtocol.EventType.eventData,
) => {
  let state: Meta3dEventProtocol.StateType.state = api.getExtensionStateExn(.
    meta3dState,
    eventExtensionName,
  )
  let eventHandler: Meta3dEventProtocol.EventType.eventHandler<
    Meta3dEventProtocol.EventType.eventData,
  > =
    state.eventHandlerMap->Meta3dCommonlib.ImmutableHashMap.getExn(eventName)

  eventHandler(meta3dState, api, eventExtensionName, eventData)
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dEventProtocol.StateType.state,
> = () => {
  {eventHandlerMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()}
}
