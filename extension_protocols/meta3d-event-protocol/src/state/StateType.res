type state = {
  eventHandlerMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    EventType.eventName,
    EventType.onedEventHandler<EventType.eventData>,
  >,
}
