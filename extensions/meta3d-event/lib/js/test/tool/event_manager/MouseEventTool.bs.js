'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var BodyTool$Meta3dEvent = require("./BodyTool.bs.js");
var EventTool$Meta3dEvent = require("./EventTool.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var BodyDoService$Meta3dEvent = require("../../../src/event_manager/service/dom/BodyDoService.bs.js");
var CanvasDoService$Meta3dEvent = require("../../../src/event_manager/service/dom/CanvasDoService.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var BrowserDetectTool$Meta3dEvent = require("./BrowserDetectTool.bs.js");
var EventExtensionTool$Meta3dEvent = require("../api/EventExtensionTool.bs.js");
var InitEventDoService$Meta3dEvent = require("../../../src/event_manager/service/init_event/InitEventDoService.bs.js");
var HandleMouseEventDoService$Meta3dEvent = require("../../../src/event_manager/service/event/handle/HandleMouseEventDoService.bs.js");

function setLastXY(lastX, lastY) {
  ContainerManager$Meta3dEvent.setState(HandleMouseEventDoService$Meta3dEvent.setLastXY(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), lastX, lastY), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function getIsDrag(param) {
  return HandleMouseEventDoService$Meta3dEvent.getIsDrag(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)));
}

function setIsDrag(isDrag) {
  ContainerManager$Meta3dEvent.setState(HandleMouseEventDoService$Meta3dEvent.setIsDrag(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), isDrag), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function buildMouseEvent(pageXOpt, pageYOpt, whichOpt, movementXOpt, movementYOpt, detailOpt, wheelDeltaOpt, preventDefaultFuncOpt, stopPropagationFuncOpt, param) {
  var pageX = pageXOpt !== undefined ? pageXOpt : 10;
  var pageY = pageYOpt !== undefined ? pageYOpt : 20;
  var which = whichOpt !== undefined ? whichOpt : 0;
  var movementX = movementXOpt !== undefined ? movementXOpt : 1;
  var movementY = movementYOpt !== undefined ? movementYOpt : 2;
  var detail = detailOpt !== undefined ? Caml_option.valFromOption(detailOpt) : undefined;
  var wheelDelta = wheelDeltaOpt !== undefined ? Caml_option.valFromOption(wheelDeltaOpt) : undefined;
  var preventDefaultFunc = preventDefaultFuncOpt !== undefined ? preventDefaultFuncOpt : (function (param) {
        
      });
  var stopPropagationFunc = stopPropagationFuncOpt !== undefined ? stopPropagationFuncOpt : (function (param) {
        
      });
  return {
          pageX: pageX,
          pageY: pageY,
          which: which,
          movementX: movementX,
          movementY: movementY,
          detail: detail,
          wheelDelta: wheelDelta,
          preventDefault: preventDefaultFunc,
          stopPropagation: stopPropagationFunc
        };
}

var setPointerLocked = (function(){
 document.pointerLockElement = {};
 });

var setNotPointerLocked = (function(){
 document.pointerLockElement = undefined;
 });

function prepareWithState(sandbox, state, offsetLeftOpt, offsetTopOpt, offsetParentOpt, setBrowserFuncOpt, param) {
  var offsetLeft = offsetLeftOpt !== undefined ? offsetLeftOpt : 1;
  var offsetTop = offsetTopOpt !== undefined ? offsetTopOpt : 2;
  var offsetParent = offsetParentOpt !== undefined ? Caml_option.valFromOption(offsetParentOpt) : undefined;
  var setBrowserFunc = setBrowserFuncOpt !== undefined ? setBrowserFuncOpt : BrowserDetectTool$Meta3dEvent.setChrome;
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
  var setBrowserFunc = setBrowserFuncOpt !== undefined ? setBrowserFuncOpt : BrowserDetectTool$Meta3dEvent.setChrome;
  ContainerManager$Meta3dEvent.setState(prepareWithState(sandbox, ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), offsetLeft, offsetTop, Caml_option.some(offsetParent), setBrowserFunc, undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

function prepareForPointerLock(sandbox, state) {
  var canvas = OptionSt$Meta3dCommonlib.unsafeGet(CanvasDoService$Meta3dEvent.getCanvas(state));
  var requestPointerLockStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  canvas.requestPointerLock = requestPointerLockStub;
  return [
          state,
          requestPointerLockStub
        ];
}

exports.setLastXY = setLastXY;
exports.getIsDrag = getIsDrag;
exports.setIsDrag = setIsDrag;
exports.buildMouseEvent = buildMouseEvent;
exports.setPointerLocked = setPointerLocked;
exports.setNotPointerLocked = setNotPointerLocked;
exports.prepareWithState = prepareWithState;
exports.prepare = prepare;
exports.prepareForPointerLock = prepareForPointerLock;
/* Sinon Not a pure module */
