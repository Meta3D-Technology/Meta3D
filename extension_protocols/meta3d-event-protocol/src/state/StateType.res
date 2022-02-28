type eventData

type state = {
  eventContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    IEvent.eventName,
    IEvent.eventContribute<eventData>,
  >,
}
