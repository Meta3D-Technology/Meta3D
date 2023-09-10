

import * as Js_array from "./../../../../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as MutableHashMap$Meta3dCommonlib from "./../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";

function _addEventDataByPriority(eventData, arr) {
  var __x = ArraySt$Meta3dCommonlib.push(arr, eventData);
  return Js_array.sortInPlaceWith((function (eventDataA, eventDataB) {
                return eventDataB.priority - eventDataA.priority | 0;
              }), __x);
}

function _addToEventArr(eventName, eventData, eventArrMap) {
  var arr = MutableHashMap$Meta3dCommonlib.get(eventArrMap, eventName);
  if (arr !== undefined) {
    return MutableHashMap$Meta3dCommonlib.set(eventArrMap, eventName, _addEventDataByPriority(eventData, arr));
  } else {
    return MutableHashMap$Meta3dCommonlib.set(eventArrMap, eventName, [eventData]);
  }
}

function bindGlobalEvent(eventName, priority, handleFunc, state) {
  var eventData = state.eventData;
  return {
          eventData: {
            domEventStreamSubscription: eventData.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventData.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventData.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventData.touchDomEventDataArrMap,
            customGlobalEventArrMap: _addToEventArr(eventName, {
                  priority: priority,
                  handleFunc: handleFunc
                }, eventData.customGlobalEventArrMap),
            customGlobalEventArrMap2: eventData.customGlobalEventArrMap2,
            mouseEventData: eventData.mouseEventData,
            keyboardEventData: eventData.keyboardEventData,
            touchEventData: eventData.touchEventData
          },
          canvas: state.canvas,
          body: state.body,
          browser: state.browser
        };
}

function bindGlobalEvent2(eventName, priority, handleFunc, state) {
  var eventData = state.eventData;
  return {
          eventData: {
            domEventStreamSubscription: eventData.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventData.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventData.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventData.touchDomEventDataArrMap,
            customGlobalEventArrMap: eventData.customGlobalEventArrMap,
            customGlobalEventArrMap2: _addToEventArr(eventName, {
                  priority: priority,
                  handleFunc: handleFunc
                }, eventData.customGlobalEventArrMap2),
            mouseEventData: eventData.mouseEventData,
            keyboardEventData: eventData.keyboardEventData,
            touchEventData: eventData.touchEventData
          },
          canvas: state.canvas,
          body: state.body,
          browser: state.browser
        };
}

function _removeFromEventArrByHandleFunc(arr, targetHandleFunc) {
  return Js_array.filter((function (param) {
                return param.handleFunc !== targetHandleFunc;
              }), arr);
}

function _removeFromEventArrMapByHandleFunc(eventName, handleFunc, eventArrMap) {
  var arr = MutableHashMap$Meta3dCommonlib.get(eventArrMap, eventName);
  if (arr !== undefined) {
    return MutableHashMap$Meta3dCommonlib.set(eventArrMap, eventName, _removeFromEventArrByHandleFunc(arr, handleFunc));
  } else {
    return eventArrMap;
  }
}

function unbindGlobalEventByHandleFunc(eventName, handleFunc, state) {
  var eventData = state.eventData;
  return {
          eventData: {
            domEventStreamSubscription: eventData.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventData.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventData.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventData.touchDomEventDataArrMap,
            customGlobalEventArrMap: _removeFromEventArrMapByHandleFunc(eventName, handleFunc, eventData.customGlobalEventArrMap),
            customGlobalEventArrMap2: eventData.customGlobalEventArrMap2,
            mouseEventData: eventData.mouseEventData,
            keyboardEventData: eventData.keyboardEventData,
            touchEventData: eventData.touchEventData
          },
          canvas: state.canvas,
          body: state.body,
          browser: state.browser
        };
}

export {
  _addEventDataByPriority ,
  _addToEventArr ,
  bindGlobalEvent ,
  bindGlobalEvent2 ,
  _removeFromEventArrByHandleFunc ,
  _removeFromEventArrMapByHandleFunc ,
  unbindGlobalEventByHandleFunc ,
}
/* No side effect */
