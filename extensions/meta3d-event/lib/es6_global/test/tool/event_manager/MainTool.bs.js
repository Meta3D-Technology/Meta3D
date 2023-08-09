

import * as BodyAPI$Meta3dEvent from "../api/BodyAPI.bs.js";
import * as CanvasAPI$Meta3dEvent from "../api/CanvasAPI.bs.js";
import * as BrowserAPI$Meta3dEvent from "../api/BrowserAPI.bs.js";
import * as InitEventAPI$Meta3dEvent from "../api/InitEventAPI.bs.js";
import * as ManageEventAPI$Meta3dEvent from "../api/ManageEventAPI.bs.js";
import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as EventExtensionTool$Meta3dEvent from "../api/EventExtensionTool.bs.js";
import * as NameEventDoService$Meta3dEvent from "../../../src/event_manager/service/event/NameEventDoService.bs.js";
import * as CreateEventManagerState$Meta3dEvent from "../../../src/event_manager/data/CreateEventManagerState.bs.js";

function prepareState(param) {
  ContainerManager$Meta3dEvent.setState(CreateEventManagerState$Meta3dEvent.create(undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
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

export {
  prepareState ,
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
  getPointDownEventName ,
  getPointUpEventName ,
  getPointTapEventName ,
  getPointMoveEventName ,
  getPointScaleEventName ,
  getPointDragStartEventName ,
  getPointDragOverEventName ,
  getPointDragDropEventName ,
  initEvent ,
  setCanvas ,
  getBody ,
  setBody ,
  setBrowser ,
  getBrowserChromeType ,
  getBrowserFirefoxType ,
  getBrowserAndroidType ,
  getBrowserIOSType ,
  getBrowserUnknownType ,
}
/* InitEventAPI-Meta3dEvent Not a pure module */
