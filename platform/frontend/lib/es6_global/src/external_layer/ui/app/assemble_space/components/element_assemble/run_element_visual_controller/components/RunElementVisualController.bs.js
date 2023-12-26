

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as AppUtils$Frontend from "../../../utils/AppUtils.bs.js";
import * as EventUtils$Frontend from "../../../../../utils/EventUtils.bs.js";
import * as GuideUtils$Frontend from "../../../../../utils/GuideUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as MessageUtils$Frontend from "../../../../../utils/utils/MessageUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as Result$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ElementVisualUtils$Frontend from "../../utils/ElementVisualUtils.bs.js";

import 'antd/dist/reset.css'
;

function _saveToLocalStorage(service, appBinaryFile) {
  var __x = Curry._1(service.storage.initForElementVisualApp, undefined);
  return service.storage.setElementVisualApp(__x, appBinaryFile);
}

function _buildURL(canvasData, apInspectorData) {
  return "RunElementVisual?canvasData=" + canvasData + "&&apInspectorData=" + apInspectorData + "";
}

function _openLink(service, url) {
  service.tab.openUrl(url);
}

function _checkShouldHasSceneViewAndGameView(selectedUIControls) {
  if (ListSt$Meta3dCommonlib.includesByFunc(selectedUIControls, (function (param) {
            return GuideUtils$Frontend.isSceneViewProtocolName(param.data.contributePackageData.protocol.name);
          })) && ListSt$Meta3dCommonlib.includesByFunc(selectedUIControls, (function (param) {
            return GuideUtils$Frontend.isGameViewProtocolName(param.data.contributePackageData.protocol.name);
          }))) {
    return Result$Meta3dCommonlib.succeed(undefined);
  } else {
    return Result$Meta3dCommonlib.fail("请加入这些UI Control: Scene View和Game View");
  }
}

function run(service, param, param$1, param$2, param$3) {
  var customActions = param$3[1];
  var customInputs = param$3[0];
  var account = param$2[0];
  var elementContribute = param$1[1];
  var match = param$1[0];
  var storedPackageIdsInApp = match[3];
  var selectedContributes = match[2];
  var selectedExtensions = match[1];
  var selectedPackages = match[0];
  var apInspectorData = param[1];
  var canvasData = param[0];
  Result$Meta3dCommonlib.either(_checkShouldHasSceneViewAndGameView(param$2[1]), (function (param) {
          var __x = _saveToLocalStorage(service, ElementVisualUtils$Frontend.generateApp(service, [
                    AppUtils$Frontend.splitPackages(selectedPackages, storedPackageIdsInApp),
                    ListSt$Meta3dCommonlib.toArray(selectedExtensions),
                    ListSt$Meta3dCommonlib.toArray(ElementVisualUtils$Frontend.addGeneratedCustoms(service, selectedContributes, account, customInputs, customActions))
                  ], /* [] */0, elementContribute));
          var __x$1 = Most.drain(Most.tap((function (param) {
                      _openLink(service, _buildURL(JSON.stringify(canvasData), JSON.stringify(apInspectorData)));
                    }), __x));
          Js_promise.$$catch((function (e) {
                  return service.console.errorWithExn(e, undefined);
                }), __x$1);
        }), (function (__x) {
          MessageUtils$Frontend.warn(__x, undefined);
        }));
}

function useSelector(param) {
  var assembleSpaceState = param.assembleSpaceState;
  var elementAssembleState = assembleSpaceState.elementAssembleState;
  var apAssembleState = assembleSpaceState.apAssembleState;
  return [
          [
            [
              apAssembleState.apInspectorData,
              apAssembleState.selectedPackages,
              apAssembleState.selectedExtensions,
              apAssembleState.storedPackageIdsInApp
            ],
            [
              elementAssembleState.canvasData,
              elementAssembleState.elementContribute,
              elementAssembleState.selectedUIControls,
              elementAssembleState.selectedUIControlInspectorData,
              elementAssembleState.customInputs,
              elementAssembleState.customActions
            ]
          ],
          param.eventEmitter
        ];
}

var Method = {
  _saveToLocalStorage: _saveToLocalStorage,
  _buildURL: _buildURL,
  _openLink: _openLink,
  _checkShouldHasSceneViewAndGameView: _checkShouldHasSceneViewAndGameView,
  run: run,
  useSelector: useSelector
};

function RunElementVisualController(Props) {
  var service = Props.service;
  var account = Props.account;
  var selectedContributes = Props.selectedContributes;
  var runButtonTarget = Props.runButtonTarget;
  ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var match = service.react.useAllSelector(useSelector);
  var eventEmitter = match[1];
  var match$1 = match[0];
  var match$2 = match$1[1];
  var customActions = match$2[5];
  var customInputs = match$2[4];
  var selectedUIControlInspectorData = match$2[3];
  var selectedUIControls = match$2[2];
  var elementContribute = match$2[1];
  var canvasData = match$2[0];
  var match$3 = match$1[0];
  var storedPackageIdsInApp = match$3[3];
  var selectedExtensions = match$3[2];
  var selectedPackages = match$3[1];
  var apInspectorData = match$3[0];
  if (elementContribute !== undefined) {
    return React.createElement(Antd.Button, {
                onClick: (function (param) {
                    MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                            eventEmitter.emit(EventUtils$Frontend.getRunEventName(undefined), 1);
                            run(service, [
                                  canvasData,
                                  apInspectorData
                                ], [
                                  [
                                    selectedPackages,
                                    selectedExtensions,
                                    selectedContributes,
                                    storedPackageIdsInApp
                                  ],
                                  elementContribute
                                ], [
                                  OptionSt$Meta3dCommonlib.getExn(account),
                                  selectedUIControls,
                                  selectedUIControlInspectorData
                                ], [
                                  customInputs,
                                  customActions
                                ]);
                          }), 5);
                  }),
                children: "运行",
                ref: runButtonTarget
              });
  } else {
    return React.createElement(Antd.Button, {
                disabled: true,
                children: "运行"
              });
  }
}

var make = RunElementVisualController;

export {
  Method ,
  make ,
}
/*  Not a pure module */
