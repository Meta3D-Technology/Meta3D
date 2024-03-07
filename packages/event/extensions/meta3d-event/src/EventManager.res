// TODO add bdd test

let registerAction = (
  state: Meta3dEventProtocol.StateType.state,
  actionContribute: Meta3dEventProtocol.ActionContributeType.actionContribute<
    Meta3dEventProtocol.StateType.uiData,
    Meta3dEventProtocol.StateType.actionState,
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
  eventExtensionProtocolName,
  actionName,
  uiData: Meta3dEventProtocol.StateType.uiData,
) => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionProtocolName)->StateType.protocolStateToState

  switch state.actionContributeMap->Meta3dCommonlib.ImmutableHashMap.get(actionName) {
  | None => Js.Promise.resolve(meta3dState)
  | Some(
      actionContribute: Meta3dEventProtocol.ActionContributeType.actionContribute<
        Meta3dEventProtocol.StateType.uiData,
        Meta3dEventProtocol.StateType.actionState,
      >,
    ) =>
    actionContribute.handler(meta3dState, uiData)
  }
}

let _buildHandlerFunc = handleFunc => {
  (. customEvent, state) => {
    try {
      handleFunc(. customEvent)

      (state, customEvent)
    } catch {
    | Js.Exn.Error(e) => {
        Meta3dCommonlib.Log.error(e->Obj.magic)

        (state, customEvent)
      }
    }
  }
}

let onPointEvent = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  (pointEventName, priority, handleFunc),
) => {
  // let state: StateType.state =
  //   api.getExtensionState(. meta3dState, eventExtensionProtocolName)->StateType.protocolStateToState

  // let state = {
  //   ...state,
  //   eventManagerState: ManageEventDoService.onCustomGlobalEvent(
  //     ~eventName=pointEventName->Obj.magic,
  //     ~handleFunc=(. customEvent, state) => {
  //       handleFunc(. customEvent)

  //       (state, customEvent)
  //     },
  //     ~state=state.eventManagerState,
  //     ~priority,
  //     (),
  //   ),
  // }

  // api.setExtensionState(.
  //   meta3dState,
  //   eventExtensionProtocolName,
  //   state->StateType.stateToProtocolState,
  // )

  ManageEventDoService.onCustomGlobalEvent(
    ~eventName=pointEventName->Obj.magic,
    ~handleFunc=_buildHandlerFunc(handleFunc),
    ~state=ContainerManager.getState(eventExtensionProtocolName),
    ~priority,
    (),
  )
  ->ContainerManager.setState(eventExtensionProtocolName)
  ->ignore

  meta3dState
}

let offPointEvent = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  (pointEventName, handleFunc),
) => {
  // let state: StateType.state =
  //   api.getExtensionState(. meta3dState, eventExtensionProtocolName)->StateType.protocolStateToState

  // let state = {
  //   ...state,
  //   eventManagerState: ManageEventDoService.offCustomGlobalEventByHandleFunc(
  //     ~eventName=pointEventName->Obj.magic,
  //     ~handleFunc,
  //     ~state=state.eventManagerState,
  //   ),
  // }

  // api.setExtensionState(.
  //   meta3dState,
  //   eventExtensionProtocolName,
  //   state->StateType.stateToProtocolState,
  // )

  ManageEventDoService.offCustomGlobalEventByHandleFunc(
    ~eventName=pointEventName->Obj.magic,
    ~handleFunc,
    ~state=ContainerManager.getState(eventExtensionProtocolName),
  )
  ->ContainerManager.setState(eventExtensionProtocolName)
  ->ignore

  meta3dState
}

let _setDomToStateForEventHandler = (eventManagerState, eventExtensionProtocolName) => {
  let browser = BrowserDoService.getBrowser(eventManagerState)
  let canvas = CanvasDoService.getCanvas(eventManagerState)->Meta3dCommonlib.OptionSt.getExn
  let body = BodyDoService.getBodyExn(eventManagerState)

  ContainerManager.getState(eventExtensionProtocolName)
  ->BrowserDoService.setBrowser(browser)
  ->CanvasDoService.setCanvas(canvas)
  ->BodyDoService.setBody(body)
  ->ContainerManager.setState(eventExtensionProtocolName)
}

let initEvent = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
) => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionProtocolName)->StateType.protocolStateToState

  ContainerManager.createState(CreateEventManagerState.create, eventExtensionProtocolName)

  let eventManagerState =
    state.eventManagerState->InitEventDoService.initEvent(eventExtensionProtocolName)

  _setDomToStateForEventHandler(eventManagerState, eventExtensionProtocolName)

  api.setExtensionState(.
    meta3dState,
    eventExtensionProtocolName,
    {
      ...state,
      eventManagerState,
    }->StateType.stateToProtocolState,
  )
}

let _invokeEventManagerSetDomDataFuncWithOneArg = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  setDomDataFunc,
  domData,
) => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionProtocolName)->StateType.protocolStateToState

  let eventManagerState = state.eventManagerState->setDomDataFunc(domData)

  api.setExtensionState(.
    meta3dState,
    eventExtensionProtocolName,
    {
      ...state,
      eventManagerState,
    }->StateType.stateToProtocolState,
  )
}

let setBrowser = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  browser,
) => {
  _invokeEventManagerSetDomDataFuncWithOneArg(
    api,
    meta3dState,
    eventExtensionProtocolName,
    BrowserDoService.setBrowser,
    browser,
  )
}

let setCanvas = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  canvas,
) => {
  _invokeEventManagerSetDomDataFuncWithOneArg(
    api,
    meta3dState,
    eventExtensionProtocolName,
    CanvasDoService.setCanvas,
    canvas,
  )
}

let setBody = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  body,
) => {
  _invokeEventManagerSetDomDataFuncWithOneArg(
    api,
    meta3dState,
    eventExtensionProtocolName,
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

let getAllActionContributes = (state: Meta3dEventProtocol.StateType.state) => {
  let state = state->StateType.protocolStateToState

  state.actionContributeMap->Meta3dCommonlib.ImmutableHashMap.entries
}

let createExtensionState: Meta3dType.Index.createExtensionState<StateType.state> = (. _, _) => {
  {
    actionContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    eventManagerState: CreateEventManagerState.create(),
  }
}
