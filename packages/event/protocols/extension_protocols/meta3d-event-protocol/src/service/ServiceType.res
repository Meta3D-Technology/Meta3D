type eventExtensionProtocolName = Meta3dType.Index.extensionName

type pointEventName = [
  | #meta3d_pointdown
  | #meta3d_pointup
  | #meta3d_pointtap
  | #meta3d_pointmove
  | #meta3d_pointscale
  | #meta3d_pointdragstart
  | #meta3d_pointdragover
  | #meta3d_pointdragdrop
]

type customEventName = string

type priority = int

type handleFunc = (. EventType.customEvent) => unit

type handleFunc2 = (. Meta3dType.Index.state, EventType.customEvent) => Meta3dType.Index.state

type handleFunc3 = (
  . Meta3dType.Index.state,
  EventType.customEvent,
) => Js.Promise.t<Meta3dType.Index.state>

type eventDataService

type eventSourcingService

type service = {
  eventData: Meta3dType.Index.state => eventDataService,
  eventSourcing: Meta3dType.Index.state => eventSourcingService,
  trigger: 'uiData. (
    Meta3dType.Index.state,
    eventExtensionProtocolName,
    ActionContributeType.actionName,
    'uiData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  registerAction: 'uiData. (
    Meta3dType.Index.state,
    ActionContributeType.actionContribute<'uiData, StateType.state>,
  ) => Meta3dType.Index.state,
  onPointEvent: (
    Meta3dType.Index.state,
    eventExtensionProtocolName,
    (pointEventName, priority, handleFunc),
  ) => Meta3dType.Index.state,
  offPointEvent: (
    Meta3dType.Index.state,
    eventExtensionProtocolName,
    (pointEventName, handleFunc),
  ) => Meta3dType.Index.state,
  onCustomGlobalEvent: (
    eventExtensionProtocolName,
    (customEventName, priority, handleFunc),
  ) => unit,
  offCustomGlobalEventByHandleFunc: (
    eventExtensionProtocolName,
    (customEventName, handleFunc),
  ) => unit,
  onCustomGlobalEvent2: (
    Meta3dType.Index.state,
    eventExtensionProtocolName,
    (customEventName, priority, handleFunc2),
  ) => Meta3dType.Index.state,
  triggerCustomGlobalEvent2: (
    Meta3dType.Index.state,
    eventExtensionProtocolName,
    EventType.customEvent,
  ) => Meta3dType.Index.state,
  onCustomGlobalEvent3: (
    Meta3dType.Index.state,
    eventExtensionProtocolName,
    (customEventName, priority, handleFunc3),
  ) => Meta3dType.Index.state,
  triggerCustomGlobalEvent3: (
    Meta3dType.Index.state,
    eventExtensionProtocolName,
    EventType.customEvent,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  createCustomEvent: (customEventName, Js.Nullable.t<EventType.userData>) => EventType.customEvent,
  initEvent: (Meta3dType.Index.state, eventExtensionProtocolName) => Meta3dType.Index.state,
  setBrowser: (
    Meta3dType.Index.state,
    eventExtensionProtocolName,
    BrowserType.browser,
  ) => Meta3dType.Index.state,
  setCanvas: (
    Meta3dType.Index.state,
    eventExtensionProtocolName,
    Dom.htmlCanvasElement,
  ) => Meta3dType.Index.state,
  setBody: (
    Meta3dType.Index.state,
    eventExtensionProtocolName,
    Dom.htmlBodyElement,
  ) => Meta3dType.Index.state,
  getBrowserChromeType: unit => BrowserType.browser,
  getBrowserFirefoxType: unit => BrowserType.browser,
  getBrowserAndroidType: unit => BrowserType.browser,
  getBrowserIOSType: unit => BrowserType.browser,
  getBrowserUnknownType: unit => BrowserType.browser,
  getPointDownEventName: unit => pointEventName,
  getPointUpEventName: unit => pointEventName,
  getPointTapEventName: unit => pointEventName,
  getPointMoveEventName: unit => pointEventName,
  getPointScaleEventName: unit => pointEventName,
  getPointDragStartEventName: unit => pointEventName,
  getPointDragOverEventName: unit => pointEventName,
  getAllActionContributes: 'uiData 'state. StateType.state => array<(
    ActionContributeType.actionName,
    ActionContributeType.actionContribute<'uiData, 'state>,
  )>,
}
