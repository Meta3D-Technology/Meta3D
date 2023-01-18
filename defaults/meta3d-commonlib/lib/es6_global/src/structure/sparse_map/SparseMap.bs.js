

import * as Caml_option from "../../../../../../../extensions/meta3d-bs-most/node_modules/rescript/lib/es6/caml_option.js";
import * as ArraySt$Meta3dCommonlib from "../ArraySt.bs.js";
import * as NullUtils$Meta3dCommonlib from "../utils/NullUtils.bs.js";

function createEmpty(hintSizeOpt, param) {
  return [];
}

function copy(prim) {
  return prim.slice();
}

function unsafeGet(map, key) {
  return map[key];
}

function get(map, key) {
  var value = map[key];
  if (NullUtils$Meta3dCommonlib.isEmpty(value)) {
    return ;
  } else {
    return Caml_option.some(value);
  }
}

function getNullable(map, key) {
  return map[key];
}

function has(map, key) {
  return !NullUtils$Meta3dCommonlib.isEmpty(map[key]);
}

function map(map$1, func) {
  return map$1.map(function (value) {
              if (NullUtils$Meta3dCommonlib.isNotInMap(value)) {
                return ;
              } else {
                return func(value);
              }
            });
}

function reducei(map, func, initValue) {
  return ArraySt$Meta3dCommonlib.reduceOneParami(map, (function (previousValue, value, index) {
                if (NullUtils$Meta3dCommonlib.isNotInMap(value)) {
                  return previousValue;
                } else {
                  return func(previousValue, value, index);
                }
              }), initValue);
}

function getValues(map) {
  return map.filter(NullUtils$Meta3dCommonlib.isInMap);
}

function getKeys(map) {
  return ArraySt$Meta3dCommonlib.reduceOneParami(map, (function (arr, value, key) {
                if (NullUtils$Meta3dCommonlib.isNotInMap(value)) {
                  return arr;
                } else {
                  arr.push(key);
                  return arr;
                }
              }), []);
}

export {
  createEmpty ,
  copy ,
  unsafeGet ,
  get ,
  getNullable ,
  has ,
  map ,
  reducei ,
  getValues ,
  getKeys ,
  
}
/* No side effect */
