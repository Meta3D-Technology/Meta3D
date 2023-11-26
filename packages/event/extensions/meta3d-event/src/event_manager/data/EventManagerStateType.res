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
  handleFunc: (
    . Meta3dEventProtocol.EventType.customEvent,
    state,
  ) => (state, Meta3dEventProtocol.EventType.customEvent),
}
and customEventData2 = {
  priority: int,
  handleFunc: (
    . Meta3dType.Index.state,
    Meta3dEventProtocol.EventType.customEvent,
  ) => (Meta3dType.Index.state, Meta3dEventProtocol.EventType.customEvent),
}
and customEventData3 = {
  priority: int,
  handleFunc: (
    . Meta3dType.Index.state,
    Meta3dEventProtocol.EventType.customEvent,
  ) => Js.Promise.t<Meta3dType.Index.state>,
}
and eventData = {
  domEventStreamSubscription: option<Meta3dBsMostDefault.Most.subscription>,
  mouseDomEventDataArrMap: Meta3dCommonlibType.MutableSparseMapType.t<
    int,
    array<mouseDomEventData>,
  >,
  keyboardDomEventDataArrMap: Meta3dCommonlibType.MutableSparseMapType.t<
    int,
    array<keyboardDomEventData>,
  >,
  touchDomEventDataArrMap: Meta3dCommonlibType.MutableSparseMapType.t<
    int,
    array<touchDomEventData>,
  >,
  customGlobalEventArrMap: Meta3dCommonlibType.MutableHashMapType.t<string, array<customEventData>>,
  customGlobalEventArrMap2: Meta3dCommonlibType.MutableHashMapType.t<
    string,
    array<customEventData2>,
  >,
  customGlobalEventArrMap3: Meta3dCommonlibType.MutableHashMapType.t<
    string,
    array<customEventData3>,
  >,
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
