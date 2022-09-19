

import * as Curry from "../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as Caml_option from "../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as BodyTool$Meta3dEvent from "./BodyTool.bs.js";
import * as EventTool$Meta3dEvent from "./EventTool.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as BodyDoService$Meta3dEvent from "../../../src/event_manager/service/dom/BodyDoService.bs.js";
import * as CanvasDoService$Meta3dEvent from "../../../src/event_manager/service/dom/CanvasDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as BrowserDetectTool$Meta3dEvent from "./BrowserDetectTool.bs.js";
import * as InitEventDoService$Meta3dEvent from "../../../src/event_manager/service/init_event/InitEventDoService.bs.js";
import * as HandleMouseEventDoService$Meta3dEvent from "../../../src/event_manager/service/event/handle/HandleMouseEventDoService.bs.js";

function setLastXY(lastX, lastY) {
  return ContainerManager$Meta3dEvent.setState(HandleMouseEventDoService$Meta3dEvent.setLastXY(ContainerManager$Meta3dEvent.getState(undefined), lastX, lastY));
}

function getIsDrag(param) {
  return HandleMouseEventDoService$Meta3dEvent.getIsDrag(ContainerManager$Meta3dEvent.getState(undefined));
}

function setIsDrag(isDrag) {
  return ContainerManager$Meta3dEvent.setState(HandleMouseEventDoService$Meta3dEvent.setIsDrag(ContainerManager$Meta3dEvent.getState(undefined), isDrag));
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
  return InitEventDoService$Meta3dEvent.initEvent(Curry._1(setBrowserFunc, CanvasDoService$Meta3dEvent.setCanvas(BodyDoService$Meta3dEvent.setBody(state, BodyTool$Meta3dEvent.getBody(undefined)), canvasDom)));
}

function prepare(sandbox, offsetLeftOpt, offsetTopOpt, offsetParentOpt, setBrowserFuncOpt, param) {
  var offsetLeft = offsetLeftOpt !== undefined ? offsetLeftOpt : 1;
  var offsetTop = offsetTopOpt !== undefined ? offsetTopOpt : 2;
  var offsetParent = offsetParentOpt !== undefined ? Caml_option.valFromOption(offsetParentOpt) : undefined;
  var setBrowserFunc = setBrowserFuncOpt !== undefined ? setBrowserFuncOpt : BrowserDetectTool$Meta3dEvent.setChrome;
  return ContainerManager$Meta3dEvent.setState(prepareWithState(sandbox, ContainerManager$Meta3dEvent.getState(undefined), offsetLeft, offsetTop, Caml_option.some(offsetParent), setBrowserFunc, undefined));
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

export {
  setLastXY ,
  getIsDrag ,
  setIsDrag ,
  buildMouseEvent ,
  setPointerLocked ,
  setNotPointerLocked ,
  prepareWithState ,
  prepare ,
  prepareForPointerLock ,
  
}
/* Sinon Not a pure module */
