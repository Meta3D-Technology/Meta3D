'use strict';

var Curry = require("rescript/lib/js/curry.js");
var BodyTool$Meta3dEvent = require("./BodyTool.bs.js");
var EventTool$Meta3dEvent = require("./EventTool.bs.js");
var BodyDoService$Meta3dEvent = require("../../../src/event_manager/service/dom/BodyDoService.bs.js");
var CanvasDoService$Meta3dEvent = require("../../../src/event_manager/service/dom/CanvasDoService.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var BrowserDetectTool$Meta3dEvent = require("./BrowserDetectTool.bs.js");
var EventExtensionTool$Meta3dEvent = require("../api/EventExtensionTool.bs.js");
var InitEventDoService$Meta3dEvent = require("../../../src/event_manager/service/init_event/InitEventDoService.bs.js");

function buildKeyboardEvent(ctrlKeyOpt, altKeyOpt, shiftKeyOpt, metaKeyOpt, keyCodeOpt, param) {
  var ctrlKey = ctrlKeyOpt !== undefined ? ctrlKeyOpt : false;
  var altKey = altKeyOpt !== undefined ? altKeyOpt : false;
  var shiftKey = shiftKeyOpt !== undefined ? shiftKeyOpt : false;
  var metaKey = metaKeyOpt !== undefined ? metaKeyOpt : false;
  var keyCode = keyCodeOpt !== undefined ? keyCodeOpt : 8;
  return {
          ctrlKey: ctrlKey,
          altKey: altKey,
          shiftKey: shiftKey,
          metaKey: metaKey,
          keyCode: keyCode
        };
}

function prepare(sandbox, setBrowserFuncOpt, param) {
  var setBrowserFunc = setBrowserFuncOpt !== undefined ? setBrowserFuncOpt : BrowserDetectTool$Meta3dEvent.setChrome;
  var canvasDom = EventTool$Meta3dEvent.buildFakeCanvas([
        0,
        0,
        null
      ]);
  ContainerManager$Meta3dEvent.setState(InitEventDoService$Meta3dEvent.initEvent(Curry._1(setBrowserFunc, CanvasDoService$Meta3dEvent.setCanvas(BodyDoService$Meta3dEvent.setBody(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), BodyTool$Meta3dEvent.getBody(undefined)), canvasDom)), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

exports.buildKeyboardEvent = buildKeyboardEvent;
exports.prepare = prepare;
/* InitEventDoService-Meta3dEvent Not a pure module */
