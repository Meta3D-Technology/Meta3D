type eventExtensionName = Meta3dType.Index.extensionName

type service = {
  trigger: 'eventData. (
    Meta3dType.Index.state,
    eventExtensionName,
    EventContributeType.eventName,
    'eventData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  registerEvent: 'eventData. (
    StateType.state,
    EventContributeType.eventContribute<'eventData>,
  ) => StateType.state,
}
