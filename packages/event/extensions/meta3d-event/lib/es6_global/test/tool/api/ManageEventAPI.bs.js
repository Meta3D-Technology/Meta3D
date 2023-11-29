

import * as Caml_option from "../../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as EventExtensionTool$Meta3dEvent from "./EventExtensionTool.bs.js";
import * as ManageEventDoService$Meta3dEvent from "../../../src/event_manager/service/event/ManageEventDoService.bs.js";
import * as CreateCustomEventDoService$Meta3dEvent from "../../../src/event_manager/service/event/event/CreateCustomEventDoService.bs.js";

function onMouseEvent(eventName, priority, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onMouseEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), priority, undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

function onKeyboardEvent(eventName, priority, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onKeyboardEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), priority, undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

function onTouchEvent(eventName, priority, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onTouchEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), priority, undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

function offMouseEventByHandleFunc(eventName, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offMouseEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined))), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

function offKeyboardEventByHandleFunc(eventName, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offKeyboardEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined))), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

function offTouchEventByHandleFunc(eventName, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offTouchEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined))), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

function onCustomGlobalEvent(eventName, priority, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onCustomGlobalEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), priority, undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

function triggerCustomGlobalEvent(customEvent) {
  ContainerManager$Meta3dEvent.setState(Tuple2$Meta3dCommonlib.getFirst(ManageEventDoService$Meta3dEvent.triggerCustomGlobalEvent(customEvent, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)))), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
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
  stopPropagationCustomEvent ,
  triggerCustomGlobalEvent ,
  createCustomEvent ,
}
/* No side effect */
