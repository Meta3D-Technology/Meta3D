let registerEvent = (
  state: Meta3dEventProtocol.StateType.state,
  eventContribute: Meta3dEventProtocol.IEvent.eventContribute<Meta3dEventProtocol.IEvent.eventData>,
) => {
  {
    ...state,
    eventContributeMap: state.eventContributeMap->Meta3dCommonlib.ImmutableHashMap.set(
      eventContribute.eventName,
      eventContribute,
    ),
  }
}

let trigger = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
  eventName,
  eventData: Meta3dEventProtocol.IEvent.eventData,
) => {
  let state: Meta3dEventProtocol.StateType.state = api.getExtensionStateExn(.
    meta3dState,
    eventExtensionName,
  )
  let eventContribute: Meta3dEventProtocol.IEvent.eventContribute<
    Meta3dEventProtocol.IEvent.eventData,
  > =
    state.eventContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(eventName)

  eventContribute.handler(meta3dState, eventData)
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dEventProtocol.StateType.state,
> = () => {
  {eventContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()}
}
