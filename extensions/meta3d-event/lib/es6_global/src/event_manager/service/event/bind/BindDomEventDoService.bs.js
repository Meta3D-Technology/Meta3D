

import * as Curry from "../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function addToEventArr(eventName, eventData, getPriorityFunc, eventArrMap) {
  var arr = MutableSparseMap$Meta3dCommonlib.get(eventArrMap, eventName);
  if (arr === undefined) {
    return MutableSparseMap$Meta3dCommonlib.set(eventArrMap, eventName, [eventData]);
  }
  var __x = ArraySt$Meta3dCommonlib.push(arr, eventData);
  return MutableSparseMap$Meta3dCommonlib.set(eventArrMap, eventName, __x.sort(function (eventDataA, eventDataB) {
                  return Curry._1(getPriorityFunc, eventDataB) - Curry._1(getPriorityFunc, eventDataA) | 0;
                }));
}

function removeFromEventArrMapByHandleFunc(eventName, param, eventArrMap) {
  var targetHandleFunc = param[1];
  var getHandleFuncFunc = param[0];
  var arr = MutableSparseMap$Meta3dCommonlib.get(eventArrMap, eventName);
  if (arr !== undefined) {
    return MutableSparseMap$Meta3dCommonlib.set(eventArrMap, eventName, arr.filter(function (domEventData) {
                    return Curry._1(getHandleFuncFunc, domEventData) !== targetHandleFunc;
                  }));
  } else {
    return eventArrMap;
  }
}

export {
  addToEventArr ,
  removeFromEventArrMapByHandleFunc ,
  
}
/* No side effect */
