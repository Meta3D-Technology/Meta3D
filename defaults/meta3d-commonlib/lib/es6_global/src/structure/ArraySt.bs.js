

import * as Curry from "./../../../../../rescript/lib/es6/curry.js";
import * as Js_array from "./../../../../../rescript/lib/es6/js_array.js";
import * as Belt_Array from "./../../../../../rescript/lib/es6/belt_Array.js";
import * as Caml_array from "./../../../../../rescript/lib/es6/caml_array.js";
import * as Caml_option from "./../../../../../rescript/lib/es6/caml_option.js";
import * as Log$Meta3dCommonlib from "../log/Log.bs.js";
import * as Result$Meta3dCommonlib from "./Result.bs.js";
import * as Contract$Meta3dCommonlib from "../contract/Contract.bs.js";
import * as OptionSt$Meta3dCommonlib from "./OptionSt.bs.js";
import * as PromiseSt$Meta3dCommonlib from "./PromiseSt.bs.js";
import * as MutableHashMap$Meta3dCommonlib from "./hash_map/MutableHashMap.bs.js";

var _getExn = ((nullableData) => { if (nullableData !== undefined) { return nullableData; } throw new Error("Not_found") });

function getExn(arr, index) {
  return _getExn(arr[index]);
}

function length(prim) {
  return prim.length;
}

function find(arr, func) {
  return Js_array.find(func, arr);
}

function includes(arr, value) {
  return Js_array.includes(value, arr);
}

function includesByFunc(arr, func) {
  return OptionSt$Meta3dCommonlib.isSome(Js_array.find(func, arr));
}

function sliceFrom(arr, index) {
  return Js_array.sliceFrom(index, arr);
}

function slice(arr, start, end_) {
  return Js_array.slice(start, end_, arr);
}

function copy(prim) {
  return prim.slice();
}

function reduceOneParam(arr, func, param) {
  return Belt_Array.reduceU(arr, param, func);
}

function reduceOneParami(arr, func, param) {
  var mutableParam = param;
  for(var i = 0 ,i_finish = arr.length; i < i_finish; ++i){
    mutableParam = func(mutableParam, arr[i], i);
  }
  return mutableParam;
}

function traverseResultM(arr, func) {
  if (arr.length === 0) {
    return Result$Meta3dCommonlib.succeed([]);
  } else {
    return Result$Meta3dCommonlib.bind(Curry._1(func, _getExn(arr[0])), (function (h) {
                  return Result$Meta3dCommonlib.bind(traverseResultM(Js_array.sliceFrom(1, arr), func), (function (t) {
                                return Result$Meta3dCommonlib.succeed(Js_array.concat(t, [h]));
                              }));
                }));
  }
}

function _id(value) {
  return value;
}

function sequenceResultM(arr) {
  return traverseResultM(arr, _id);
}

function traverseReducePromiseM(arr, func, param) {
  if (arr.length === 0) {
    return Promise.resolve(param);
  } else {
    return PromiseSt$Meta3dCommonlib.bind(func(param, Caml_array.get(arr, 0)), (function (h) {
                  return traverseReducePromiseM(Js_array.sliceFrom(1, arr), func, h);
                }));
  }
}

function _traverseReducePromiseIM(arr, func, param, index) {
  if (arr.length === 0) {
    return Promise.resolve(param);
  } else {
    return PromiseSt$Meta3dCommonlib.bind(func(param, Caml_array.get(arr, 0), index), (function (h) {
                  return _traverseReducePromiseIM(Js_array.sliceFrom(1, arr), func, h, index + 1 | 0);
                }));
  }
}

function traverseReducePromiseIM(arr, func, param) {
  return _traverseReducePromiseIM(arr, func, param, 0);
}

function traverseReduceResultM(arr, func, param) {
  if (arr.length === 0) {
    return Result$Meta3dCommonlib.succeed(param);
  } else {
    return Result$Meta3dCommonlib.bind(func(param, Caml_array.get(arr, 0)), (function (h) {
                  return traverseReduceResultM(Js_array.sliceFrom(1, arr), func, h);
                }));
  }
}

