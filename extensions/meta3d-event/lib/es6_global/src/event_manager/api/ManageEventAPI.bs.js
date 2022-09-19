

import * as Caml_option from "../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ContainerManager$Meta3dEvent from "../data/ContainerManager.bs.js";
import * as ManageEventDoService$Meta3dEvent from "../service/event/ManageEventDoService.bs.js";
import * as CreateCustomEventDoService$Meta3dEvent from "../service/event/event/CreateCustomEventDoService.bs.js";

function onMouseEvent(eventName, priority, handleFunc) {
  return ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onMouseEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(undefined), priority, undefined));
}

function onKeyboardEvent(eventName, priority, handleFunc) {
  return ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onKeyboardEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(undefined), priority, undefined));
}

function onTouchEvent(eventName, priority, handleFunc) {
  return ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onTouchEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(undefined), priority, undefined));
}

function offMouseEventByHandleFunc(eventName, handleFunc) {
  return ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offMouseEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(undefined)));
}

function offKeyboardEventByHandleFunc(eventName, handleFunc) {
  return ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offKeyboardEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(undefined)));
}

function offTouchEventByHandleFunc(eventName, handleFunc) {
  return ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offTouchEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(undefined)));
}

function onCustomGlobalEvent(eventName, priority, handleFunc) {
  return ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onCustomGlobalEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(undefined), priority, undefined));
}

function offCustomGlobalEventByEventName(eventName) {
  return ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offCustomGlobalEventByEventName(eventName, ContainerManager$Meta3dEvent.getState(undefined)));
}

function offCustomGlobalEventByHandleFunc(eventName, handleFunc) {
  return ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offCustomGlobalEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(undefined)));
}

function triggerCustomGlobalEvent(customEvent) {
  return ContainerManager$Meta3dEvent.setState(Tuple2$Meta3dCommonlib.getFirst(ManageEventDoService$Meta3dEvent.triggerCustomGlobalEvent(customEvent, ContainerManager$Meta3dEvent.getState(undefined))));
}

function createCustomEvent(eventName, userData) {
  return CreateCustomEventDoService$Meta3dEvent.create(eventName, (userData == null) ? undefined : Caml_option.some(userData));
}

var stopPropagationCustomEvent = ManageEventDoService$Meta3dEvent.stopPropagationCustomEvent;

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
  createCustomEvent ,
  
}
/* ContainerManager-Meta3dEvent Not a pure module */
