'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var Result$Meta3dCommonlib = require("../Result.bs.js");
var OptionSt$Meta3dCommonlib = require("../OptionSt.bs.js");

function collectOption(optionData1, optionData2, optionData3, optionData4) {
  if (optionData1 !== undefined && optionData2 !== undefined && optionData3 !== undefined && optionData4 !== undefined) {
    return Result$Meta3dCommonlib.succeed([
                Caml_option.valFromOption(optionData1),
                Caml_option.valFromOption(optionData2),
                Caml_option.valFromOption(optionData3),
                Caml_option.valFromOption(optionData4)
              ]);
  } else {
    return OptionSt$Meta3dCommonlib.buildFailResult(undefined);
  }
}

function collectResult(resultData1, resultData2, resultData3, resultData4) {
  return Result$Meta3dCommonlib.bind(resultData1, (function (data1) {
                return Result$Meta3dCommonlib.bind(resultData2, (function (data2) {
                              return Result$Meta3dCommonlib.bind(resultData3, (function (data3) {
                                            return Result$Meta3dCommonlib.mapSuccess(resultData4, (function (data4) {
                                                          return [
                                                                  data1,
                                                                  data2,
                                                                  data3,
                                                                  data4
                                                                ];
                                                        }));
                                          }));
                            }));
              }));
}

exports.collectOption = collectOption;
exports.collectResult = collectResult;
/* No side effect */
