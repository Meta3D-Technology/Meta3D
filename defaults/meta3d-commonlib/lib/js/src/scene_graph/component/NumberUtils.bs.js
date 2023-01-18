'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var Log$Meta3dCommonlib = require("../../log/Log.bs.js");
var Contract$Meta3dCommonlib = require("../../contract/Contract.bs.js");

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

exports.bigThan = bigThan;
exports.clamp = clamp;
exports.dividInt = dividInt;
/* No side effect */
