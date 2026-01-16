

import * as OptionSt$Meta3dCommonlib from "../OptionSt.bs.js";
import * as NullUtils$Meta3dCommonlib from "../utils/NullUtils.bs.js";
import * as SparseMap$Meta3dCommonlib from "./SparseMap.bs.js";

function getExn(map, key) {
  return OptionSt$Meta3dCommonlib.getExn(SparseMap$Meta3dCommonlib.get(map, key));
}

function fastGet(map, key) {
  var value = SparseMap$Meta3dCommonlib.unsafeGet(map, key);
  return [
          NullUtils$Meta3dCommonlib.isInMap(value),
          value
        ];
}

function set(map, key, value) {
  map[key] = value;
  return map;
}

function remove(map, key) {
  map[key] = undefined;
  return map;
}

function deleteVal(map, key) {
  map[key] = undefined;
  return map;
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
  fastGet ,
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
