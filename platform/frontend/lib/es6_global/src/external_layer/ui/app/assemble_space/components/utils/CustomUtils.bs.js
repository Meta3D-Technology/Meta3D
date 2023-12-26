

import * as Js_string from "../../../../../../../../../../../node_modules/rescript/lib/es6/js_string.js";
import * as Caml_array from "../../../../../../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function getInputName(inputFileStr) {
  return OptionSt$Meta3dCommonlib.bind(Js_string.match_(/inputName\:.*\"(.+)\",/im, inputFileStr), (function (result) {
                return Caml_array.get(result, 1);
              }));
}

function getActionName(actionFileStr) {
  if (Js_string.includes("actionName: actionName", actionFileStr)) {
    return OptionSt$Meta3dCommonlib.bind(Js_string.match_(/actionName\s\=\s\"(.+)\"/im, actionFileStr), (function (result) {
                  return Caml_array.get(result, 1);
                }));
  } else {
    return OptionSt$Meta3dCommonlib.bind(Js_string.match_(/actionName\:\s*\"(.+)\",/im, actionFileStr), (function (result) {
                  return Caml_array.get(result, 1);
                }));
  }
}

export {
  getInputName ,
  getActionName ,
}
/* No side effect */
