

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as BodyDoService$Meta3dEvent from "./event_manager/service/dom/BodyDoService.bs.js";
import * as CanvasDoService$Meta3dEvent from "./event_manager/service/dom/CanvasDoService.bs.js";
import * as BrowserDoService$Meta3dEvent from "./event_manager/service/browser/BrowserDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "./event_manager/data/ContainerManager.bs.js";
import * as InitEventDoService$Meta3dEvent from "./event_manager/service/init_event/InitEventDoService.bs.js";
import * as NameEventDoService$Meta3dEvent from "./event_manager/service/event/NameEventDoService.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";
import * as ManageEventDoService$Meta3dEvent from "./event_manager/service/event/ManageEventDoService.bs.js";
import * as CreateEventManagerState$Meta3dEvent from "./event_manager/data/CreateEventManagerState.bs.js";

function registerAction(state, actionContribute) {
  return {
          actionContributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.actionContributeMap, actionContribute.actionName, actionContribute),
          eventManagerState: state.eventManagerState
        };
}

function trigger(api, meta3dState, eventExtensionName, actionName, actionData) {
  var state = api.getExtensionState(meta3dState, eventExtensionName);
  var actionContribute = ImmutableHashMap$Meta3dCommonlib.getExn(state.actionContributeMap, actionName);
  return Curry._2(actionContribute.handler, meta3dState, actionData);
}

function onPointEvent(api, eventExtensionName, param) {
  var handleFunc = param[2];
  var eventManagerState = ContainerManager$Meta3dEvent.getState(eventExtensionName);
  var eventManagerState$1 = ManageEventDoService$Meta3dEvent.onCustomGlobalEvent(param[0], (function (customEvent, state) {
          handleFunc(customEvent);
          return [
                  state,
                  customEvent
                ];
        }), eventManagerState, param[1], undefined);
  return ContainerManager$Meta3dEvent.setState(eventManagerState$1, eventExtensionName);
}

function _setDomToStateForEventHandler(eventManagerState, eventExtensionName) {
  var browser = BrowserDoService$Meta3dEvent.getBrowser(eventManagerState);
  var canvas = OptionSt$Meta3dCommonlib.getExn(CanvasDoService$Meta3dEvent.getCanvas(eventManagerState));
  var body = BodyDoService$Meta3dEvent.getBodyExn(eventManagerState);
  return ContainerManager$Meta3dEvent.setState(BodyDoService$Meta3dEvent.setBody(CanvasDoService$Meta3dEvent.setCanvas(BrowserDoService$Meta3dEvent.setBrowser(ContainerManager$Meta3dEvent.getState(eventExtensionName), browser), canvas), body), eventExtensionName);
}

function initEvent(api, meta3dState, eventExtensionName) {
  var state = api.getExtensionState(meta3dState, eventExtensionName);
  ContainerManager$Meta3dEvent.createState(CreateEventManagerState$Meta3dEvent.create, eventExtensionName);
  var eventManagerState = InitEventDoService$Meta3dEvent.initEvent(state.eventManagerState, eventExtensionName);
  _setDomToStateForEventHandler(eventManagerState, eventExtensionName);
  return api.setExtensionState(meta3dState, eventExtensionName, {
              actionContributeMap: state.actionContributeMap,
              eventManagerState: eventManagerState
            });
}

function _invokeEventManagerSetDomDataFuncWithOneArg(api, meta3dState, eventExtensionName, setDomDataFunc, domData) {
  var state = api.getExtensionState(meta3dState, eventExtensionName);
  var eventManagerState = Curry._2(setDomDataFunc, state.eventManagerState, domData);
  return api.setExtensionState(meta3dState, eventExtensionName, {
              actionContributeMap: state.actionContributeMap,
              eventManagerState: eventManagerState
            });
}

function setBrowser(api, meta3dState, eventExtensionName, browser) {
  return _invokeEventManagerSetDomDataFuncWithOneArg(api, meta3dState, eventExtensionName, BrowserDoService$Meta3dEvent.setBrowser, browser);
}

function setCanvas(api, meta3dState, eventExtensionName, canvas) {
  return _invokeEventManagerSetDomDataFuncWithOneArg(api, meta3dState, eventExtensionName, CanvasDoService$Meta3dEvent.setCanvas, canvas);
}

function setBody(api, meta3dState, eventExtensionName, body) {
  return _invokeEventManagerSetDomDataFuncWithOneArg(api, meta3dState, eventExtensionName, BodyDoService$Meta3dEvent.setBody, body);
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

function createExtensionState(param) {
  return {
          actionContributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          eventManagerState: CreateEventManagerState$Meta3dEvent.create(undefined)
        };
}

var getPointDownEventName = NameEventDoService$Meta3dEvent.getPointDownEventName;

var getPointUpEventName = NameEventDoService$Meta3dEvent.getPointUpEventName;

var getPointTapEventName = NameEventDoService$Meta3dEvent.getPointTapEventName;

var getPointMoveEventName = NameEventDoService$Meta3dEvent.getPointMoveEventName;

var getPointScaleEventName = NameEventDoService$Meta3dEvent.getPointScaleEventName;

var getPointDragStartEventName = NameEventDoService$Meta3dEvent.getPointDragStartEventName;

var getPointDragOverEventName = NameEventDoService$Meta3dEvent.getPointDragOverEventName;

var getPointDragDropEventName = NameEventDoService$Meta3dEvent.getPointDragDropEventName;

export {
  registerAction ,
  trigger ,
  onPointEvent ,
  _setDomToStateForEventHandler ,
  initEvent ,
  _invokeEventManagerSetDomDataFuncWithOneArg ,
  setBrowser ,
  setCanvas ,
  setBody ,
  getBrowserChromeType ,
  getBrowserFirefoxType ,
  getBrowserAndroidType ,
  getBrowserIOSType ,
  getBrowserUnknownType ,
  getPointDownEventName ,
  getPointUpEventName ,
  getPointTapEventName ,
  getPointMoveEventName ,
  getPointScaleEventName ,
  getPointDragStartEventName ,
  getPointDragOverEventName ,
  getPointDragDropEventName ,
  createExtensionState ,
  
}
/* InitEventDoService-Meta3dEvent Not a pure module */
