

import * as BindDomEventDoService$Meta3dEvent from "./BindDomEventDoService.bs.js";

function _addToEventArr(eventName, eventData, eventArrMap) {
  return BindDomEventDoService$Meta3dEvent.addToEventArr(eventName, eventData, (function (param) {
                return param.priority;
              }), eventArrMap);
}

function _removeFromEventArrMapByHandleFunc(eventName, targetHandleFunc, eventArrMap) {
  return BindDomEventDoService$Meta3dEvent.removeFromEventArrMapByHandleFunc(eventName, [
              (function (param) {
                  return param.handleFunc;
                }),
              targetHandleFunc
            ], eventArrMap);
}

function bind(eventName, priority, handleFunc, state) {
  var eventData = state.eventData;
  return {
          eventData: {
            domEventStreamSubscription: eventData.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventData.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: _addToEventArr(eventName, {
                  priority: priority,
                  handleFunc: handleFunc
                }, eventData.keyboardDomEventDataArrMap),
            touchDomEventDataArrMap: eventData.touchDomEventDataArrMap,
            customGlobalEventArrMap: eventData.customGlobalEventArrMap,
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

function unbindByHandleFunc(eventName, handleFunc, state) {
  var eventData = state.eventData;
  return {
          eventData: {
            domEventStreamSubscription: eventData.domEventStreamSubscription,
            mouseDomEventDataArrMap: eventData.mouseDomEventDataArrMap,
            keyboardDomEventDataArrMap: _removeFromEventArrMapByHandleFunc(eventName, handleFunc, eventData.keyboardDomEventDataArrMap),
            touchDomEventDataArrMap: eventData.touchDomEventDataArrMap,
            customGlobalEventArrMap: eventData.customGlobalEventArrMap,
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
  _addToEventArr ,
  _removeFromEventArrMapByHandleFunc ,
  bind ,
  unbindByHandleFunc ,
}
/* No side effect */
