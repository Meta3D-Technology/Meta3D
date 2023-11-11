

import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as BodyTool$Meta3dEvent from "./BodyTool.bs.js";
import * as EventTool$Meta3dEvent from "./EventTool.bs.js";
import * as BodyDoService$Meta3dEvent from "../../../src/event_manager/service/dom/BodyDoService.bs.js";
import * as CanvasDoService$Meta3dEvent from "../../../src/event_manager/service/dom/CanvasDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as BrowserDetectTool$Meta3dEvent from "./BrowserDetectTool.bs.js";
import * as EventExtensionTool$Meta3dEvent from "../api/EventExtensionTool.bs.js";
import * as InitEventDoService$Meta3dEvent from "../../../src/event_manager/service/init_event/InitEventDoService.bs.js";

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
  ContainerManager$Meta3dEvent.setState(InitEventDoService$Meta3dEvent.initEvent(Curry._1(setBrowserFunc, CanvasDoService$Meta3dEvent.setCanvas(BodyDoService$Meta3dEvent.setBody(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), BodyTool$Meta3dEvent.getBody(undefined)), canvasDom)), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

export {
  buildKeyboardEvent ,
  prepare ,
}
/* InitEventDoService-Meta3dEvent Not a pure module */
