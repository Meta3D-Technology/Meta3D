

import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as TouchEventDoService$Meta3dEvent from "../TouchEventDoService.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as HandlePointDomEventDoService$Meta3dEvent from "./HandlePointDomEventDoService.bs.js";

function _getTouchData(touchDomEvent) {
  var changedTouches = touchDomEvent.changedTouches;
  var touchDataJsObj = changedTouches[0];
  return {
          clientX: touchDataJsObj.clientX,
          clientY: touchDataJsObj.clientY,
          pageX: touchDataJsObj.pageX,
          pageY: touchDataJsObj.pageY,
          identifier: touchDataJsObj.identifier,
          screenX: touchDataJsObj.screenX,
          screenY: touchDataJsObj.screenY,
          radiusX: touchDataJsObj.radiusX,
          radiusY: touchDataJsObj.radiusY,
          rotationAngle: touchDataJsObj.rotationAngle,
          force: touchDataJsObj.force
        };
}

function _getLocation(touchDomEvent, state) {
  var match = _getTouchData(touchDomEvent);
  return [
          match.pageX,
          match.pageY
        ];
}

function _getLocationInView(touchDomEvent, state) {
  return HandlePointDomEventDoService$Meta3dEvent.getLocationInView(touchDomEvent, _getLocation, state);
}

function _getMovementDelta(touchDomEvent, state) {
  return HandlePointDomEventDoService$Meta3dEvent.getMovementDelta(_getLocation(touchDomEvent, state), TouchEventDoService$Meta3dEvent.getLastXY(state.eventData), state);
}

function _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, state) {
  return {
          name: eventName,
          location: _getLocation(touchDomEvent, state),
          locationInView: HandlePointDomEventDoService$Meta3dEvent.getLocationInView(touchDomEvent, _getLocation, state),
          touchData: _getTouchData(touchDomEvent),
          movementDelta: _getMovementDelta(touchDomEvent, state),
          event: touchDomEvent
        };
}

function execEventHandle(state, eventName, touchDomEvent) {
  var arr = MutableSparseMap$Meta3dCommonlib.get(state.eventData.touchDomEventDataArrMap, eventName);
  if (arr !== undefined) {
    return ArraySt$Meta3dCommonlib.reduceOneParam(arr, (function (state, param) {
                  return param.handleFunc(_convertTouchDomEventToTouchEvent(eventName, touchDomEvent, state), state);
                }), state);
  } else {
    return state;
  }
}

function setLastXY(state, lastX, lastY) {
  return {
          eventData: TouchEventDoService$Meta3dEvent.setLastXY(lastX, lastY, state.eventData),
          canvas: state.canvas,
          body: state.body,
          browser: state.browser
        };
}

function setLastXYByLocation(state, eventName, touchDomEvent) {
  var match = _convertTouchDomEventToTouchEvent(eventName, touchDomEvent, state);
  var $$location = match.location;
  return setLastXY(state, $$location[0], $$location[1]);
}

function getIsDrag(state) {
  return state.eventData.touchEventData.isDrag;
}

function setIsDrag(state, isDrag) {
  var eventData = state.eventData;
  var init = eventData.touchEventData;
  return {
          eventData: {
            domEventStreamSubscription: eventData.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventData.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: eventData.keyboardDomEventDataArrMap,
            touchDomEventDataArrMap: eventData.touchDomEventDataArrMap,
            customGlobalEventArrMap: eventData.customGlobalEventArrMap,
            customGlobalEventArrMap2: eventData.customGlobalEventArrMap2,
            mouseEventData: eventData.mouseEventData,
            keyboardEventData: eventData.keyboardEventData,
            touchEventData: {
              lastX: init.lastX,
              lastY: init.lastY,
              isDrag: isDrag
            }
          },
          canvas: state.canvas,
          body: state.body,
          browser: state.browser
        };
}

function setLastXYWhenTouchMove(state, eventName, touchDomEvent) {
  if (getIsDrag(state)) {
    return state;
  } else {
    return setLastXYByLocation(state, eventName, touchDomEvent);
  }
}

export {
  _getTouchData ,
  _getLocation ,
  _getLocationInView ,
  _getMovementDelta ,
  _convertTouchDomEventToTouchEvent ,
  execEventHandle ,
  setLastXY ,
  setLastXYByLocation ,
  getIsDrag ,
  setIsDrag ,
  setLastXYWhenTouchMove ,
}
/* No side effect */
