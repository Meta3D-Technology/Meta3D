'use strict';

var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Main$Meta3dUi = require("../../src/Main.bs.js");
var UIManager$Meta3dUi = require("../../src/UIManager.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");
var ImguiRendererServiceTool$Meta3dUi = require("./ImguiRendererServiceTool.bs.js");

function createState(param) {
  return Main$Meta3dUi.createExtensionState(undefined);
}

function init(sandbox, getExtensionService, getExtensionStateOpt, setExtensionStateOpt, imguiRendererExtensionNameOpt, isDebugOpt, meta3dStateOpt, canvasOpt, param) {
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
                getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
              },
              imguiRendererExtensionName
            ], isDebug, canvas);
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

function render(sandbox, getExtensionServiceOpt, getExtensionStateOpt, setExtensionStateOpt, uiExtensionNameOpt, imguiRendererExtensionNameOpt, meta3dStateOpt, ioDataOpt, param) {
  var getExtensionService;
  if (getExtensionServiceOpt !== undefined) {
    getExtensionService = Caml_option.valFromOption(getExtensionServiceOpt);
  } else {
    var __x = Sinon.createEmptyStub(sandbox.contents);
    getExtensionService = Sinon.returns(ImguiRendererServiceTool$Meta3dUi.buildService(sandbox, undefined, undefined, undefined, undefined), __x);
  }
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
              getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
            }, meta3dState, [
              uiExtensionName,
              imguiRendererExtensionName
            ], ioData);
}

function registerElement(sandbox, state, elementFunc, elementNameOpt, execOrderOpt, elementStateOpt, param) {
  var elementName = elementNameOpt !== undefined ? elementNameOpt : "e1";
  var execOrder = execOrderOpt !== undefined ? execOrderOpt : 0;
  var elementState = elementStateOpt !== undefined ? Caml_option.valFromOption(elementStateOpt) : 1;
  return UIManager$Meta3dUi.registerElement(state, {
              elementName: elementName,
              execOrder: execOrder,
              elementFunc: elementFunc,
              elementState: elementState
            });
}

var markStateChange = UIManager$Meta3dUi._markStateChange;

function isStateChange(state, elementName) {
  return ImmutableHashMap$Meta3dCommonlib.getExn(state.isStateChangeMap, elementName) === true;
}

var show = UIManager$Meta3dUi.show;

var hide = UIManager$Meta3dUi.hide;

function drawBox(sandbox, rect, backgroundColor, getExtensionService, getExtensionStateOpt, setExtensionStateOpt, imguiRendererExtensionNameOpt, meta3dStateOpt, param) {
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
                getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
              },
              imguiRendererExtensionName
            ], rect, backgroundColor);
}

function registerCustomControl(customControlName, func, stateOpt, param) {
  var state = stateOpt !== undefined ? stateOpt : Main$Meta3dUi.createExtensionState(undefined);
  return UIManager$Meta3dUi.registerCustomControl(state, {
              customControlName: customControlName,
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

var getCustomControlExn = UIManager$Meta3dUi.getCustomControlExn;

var getSkinExn = UIManager$Meta3dUi.getSkinExn;

var combineReducer = UIManager$Meta3dUi.combineReducers;

var dispatch = UIManager$Meta3dUi.dispatch;

var getElementState = UIManager$Meta3dUi.getElementState;

exports.createState = createState;
exports.init = init;
exports.buildIOData = buildIOData;
exports.render = render;
exports.registerElement = registerElement;
exports.markStateChange = markStateChange;
exports.isStateChange = isStateChange;
exports.show = show;
exports.hide = hide;
exports.drawBox = drawBox;
exports.registerCustomControl = registerCustomControl;
exports.getCustomControlExn = getCustomControlExn;
exports.buildSkinContribute = buildSkinContribute;
exports.registerSkin = registerSkin;
exports.getSkinExn = getSkinExn;
exports.combineReducer = combineReducer;
exports.dispatch = dispatch;
exports.getElementState = getElementState;
/* Sinon Not a pure module */
