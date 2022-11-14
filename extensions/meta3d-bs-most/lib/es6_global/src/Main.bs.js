

import * as Most from "most";
import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_array from "../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";

var _isFromEventStream = (function(stream){ var source = stream.source; return !!source.event && !!source.source; });

function concatArray(streamArr) {
  var match = streamArr.length;
  if (match !== 0) {
    return ArraySt$Meta3dCommonlib.reduceOneParam(ArraySt$Meta3dCommonlib.sliceFrom(streamArr, 1), (function (stream1, stream2) {
                  _isFromEventStream(stream1) === true;
                  return stream1.concat(stream2);
                }), Caml_array.get(streamArr, 0));
  } else {
    return Most.just(1);
  }
}

function callFunc(func) {
  var __x = Most.just(func);
  return Most.map((function (func) {
                return Curry._1(func, undefined);
              }), __x);
}

function getExtensionService(api, param) {
  return {
          tap: (function (prim0, prim1) {
              return Most.tap(prim0, prim1);
            }),
          filter: (function (prim0, prim1) {
              return Most.filter(prim0, prim1);
            }),
          take: (function (prim0, prim1) {
              return Most.take(prim0, prim1);
            }),
          fromEvent: (function (prim0, prim1, prim2) {
              return Most.fromEvent(prim0, prim1, prim2);
            }),
          fromPromise: (function (prim) {
              return Most.fromPromise(prim);
            }),
          just: (function (prim) {
              return Most.just(prim);
            }),
          concat: (function (prim0, prim1) {
              return prim1.concat(prim0);
            }),
          map: (function (prim0, prim1) {
              return Most.map(prim0, prim1);
            }),
          flatMap: (function (prim0, prim1) {
              return Most.flatMap(prim0, prim1);
            }),
          mergeArray: (function (prim) {
              return Most.mergeArray(prim);
            }),
          concatArray: concatArray,
          callFunc: callFunc,
          drain: (function (prim) {
              return Most.drain(prim);
            })
        };
}

function createExtensionState(param) {
  
}

function getExtensionLife(param, param$1) {
  return {
          onRegister: null,
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

export {
  _isFromEventStream ,
  concatArray ,
  callFunc ,
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
  
}
/* most Not a pure module */
