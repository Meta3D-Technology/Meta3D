// TODO add bdd test

let registerAction = (
  state: Meta3dEventProtocol.StateType.state,
  actionContribute: Meta3dEventProtocol.ActionContributeType.actionContribute<
    Meta3dEventProtocol.StateType.actionData,
  >,
) => {
  let state = state->StateType.protocolStateToState

  {
    ...state,
    actionContributeMap: state.actionContributeMap->Meta3dCommonlib.ImmutableHashMap.set(
      actionContribute.actionName,
      actionContribute,
    ),
  }->StateType.stateToProtocolState
}

let trigger = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
  actionName,
  actionData: Meta3dEventProtocol.StateType.actionData,
) => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionName)->StateType.protocolStateToState

  let actionContribute: Meta3dEventProtocol.ActionContributeType.actionContribute<
    Meta3dEventProtocol.StateType.actionData,
  > =
    state.actionContributeMap->Meta3dCommonlib.ImmutableHashMap.getExn(actionName)

  actionContribute.handler(meta3dState, actionData)
}

let onPointEvent = (
  api: Meta3dType.Index.api,
  // meta3dState: Meta3dType.Index.state,
  eventExtensionName,
  (pointEventName, priority, handleFunc),
) => {
  // let state: StateType.state =
  //   api.getExtensionState(. meta3dState, eventExtensionName)->StateType.protocolStateToState

  let eventManagerState = ContainerManager.getState(eventExtensionName)

  let eventManagerState = ManageEventDoService.onCustomGlobalEvent(
    ~eventName=pointEventName->Obj.magic,
    ~handleFunc=(. customEvent, state) => {
      handleFunc(. customEvent)

      (state, customEvent)
    },
    ~state=eventManagerState,
    ~priority,
    (),
  )

  // api.setExtensionState(.
  //   meta3dState,
  //   eventExtensionName,
  //   {
  //     ...state,
  //     eventManagerState: eventManagerState,
  //   }->StateType.stateToProtocolState,
  // )

  ContainerManager.setState(eventManagerState, eventExtensionName)
}

let _setDomToStateForEventHandler = (eventManagerState, eventExtensionName) => {
  let browser = BrowserDoService.getBrowser(eventManagerState)
  let canvas = CanvasDoService.getCanvas(eventManagerState)->Meta3dCommonlib.OptionSt.getExn
  let body = BodyDoService.getBodyExn(eventManagerState)

  ContainerManager.getState(eventExtensionName)
  ->BrowserDoService.setBrowser(browser)
  ->CanvasDoService.setCanvas(canvas)
  ->BodyDoService.setBody(body)
  ->ContainerManager.setState(eventExtensionName)
}

let initEvent = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
) => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionName)->StateType.protocolStateToState

  ContainerManager.createState(CreateEventManagerState.create, eventExtensionName)

  let eventManagerState = state.eventManagerState->InitEventDoService.initEvent(eventExtensionName)

  _setDomToStateForEventHandler(eventManagerState, eventExtensionName)

  api.setExtensionState(.
    meta3dState,
    eventExtensionName,
    {
      ...state,
      eventManagerState: eventManagerState,
    }->StateType.stateToProtocolState,
  )
}

let _invokeEventManagerSetDomDataFuncWithOneArg = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionName,
  setDomDataFunc,
  domData,
) => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionName)->StateType.protocolStateToState

  let eventManagerState = state.eventManagerState->setDomDataFunc(domData)

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
  _invokeEventManagerSetDomDataFuncWithOneArg(
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
  _invokeEventManagerSetDomDataFuncWithOneArg(
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
  _invokeEventManagerSetDomDataFuncWithOneArg(
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

let getPointDownEventName = NameEventDoService.getPointDownEventName->Obj.magic

let getPointUpEventName = NameEventDoService.getPointUpEventName->Obj.magic

let getPointTapEventName = NameEventDoService.getPointTapEventName->Obj.magic

let getPointMoveEventName = NameEventDoService.getPointMoveEventName->Obj.magic

let getPointScaleEventName = NameEventDoService.getPointScaleEventName->Obj.magic

let getPointDragStartEventName = NameEventDoService.getPointDragStartEventName->Obj.magic

let getPointDragOverEventName = NameEventDoService.getPointDragOverEventName->Obj.magic

let getPointDragDropEventName = NameEventDoService.getPointDragDropEventName->Obj.magic

let createExtensionState: Meta3dType.Index.createExtensionState<StateType.state> = () => {
  {
    actionContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    eventManagerState: CreateEventManagerState.create(),
  }
}
