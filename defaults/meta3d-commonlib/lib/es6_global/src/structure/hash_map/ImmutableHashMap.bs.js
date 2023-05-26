

import * as HashMap$Meta3dCommonlib from "./HashMap.bs.js";

function set(map, key, value) {
  var newMap = HashMap$Meta3dCommonlib.copy(map);
  newMap[key] = value;
  return newMap;
}

function deleteVal(map, key) {
  var newMap = HashMap$Meta3dCommonlib.copy(map);
  newMap[key] = undefined;
  return newMap;
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

export {
  createEmpty ,
  set ,
  unsafeGet ,
  get ,
  getExn ,
  getNullable ,
  has ,
  deleteVal ,
  getValidValues ,
  copy ,
  entries ,
  map ,
  merge ,
}
/* No side effect */
