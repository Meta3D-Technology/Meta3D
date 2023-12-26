

import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as IntUtils$Frontend from "../../utils/IntUtils.bs.js";
import * as BoolUtils$Frontend from "../../utils/BoolUtils.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

function _handleSpecificDataFieldType(param, type_, value) {
  if (type_ === "bool") {
    return Curry._1(param[3], value);
  }
  if (type_ === "menuItems") {
    return Curry._1(param[2], value);
  }
  if (type_ === "select") {
    return Curry._1(param[4], value);
  }
  if (type_ === "string") {
    return Curry._1(param[0], value);
  }
  if (type_ === "imageBase64") {
    return Curry._1(param[1], value);
  }
  throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "SpecificUtils.res",
          13,
          2
        ],
        Error: new Error()
      };
}

function convertValueToString(value, type_) {
  return _handleSpecificDataFieldType([
              (function (value) {
                  return value;
                }),
              (function (value) {
                  return NullableSt$Meta3dCommonlib.getWithDefault(value, "");
                }),
              (function (value) {
                  return JSON.stringify(value);
                }),
              BoolUtils$Frontend.boolToString,
              (function (value) {
                  if (IntUtils$Frontend.isInteger(value.selected)) {
                    return JSON.stringify(value);
                  } else {
                    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("value should be integer", "", "", "", "")));
                  }
                })
            ], type_, value);
}

function convertStringToValue(valueStr, type_) {
  return _handleSpecificDataFieldType([
              (function (valueStr) {
                  return valueStr;
                }),
              (function (valueStr) {
                  return valueStr;
                }),
              (function (valueStr) {
                  return JSON.parse(valueStr);
                }),
              BoolUtils$Frontend.stringToBool,
              IntUtils$Frontend.stringToInt
            ], type_, valueStr);
}

function getSpecificDataValue(specificDataValue) {
  return specificDataValue._0;
}

export {
  _handleSpecificDataFieldType ,
  convertValueToString ,
  convertStringToValue ,
  getSpecificDataValue ,
}
/* No side effect */
