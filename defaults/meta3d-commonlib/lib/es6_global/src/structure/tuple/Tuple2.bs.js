

import * as Caml_option from "./../../../../../../rescript/lib/es6/caml_option.js";
import * as Result$Meta3dCommonlib from "../Result.bs.js";
import * as OptionSt$Meta3dCommonlib from "../OptionSt.bs.js";

function create(x, y) {
  return [
          x,
          y
        ];
}

function collectOption(optionData1, optionData2) {
  if (optionData1 !== undefined && optionData2 !== undefined) {
    return Result$Meta3dCommonlib.succeed([
                Caml_option.valFromOption(optionData1),
                Caml_option.valFromOption(optionData2)
              ]);
  } else {
    return OptionSt$Meta3dCommonlib.buildFailResult(undefined);
  }
}

function collectResult(resultData1, resultData2) {
  return Result$Meta3dCommonlib.bind(resultData1, (function (data1) {
                return Result$Meta3dCommonlib.mapSuccess(resultData2, (function (data2) {
                              return [
                                      data1,
                                      data2
                                    ];
                            }));
              }));
}

function getFirst(param) {
  return param[0];
}

function getLast(param) {
  return param[1];
}

export {
  create ,
  collectOption ,
  collectResult ,
  getFirst ,
  getLast ,
}
/* No side effect */