function unsafeGetFirst(arr) {
  return arr[0];
}

function getFirst(arr) {
  if (arr.length >= 1) {
    return Caml_option.some(Caml_array.get(arr, 0));
  }
  
}

function getLast(arr) {
  if (arr.length >= 1) {
    return Caml_option.some(Caml_array.get(arr, arr.length - 1 | 0));
  }
  
}

function push(arr, value) {
  Js_array.push(value, arr);
  return arr;
}

function forEach(arr, func) {
  Js_array.forEach(func, arr);
}

function map(arr, func) {
  return Js_array.map(func, arr);
}

function mapi(arr, func) {
  return Js_array.mapi(func, arr);
}

function filter(arr, func) {
  return Js_array.filter(func, arr);
}

function reverse(arr) {
  return arr.slice().reverse();
}

function deleteBySwap(arr, isDebug, index, lastIndex) {
  Contract$Meta3dCommonlib.requireCheck((function (param) {
          var len = arr.length;
          Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("lastIndex:" + lastIndex + " === arr.length:" + len, "not"), (function (param) {
                  return Contract$Meta3dCommonlib.assertEqual(/* Int */0, arr.length - 1 | 0, lastIndex);
                }));
        }), isDebug);
  arr[index] = arr[lastIndex];
  arr.pop();
}

function range(a, b) {
  var result = [];
  for(var i = a; i <= b; ++i){
    Js_array.push(i, result);
  }
  return result;
}

function removeDuplicateItems(arr) {
  var resultArr = [];
  var map = MutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  for(var i = 0 ,i_finish = arr.length; i < i_finish; ++i){
    var item = arr[i];
    var key = item.toString();
    var match = MutableHashMap$Meta3dCommonlib.get(map, key);
    if (match !== undefined) {
      
    } else {
      Js_array.push(item, resultArr);
      MutableHashMap$Meta3dCommonlib.set(map, key, item);
    }
  }
  return resultArr;
}

function removeDuplicateItemsWithBuildKeyFunc(arr, buildKeyFunc) {
  var resultArr = [];
  var map = MutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  for(var i = 0 ,i_finish = arr.length; i < i_finish; ++i){
    var item = arr[i];
    var key = buildKeyFunc(item);
    var match = MutableHashMap$Meta3dCommonlib.get(map, key);
    if (match !== undefined) {
      
    } else {
      Js_array.push(item, resultArr);
      MutableHashMap$Meta3dCommonlib.set(map, key, item);
    }
  }
  return resultArr;
}

function chunk(arr, size) {
  var match = Belt_Array.reduceU(arr, [
        [],
        []
      ], (function (param, value) {
          var group = param[1];
          var result = param[0];
          if (group.length < size) {
            return [
                    result,
                    push(group, value)
                  ];
          } else {
            return [
                    push(result, group),
                    [value]
                  ];
          }
        }));
  var group = match[1];
  var result = match[0];
  if (group.length > 0) {
    return push(result, group);
  } else {
    return result;
  }
}

function sort(arr, func) {
  return Js_array.sortInPlaceWith(func, arr);
}

export {
  _getExn ,
  getExn ,
  length ,
  find ,
  includes ,
  includesByFunc ,
  sliceFrom ,
  slice ,
  copy ,
  reduceOneParam ,
  reduceOneParami ,
  traverseResultM ,
  _id ,
  sequenceResultM ,
  traverseReducePromiseM ,
  _traverseReducePromiseIM ,
  traverseReducePromiseIM ,
  traverseReduceResultM ,
  unsafeGetFirst ,
  getFirst ,
  getLast ,
  push ,
  forEach ,
  map ,
  mapi ,
  filter ,
  reverse ,
  deleteBySwap ,
  range ,
  removeDuplicateItems ,
  removeDuplicateItemsWithBuildKeyFunc ,
  chunk ,
  sort ,
}
/* No side effect */
