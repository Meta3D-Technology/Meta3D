

import * as Js_array from "./../../../../../../rescript/lib/es6/js_array.js";
import * as Caml_option from "./../../../../../../rescript/lib/es6/caml_option.js";
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
  var value = map[key];
  if (NullUtils$Meta3dCommonlib.isUndefined(value)) {
    return null;
  } else {
    return value;
  }
}

function has(map, key) {
  return !NullUtils$Meta3dCommonlib.isEmpty(map[key]);
}

function map(map$1, func) {
  return Js_array.map((function (value) {
                if (NullUtils$Meta3dCommonlib.isNotInMap(value)) {
                  return ;
                } else {
                  return func(value);
                }
              }), map$1);
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
  return Js_array.filter(NullUtils$Meta3dCommonlib.isInMap, map);
}

function getKeys(map) {
  return ArraySt$Meta3dCommonlib.reduceOneParami(map, (function (arr, value, key) {
                if (NullUtils$Meta3dCommonlib.isNotInMap(value)) {
                  return arr;
                } else {
                  Js_array.push(key, arr);
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
