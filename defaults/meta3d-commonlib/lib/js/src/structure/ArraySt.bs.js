'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Log$Meta3dCommonlib = require("../log/Log.bs.js");
var Contract$Meta3dCommonlib = require("../contract/Contract.bs.js");
var OptionSt$Meta3dCommonlib = require("./OptionSt.bs.js");
var PromiseSt$Meta3dCommonlib = require("./PromiseSt.bs.js");

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

exports.length = length;
exports.find = find;
exports.includes = includes;
exports.includesByFunc = includesByFunc;
exports.sliceFrom = sliceFrom;
exports.reduceOneParam = reduceOneParam;
exports.reduceOneParami = reduceOneParami;
exports.traverseReducePromiseM = traverseReducePromiseM;
exports.unsafeGetFirst = unsafeGetFirst;
exports.getFirst = getFirst;
exports.push = push;
exports.forEach = forEach;
exports.map = map;
exports.filter = filter;
exports.deleteBySwap = deleteBySwap;
exports.range = range;
/* No side effect */
