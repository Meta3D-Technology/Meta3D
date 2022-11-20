

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Belt_Array from "../../../../../../node_modules/rescript/lib/es6/belt_Array.js";
import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
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
  return Caml_option.undefined_to_opt(arr.find(Curry.__1(func)));
}

function includes(arr, value) {
  return arr.includes(value);
}

function includesByFunc(arr, func) {
  return OptionSt$Meta3dCommonlib.isSome(find(arr, func));
}

function sliceFrom(arr, index) {
  return arr.slice(index);
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
                  return Result$Meta3dCommonlib.bind(traverseResultM(arr.slice(1), func), (function (t) {
                                return Result$Meta3dCommonlib.succeed([h].concat(t));
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
                  return traverseReducePromiseM(arr.slice(1), func, h);
                }));
  }
}

function traverseReduceResultM(arr, func, param) {
  if (arr.length === 0) {
    return Result$Meta3dCommonlib.succeed(param);
  } else {
    return Result$Meta3dCommonlib.bind(func(param, Caml_array.get(arr, 0)), (function (h) {
                  return traverseReduceResultM(arr.slice(1), func, h);
                }));
  }
}

function unsafeGetFirst(arr) {
  return arr[0];
}

function getFirst(arr) {
  if (arr.length === 1) {
    return Caml_option.some(Caml_array.get(arr, 0));
  }
  
}

function push(arr, value) {
  arr.push(value);
  return arr;
}

function forEach(arr, func) {
  arr.forEach(Curry.__1(func));
  
}

function map(arr, func) {
  return arr.map(Curry.__1(func));
}

function mapi(arr, func) {
  return arr.map(Curry.__2(func));
}

function filter(arr, func) {
  return arr.filter(Curry.__1(func));
}

function reverse(arr) {
  return arr.slice().reverse();
}

function deleteBySwap(arr, isDebug, index, lastIndex) {
  Contract$Meta3dCommonlib.requireCheck((function (param) {
          var len = arr.length;
          return Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("lastIndex:" + lastIndex + " === arr.length:" + len, "not"), (function (param) {
                        return Contract$Meta3dCommonlib.assertEqual(/* Int */0, arr.length - 1 | 0, lastIndex);
                      }));
        }), isDebug);
  arr[index] = arr[lastIndex];
  arr.pop();
  
}

function range(a, b) {
  var result = [];
  for(var i = a; i <= b; ++i){
    result.push(i);
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
      resultArr.push(item);
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
      resultArr.push(item);
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

export {
  _getExn ,
  getExn ,
  length ,
  find ,
  includes ,
  includesByFunc ,
  sliceFrom ,
  copy ,
  reduceOneParam ,
  reduceOneParami ,
  traverseResultM ,
  _id ,
  sequenceResultM ,
  traverseReducePromiseM ,
  traverseReduceResultM ,
  unsafeGetFirst ,
  getFirst ,
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
  
}
/* No side effect */
