

import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as MessageUtils$Frontend from "../../../../../utils/utils/MessageUtils.bs.js";
import * as HierachyUtils$Frontend from "../../utils/HierachyUtils.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ElementVisualUtils$Frontend from "../../utils/ElementVisualUtils.bs.js";
import * as UIControlInspector$Frontend from "../../ui_control_Inspector/components/UIControlInspector.bs.js";

import 'antd/dist/reset.css'
;

function getCurrentSelectedUIControlInspectorData(inspectorCurrentUIControlId, selectedUIControlInspectorData) {
  return OptionSt$Meta3dCommonlib.bind(inspectorCurrentUIControlId, (function (inspectorCurrentUIControlId) {
                return HierachyUtils$Frontend.findSelectedUIControlData(undefined, [
                            (function (data) {
                                return data.id;
                              }),
                            (function (data) {
                                return data.children;
                              })
                          ], selectedUIControlInspectorData, inspectorCurrentUIControlId);
              }));
}

function getCurrentSelectedUIControl(inspectorCurrentUIControlId, selectedUIControls) {
  return OptionSt$Meta3dCommonlib.bind(inspectorCurrentUIControlId, (function (inspectorCurrentUIControlId) {
                return HierachyUtils$Frontend.findSelectedUIControlData(undefined, [
                            (function (data) {
                                return data.id;
                              }),
                            (function (data) {
                                return data.children;
                              })
                          ], selectedUIControls, inspectorCurrentUIControlId);
              }));
}

function useSelector(param) {
  var elementAssembleState = param.elementAssembleState;
  return [
          elementAssembleState.inspectorCurrentUIControlId,
          elementAssembleState.selectedUIControls,
          elementAssembleState.selectedUIControlInspectorData,
          elementAssembleState.customInputs,
          elementAssembleState.customActions
        ];
}

var Method = {
  getCurrentSelectedUIControlInspectorData: getCurrentSelectedUIControlInspectorData,
  getCurrentSelectedUIControl: getCurrentSelectedUIControl,
  useSelector: useSelector
};

function ElementInspector(Props) {
  var service = Props.service;
  var account = Props.account;
  var selectedContributes = Props.selectedContributes;
  var rectXInputTarget = Props.rectXInputTarget;
  var rectYInputTarget = Props.rectYInputTarget;
  var rectWidthInputTarget = Props.rectWidthInputTarget;
  var rectHeightInputTarget = Props.rectHeightInputTarget;
  var inputSelectTarget = Props.inputSelectTarget;
  var actionSelectTarget = Props.actionSelectTarget;
  var match = service.react.useSelector(useSelector);
  var customActions = match[4];
  var customInputs = match[3];
  var inspectorCurrentUIControlId = match[0];
  var match$1 = React.useState(function () {
        
      });
  var setSelectedContributesAddedGeneratedCustoms = match$1[1];
  var selectedContributesAddedGeneratedCustoms = match$1[0];
  Curry._1(service.react.useEffectOnce, (function (param) {
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  Curry._1(setSelectedContributesAddedGeneratedCustoms, (function (param) {
                          return ElementVisualUtils$Frontend.addGeneratedCustoms(service, selectedContributes, OptionSt$Meta3dCommonlib.getExn(account), customInputs, customActions);
                        }));
                }), 5);
          return [
                  undefined,
                  undefined
                ];
        }));
  var match$2 = getCurrentSelectedUIControlInspectorData(inspectorCurrentUIControlId, match[2]);
  var match$3 = getCurrentSelectedUIControl(inspectorCurrentUIControlId, match[1]);
  if (match$2 !== undefined && match$3 !== undefined && selectedContributesAddedGeneratedCustoms !== undefined) {
    return React.createElement(UIControlInspector$Frontend.make, {
                service: service,
                currentSelectedUIControl: match$3,
                currentSelectedUIControlInspectorData: match$2,
                selectedContributes: selectedContributesAddedGeneratedCustoms,
                rectXInputTarget: rectXInputTarget,
                rectYInputTarget: rectYInputTarget,
                rectWidthInputTarget: rectWidthInputTarget,
                rectHeightInputTarget: rectHeightInputTarget,
                inputSelectTarget: inputSelectTarget,
                actionSelectTarget: actionSelectTarget
              });
  } else {
    return null;
  }
}

var make = ElementInspector;

export {
  Method ,
  make ,
}
/*  Not a pure module */
