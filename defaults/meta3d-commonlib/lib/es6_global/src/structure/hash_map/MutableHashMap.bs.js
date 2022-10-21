

import * as HashMap$Meta3dCommonlib from "./HashMap.bs.js";

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
  
}
/* No side effect */
