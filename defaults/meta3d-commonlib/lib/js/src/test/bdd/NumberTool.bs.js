'use strict';

var ArraySt$Meta3dCommonlib = require("../../structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("../../structure/OptionSt.bs.js");
var ArgumentsTool$Meta3dCommonlib = require("./ArgumentsTool.bs.js");

function getExnAndConvertArgumentsToNumber($$arguments) {
  return ArraySt$Meta3dCommonlib.map(ArgumentsTool$Meta3dCommonlib.getArgumentsArr(OptionSt$Meta3dCommonlib.getExn($$arguments)), (function (prim) {
                return Number(prim);
              }));
}

exports.getExnAndConvertArgumentsToNumber = getExnAndConvertArgumentsToNumber;
/* No side effect */
