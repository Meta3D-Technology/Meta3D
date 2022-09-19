'use strict';

var BodyAPI$Meta3dEvent = require("../../../src/event_manager/api/BodyAPI.bs.js");
var CanvasAPI$Meta3dEvent = require("../../../src/event_manager/api/CanvasAPI.bs.js");
var BrowserAPI$Meta3dEvent = require("../../../src/event_manager/api/BrowserAPI.bs.js");
var InitEventAPI$Meta3dEvent = require("../../../src/event_manager/api/InitEventAPI.bs.js");
var ManageEventAPI$Meta3dEvent = require("../../../src/event_manager/api/ManageEventAPI.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var NameEventDoService$Meta3dEvent = require("../../../src/event_manager/service/event/NameEventDoService.bs.js");
var CreateEventManagerState$Meta3dEvent = require("../../../src/event_manager/data/CreateEventManagerState.bs.js");

function prepareState(param) {
  return ContainerManager$Meta3dEvent.setState(CreateEventManagerState$Meta3dEvent.create(undefined));
}

function getBrowserChromeType(param) {
  return /* Chrome */0;
}

function getBrowserFirefoxType(param) {
  return /* Firefox */1;
}

function getBrowserAndroidType(param) {
  return /* Android */2;
}

function getBrowserIOSType(param) {
  return /* IOS */3;
}

function getBrowserUnknownType(param) {
  return /* Unknown */4;
}

var onMouseEvent = ManageEventAPI$Meta3dEvent.onMouseEvent;

var onKeyboardEvent = ManageEventAPI$Meta3dEvent.onKeyboardEvent;

var onTouchEvent = ManageEventAPI$Meta3dEvent.onTouchEvent;

var offMouseEventByHandleFunc = ManageEventAPI$Meta3dEvent.offMouseEventByHandleFunc;

var offKeyboardEventByHandleFunc = ManageEventAPI$Meta3dEvent.offKeyboardEventByHandleFunc;

var offTouchEventByHandleFunc = ManageEventAPI$Meta3dEvent.offTouchEventByHandleFunc;

var onCustomGlobalEvent = ManageEventAPI$Meta3dEvent.onCustomGlobalEvent;

var offCustomGlobalEventByEventName = ManageEventAPI$Meta3dEvent.offCustomGlobalEventByEventName;

var offCustomGlobalEventByHandleFunc = ManageEventAPI$Meta3dEvent.offCustomGlobalEventByHandleFunc;

var stopPropagationCustomEvent = ManageEventAPI$Meta3dEvent.stopPropagationCustomEvent;

var triggerCustomGlobalEvent = ManageEventAPI$Meta3dEvent.triggerCustomGlobalEvent;

var createCustomEvent = ManageEventAPI$Meta3dEvent.createCustomEvent;

var getPointDownEventName = NameEventDoService$Meta3dEvent.getPointDownEventName;

var getPointUpEventName = NameEventDoService$Meta3dEvent.getPointUpEventName;

var getPointTapEventName = NameEventDoService$Meta3dEvent.getPointTapEventName;

var getPointMoveEventName = NameEventDoService$Meta3dEvent.getPointMoveEventName;

var getPointScaleEventName = NameEventDoService$Meta3dEvent.getPointScaleEventName;

var getPointDragStartEventName = NameEventDoService$Meta3dEvent.getPointDragStartEventName;

var getPointDragOverEventName = NameEventDoService$Meta3dEvent.getPointDragOverEventName;

var getPointDragDropEventName = NameEventDoService$Meta3dEvent.getPointDragDropEventName;

var initEvent = InitEventAPI$Meta3dEvent.initEvent;

var setCanvas = CanvasAPI$Meta3dEvent.setCanvas;

var getBody = BodyAPI$Meta3dEvent.getBodyExn;

var setBody = BodyAPI$Meta3dEvent.setBody;

var setBrowser = BrowserAPI$Meta3dEvent.setBrowser;

exports.prepareState = prepareState;
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
exports.getPointDownEventName = getPointDownEventName;
exports.getPointUpEventName = getPointUpEventName;
exports.getPointTapEventName = getPointTapEventName;
exports.getPointMoveEventName = getPointMoveEventName;
exports.getPointScaleEventName = getPointScaleEventName;
exports.getPointDragStartEventName = getPointDragStartEventName;
exports.getPointDragOverEventName = getPointDragOverEventName;
exports.getPointDragDropEventName = getPointDragDropEventName;
exports.initEvent = initEvent;
exports.setCanvas = setCanvas;
exports.getBody = getBody;
exports.setBody = setBody;
exports.setBrowser = setBrowser;
exports.getBrowserChromeType = getBrowserChromeType;
exports.getBrowserFirefoxType = getBrowserFirefoxType;
exports.getBrowserAndroidType = getBrowserAndroidType;
exports.getBrowserIOSType = getBrowserIOSType;
exports.getBrowserUnknownType = getBrowserUnknownType;
/* BodyAPI-Meta3dEvent Not a pure module */
