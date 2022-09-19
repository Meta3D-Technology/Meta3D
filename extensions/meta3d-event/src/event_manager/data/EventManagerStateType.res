type rec mouseDomEventData = {
  priority: int,
  handleFunc: (. EventType.mouseEvent, state) => state,
}
and keyboardDomEventData = {
  priority: int,
  handleFunc: (. EventType.keyboardEvent, state) => state,
}
and touchDomEventData = {
  priority: int,
  handleFunc: (. EventType.touchEvent, state) => state,
}
and customEventData = {
  priority: int,
  handleFunc: (. EventType.customEvent, state) => (state, EventType.customEvent),
}
and eventData = {
  domEventStreamSubscription: option<Meta3dBsMost.Most.subscription>,
  mouseDomEventDataArrMap: Meta3dCommonlibType.MutableSparseMapType.t<int, array<mouseDomEventData>>,
  keyboardDomEventDataArrMap: Meta3dCommonlibType.MutableSparseMapType.t<int, array<keyboardDomEventData>>,
  touchDomEventDataArrMap: Meta3dCommonlibType.MutableSparseMapType.t<int, array<touchDomEventData>>,
  customGlobalEventArrMap: Meta3dCommonlibType.MutableHashMapType.t<string, array<customEventData>>,
  // customGameObjectEventArrMap: Meta3dCommonlibType.MutableHashMapType.t<
  //   string,
  //   Meta3dCommonlibType.MutableSparseMapType.t<int, array<customEventData>>,
  // >,
  mouseEventData: EventType.mouseEventData,
  keyboardEventData: EventType.keyboardEventData,
  touchEventData: EventType.touchEventData,
}
and state = {
  eventData: eventData,
  canvas: option<Dom.htmlCanvasElement>,
  body: option<Dom.htmlBodyElement>,
  browser: Meta3dEventProtocol.BrowserType.browser,
}
