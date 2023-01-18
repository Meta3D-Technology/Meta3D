

import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as BindCustomEventDoService$Meta3dEvent from "./bind/BindCustomEventDoService.bs.js";
import * as BindMouseDomEventDoService$Meta3dEvent from "./bind/BindMouseDomEventDoService.bs.js";
import * as BindTouchDomEventDoService$Meta3dEvent from "./bind/BindTouchDomEventDoService.bs.js";
import * as HandleCustomEventDoService$Meta3dEvent from "./handle/HandleCustomEventDoService.bs.js";
import * as BindKeyboardDomEventDoService$Meta3dEvent from "./bind/BindKeyboardDomEventDoService.bs.js";

function onMouseEvent(eventName, handleFunc, state, priorityOpt, param) {
  var priority = priorityOpt !== undefined ? priorityOpt : 0;
  return BindMouseDomEventDoService$Meta3dEvent.bind(eventName, priority, handleFunc, state);
}

function onKeyboardEvent(eventName, handleFunc, state, priorityOpt, param) {
  var priority = priorityOpt !== undefined ? priorityOpt : 0;
  return BindKeyboardDomEventDoService$Meta3dEvent.bind(eventName, priority, handleFunc, state);
}

function onTouchEvent(eventName, handleFunc, state, priorityOpt, param) {
  var priority = priorityOpt !== undefined ? priorityOpt : 0;
  return BindTouchDomEventDoService$Meta3dEvent.bind(eventName, priority, handleFunc, state);
}

var offMouseEventByHandleFunc = BindMouseDomEventDoService$Meta3dEvent.unbindByHandleFunc;

var offKeyboardEventByHandleFunc = BindKeyboardDomEventDoService$Meta3dEvent.unbindByHandleFunc;

var offTouchEventByHandleFunc = BindTouchDomEventDoService$Meta3dEvent.unbindByHandleFunc;

function onCustomGlobalEvent(eventName, handleFunc, state, priorityOpt, param) {
  var priority = priorityOpt !== undefined ? priorityOpt : 0;
  return BindCustomEventDoService$Meta3dEvent.bindGlobalEvent(eventName, priority, handleFunc, state);
}

var offCustomGlobalEventByEventName = BindCustomEventDoService$Meta3dEvent.unbindGlobalEventByEventName;

var offCustomGlobalEventByHandleFunc = BindCustomEventDoService$Meta3dEvent.unbindGlobalEventByHandleFunc;

var stopPropagationCustomEvent = HandleCustomEventDoService$Meta3dEvent.stopPropagation;

var triggerCustomGlobalEvent = HandleCustomEventDoService$Meta3dEvent.triggerGlobalEvent;

function setDomEventStreamSubscription(state, domEventStreamSubscription) {
  var eventData = state.eventData;
  return {
          eventData: {
            domEventStreamSubscription: Caml_option.some(domEventStreamSubscription),
            mouseDomEventDataArrMap: eventData.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventData.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventData.touchDomEventDataArrMap,
            customGlobalEventArrMap: eventData.customGlobalEventArrMap,
            mouseEventData: eventData.mouseEventData,
            keyboardEventData: eventData.keyboardEventData,
            touchEventData: eventData.touchEventData
          },
          canvas: state.canvas,
          body: state.body,
          browser: state.browser
        };
}

var _unsubscribeDomEventStream = (function(domEventStreamSubscription){
  domEventStreamSubscription.unsubscribe();
  });

function unsubscribeDomEventStream(state) {
  var domEventStreamSubscription = state.eventData.domEventStreamSubscription;
  if (domEventStreamSubscription !== undefined) {
    _unsubscribeDomEventStream(Caml_option.valFromOption(domEventStreamSubscription));
    return state;
  } else {
    return state;
  }
}

export {
  onMouseEvent ,
  onKeyboardEvent ,
  onTouchEvent ,
  offMouseEventByHandleFunc ,
  offKeyboardEventByHandleFunc ,
  offTouchEventByHandleFunc ,
  onCustomGlobalEvent ,
  offCustomGlobalEventByEventName ,
  offCustomGlobalEventByHandleFunc ,
  stopPropagationCustomEvent ,
  triggerCustomGlobalEvent ,
  setDomEventStreamSubscription ,
  _unsubscribeDomEventStream ,
  unsubscribeDomEventStream ,
  
}
/* No side effect */
