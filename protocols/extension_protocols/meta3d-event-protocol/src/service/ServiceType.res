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
  initEvent: (Meta3dType.Index.state, eventExtensionName) => Meta3dType.Index.state,
  setBrowser: (
    Meta3dType.Index.state,
    eventExtensionName,
    BrowserType.browser,
  ) => Meta3dType.Index.state,
  setCanvas: (
    Meta3dType.Index.state,
    eventExtensionName,
    Dom.htmlCanvasElement,
  ) => Meta3dType.Index.state,
  setBody: (
    Meta3dType.Index.state,
    eventExtensionName,
    Dom.htmlBodyElement,
  ) => Meta3dType.Index.state,
  getBrowserChromeType: unit => BrowserType.browser,
  getBrowserFirefoxType: unit => BrowserType.browser,
  getBrowserAndroidType: unit => BrowserType.browser,
  getBrowserIOSType: unit => BrowserType.browser,
  getBrowserUnknownType: unit => BrowserType.browser,
}
