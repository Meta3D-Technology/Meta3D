'use strict';

var HashMap$Meta3dCommonlib = require("./HashMap.bs.js");

function set(map, key, value) {
  map[key] = value;
  return map;
}

function deleteVal(map, key) {
  map[key] = undefined;
  return map;
}

var createEmpty = HashMap$Meta3dCommonlib.createEmpty;

var unsafeGet = HashMap$Meta3dCommonlib.unsafeGet;

var get = HashMap$Meta3dCommonlib.get;

var getExn = HashMap$Meta3dCommonlib.getExn;

var getNullable = HashMap$Meta3dCommonlib.getNullable;

var has = HashMap$Meta3dCommonlib.has;

var getValidValues = HashMap$Meta3dCommonlib.getValidValues;

var copy = HashMap$Meta3dCommonlib.copy;

var entries = HashMap$Meta3dCommonlib.entries;

var map = HashMap$Meta3dCommonlib.map;

var merge = HashMap$Meta3dCommonlib.merge;

exports.createEmpty = createEmpty;
exports.set = set;
exports.unsafeGet = unsafeGet;
exports.get = get;
exports.getExn = getExn;
exports.getNullable = getNullable;
exports.has = has;
exports.deleteVal = deleteVal;
exports.getValidValues = getValidValues;
exports.copy = copy;
exports.entries = entries;
exports.map = map;
exports.merge = merge;
/* No side effect */
