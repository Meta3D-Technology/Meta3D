// TODO add bdd test

let registerEvent = (
  state: Meta3dEventProtocol.StateType.state,
  eventContribute: Meta3dEventProtocol.EventContributeType.eventContribute<
    Meta3dEventProtocol.StateType.eventData,
  >,
) => {
  let state = state->StateType.protocolStateToState

  {
    ...state,
    eventContributeMap: state.eventContributeMap->Meta3dCommonlib.ImmutableHashMap.set(
      eventContribute.eventName,
      eventContribute,
    ),
  }->StateType.stateToProtocolState
}

let trigger = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
  eventName,
  eventData: Meta3dEventProtocol.StateType.eventData,
) => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionName)->StateType.protocolStateToState

  let eventContribute: Meta3dEventProtocol.EventContributeType.eventContribute<
    Meta3dEventProtocol.StateType.eventData,
  > =
    state.eventContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(eventName)

  eventContribute.handler(meta3dState, eventData)
}

let initEvent = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
) => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionName)->StateType.protocolStateToState

  let eventManagerState = state.eventManagerState->InitEventDoService.initEvent

  api.setExtensionState(.
    meta3dState,
    eventExtensionName,
    {
      ...state,
      eventManagerState: eventManagerState,
    }->StateType.stateToProtocolState,
  )
}

let _invokeEventManagerFuncWithOneArg = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
  func,
  arg1,
) => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionName)->StateType.protocolStateToState

  let eventManagerState = state.eventManagerState->func(arg1)

  api.setExtensionState(.
    meta3dState,
    eventExtensionName,
    {
      ...state,
      eventManagerState: eventManagerState,
    }->StateType.stateToProtocolState,
  )
}

let setBrowser = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
  browser,
) => {
  _invokeEventManagerFuncWithOneArg(
    api,
    meta3dState,
    eventExtensionName,
    BrowserDoService.setBrowser,
    browser,
  )
}

let setCanvas = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
  canvas,
) => {
  _invokeEventManagerFuncWithOneArg(
    api,
    meta3dState,
    eventExtensionName,
    CanvasDoService.setCanvas,
    canvas,
  )
}

let setBody = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
  body,
) => {
  _invokeEventManagerFuncWithOneArg(
    api,
    meta3dState,
    eventExtensionName,
    BodyDoService.setBody,
    body,
  )
}

let getBrowserChromeType = () => Meta3dEventProtocol.BrowserType.Chrome

let getBrowserFirefoxType = () => Meta3dEventProtocol.BrowserType.Firefox

let getBrowserAndroidType = () => Meta3dEventProtocol.BrowserType.Android

let getBrowserIOSType = () => Meta3dEventProtocol.BrowserType.IOS

let getBrowserUnknownType = () => Meta3dEventProtocol.BrowserType.Unknown

let createExtensionState: Meta3dType.Index.createExtensionState<StateType.state> = () => {
  {
    eventContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    eventManagerState: CreateEventManagerState.create(),
  }
}
