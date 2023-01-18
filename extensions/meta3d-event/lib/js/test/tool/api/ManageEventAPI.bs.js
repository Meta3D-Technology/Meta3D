'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var Tuple2$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/tuple/Tuple2.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var EventExtensionTool$Meta3dEvent = require("./EventExtensionTool.bs.js");
var ManageEventDoService$Meta3dEvent = require("../../../src/event_manager/service/event/ManageEventDoService.bs.js");
var CreateCustomEventDoService$Meta3dEvent = require("../../../src/event_manager/service/event/event/CreateCustomEventDoService.bs.js");

function onMouseEvent(eventName, priority, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onMouseEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), priority, undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function onKeyboardEvent(eventName, priority, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onKeyboardEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), priority, undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function onTouchEvent(eventName, priority, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onTouchEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), priority, undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function offMouseEventByHandleFunc(eventName, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offMouseEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined))), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function offKeyboardEventByHandleFunc(eventName, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offKeyboardEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined))), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function offTouchEventByHandleFunc(eventName, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offTouchEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined))), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function onCustomGlobalEvent(eventName, priority, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onCustomGlobalEvent(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), priority, undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function offCustomGlobalEventByEventName(eventName) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offCustomGlobalEventByEventName(eventName, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined))), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function offCustomGlobalEventByHandleFunc(eventName, handleFunc) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offCustomGlobalEventByHandleFunc(eventName, handleFunc, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined))), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function triggerCustomGlobalEvent(customEvent) {
  ContainerManager$Meta3dEvent.setState(Tuple2$Meta3dCommonlib.getFirst(ManageEventDoService$Meta3dEvent.triggerCustomGlobalEvent(customEvent, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)))), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function createCustomEvent(eventName, userData) {
  return CreateCustomEventDoService$Meta3dEvent.create(eventName, (userData == null) ? undefined : Caml_option.some(userData));
}

var stopPropagationCustomEvent = ManageEventDoService$Meta3dEvent.stopPropagationCustomEvent;

exports.onMouseEvent = onMouseEvent;
exports.onKeyboardEvent = onKeyboardEvent;
exports.onTouchEvent = onTouchEvent;
exports.offMouseEventByHandleFunc = offMouseEventByHandleFunc;
exports.offKeyboardEventByHandleFunc = offKeyboardEventByHandleFunc;
exports.offTouchEventByHandleFunc = offTouchEventByHandleFunc;
exports.onCustomGlobalEvent = onCustomGlobalEvent;
exports.offCustomGlobalEventByEventName = offCustomGlobalEventByEventName;
exports.offCustomGlobalEventByHandleFunc = offCustomGlobalEventByHandleFunc;
exports.stopPropagationCustomEvent = stopPropagationCustomEvent;
exports.triggerCustomGlobalEvent = triggerCustomGlobalEvent;
exports.createCustomEvent = createCustomEvent;
/* No side effect */
