

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as BoolUtils$Frontend from "../../../utils/BoolUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as SelectUtils$Frontend from "../../../../../utils/utils/SelectUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as SelectedContributesForElementUtils$Frontend from "../../../element_assemble/utils/SelectedContributesForElementUtils.bs.js";

import 'antd/dist/reset.css'
;

function setIsDebug(dispatch, isDebug) {
  return Curry._1(dispatch, {
              TAG: /* SetIsDebug */10,
              _0: BoolUtils$Frontend.stringToBool(isDebug)
            });
}

function setClearColorR(dispatch, param, r) {
  return Curry._1(dispatch, {
              TAG: /* SetClearColor */11,
              _0: [
                r,
                param[1],
                param[2],
                param[3]
              ]
            });
}

function setClearColorG(dispatch, param, g) {
  return Curry._1(dispatch, {
              TAG: /* SetClearColor */11,
              _0: [
                param[0],
                g,
                param[2],
                param[3]
              ]
            });
}

function setClearColorB(dispatch, param, b) {
  return Curry._1(dispatch, {
              TAG: /* SetClearColor */11,
              _0: [
                param[0],
                param[1],
                b,
                param[3]
              ]
            });
}

function setClearColorA(dispatch, param, a) {
  return Curry._1(dispatch, {
              TAG: /* SetClearColor */11,
              _0: [
                param[0],
                param[1],
                param[2],
                a
              ]
            });
}

function buildClearColorField(dispatch, setClearColorField, clearColor, clearColorField) {
  return React.createElement(React.Fragment, undefined, React.createElement(Antd.InputNumber, {
                  onChange: (function (value) {
                      Curry._3(setClearColorField, dispatch, clearColor, value);
                    }),
                  value: clearColorField,
                  min: 0.0,
                  max: 1.0,
                  step: "0.001",
                  stringMode: true
                }));
}

function setSkinName(dispatch, skinName) {
  if (SelectUtils$Frontend.isEmptySelectOptionValue(skinName)) {
    return Curry._1(dispatch, {
                TAG: /* SetSkinName */12,
                _0: undefined
              });
  } else {
    return Curry._1(dispatch, {
                TAG: /* SetSkinName */12,
                _0: skinName
              });
  }
}

function useSelector(param) {
  return [
          param.isShowApInspector,
          param.selectedContributes,
          param.apInspectorData
        ];
}

var Method = {
  setIsDebug: setIsDebug,
  setClearColorR: setClearColorR,
  setClearColorG: setClearColorG,
  setClearColorB: setClearColorB,
  setClearColorA: setClearColorA,
  buildClearColorField: buildClearColorField,
  setSkinName: setSkinName,
  useSelector: useSelector
};

function ApInspector(Props) {
  var service = Props.service;
  var dispatch = ReduxUtils$Frontend.ApAssemble.useDispatch(service.react.useDispatch);
  var match = ReduxUtils$Frontend.ApAssemble.useSelector(service.react.useSelector, useSelector);
  if (!match[0]) {
    return null;
  }
  var apInspectorData = match[2];
  var clearColor = apInspectorData.clearColor;
  return React.createElement(Antd.Space, {
              direction: "vertical",
              size: "middle",
              children: null
            }, service.ui.buildTitle(2, "IsDebug", undefined), SelectUtils$Frontend.buildSelect((function (param) {
                    return Curry._1(dispatch, {
                                TAG: /* SetIsDebug */10,
                                _0: BoolUtils$Frontend.stringToBool(param)
                              });
                  }), BoolUtils$Frontend.boolToString(apInspectorData.isDebug), [
                  "true",
                  "false"
                ]), service.ui.buildTitle(2, "ClearColor", undefined), React.createElement(Antd.Space, {
                  wrap: true,
                  direction: "horizontal",
                  children: null
                }, buildClearColorField(dispatch, setClearColorR, clearColor, clearColor[0]), buildClearColorField(dispatch, setClearColorG, clearColor, clearColor[1]), buildClearColorField(dispatch, setClearColorB, clearColor, clearColor[2]), buildClearColorField(dispatch, setClearColorA, clearColor, clearColor[3])), service.ui.buildTitle(2, "Skin", undefined), SelectUtils$Frontend.buildSelect((function (param) {
                    return setSkinName(dispatch, param);
                  }), OptionSt$Meta3dCommonlib.getWithDefault(apInspectorData.skinName, SelectUtils$Frontend.buildEmptySelectOptionValue(undefined)), ArraySt$Meta3dCommonlib.map(ListSt$Meta3dCommonlib.toArray(SelectedContributesForElementUtils$Frontend.getSkins(match[1])), (function (param) {
                        return service.meta3d.execGetContributeFunc(param.data.contributeFuncData).skinName;
                      }))));
}

var make = ApInspector;

export {
  Method ,
  make ,
}
/*  Not a pure module */
