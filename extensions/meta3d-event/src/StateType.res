type state = {
  actionContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    Meta3dEventProtocol.ActionContributeType.eventName,
    Meta3dEventProtocol.ActionContributeType.actionContribute<
      Meta3dEventProtocol.StateType.eventData,
    >,
  >,
  eventManagerState: EventManagerStateType.state,
}

external protocolStateToState: Meta3dEventProtocol.StateType.state => state = "%identity"

external stateToProtocolState: state => Meta3dEventProtocol.StateType.state = "%identity"
