

import * as ArraySt$Meta3dCommonlib from "../../structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../structure/OptionSt.bs.js";
import * as ArgumentsTool$Meta3dCommonlib from "./ArgumentsTool.bs.js";

function getExnAndConvertArgumentsToNumber($$arguments) {
  return ArraySt$Meta3dCommonlib.map(ArgumentsTool$Meta3dCommonlib.getArgumentsArr(OptionSt$Meta3dCommonlib.getExn($$arguments)), (function (prim) {
                return Number(prim);
              }));
}

export {
  getExnAndConvertArgumentsToNumber ,
}
/* No side effect */
