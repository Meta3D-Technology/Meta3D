

import * as Curry from "./../../../../../../rescript/lib/es6/curry.js";
import * as ArraySt$Meta3dCommonlib from "../../structure/ArraySt.bs.js";

function clone(state, param, countRange, sourceComponent) {
  var setDataFunc = param[2];
  var createFunc = param[0];
  var dataTuple = Curry._2(param[1], state, sourceComponent);
  return ArraySt$Meta3dCommonlib.reduceOneParam(countRange, (function (param, param$1) {
                var match = Curry._1(createFunc, param[0]);
                var clonedComponent = match[1];
                var state = Curry._3(setDataFunc, match[0], clonedComponent, dataTuple);
                return [
                        state,
                        ArraySt$Meta3dCommonlib.push(param[1], clonedComponent)
                      ];
              }), [
              state,
              []
            ]);
}

export {
  clone ,
}
/* No side effect */
