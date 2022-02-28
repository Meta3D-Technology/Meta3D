type eventData

type state = {
  eventContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    EventContributeType.eventName,
    EventContributeType.eventContribute<eventData>,
  >,
}
