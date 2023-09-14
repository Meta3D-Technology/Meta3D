

import * as Caml_option from "../../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as MutableHashMap$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function _getKeyCode(keyboardDomEvent) {
  return keyboardDomEvent.keyCode;
}

function _getShiftKey(keyboardDomEvent) {
  return keyboardDomEvent.shiftKey;
}

function _getKeyFromSpecialKeyMap(keyCode, $$char, specialKeyMap) {
  var key = MutableSparseMap$Meta3dCommonlib.get(specialKeyMap, keyCode);
  if (key !== undefined) {
    return Caml_option.valFromOption(key);
  } else {
    return $$char;
  }
}

function _handleShiftKey(keyCode, $$char, param) {
  var upperCaseChar = MutableSparseMap$Meta3dCommonlib.get(param[0], keyCode);
  if (upperCaseChar !== undefined) {
    return upperCaseChar;
  }
  var upperCaseChar$1 = MutableHashMap$Meta3dCommonlib.get(param[1], $$char);
  if (upperCaseChar$1 !== undefined) {
    return upperCaseChar$1;
  } else {
    return _getKeyFromSpecialKeyMap(keyCode, $$char, param[2]);
  }
}

function _getKey(keyboardDomEvent, param) {
  var keyboardEventData = param.eventData.keyboardEventData;
  var specialKeyMap = keyboardEventData.specialKeyMap;
  var keyCode = keyboardDomEvent.keyCode;
  var $$char = String.fromCharCode(keyCode).toLowerCase();
  if (keyboardDomEvent.shiftKey) {
    return _handleShiftKey(keyCode, $$char, [
                keyboardEventData.shiftKeyByKeyCodeMap,
                keyboardEventData.shiftKeyByCharCodeMap,
                specialKeyMap
              ]);
  } else {
    return _getKeyFromSpecialKeyMap(keyCode, $$char, specialKeyMap);
  }
}

function _convertKeyboardDomEventToKeyboardEvent(eventName, keyboardDomEvent, state) {
  return {
          name: eventName,
          keyCode: keyboardDomEvent.keyCode,
          ctrlKey: keyboardDomEvent.ctrlKey,
          altKey: keyboardDomEvent.altKey,
          shiftKey: keyboardDomEvent.shiftKey,
          metaKey: keyboardDomEvent.metaKey,
          key: _getKey(keyboardDomEvent, state),
          event: keyboardDomEvent
        };
}

function execEventHandle(state, eventName, keyboardDomEvent) {
  var arr = MutableSparseMap$Meta3dCommonlib.get(state.eventData.keyboardDomEventDataArrMap, eventName);
  if (arr !== undefined) {
    return ArraySt$Meta3dCommonlib.reduceOneParam(arr, (function (state, param) {
                  return param.handleFunc(_convertKeyboardDomEventToKeyboardEvent(eventName, keyboardDomEvent, state), state);
                }), state);
  } else {
    return state;
  }
}

export {
  _getKeyCode ,
  _getShiftKey ,
  _getKeyFromSpecialKeyMap ,
  _handleShiftKey ,
  _getKey ,
  _convertKeyboardDomEventToKeyboardEvent ,
  execEventHandle ,
}
/* No side effect */
