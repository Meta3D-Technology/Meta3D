

import * as Curry from "./../../../../../rescript/lib/es6/curry.js";
import * as Belt_Array from "./../../../../../rescript/lib/es6/belt_Array.js";
import * as Caml_array from "./../../../../../rescript/lib/es6/caml_array.js";
import * as Caml_option from "./../../../../../rescript/lib/es6/caml_option.js";
import * as Log$Meta3dCommonlib from "../log/Log.bs.js";
import * as Contract$Meta3dCommonlib from "../contract/Contract.bs.js";
import * as OptionSt$Meta3dCommonlib from "./OptionSt.bs.js";
import * as PromiseSt$Meta3dCommonlib from "./PromiseSt.bs.js";

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

function traverseReducePromiseM(arr, func, param) {
  if (arr.length === 0) {
    return Promise.resolve(param);
  } else {
    return PromiseSt$Meta3dCommonlib.bind(func(param, Caml_array.get(arr, 0)), (function (h) {
                  return traverseReducePromiseM(arr.slice(1), func, h);
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

function filter(arr, func) {
  return arr.filter(Curry.__1(func));
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

export {
  length ,
  find ,
  includes ,
  includesByFunc ,
  sliceFrom ,
  reduceOneParam ,
  reduceOneParami ,
  traverseReducePromiseM ,
  unsafeGetFirst ,
  getFirst ,
  push ,
  forEach ,
  map ,
  filter ,
  deleteBySwap ,
  range ,
  
}
/* No side effect */
