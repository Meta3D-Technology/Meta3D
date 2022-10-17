

import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Main$Meta3dUi from "../../src/Main.bs.js";
import * as UIManager$Meta3dUi from "../../src/UIManager.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";
import * as ImguiRendererServiceTool$Meta3dUi from "./ImguiRendererServiceTool.bs.js";

function createState(param) {
  return Main$Meta3dUi.createExtensionState(undefined);
}

function init(sandbox, getExtensionService, getAllContributesByTypeOpt, getExtensionStateOpt, setExtensionStateOpt, imguiRendererExtensionNameOpt, isDebugOpt, meta3dStateOpt, canvasOpt, param) {
  var getAllContributesByType = getAllContributesByTypeOpt !== undefined ? Caml_option.valFromOption(getAllContributesByTypeOpt) : Sinon.createEmptyStub(sandbox.contents);
  var getExtensionState = getExtensionStateOpt !== undefined ? Caml_option.valFromOption(getExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var setExtensionState = setExtensionStateOpt !== undefined ? Caml_option.valFromOption(setExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var imguiRendererExtensionName = imguiRendererExtensionNameOpt !== undefined ? imguiRendererExtensionNameOpt : "imguiRendererExtensionName";
  var isDebug = isDebugOpt !== undefined ? isDebugOpt : false;
  var meta3dState = meta3dStateOpt !== undefined ? meta3dStateOpt : 1;
  var canvas = canvasOpt !== undefined ? Caml_option.valFromOption(canvasOpt) : 10;
  return UIManager$Meta3dUi.init(meta3dState, [
              {
                registerExtension: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getExtensionService: getExtensionService,
                getExtensionState: getExtensionState,
                setExtensionState: setExtensionState,
                registerContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getAllContributesByType: getAllContributesByType
              },
              imguiRendererExtensionName
            ], isDebug, canvas);
}

function clear(sandbox, clearColor, getExtensionService, getAllContributesByTypeOpt, getExtensionStateOpt, setExtensionStateOpt, imguiRendererExtensionNameOpt, meta3dStateOpt, param) {
  var getAllContributesByType = getAllContributesByTypeOpt !== undefined ? Caml_option.valFromOption(getAllContributesByTypeOpt) : Sinon.createEmptyStub(sandbox.contents);
  var getExtensionState = getExtensionStateOpt !== undefined ? Caml_option.valFromOption(getExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var setExtensionState = setExtensionStateOpt !== undefined ? Caml_option.valFromOption(setExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var imguiRendererExtensionName = imguiRendererExtensionNameOpt !== undefined ? imguiRendererExtensionNameOpt : "imguiRendererExtensionName";
  var meta3dState = meta3dStateOpt !== undefined ? meta3dStateOpt : 1;
  return UIManager$Meta3dUi.clear(meta3dState, [
              {
                registerExtension: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getExtensionService: getExtensionService,
                getExtensionState: getExtensionState,
                setExtensionState: setExtensionState,
                registerContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getAllContributesByType: getAllContributesByType
              },
              imguiRendererExtensionName
            ], clearColor);
}

function buildIOData(pointUpOpt, pointDownOpt, pointTapOpt, pointPositionOpt, pointMovementDeltaOpt, param) {
  var pointUp = pointUpOpt !== undefined ? pointUpOpt : false;
  var pointDown = pointDownOpt !== undefined ? pointDownOpt : false;
  var pointTap = pointTapOpt !== undefined ? pointTapOpt : false;
  var pointPosition = pointPositionOpt !== undefined ? pointPositionOpt : [
      0,
      0
    ];
  var pointMovementDelta = pointMovementDeltaOpt !== undefined ? pointMovementDeltaOpt : [
      0,
      0
    ];
  return {
          pointUp: pointUp,
          pointDown: pointDown,
          pointTap: pointTap,
          pointPosition: pointPosition,
          pointMovementDelta: pointMovementDelta
        };
}

function render(sandbox, getExtensionServiceOpt, getAllContributesByTypeOpt, getExtensionStateOpt, setExtensionStateOpt, uiExtensionNameOpt, imguiRendererExtensionNameOpt, meta3dStateOpt, ioDataOpt, param) {
  var getExtensionService;
  if (getExtensionServiceOpt !== undefined) {
    getExtensionService = Caml_option.valFromOption(getExtensionServiceOpt);
  } else {
    var __x = Sinon.createEmptyStub(sandbox.contents);
    getExtensionService = Sinon.returns(ImguiRendererServiceTool$Meta3dUi.buildService(sandbox, undefined, undefined, undefined, undefined, undefined), __x);
  }
  var getAllContributesByType = getAllContributesByTypeOpt !== undefined ? Caml_option.valFromOption(getAllContributesByTypeOpt) : Sinon.createEmptyStub(sandbox.contents);
  var getExtensionState = getExtensionStateOpt !== undefined ? Caml_option.valFromOption(getExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var setExtensionState = setExtensionStateOpt !== undefined ? Caml_option.valFromOption(setExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var uiExtensionName = uiExtensionNameOpt !== undefined ? uiExtensionNameOpt : "uiExtensionName";
  var imguiRendererExtensionName = imguiRendererExtensionNameOpt !== undefined ? imguiRendererExtensionNameOpt : "imguiRendererExtensionName";
  var meta3dState = meta3dStateOpt !== undefined ? meta3dStateOpt : 1;
  var ioData = ioDataOpt !== undefined ? ioDataOpt : buildIOData(undefined, undefined, undefined, undefined, undefined, undefined);
  return UIManager$Meta3dUi.render({
              registerExtension: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
              getExtensionService: getExtensionService,
              getExtensionState: getExtensionState,
              setExtensionState: setExtensionState,
              registerContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
              getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
              getAllContributesByType: getAllContributesByType
            }, meta3dState, [
              uiExtensionName,
              imguiRendererExtensionName
            ], ioData);
}

function registerElement(sandbox, state, elementFunc, elementNameOpt, execOrderOpt, elementStateOpt, reducersOpt, param) {
  var elementName = elementNameOpt !== undefined ? elementNameOpt : "e1";
  var execOrder = execOrderOpt !== undefined ? execOrderOpt : 0;
  var elementState = elementStateOpt !== undefined ? Caml_option.valFromOption(elementStateOpt) : 1;
  var reducers = reducersOpt !== undefined ? Caml_option.valFromOption(reducersOpt) : null;
  return UIManager$Meta3dUi.registerElement(state, {
              elementName: elementName,
              execOrder: execOrder,
              elementFunc: elementFunc,
              elementState: elementState,
              reducers: reducers
            });
}

var markStateChange = UIManager$Meta3dUi._markStateChange;

function isStateChange(state, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.isStateChangeMap, elementName) === true;
}

var show = UIManager$Meta3dUi.show;

var hide = UIManager$Meta3dUi.hide;

function drawBox(sandbox, rect, backgroundColor, getExtensionService, getAllContributesByTypeOpt, getExtensionStateOpt, setExtensionStateOpt, imguiRendererExtensionNameOpt, meta3dStateOpt, param) {
  var getAllContributesByType = getAllContributesByTypeOpt !== undefined ? Caml_option.valFromOption(getAllContributesByTypeOpt) : Sinon.createEmptyStub(sandbox.contents);
  var getExtensionState = getExtensionStateOpt !== undefined ? Caml_option.valFromOption(getExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var setExtensionState = setExtensionStateOpt !== undefined ? Caml_option.valFromOption(setExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var imguiRendererExtensionName = imguiRendererExtensionNameOpt !== undefined ? imguiRendererExtensionNameOpt : "imguiRendererExtensionName";
  var meta3dState = meta3dStateOpt !== undefined ? meta3dStateOpt : 1;
  return UIManager$Meta3dUi.drawBox(meta3dState, [
              {
                registerExtension: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getExtensionService: getExtensionService,
                getExtensionState: getExtensionState,
                setExtensionState: setExtensionState,
                registerContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getAllContributesByType: getAllContributesByType
              },
              imguiRendererExtensionName
            ], rect, backgroundColor);
}

function registerUIControl(uiControlName, func, stateOpt, param) {
  var state = stateOpt !== undefined ? stateOpt : Main$Meta3dUi.createExtensionState(undefined);
  return UIManager$Meta3dUi.registerUIControl(state, {
              uiControlName: uiControlName,
              func: func
            });
}

function buildSkinContribute(skinName, skin) {
  return {
          skinName: skinName,
          skin: skin
        };
}

function registerSkin(skinName, skin, stateOpt, param) {
  var state = stateOpt !== undefined ? stateOpt : Main$Meta3dUi.createExtensionState(undefined);
  return UIManager$Meta3dUi.registerSkin(state, {
              skinName: skinName,
              skin: skin
            });
}

var getUIControlExn = UIManager$Meta3dUi.getUIControlExn;

var getSkinExn = UIManager$Meta3dUi.getSkinExn;

var dispatch = UIManager$Meta3dUi.dispatch;

var getElementState = UIManager$Meta3dUi.getElementState;

export {
  createState ,
  init ,
  clear ,
  buildIOData ,
  render ,
  registerElement ,
  markStateChange ,
  isStateChange ,
  show ,
  hide ,
  drawBox ,
  registerUIControl ,
  getUIControlExn ,
  buildSkinContribute ,
  registerSkin ,
  getSkinExn ,
  dispatch ,
  getElementState ,
  
}
/* Sinon Not a pure module */