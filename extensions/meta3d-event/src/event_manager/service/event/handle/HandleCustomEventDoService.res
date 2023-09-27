open EventManagerStateType

open Meta3dEventProtocol.EventType

let _triggerHandleFunc = (
  customEvent,
  arr: array<Meta3dEvent.EventManagerStateType.customEventData>,
  state,
) =>
  arr->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. (state, customEvent), {handleFunc}) =>
      customEvent.isStopPropagation ? (state, customEvent) : handleFunc(. customEvent, state),
    (state, customEvent),
  )

let _triggerHandleFunc2 = (customEvent, arr:array<customEventData2>, meta3dState) =>
  arr->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. (meta3dState, customEvent), {handleFunc}) =>
      customEvent.isStopPropagation
        ? (meta3dState, customEvent)
        : handleFunc(. meta3dState, customEvent),
    (meta3dState, customEvent),
  )

let _triggerHandleFunc3 = (customEvent, arr:array<customEventData3>, meta3dState) =>
  arr->Meta3dCommonlib.ArraySt.traverseReducePromiseM((. meta3dState, {handleFunc}) => {
    customEvent.isStopPropagation
      ? meta3dState->Js.Promise.resolve
      : handleFunc(. meta3dState, customEvent)
  }, meta3dState)

let stopPropagation = customEvent => {
  ...customEvent,
  isStopPropagation: true,
}

let triggerGlobalEvent = (customEvent: customEvent, state: EventManagerStateType.state) => {
  let {customGlobalEventArrMap} = state.eventData

  switch customGlobalEventArrMap->Meta3dCommonlib.MutableHashMap.get(customEvent.name) {
  | None => (state, customEvent)
  | Some(arr) => _triggerHandleFunc(customEvent, arr, state)
  }
}

let triggerGlobalEvent2 = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  customEvent: customEvent,
) => {
  let {eventManagerState}: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionProtocolName)->StateType.protocolStateToState

  let {customGlobalEventArrMap2} = eventManagerState.eventData

  switch customGlobalEventArrMap2->Meta3dCommonlib.MutableHashMap.get(customEvent.name) {
  | None => (meta3dState, customEvent)
  | Some(arr) => _triggerHandleFunc2(customEvent, arr, meta3dState)
  }
}

let triggerGlobalEvent3 = (
  api: Meta3dType.Index.api,
  meta3dState: Meta3dType.Index.state,
  eventExtensionProtocolName,
  customEvent: customEvent,
) => {
  let {eventManagerState}: StateType.state =
    api.getExtensionState(. meta3dState, eventExtensionProtocolName)->StateType.protocolStateToState

  let {customGlobalEventArrMap3} = eventManagerState.eventData

  switch customGlobalEventArrMap3->Meta3dCommonlib.MutableHashMap.get(customEvent.name) {
  | None => meta3dState->Js.Promise.resolve
  | Some(arr) => _triggerHandleFunc3(customEvent, arr, meta3dState)
  }
}

// let triggerGameObjectEvent = (
//   target,
//   ({name}: customEvent) as customEvent,
//   {eventData} as state,
// ) => {
//   let {customGameObjectEventArrMap} = eventData

//   switch customGameObjectEventArrMap -> Meta3dCommonlib.MutableHashMap.get(name) {
//   | None => (state, customEvent)
//   | Some(gameObjectEventListMap) =>
//     switch gameObjectEventListMap -> Meta3dCommonlib.MutableSparseMap.get(target) {
//     | None => (state, customEvent)
//     | Some(arr) => _triggerHandleFunc({...customEvent, target: Some(target)}, arr, state)
//     }
//   }
// }

// let rec _broadcastGameObjectEvent = (eventName, target, customEvent, state) => {
//   let (state, customEvent) = triggerGameObjectEvent(target, customEvent, state)

//   let transformRecord = RecordTransformDoService.getRecord(state)

//   HierachyTransformService.unsafeGetChildren(
//     GetComponentGameObjectService.unsafeGetTransformComponent(target, state.gameObjectRecord),
//     transformRecord,
//   ) -> Meta3dCommonlib.ArraySt.reduceOneParam(
//     (. state, child) => _broadcastGameObjectEvent(eventName, child, customEvent, state),
//     state,
//   )
// }

// let broadcastGameObjectEvent = (target, ({name}: customEvent) as customEvent, state) =>
//   _broadcastGameObjectEvent(name, target, {...customEvent, phase: Some(Broadcast)}, state)

// let rec _emitGameObjectEvent = (eventName, target, customEvent, state) => {
//   let (state, customEvent) = triggerGameObjectEvent(target, customEvent, state)

//   let transformRecord = RecordTransformDoService.getRecord(state)

//   switch HierachyTransformService.getParent(
//     GetComponentGameObjectService.unsafeGetTransformComponent(target, state.gameObjectRecord),
//     transformRecord,
//   ) {
//   | None => state
//   | Some(parent) => _emitGameObjectEvent(eventName, parent, customEvent, state)
//   }
// }

// let emitGameObjectEvent = (target, ({name}: customEvent) as customEvent, state) =>
//   _emitGameObjectEvent(name, target, {...customEvent, phase: Some(Emit)}, state)

let getCustomEventUserData = (customEvent: customEvent) => customEvent.userData
