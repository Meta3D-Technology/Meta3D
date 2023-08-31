

import * as Caml_option from "./../../../../../../rescript/lib/es6/caml_option.js";
import * as Result$Meta3dCommonlib from "../Result.bs.js";
import * as OptionSt$Meta3dCommonlib from "../OptionSt.bs.js";

function collectOption(optionData1, optionData2, optionData3, optionData4, optionData5) {
  if (optionData1 !== undefined && optionData2 !== undefined && optionData3 !== undefined && optionData4 !== undefined && optionData5 !== undefined) {
    return Result$Meta3dCommonlib.succeed([
                Caml_option.valFromOption(optionData1),
                Caml_option.valFromOption(optionData2),
                Caml_option.valFromOption(optionData3),
                Caml_option.valFromOption(optionData4),
                Caml_option.valFromOption(optionData5)
              ]);
  } else {
    return OptionSt$Meta3dCommonlib.buildFailResult(undefined);
  }
}

function collectResult(resultData1, resultData2, resultData3, resultData4, resultData5) {
  return Result$Meta3dCommonlib.bind(resultData1, (function (data1) {
                return Result$Meta3dCommonlib.bind(resultData2, (function (data2) {
                              return Result$Meta3dCommonlib.bind(resultData3, (function (data3) {
                                            return Result$Meta3dCommonlib.bind(resultData4, (function (data4) {
                                                          return Result$Meta3dCommonlib.mapSuccess(resultData5, (function (data5) {
                                                                        return [
                                                                                data1,
                                                                                data2,
                                                                                data3,
                                                                                data4,
                                                                                data5
                                                                              ];
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
}

export {
  collectOption ,
  collectResult ,
}
/* No side effect */
