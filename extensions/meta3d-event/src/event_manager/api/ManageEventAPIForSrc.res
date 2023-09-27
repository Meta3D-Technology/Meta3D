// TODO refactor: unify onCustomGlobalEvent, onCustomGlobalEvent2
let onCustomGlobalEvent = (eventExtensionProtocolName, (eventName, priority, handleFunc)) =>
  // ManageEventDoService.onCustomGlobalEvent(
  //   ~eventName,
  //   ~handleFunc,
  //   ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
  //   ~priority,
  //   (),
  // )->ignore
  // )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())
  ManageEventDoService.onCustomGlobalEvent(
    ~eventName,
    ~handleFunc=(. customEvent, state) => {
      handleFunc(. customEvent)

      (state, customEvent)
    },
    ~state=ContainerManager.getState(eventExtensionProtocolName),
    ~priority,
    (),
  )->ContainerManager.setState(eventExtensionProtocolName)

let offCustomGlobalEventByHandleFunc = (eventExtensionProtocolName, (eventName, handleFunc)) =>
  ManageEventDoService.offCustomGlobalEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(eventExtensionProtocolName),
  )->ContainerManager.setState(eventExtensionProtocolName)

let onCustomGlobalEvent2 = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  (eventName, priority, handleFunc),
): Meta3dType.Index.state => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionProtocolName)->StateType.protocolStateToState

  let state = {
    ...state,
    eventManagerState: ManageEventDoService.onCustomGlobalEvent2(
      ~eventName,
      ~handleFunc=(. meta3dState, customEvent) => {
        let meta3dState = handleFunc(. meta3dState, customEvent)

        (meta3dState, customEvent)
      },
      ~state=state.eventManagerState,
      ~priority,
      (),
    ),
  }

  api.setExtensionState(.
    meta3dState,
    eventExtensionProtocolName,
    state->StateType.stateToProtocolState,
  )
}

let triggerCustomGlobalEvent2 = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  customEvent,
) =>
  ManageEventDoService.triggerCustomGlobalEvent2(
    api,
    meta3dState,
    eventExtensionProtocolName,
    customEvent,
  )->Meta3dCommonlib.Tuple2.getFirst

let onCustomGlobalEvent3 = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  (eventName, priority, handleFunc),
): Meta3dType.Index.state => {
  let state: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionProtocolName)->StateType.protocolStateToState

  let state = {
    ...state,
    eventManagerState: ManageEventDoService.onCustomGlobalEvent3(
      ~eventName,
      ~handleFunc=(. meta3dState, customEvent) => {
        handleFunc(. meta3dState, customEvent)
      },
      ~state=state.eventManagerState,
      ~priority,
      (),
    ),
  }

  api.setExtensionState(.
    meta3dState,
    eventExtensionProtocolName,
    state->StateType.stateToProtocolState,
  )
}

let triggerCustomGlobalEvent3 = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  customEvent,
) =>
  ManageEventDoService.triggerCustomGlobalEvent2(
    api,
    meta3dState,
    eventExtensionProtocolName,
    customEvent,
  )

let createCustomEvent = (eventName, userData) =>
  CreateCustomEventDoService.create(eventName, Js.Nullable.to_opt(userData))
