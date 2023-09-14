

import * as Caml_option from "../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function getBodyExn(state) {
  return OptionSt$Meta3dCommonlib.getExn(state.body);
}

function setBody(state, body) {
  return {
          eventData: state.eventData,
          canvas: state.canvas,
          body: Caml_option.some(body),
          browser: state.browser
        };
}

export {
  getBodyExn ,
  setBody ,
}
/* No side effect */
