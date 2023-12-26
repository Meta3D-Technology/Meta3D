

import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as CodeEdit$Frontend from "../code_edit/CodeEdit.bs.js";
import * as ReduxUtils$Frontend from "../../../../utils/utils/ReduxUtils.bs.js";
import * as CodeEditUtils$Frontend from "../../../utils/CodeEditUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

import 'antd/dist/reset.css'
;

function getNewCode(dispatch, getNameFunc, setCurrentCustomNameToGlobalFunc, buildUpdateActionFunc, name, newOriginCode, newTranspiledCode) {
  var newTranspiledCode$1 = CodeEditUtils$Frontend.convertTranspliedCodeToUMDCode(newTranspiledCode);
  var newName = OptionSt$Meta3dCommonlib.getWithDefault(Curry._1(getNameFunc, newTranspiledCode$1), name);
  Curry._1(setCurrentCustomNameToGlobalFunc, newName);
  return Curry._1(dispatch, Curry._4(buildUpdateActionFunc, name, newName, newOriginCode, newTranspiledCode$1));
}

function getCode(name, customs) {
  return OptionSt$Meta3dCommonlib.getExn(ListSt$Meta3dCommonlib.find(customs, (function (custom) {
                    return custom.name === name;
                  }))).originFileStr;
}

var Method = {
  getNewCode: getNewCode,
  getCode: getCode
};

function CustomCodeEditUtils(Props) {
  var service = Props.service;
  var getCurrentCustomNameFromGlobalFunc = Props.getCurrentCustomNameFromGlobalFunc;
  var getNameFunc = Props.getNameFunc;
  var setCurrentCustomNameToGlobalFunc = Props.setCurrentCustomNameToGlobalFunc;
  var buildUpdateActionFunc = Props.buildUpdateActionFunc;
  var currentCustomName = Props.currentCustomName;
  var customs = Props.customs;
  var dispatch = ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var match = Curry._1(service.react.useState, (function (param) {
          
        }));
  var setCode = match[1];
  var code = match[0];
  service.react.useEffect1((function (param) {
          Curry._1(setCode, (function (param) {
                  return getCode(currentCustomName, customs);
                }));
        }), [currentCustomName]);
  if (code !== undefined) {
    return React.createElement(CodeEdit$Frontend.make, {
                service: service,
                code: code,
                getNewCodeFunc: (function (newOriginCode, newTranspiledCode) {
                    getNewCode(dispatch, getNameFunc, setCurrentCustomNameToGlobalFunc, buildUpdateActionFunc, NullableSt$Meta3dCommonlib.getExn(Curry._1(getCurrentCustomNameFromGlobalFunc, undefined)), newOriginCode, newTranspiledCode);
                  })
              });
  } else {
    return "不支持编辑";
  }
}

var make = CustomCodeEditUtils;

export {
  Method ,
  make ,
}
/*  Not a pure module */
