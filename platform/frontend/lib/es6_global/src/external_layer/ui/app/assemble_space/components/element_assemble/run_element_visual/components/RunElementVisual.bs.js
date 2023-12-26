

import * as Most from "most";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as MessageUtils$Frontend from "../../../../../utils/utils/MessageUtils.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ElementVisualUtils$Frontend from "../../utils/ElementVisualUtils.bs.js";

import 'antd/dist/reset.css'
;

function _getInitData(service, isDebug) {
  return {
          target: "visualRun",
          isDebug: isDebug,
          canvas: OptionSt$Meta3dCommonlib.getExn(Curry._1(service.dom.querySelector, "#ui-visual-run-canvas"))
        };
}

function _getUpdateData(clearColor, skinName, time) {
  return {
          target: "visualRun",
          clearColor: clearColor,
          skinName: skinName,
          time: time
        };
}

function _loop(service, loopFrameID, apInspectorData, time, meta3dState) {
  var __x = service.meta3d.updateExtension(meta3dState, ElementVisualUtils$Frontend.getEditorWholePackageProtocolName(undefined), _getUpdateData(apInspectorData.clearColor, apInspectorData.skinName, time));
  var __x$1 = Js_promise.then_((function (meta3dState) {
          loopFrameID.current = Curry._1(service.other.requestAnimationOtherFrame, (function (time) {
                  _loop(service, loopFrameID, apInspectorData, time, meta3dState);
                }));
          return Promise.resolve(undefined);
        }), __x);
  Js_promise.$$catch((function (e) {
          return service.console.errorWithExn(e, undefined);
        }), __x$1);
}

function startApp(service, loopFrameID, apInspectorData) {
  var isDebug = apInspectorData.isDebug;
  var __x = Curry._1(service.storage.initForElementVisualApp, undefined);
  var __x$1 = service.storage.getElementVisualApp(__x);
  var __x$2 = Most.drain(Most.flatMap((function (appBinaryFile) {
              var match = service.meta3d.loadApp((function (param, param$1) {
                      return ElementVisualUtils$Frontend.buildEmptyAddGeneratedContributeFunc(undefined, param, param$1);
                    }), appBinaryFile);
              var __x = service.meta3d.initExtension(match[0], ElementVisualUtils$Frontend.getEditorWholePackageProtocolName(undefined), _getInitData(service, isDebug));
              return Most.fromPromise(Js_promise.then_((function (meta3dState) {
                                loopFrameID.current = Curry._1(service.other.requestAnimationFirstFrame, (function (time) {
                                        MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                                                _loop(service, loopFrameID, apInspectorData, time, meta3dState);
                                              }), 5);
                                      }));
                                return Promise.resolve(undefined);
                              }), __x));
            }), __x$1));
  return Js_promise.$$catch((function (e) {
                return service.console.errorWithExn(e, undefined);
              }), __x$2);
}

var Method = {
  _getInitData: _getInitData,
  _getUpdateData: _getUpdateData,
  _loop: _loop,
  startApp: startApp
};

function RunElementVisual(Props) {
  var service = Props.service;
  var loopFrameID = Curry._1(service.react.useRef, undefined);
  var canvasData = Curry._1(service.url.getUrlParam, "canvasData");
  var apInspectorData = Curry._1(service.url.getUrlParam, "apInspectorData");
  React.useEffect((function () {
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  startApp(service, loopFrameID, apInspectorData);
                }), 5);
          return (function (param) {
                    ElementVisualUtils$Frontend.cancelAppLoop(service, loopFrameID);
                  });
        }), []);
  return React.createElement("canvas", {
              id: "ui-visual-run-canvas",
              style: {
                height: "" + canvasData.height.toString() + "px",
                width: "" + canvasData.width.toString() + "px"
              },
              height: "" + canvasData.height.toString() + "px",
              width: "" + canvasData.width.toString() + "px"
            });
}

var make = RunElementVisual;

export {
  Method ,
  make ,
}
/*  Not a pure module */
