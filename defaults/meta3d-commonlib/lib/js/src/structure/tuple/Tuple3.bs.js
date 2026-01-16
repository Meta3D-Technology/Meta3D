'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Result$Meta3dCommonlib = require("../Result.bs.js");
var OptionSt$Meta3dCommonlib = require("../OptionSt.bs.js");

function map(param, func) {
  return [
          Curry._1(func, param[0]),
          Curry._1(func, param[1]),
          Curry._1(func, param[2])
        ];
}

function collectOption(optionData1, optionData2, optionData3) {
  if (optionData1 !== undefined && optionData2 !== undefined && optionData3 !== undefined) {
    return Result$Meta3dCommonlib.succeed([
                Caml_option.valFromOption(optionData1),
                Caml_option.valFromOption(optionData2),
                Caml_option.valFromOption(optionData3)
              ]);
  } else {
    return OptionSt$Meta3dCommonlib.buildFailResult(undefined);
  }
}

function collectResult(resultData1, resultData2, resultData3) {
  return Result$Meta3dCommonlib.bind(resultData1, (function (data1) {
                return Result$Meta3dCommonlib.bind(resultData2, (function (data2) {
                              return Result$Meta3dCommonlib.mapSuccess(resultData3, (function (data3) {
                                            return [
                                                    data1,
                                                    data2,
                                                    data3
                                                  ];
                                          }));
                            }));
              }));
}

function getLast(param) {
  return param[2];
}

exports.map = map;
exports.collectOption = collectOption;
exports.collectResult = collectResult;
exports.getLast = getLast;
/* No side effect */
