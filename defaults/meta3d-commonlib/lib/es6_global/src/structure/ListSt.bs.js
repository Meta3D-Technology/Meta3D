

import * as Curry from "./../../../../../rescript/lib/es6/curry.js";
import * as Js_array from "./../../../../../rescript/lib/es6/js_array.js";
import * as Belt_List from "./../../../../../rescript/lib/es6/belt_List.js";
import * as Result$Meta3dCommonlib from "./Result.bs.js";
import * as OptionSt$Meta3dCommonlib from "./OptionSt.bs.js";
import * as PromiseSt$Meta3dCommonlib from "./PromiseSt.bs.js";
import * as MutableHashMap$Meta3dCommonlib from "./hash_map/MutableHashMap.bs.js";

function traverseResultM(list, f) {
  if (!list) {
    return Result$Meta3dCommonlib.succeed(/* [] */0);
  }
  var tail = list.tl;
  return Result$Meta3dCommonlib.bind(Curry._1(f, list.hd), (function (h) {
                return Result$Meta3dCommonlib.bind(traverseResultM(tail, f), (function (t) {
                              return Result$Meta3dCommonlib.succeed({
                                          hd: h,
                                          tl: t
                                        });
                            }));
              }));
}

function traverseResultMi(list, f) {
  var _traverse = function (list, i, f) {
    if (!list) {
      return Result$Meta3dCommonlib.succeed(/* [] */0);
    }
    var tail = list.tl;
    return Result$Meta3dCommonlib.bind(Curry._2(f, i, list.hd), (function (h) {
                  return Result$Meta3dCommonlib.bind(_traverse(tail, i + 1 | 0, f), (function (t) {
                                return Result$Meta3dCommonlib.succeed({
                                            hd: h,
                                            tl: t
                                          });
                              }));
                }));
  };
  return _traverse(list, 0, f);
}

function traverseReduceResultM(list, param, f) {
  if (!list) {
    return Result$Meta3dCommonlib.succeed(param);
  }
  var tail = list.tl;
  return Result$Meta3dCommonlib.bind(Curry._2(f, param, list.hd), (function (h) {
                return traverseReduceResultM(tail, h, f);
              }));
}

function traverseReducePromiseM(list, param, f) {
  if (!list) {
    return Promise.resolve(param);
  }
  var tail = list.tl;
  return PromiseSt$Meta3dCommonlib.bind(Curry._2(f, param, list.hd), (function (h) {
                return traverseReducePromiseM(tail, h, f);
              }));
}

function _id(value) {
  return value;
}

function sequenceResultM(list) {
  return traverseResultM(list, _id);
}

function ignoreTraverseResultValue(traverseResult) {
  return Result$Meta3dCommonlib.mapSuccess(traverseResult, (function (param) {
                
              }));
}

function range(start, end_) {
  return Belt_List.makeBy((end_ + 1 | 0) - start | 0, (function (i) {
                return i + start | 0;
              }));
}

var map = Belt_List.map;

var mapi = Belt_List.mapWithIndex;

function _eq(source, target) {
  return source === target;
}

function push(list, value) {
  return Belt_List.concat(list, {
              hd: value,
              tl: /* [] */0
            });
}

function remove(list, value) {
  return Belt_List.filter(list, (function (v) {
                return v !== value;
              }));
}

function getLast(list) {
  return Belt_List.get(list, Belt_List.length(list) - 1 | 0);
}

function removeDuplicateItemsU(list, buildKeyFunc) {
  var arr = Belt_List.toArray(list);
  var resultArr = [];
  var map = MutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  for(var i = 0 ,i_finish = arr.length; i < i_finish; ++i){
    var item = arr[i];
    var key = Curry._1(buildKeyFunc, item);
    var match = MutableHashMap$Meta3dCommonlib.get(map, key);
    if (match !== undefined) {
      
    } else {
      Js_array.push(item, resultArr);
      MutableHashMap$Meta3dCommonlib.set(map, key, item);
    }
  }
  return Belt_List.fromArray(resultArr);
}

function removeDuplicateItems(list) {
  return removeDuplicateItemsU(list, (function (prim) {
                return prim.toString();
              }));
}

var addInReduce = push;

function find(list, func) {
  return Belt_List.head(Belt_List.filter(list, func));
}

function includes(list, value) {
  return Belt_List.has(list, value, _eq);
}

function includesByFunc(list, func) {
  return OptionSt$Meta3dCommonlib.isSome(Belt_List.head(Belt_List.filter(list, func)));
}

var getBy = Belt_List.getBy;

var reduce = Belt_List.reduce;

var reducei = Belt_List.reduceWithIndex;

var forEach = Belt_List.forEach;

var forEachi = Belt_List.forEachWithIndex;

var concat = Belt_List.concat;

var toArray = Belt_List.toArray;

var fromArray = Belt_List.fromArray;

var filter = Belt_List.filter;

var length = Belt_List.length;

var head = Belt_List.head;

var tail = Belt_List.tail;

var nth = Belt_List.get;

var reverse = Belt_List.reverse;

var zip = Belt_List.zip;

var zipBy = Belt_List.zipBy;

var splitAt = Belt_List.splitAt;

export {
  traverseResultM ,
  traverseResultMi ,
  traverseReduceResultM ,
  traverseReducePromiseM ,
  _id ,
  sequenceResultM ,
  ignoreTraverseResultValue ,
  range ,
  map ,
  mapi ,
  _eq ,
  getBy ,
  reduce ,
  reducei ,
  forEach ,
  forEachi ,
  concat ,
  push ,
  toArray ,
  fromArray ,
  remove ,
  filter ,
  length ,
  head ,
  tail ,
  nth ,
  getLast ,
  removeDuplicateItemsU ,
  removeDuplicateItems ,
  reverse ,
  zip ,
  zipBy ,
  splitAt ,
  addInReduce ,
  find ,
  includes ,
  includesByFunc ,
}
/* No side effect */
