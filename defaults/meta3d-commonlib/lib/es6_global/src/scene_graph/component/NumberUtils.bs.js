

import * as Caml_obj from "./../../../../../../rescript/lib/es6/caml_obj.js";
import * as Log$Meta3dCommonlib from "../../log/Log.bs.js";
import * as Contract$Meta3dCommonlib from "../../contract/Contract.bs.js";

function bigThan(num, below) {
  if (Caml_obj.lessthan(num, below)) {
    return below;
  } else {
    return num;
  }
}

function clamp(isDebug, num, below, up) {
  Contract$Meta3dCommonlib.requireCheck((function (param) {
          Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("below <= up", "not"), (function (param) {
                  return Contract$Meta3dCommonlib.assertLte(/* Float */1, below, up);
                }));
        }), isDebug);
  if (num < below) {
    return below;
  } else if (num > up) {
    return up;
  } else {
    return num;
  }
}

function dividInt(a, b) {
  return a / b;
}

export {
  bigThan ,
  clamp ,
  dividInt ,
}
/* No side effect */
