let onMouseEvent = (eventName, priority, handleFunc) =>
  ManageEventDoService.onMouseEvent(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
    ~priority,
    (),
  )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let onKeyboardEvent = (eventName, priority, handleFunc) =>
  ManageEventDoService.onKeyboardEvent(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
    ~priority,
    (),
  )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let onTouchEvent = (eventName, priority, handleFunc) =>
  ManageEventDoService.onTouchEvent(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
    ~priority,
    (),
  )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let offMouseEventByHandleFunc = (eventName, handleFunc) =>
  ManageEventDoService.offMouseEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
  )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let offKeyboardEventByHandleFunc = (eventName, handleFunc) =>
  ManageEventDoService.offKeyboardEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
  )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let offTouchEventByHandleFunc = (eventName, handleFunc) =>
  ManageEventDoService.offTouchEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
  )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let onCustomGlobalEvent = (eventName, priority, handleFunc) =>
  ManageEventDoService.onCustomGlobalEvent(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
    ~priority,
    (),
  )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let offCustomGlobalEventByEventName = eventName =>
  ManageEventDoService.offCustomGlobalEventByEventName(
    ~eventName,
    ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
  )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

let offCustomGlobalEventByHandleFunc = (eventName, handleFunc) =>
  ManageEventDoService.offCustomGlobalEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
  )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

// let onCustomGameObjectEvent = (eventName, target, priority, handleFunc, state) =>
//   ManageEventDoService.onCustomGameObjectEvent(
//     ~eventName,
//     ~handleFunc,
//     ~target,
//     ~state,
//     ~priority,
//     (),
//   )

// let offCustomGameObjectEventByTarget = (eventName, target, state) =>
//   ManageEventDoService.offCustomGameObjectEventByTarget(~eventName, ~target, ~state)

// let offCustomGameObjectEventByHandleFunc = (eventName, target, handleFunc, state) =>
//   ManageEventDoService.offCustomGameObjectEventByHandleFunc(
//     ~eventName,
//     ~target,
//     ~handleFunc,
//     ~state,
//   )

let stopPropagationCustomEvent = ManageEventDoService.stopPropagationCustomEvent

let triggerCustomGlobalEvent = customEvent =>
  ManageEventDoService.triggerCustomGlobalEvent(customEvent, ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()))
  ->Meta3dCommonlib.Tuple2.getFirst
  ->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())

// let triggerCustomGameObjectEvent = (customEvent, target, state) =>
//   ManageEventDoService.triggerCustomGameObjectEvent(customEvent, target, state)

// let broadcastCustomGameObjectEvent = (customEvent, target, state) =>
//   ManageEventDoService.broadcastCustomGameObjectEvent(customEvent, target, state)

// let emitCustomGameObjectEvent = (customEvent, target, state) =>
//   ManageEventDoService.emitCustomGameObjectEvent(customEvent, target, state)

let createCustomEvent = (eventName, userData) =>
  CreateCustomEventDoService.create(eventName, Js.Nullable.to_opt(userData))

// let getCustomEventUserData = customEvent =>
//   HandleCustomEventDoService.getCustomEventUserData(customEvent)

// let getPointEventLocationInViewOfEvent = (event: Meta3dEventProtocol.EventType.pointEvent) => event.locationInView

// let getPointEventLocationOfEvent = (event: Meta3dEventProtocol.EventType.pointEvent) => event.location

// let getPointEventButtonOfEvent = (event: Meta3dEventProtocol.EventType.pointEvent) => event.button

// let getPointEventWheelOfEvent = (event: Meta3dEventProtocol.EventType.pointEvent) => event.wheel

// let getPointEventMovementDeltaOfEvent = (event: Meta3dEventProtocol.EventType.pointEvent) => event.movementDelta

// let getPointEventEventOfEvent = (event: Meta3dEventProtocol.EventType.pointEvent) => event.event
