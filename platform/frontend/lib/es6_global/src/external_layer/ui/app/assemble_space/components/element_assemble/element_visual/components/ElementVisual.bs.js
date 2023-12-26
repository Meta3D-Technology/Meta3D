

import * as Most from "most";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as AppUtils$Frontend from "../../../utils/AppUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as MessageUtils$Frontend from "../../../../../utils/utils/MessageUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ElementVisualUtils$Frontend from "../../utils/ElementVisualUtils.bs.js";
import * as SpaceStateApService$Frontend from "../../../../../../../../application_layer/SpaceStateApService.bs.js";
import * as ElementContributeUtils$Frontend from "../../utils/ElementContributeUtils.bs.js";
import * as ElementContributeApService$Frontend from "../../../../../../../../application_layer/ElementContributeApService.bs.js";

import 'antd/dist/reset.css'
;

function _getInitData(service, isDebug) {
  return {
          target: "visual",
          isDebug: isDebug,
          canvas: OptionSt$Meta3dCommonlib.getExn(Curry._1(service.dom.querySelector, "#ui-visual-canvas"))
        };
}

function _getUpdateData(clearColor, skinName, time) {
  return {
          target: "visual",
          clearColor: clearColor,
          skinName: skinName,
          time: time
        };
}

function _updateElementContribute(meta3dState, service, elementContribute) {
  var editorWholePackageService = NullableSt$Meta3dCommonlib.getExn(service.meta3d.getPackageService(meta3dState, ElementVisualUtils$Frontend.getEditorWholePackageProtocolName(undefined)));
  return Curry._2(Curry._1(editorWholePackageService.ui, meta3dState).registerElement, meta3dState, elementContribute);
}

function _loop(service, loopFrameID, apInspectorData, time, meta3dState) {
  var elementContribute = ElementContributeApService$Frontend.getElementContribute(SpaceStateApService$Frontend.getState(undefined));
  var meta3dState$1 = elementContribute !== undefined ? _updateElementContribute(meta3dState, service, service.meta3d.execGetContributeFunc(elementContribute.data.contributeFuncData)) : meta3dState;
  var __x = service.meta3d.updateExtension(meta3dState$1, ElementVisualUtils$Frontend.getEditorWholePackageProtocolName(undefined), _getUpdateData(apInspectorData.clearColor, apInspectorData.skinName, time));
  Js_promise.then_((function (meta3dState) {
          loopFrameID.current = Curry._1(service.other.requestAnimationOtherFrame, (function (time) {
                  _loop(service, loopFrameID, apInspectorData, time, meta3dState);
                }));
          return Promise.resolve(undefined);
        }), __x);
}

function _generateApp(service, param) {
  var match = param[0];
  return AppUtils$Frontend.generateApp(service, [
              match[0],
              match[1]
            ], ListSt$Meta3dCommonlib.toArray(param[1]), /* [] */0, null);
}

function startApp(service, loopFrameID, param, apInspectorData) {
  var match = service.meta3d.loadApp((function (param, param$1) {
          return ElementVisualUtils$Frontend.buildEmptyAddGeneratedContributeFunc(undefined, param, param$1);
        }), _generateApp(service, [
            AppUtils$Frontend.splitPackages(param[0], param[2]),
            param[1]
          ]));
  var __x = service.meta3d.initExtension(match[0], ElementVisualUtils$Frontend.getEditorWholePackageProtocolName(undefined), _getInitData(service, apInspectorData.isDebug));
  var __x$1 = Most.drain(Most.fromPromise(Js_promise.then_((function (meta3dState) {
                  loopFrameID.current = Curry._1(service.other.requestAnimationFirstFrame, (function (time) {
                          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                                  _loop(service, loopFrameID, apInspectorData, time, meta3dState);
                                }), 5);
                        }));
                  return Promise.resolve(undefined);
                }), __x)));
  return Js_promise.$$catch((function (e) {
                return service.console.errorWithExn(e, undefined);
              }), __x$1);
}

function updateElementContribute(dispatch, elementContribute) {
  return Curry._1(dispatch, {
              TAG: /* SetElementContribute */8,
              _0: elementContribute
            });
}

