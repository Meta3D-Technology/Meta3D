type state = {
  eventContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    Meta3dEventProtocol.EventContributeType.eventName,
    Meta3dEventProtocol.EventContributeType.eventContribute<
      Meta3dEventProtocol.StateType.eventData,
    >,
  >,
  eventManagerState: EventManagerStateType.state,
}

external protocolStateToState: Meta3dEventProtocol.StateType.state => state = "%identity"

external stateToProtocolState: state => Meta3dEventProtocol.StateType.state = "%identity"
