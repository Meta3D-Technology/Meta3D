type eventExtensionName = Meta3dType.Index.extensionName

type service = {
  trigger: 'eventData. (
    Meta3dType.Index.state,
    eventExtensionName,
    EventType.eventName,
    'eventData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  onCustomEvent: 'eventData. (
    StateType.state,
    EventType.eventName,
    EventType.eventHandler<'eventData>,
  ) => StateType.state,
}
