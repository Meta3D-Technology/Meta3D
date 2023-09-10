open EventManagerStateType

open Meta3dEventProtocol.EventType

let onMouseEvent = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindMouseDomEventDoService.bind(eventName, priority, handleFunc, state)

let onKeyboardEvent = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindKeyboardDomEventDoService.bind(eventName, priority, handleFunc, state)

let onTouchEvent = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindTouchDomEventDoService.bind(eventName, priority, handleFunc, state)

let offMouseEventByHandleFunc = (~eventName, ~handleFunc, ~state) =>
  BindMouseDomEventDoService.unbindByHandleFunc(eventName, handleFunc, state)

let offKeyboardEventByHandleFunc = (~eventName, ~handleFunc, ~state) =>
  BindKeyboardDomEventDoService.unbindByHandleFunc(eventName, handleFunc, state)

let offTouchEventByHandleFunc = (~eventName, ~handleFunc, ~state) =>
  BindTouchDomEventDoService.unbindByHandleFunc(eventName, handleFunc, state)

let onCustomGlobalEvent = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindCustomEventDoService.bindGlobalEvent(eventName, priority, handleFunc, state)

let onCustomGlobalEvent2 = (~eventName, ~handleFunc, ~state, ~priority=0, ()) =>
  BindCustomEventDoService.bindGlobalEvent2(eventName, priority, handleFunc, state)

// let offCustomGlobalEventByEventName = (~eventName, ~state) =>
//   BindCustomEventDoService.unbindGlobalEventByEventName(eventName, state)

let offCustomGlobalEventByHandleFunc = (~eventName, ~handleFunc, ~state) =>
  BindCustomEventDoService.unbindGlobalEventByHandleFunc(eventName, handleFunc, state)

// let onCustomGameObjectEvent = (~eventName, ~handleFunc, ~target, ~state, ~priority=0, ()) =>
//   BindCustomEventDoService.bindGameObjectEvent((eventName, priority, target), handleFunc, state)

// let offCustomGameObjectEventByTarget = (~eventName, ~target, ~state) =>
//   BindCustomEventDoService.unbindGameObjectEventByTarget((eventName, target), state)

// let offCustomGameObjectEventByHandleFunc = (~eventName, ~handleFunc, ~target, ~state) =>
//   BindCustomEventDoService.unbindGameObjectEventByHandleFunc((eventName, target), handleFunc, state)

/* let execDomEventHandle = (eventName, domEvent, state) =>
   switch (eventName) {
   | MouseDown
   | MouseUp =>
     HandleMouseEventDoService.execEventHandle(eventName, domEvent, state)
   }; */

let stopPropagationCustomEvent = customEvent =>
  HandleCustomEventDoService.stopPropagation(customEvent)

let triggerCustomGlobalEvent = (customEvent, state) =>
  HandleCustomEventDoService.triggerGlobalEvent(customEvent, state)

let triggerCustomGlobalEvent2 = (api, meta3dState, eventExtensionProtocolName, customEvent) =>
  HandleCustomEventDoService.triggerGlobalEvent2(
    api,
    meta3dState,
    eventExtensionProtocolName,
    customEvent,
  )

// let triggerCustomGameObjectEvent = (customEvent, target, state) =>
//   HandleCustomEventDoService.triggerGameObjectEvent(target, customEvent, state)

// let broadcastCustomGameObjectEvent = (customEvent, target, state) =>
//   HandleCustomEventDoService.broadcastGameObjectEvent(target, customEvent, state)

// let emitCustomGameObjectEvent = (customEvent, target, state) =>
//   HandleCustomEventDoService.emitGameObjectEvent(target, customEvent, state)

let setDomEventStreamSubscription = ({eventData} as state, domEventStreamSubscription) => {
  ...state,
  eventData: {
    ...eventData,
    domEventStreamSubscription: Some(domEventStreamSubscription),
  },
}

let _unsubscribeDomEventStream = %raw(`
  function(domEventStreamSubscription){
  domEventStreamSubscription.unsubscribe();
  }
  `)

let unsubscribeDomEventStream = ({eventData} as state) =>
  switch eventData.domEventStreamSubscription {
  | None => state
  | Some(domEventStreamSubscription) =>
    /* let unsubscribe = domEventStreamSubscription##unsubscribe;
     unsubscribe(); */
    _unsubscribeDomEventStream(domEventStreamSubscription)

    state
  }
