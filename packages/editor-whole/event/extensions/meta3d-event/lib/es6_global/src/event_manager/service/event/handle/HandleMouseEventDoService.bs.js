

import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as MouseEventDoService$Meta3dEvent from "../MouseEventDoService.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as HandlePointDomEventDoService$Meta3dEvent from "./HandlePointDomEventDoService.bs.js";

function getLocation(mouseDomEvent, state) {
  return [
          mouseDomEvent.pageX,
          mouseDomEvent.pageY
        ];
}

function getLocationInView(mouseDomEvent, state) {
  return HandlePointDomEventDoService$Meta3dEvent.getLocationInView(mouseDomEvent, getLocation, state);
}

function getButton(mouseDomEvent, state) {
  var match = mouseDomEvent.which;
  switch (match) {
    case 0 :
        return /* NoButton */0;
    case 1 :
        return /* Left */1;
    case 2 :
        return /* Center */3;
    case 3 :
        return /* Right */2;
    default:
      throw {
            RE_EXN_ID: "Match_failure",
            _1: [
              "HandleMouseEventDoService.res",
              47,
              2
            ],
            Error: new Error()
          };
  }
}

function _getFromWheelDelta(mouseDomEvent) {
  var wheelData = mouseDomEvent.wheelDelta;
  if (!(wheelData == null)) {
    return wheelData / 120 | 0;
  } else {
    return 0;
  }
}

function getWheel(mouseDomEvent) {
  var detail = mouseDomEvent.detail;
  if (!(detail == null) && detail !== 0) {
    return Math.imul(-1, detail);
  } else {
    return _getFromWheelDelta(mouseDomEvent);
  }
}

var _isPointerLocked = (function() {
  return !!(
    document.pointerLockElement
    || document.mozPointerLockElement
    || document.webkitPointerLockElement
  );
  });

function _getMovementDeltaWhenPointerLocked(mouseDomEvent) {
  var movementX = mouseDomEvent.movementX;
  var tmp;
  if (movementX == null) {
    var webkitMovementX = mouseDomEvent.webkitMovementX;
    if (webkitMovementX == null) {
      var mozMovementX = mouseDomEvent.mozMovementX;
      tmp = (mozMovementX == null) ? 0 : mozMovementX;
    } else {
      tmp = webkitMovementX;
    }
  } else {
    tmp = movementX;
  }
  var movementY = mouseDomEvent.movementY;
  var tmp$1;
  if (movementY == null) {
    var webkitMovementY = mouseDomEvent.webkitMovementY;
    if (webkitMovementY == null) {
      var mozMovementY = mouseDomEvent.mozMovementY;
      tmp$1 = (mozMovementY == null) ? 0 : mozMovementY;
    } else {
      tmp$1 = webkitMovementY;
    }
  } else {
    tmp$1 = movementY;
  }
  return [
          tmp,
          tmp$1
        ];
}

function getMovementDelta(mouseDomEvent, state) {
  if (_isPointerLocked()) {
    return _getMovementDeltaWhenPointerLocked(mouseDomEvent);
  } else {
    return HandlePointDomEventDoService$Meta3dEvent.getMovementDelta(getLocation(mouseDomEvent, state), MouseEventDoService$Meta3dEvent.getLastXY(state.eventData), state);
  }
}

function convertMouseDomEventToMouseEvent(eventName, mouseDomEvent, state) {
  return {
          name: eventName,
          location: getLocation(mouseDomEvent, state),
          locationInView: HandlePointDomEventDoService$Meta3dEvent.getLocationInView(mouseDomEvent, getLocation, state),
          button: getButton(mouseDomEvent, state),
          wheel: getWheel(mouseDomEvent),
          movementDelta: getMovementDelta(mouseDomEvent, state),
          event: mouseDomEvent
        };
}

function execEventHandle(state, mouseEvent) {
  var arr = MutableSparseMap$Meta3dCommonlib.get(state.eventData.mouseDomEventDataArrMap, mouseEvent.name);
  if (arr !== undefined) {
    return ArraySt$Meta3dCommonlib.reduceOneParam(arr, (function (state, param) {
                  return param.handleFunc(mouseEvent, state);
                }), state);
  } else {
    return state;
  }
}

function setLastXY(state, lastX, lastY) {
  return {
          eventData: MouseEventDoService$Meta3dEvent.setLastXY(lastX, lastY, state.eventData),
          canvas: state.canvas,
          body: state.body,
          browser: state.browser
        };
}

function setLastXYByLocation(state, mouseEvent) {
  var $$location = mouseEvent.location;
  return setLastXY(state, $$location[0], $$location[1]);
}

function getIsDrag(state) {
  return state.eventData.mouseEventData.isDrag;
}

function setIsDrag(state, isDrag) {
  var eventData = state.eventData;
  var init = eventData.mouseEventData;
  return {
          eventData: {
            domEventStreamSubscription: eventData.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventData.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventData.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventData.touchDomEventDataArrMap,
            customGlobalEventArrMap: eventData.customGlobalEventArrMap,
            customGlobalEventArrMap2: eventData.customGlobalEventArrMap2,
            customGlobalEventArrMap3: eventData.customGlobalEventArrMap3,
            mouseEventData: {
              lastX: init.lastX,
              lastY: init.lastY,
              isDrag: isDrag
            },
            keyboardEventData: eventData.keyboardEventData,
            touchEventData: eventData.touchEventData
          },
          canvas: state.canvas,
          body: state.body,
          browser: state.browser
        };
}

function setLastXYWhenMouseMove(state, mouseEvent) {
  if (getIsDrag(state)) {
    return state;
  } else {
    return setLastXYByLocation(state, mouseEvent);
  }
}

export {
  getLocation ,
  getLocationInView ,
  getButton ,
  _getFromWheelDelta ,
  getWheel ,
  _isPointerLocked ,
  _getMovementDeltaWhenPointerLocked ,
  getMovementDelta ,
  convertMouseDomEventToMouseEvent ,
  execEventHandle ,
  setLastXY ,
  setLastXYByLocation ,
  getIsDrag ,
  setIsDrag ,
  setLastXYWhenMouseMove ,
}
/* No side effect */
