type eventExtensionName = Meta3dType.Index.extensionName

type service = {
  trigger: 'eventData. (
    Meta3dType.Index.state,
    eventExtensionName,
    IEvent.eventName,
    'eventData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  registerEvent: 'eventData. (
    StateType.state,
    IEvent.eventContribute<'eventData>,
  ) => StateType.state,
}
