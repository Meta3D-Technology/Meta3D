

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as BodyDoService$Meta3dEvent from "./event_manager/service/dom/BodyDoService.bs.js";
import * as CanvasDoService$Meta3dEvent from "./event_manager/service/dom/CanvasDoService.bs.js";
import * as BrowserDoService$Meta3dEvent from "./event_manager/service/browser/BrowserDoService.bs.js";
import * as InitEventDoService$Meta3dEvent from "./event_manager/service/init_event/InitEventDoService.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";
import * as CreateEventManagerState$Meta3dEvent from "./event_manager/data/CreateEventManagerState.bs.js";

function registerEvent(state, eventContribute) {
  return {
          eventContributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.eventContributeMap, eventContribute.eventName, eventContribute),
          eventManagerState: state.eventManagerState
        };
}

function trigger(api, meta3dState, eventExtensionName, eventName, eventData) {
  var state = api.getExtensionState(meta3dState, eventExtensionName);
  var eventContribute = ImmutableHashMap$Meta3dCommonlib.getExn(state.eventContributeMap, eventName);
  return Curry._2(eventContribute.handler, meta3dState, eventData);
}

function initEvent(api, meta3dState, eventExtensionName) {
  var state = api.getExtensionState(meta3dState, eventExtensionName);
  var eventManagerState = InitEventDoService$Meta3dEvent.initEvent(state.eventManagerState);
  return api.setExtensionState(meta3dState, eventExtensionName, {
              eventContributeMap: state.eventContributeMap,
              eventManagerState: eventManagerState
            });
}

function _invokeEventManagerFuncWithOneArg(api, meta3dState, eventExtensionName, func, arg1) {
  var state = api.getExtensionState(meta3dState, eventExtensionName);
  var eventManagerState = Curry._2(func, state.eventManagerState, arg1);
  return api.setExtensionState(meta3dState, eventExtensionName, {
              eventContributeMap: state.eventContributeMap,
              eventManagerState: eventManagerState
            });
}

function setBrowser(api, meta3dState, eventExtensionName, browser) {
  return _invokeEventManagerFuncWithOneArg(api, meta3dState, eventExtensionName, BrowserDoService$Meta3dEvent.setBrowser, browser);
}

function setCanvas(api, meta3dState, eventExtensionName, canvas) {
  return _invokeEventManagerFuncWithOneArg(api, meta3dState, eventExtensionName, CanvasDoService$Meta3dEvent.setCanvas, canvas);
}

function setBody(api, meta3dState, eventExtensionName, body) {
  return _invokeEventManagerFuncWithOneArg(api, meta3dState, eventExtensionName, BodyDoService$Meta3dEvent.setBody, body);
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
          eventContributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          eventManagerState: CreateEventManagerState$Meta3dEvent.create(undefined)
        };
}

export {
  registerEvent ,
  trigger ,
  initEvent ,
  _invokeEventManagerFuncWithOneArg ,
  setBrowser ,
  setCanvas ,
  setBody ,
  getBrowserChromeType ,
  getBrowserFirefoxType ,
  getBrowserAndroidType ,
  getBrowserIOSType ,
  getBrowserUnknownType ,
  createExtensionState ,
  
}
/* InitEventDoService-Meta3dEvent Not a pure module */
