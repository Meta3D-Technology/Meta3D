type rec mouseDomEventData = {
  priority: int,
  handleFunc: (. Meta3dEventProtocol.EventType.mouseEvent, state) => state,
}
and keyboardDomEventData = {
  priority: int,
  handleFunc: (. Meta3dEventProtocol.EventType.keyboardEvent, state) => state,
}
and touchDomEventData = {
  priority: int,
  handleFunc: (. Meta3dEventProtocol.EventType.touchEvent, state) => state,
}
and customEventData = {
  priority: int,
  handleFunc: (. Meta3dEventProtocol.EventType.customEvent, state) => (state, Meta3dEventProtocol.EventType.customEvent),
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
  mouseEventData: Meta3dEventProtocol.EventType.mouseEventData,
  keyboardEventData: Meta3dEventProtocol.EventType.keyboardEventData,
  touchEventData: Meta3dEventProtocol.EventType.touchEventData,
}
and state = {
  eventData: eventData,
  canvas: option<Dom.htmlCanvasElement>,
  body: option<Dom.htmlBodyElement>,
  browser: Meta3dEventProtocol.BrowserType.browser,
}
