'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Contract$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/Contract.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ConfigUtils$Meta3dComponentTransform = require("../config/ConfigUtils.bs.js");

function mark(state, transform, isDirty) {
  MutableSparseMap$Meta3dCommonlib.set(state.dirtyMap, transform, isDirty);
  return state;
}

function isDirty(state, transform) {
  var dirtyMap = state.dirtyMap;
  return MutableSparseMap$Meta3dCommonlib.unsafeGet(dirtyMap, transform) === Contract$Meta3dCommonlib.ensureCheck(true, (function (isDirty) {
                Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("return bool", "not"), (function (param) {
                        return Contract$Meta3dCommonlib.assertIsBool(isDirty);
                      }));
              }), ConfigUtils$Meta3dComponentTransform.getIsDebug(state));
}

exports.mark = mark;
exports.isDirty = isDirty;
/* No side effect */
