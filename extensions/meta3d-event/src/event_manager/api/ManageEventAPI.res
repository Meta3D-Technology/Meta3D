let onMouseEvent = (eventName, priority, handleFunc) =>
  ManageEventDoService.onMouseEvent(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(),
    ~priority,
    (),
  )->ContainerManager.setState

let onKeyboardEvent = (eventName, priority, handleFunc) =>
  ManageEventDoService.onKeyboardEvent(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(),
    ~priority,
    (),
  )->ContainerManager.setState

let onTouchEvent = (eventName, priority, handleFunc) =>
  ManageEventDoService.onTouchEvent(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(),
    ~priority,
    (),
  )->ContainerManager.setState

let offMouseEventByHandleFunc = (eventName, handleFunc) =>
  ManageEventDoService.offMouseEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(),
  )->ContainerManager.setState

let offKeyboardEventByHandleFunc = (eventName, handleFunc) =>
  ManageEventDoService.offKeyboardEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(),
  )->ContainerManager.setState

let offTouchEventByHandleFunc = (eventName, handleFunc) =>
  ManageEventDoService.offTouchEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(),
  )->ContainerManager.setState

let onCustomGlobalEvent = (eventName, priority, handleFunc) =>
  ManageEventDoService.onCustomGlobalEvent(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(),
    ~priority,
    (),
  )->ContainerManager.setState

let offCustomGlobalEventByEventName = eventName =>
  ManageEventDoService.offCustomGlobalEventByEventName(
    ~eventName,
    ~state=ContainerManager.getState(),
  )->ContainerManager.setState

let offCustomGlobalEventByHandleFunc = (eventName, handleFunc) =>
  ManageEventDoService.offCustomGlobalEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state=ContainerManager.getState(),
  )->ContainerManager.setState

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
  ManageEventDoService.triggerCustomGlobalEvent(customEvent, ContainerManager.getState())
  ->Meta3dCommonlib.Tuple2.getFirst
  ->ContainerManager.setState

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

// let getPointEventLocationInViewOfEvent = (event: EventType.pointEvent) => event.locationInView

// let getPointEventLocationOfEvent = (event: EventType.pointEvent) => event.location

// let getPointEventButtonOfEvent = (event: EventType.pointEvent) => event.button

// let getPointEventWheelOfEvent = (event: EventType.pointEvent) => event.wheel

// let getPointEventMovementDeltaOfEvent = (event: EventType.pointEvent) => event.movementDelta

// let getPointEventEventOfEvent = (event: EventType.pointEvent) => event.event