function setElementContributeToSpaceState(elementContribute) {
  SpaceStateApService$Frontend.setState(ElementContributeApService$Frontend.setElementContribute(SpaceStateApService$Frontend.getState(undefined), elementContribute));
}

function useSelector(param) {
  var elementAssembleState = param.elementAssembleState;
  var apAssembleState = param.apAssembleState;
  return [
          [
            apAssembleState.selectedPackages,
            apAssembleState.apInspectorData,
            apAssembleState.isPassDependencyGraphCheck,
            apAssembleState.storedPackageIdsInApp
          ],
          [
            elementAssembleState.canvasData,
            elementAssembleState.selectedUIControls,
            elementAssembleState.selectedUIControlInspectorData,
            elementAssembleState.elementContribute,
            elementAssembleState.customInputs,
            elementAssembleState.customActions
          ]
        ];
}

var Method = {
  _getInitData: _getInitData,
  _getUpdateData: _getUpdateData,
  _updateElementContribute: _updateElementContribute,
  _loop: _loop,
  _generateApp: _generateApp,
  startApp: startApp,
  buildElementContributeFileStr: ElementContributeUtils$Frontend.buildElementContributeFileStr,
  generateElementContribute: ElementVisualUtils$Frontend.generateElementContribute,
  updateElementContribute: updateElementContribute,
  setElementContributeToSpaceState: setElementContributeToSpaceState,
  useSelector: useSelector
};

function ElementVisual(Props) {
  var service = Props.service;
  var account = Props.account;
  var selectedContributes = Props.selectedContributes;
  var dispatch = ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var match = service.react.useSelector(useSelector);
  var match$1 = match[1];
  var customActions = match$1[5];
  var customInputs = match$1[4];
  var elementContribute = match$1[3];
  var selectedUIControlInspectorData = match$1[2];
  var selectedUIControls = match$1[1];
  var canvasData = match$1[0];
  var match$2 = match[0];
  var storedPackageIdsInApp = match$2[3];
  var isPassDependencyGraphCheck = match$2[2];
  var apInspectorData = match$2[1];
  var selectedPackages = match$2[0];
  var loopFrameID = Curry._1(service.react.useRef, undefined);
  service.react.useEffect1((function (param) {
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  var __x = ElementVisualUtils$Frontend.generateElementContribute(service, OptionSt$Meta3dCommonlib.getExn(account), ElementContributeUtils$Frontend.buildElementContributeFileStr(service, selectedUIControls, selectedUIControlInspectorData));
                  Curry._1(dispatch, {
                        TAG: /* SetElementContribute */8,
                        _0: __x
                      });
                }), 5);
        }), [
        selectedUIControls,
        selectedUIControlInspectorData
      ]);
  service.react.useEffect1((function (param) {
          setElementContributeToSpaceState(elementContribute);
        }), [elementContribute]);
  service.react.useEffect1((function (param) {
          if (isPassDependencyGraphCheck) {
            MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                    startApp(service, loopFrameID, [
                          selectedPackages,
                          ElementVisualUtils$Frontend.addGeneratedCustoms(service, selectedContributes, OptionSt$Meta3dCommonlib.getExn(account), customInputs, customActions),
                          storedPackageIdsInApp
                        ], apInspectorData);
                  }), 5);
            return (function (param) {
                      ElementVisualUtils$Frontend.cancelAppLoop(service, loopFrameID);
                    });
          } else {
            MessageUtils$Frontend.error("请通过DependencyGraph检查", undefined);
            return ;
          }
        }), [
        selectedContributes,
        customInputs,
        customActions
      ]);
  return React.createElement(React.Fragment, undefined, React.createElement("canvas", {
                  id: "ui-visual-canvas",
                  style: {
                    borderColor: "red",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    height: "" + canvasData.height.toString() + "px",
                    width: "" + canvasData.width.toString() + "px"
                  },
                  height: "" + canvasData.height.toString() + "px",
                  width: "" + canvasData.width.toString() + "px"
                }));
}

var make = ElementVisual;

export {
  Method ,
  make ,
}
/*  Not a pure module */
