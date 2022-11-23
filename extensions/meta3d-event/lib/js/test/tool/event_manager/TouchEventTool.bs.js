'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var BodyTool$Meta3dEvent = require("./BodyTool.bs.js");
var EventTool$Meta3dEvent = require("./EventTool.bs.js");
var BodyDoService$Meta3dEvent = require("../../../src/event_manager/service/dom/BodyDoService.bs.js");
var CanvasDoService$Meta3dEvent = require("../../../src/event_manager/service/dom/CanvasDoService.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var BrowserDetectTool$Meta3dEvent = require("./BrowserDetectTool.bs.js");
var EventExtensionTool$Meta3dEvent = require("../api/EventExtensionTool.bs.js");
var InitEventDoService$Meta3dEvent = require("../../../src/event_manager/service/init_event/InitEventDoService.bs.js");
var HandleTouchEventDoService$Meta3dEvent = require("../../../src/event_manager/service/event/handle/HandleTouchEventDoService.bs.js");

function setLastXY(lastX, lastY) {
  return ContainerManager$Meta3dEvent.setState(HandleTouchEventDoService$Meta3dEvent.setLastXY(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), lastX, lastY), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function getIsDrag(param) {
  return HandleTouchEventDoService$Meta3dEvent.getIsDrag(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)));
}

function setIsDrag(isDrag) {
  return ContainerManager$Meta3dEvent.setState(HandleTouchEventDoService$Meta3dEvent.setIsDrag(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), isDrag), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function buildTouchData(pageXOpt, pageYOpt, param) {
  var pageX = pageXOpt !== undefined ? pageXOpt : 10;
  var pageY = pageYOpt !== undefined ? pageYOpt : 20;
  return {
          clientX: 0,
          clientY: 0,
          pageX: pageX,
          pageY: pageY,
          identifier: 0,
          screenX: 0,
          screenY: 0,
          radiusX: 0,
          radiusY: 0,
          rotationAngle: 0,
          force: 0
        };
}

function buildTouchEvent(touchesOpt, changedTouchesOpt, targetTouchesOpt, preventDefaultFuncOpt, stopPropagationFuncOpt, param) {
  var touches = touchesOpt !== undefined ? touchesOpt : [buildTouchData(undefined, undefined, undefined)];
  var changedTouches = changedTouchesOpt !== undefined ? changedTouchesOpt : [buildTouchData(undefined, undefined, undefined)];
  var targetTouches = targetTouchesOpt !== undefined ? targetTouchesOpt : [buildTouchData(undefined, undefined, undefined)];
  var preventDefaultFunc = preventDefaultFuncOpt !== undefined ? preventDefaultFuncOpt : (function (param) {
        
      });
  var stopPropagationFunc = stopPropagationFuncOpt !== undefined ? stopPropagationFuncOpt : (function (param) {
        
      });
  return {
          touches: touches,
          changedTouches: changedTouches,
          targetTouches: targetTouches,
          preventDefault: preventDefaultFunc,
          stopPropagation: stopPropagationFunc
        };
}

function prepareWithState(sandbox, state, offsetLeftOpt, offsetTopOpt, offsetParentOpt, setBrowserFuncOpt, param) {
  var offsetLeft = offsetLeftOpt !== undefined ? offsetLeftOpt : 1;
  var offsetTop = offsetTopOpt !== undefined ? offsetTopOpt : 2;
  var offsetParent = offsetParentOpt !== undefined ? Caml_option.valFromOption(offsetParentOpt) : undefined;
  var setBrowserFunc = setBrowserFuncOpt !== undefined ? setBrowserFuncOpt : BrowserDetectTool$Meta3dEvent.setAndroid;
  var canvasDom = EventTool$Meta3dEvent.buildFakeCanvas([
        offsetLeft,
        offsetTop,
        offsetParent
      ]);
  return InitEventDoService$Meta3dEvent.initEvent(Curry._1(setBrowserFunc, CanvasDoService$Meta3dEvent.setCanvas(BodyDoService$Meta3dEvent.setBody(state, BodyTool$Meta3dEvent.getBody(undefined)), canvasDom)), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function prepare(sandbox, offsetLeftOpt, offsetTopOpt, offsetParentOpt, setBrowserFuncOpt, param) {
  var offsetLeft = offsetLeftOpt !== undefined ? offsetLeftOpt : 1;
  var offsetTop = offsetTopOpt !== undefined ? offsetTopOpt : 2;
  var offsetParent = offsetParentOpt !== undefined ? Caml_option.valFromOption(offsetParentOpt) : undefined;
  var setBrowserFunc = setBrowserFuncOpt !== undefined ? setBrowserFuncOpt : BrowserDetectTool$Meta3dEvent.setAndroid;
  return ContainerManager$Meta3dEvent.setState(prepareWithState(sandbox, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), offsetLeft, offsetTop, Caml_option.some(offsetParent), setBrowserFunc, undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

exports.setLastXY = setLastXY;
exports.getIsDrag = getIsDrag;
exports.setIsDrag = setIsDrag;
exports.buildTouchData = buildTouchData;
exports.buildTouchEvent = buildTouchEvent;
exports.prepareWithState = prepareWithState;
exports.prepare = prepare;
/* InitEventDoService-Meta3dEvent Not a pure module */
