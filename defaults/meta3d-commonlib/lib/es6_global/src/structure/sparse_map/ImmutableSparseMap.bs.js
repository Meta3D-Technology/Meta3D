

import * as OptionSt$Meta3dCommonlib from "../OptionSt.bs.js";
import * as SparseMap$Meta3dCommonlib from "./SparseMap.bs.js";

function getExn(map, key) {
  return OptionSt$Meta3dCommonlib.getExn(SparseMap$Meta3dCommonlib.get(map, key));
}

function set(map, key, value) {
  var newMap = SparseMap$Meta3dCommonlib.copy(map);
  newMap[key] = value;
  return newMap;
}

function remove(map, key) {
  var newMap = SparseMap$Meta3dCommonlib.copy(map);
  newMap[key] = undefined;
  return newMap;
}

function deleteVal(map, key) {
  var newMap = SparseMap$Meta3dCommonlib.copy(map);
  newMap[key] = undefined;
  return newMap;
}

var createEmpty = SparseMap$Meta3dCommonlib.createEmpty;

var copy = SparseMap$Meta3dCommonlib.copy;

var unsafeGet = SparseMap$Meta3dCommonlib.unsafeGet;

var get = SparseMap$Meta3dCommonlib.get;

var getNullable = SparseMap$Meta3dCommonlib.getNullable;

var has = SparseMap$Meta3dCommonlib.has;

var map = SparseMap$Meta3dCommonlib.map;

var reducei = SparseMap$Meta3dCommonlib.reducei;

var getValues = SparseMap$Meta3dCommonlib.getValues;

var getKeys = SparseMap$Meta3dCommonlib.getKeys;

export {
  createEmpty ,
  copy ,
  unsafeGet ,
  get ,
  getExn ,
  getNullable ,
  has ,
  set ,
  remove ,
  map ,
  reducei ,
  getValues ,
  getKeys ,
  deleteVal ,
}
/* No side effect */
