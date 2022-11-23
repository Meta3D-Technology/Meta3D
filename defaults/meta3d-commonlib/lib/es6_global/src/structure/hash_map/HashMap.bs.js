

import * as Js_dict from "../../../../../../../extensions/meta3d-event/node_modules/rescript/lib/es6/js_dict.js";
import * as Belt_Array from "../../../../../../../extensions/meta3d-event/node_modules/rescript/lib/es6/belt_Array.js";
import * as Caml_option from "../../../../../../../extensions/meta3d-event/node_modules/rescript/lib/es6/caml_option.js";
import * as Js_null_undefined from "../../../../../../../extensions/meta3d-event/node_modules/rescript/lib/es6/js_null_undefined.js";
import * as NullUtils$Meta3dCommonlib from "../utils/NullUtils.bs.js";

function createEmpty(hintSizeOpt, param) {
  return {};
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

var _getExn = ((nullableData) => {
  if (nullableData !== undefined) {
    return nullableData;
  }

  throw new Error("Not_found")
});

function getExn(map, key) {
  return _getExn(map[key]);
}

function getNullable(map, key) {
  return Js_null_undefined.fromOption(get(map, key));
}

function has(map, key) {
  return !NullUtils$Meta3dCommonlib.isEmpty(map[key]);
}

var entries = Js_dict.entries;

function _mutableSet(map, key, value) {
  map[key] = value;
  return map;
}

function _createEmpty(param) {
  return {};
}

function _reduceArray(arr, func, param) {
  return Belt_Array.reduceU(arr, param, func);
}

function copy(map) {
  return Belt_Array.reduceU(Js_dict.entries(map), {}, (function (newMap, param) {
                return _mutableSet(newMap, param[0], param[1]);
              }));
}

function getValidValues(map) {
  var __x = Js_dict.values(map);
  return __x.filter(NullUtils$Meta3dCommonlib.isInMap);
}

export {
  createEmpty ,
  unsafeGet ,
  get ,
  _getExn ,
  getExn ,
  getNullable ,
  has ,
  entries ,
  _mutableSet ,
  _createEmpty ,
  _reduceArray ,
  copy ,
  getValidValues ,
  
}
/* No side effect */
