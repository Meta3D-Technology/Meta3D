

import * as Most from "most";
import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Log$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as BodyDoService$Meta3dEvent from "../dom/BodyDoService.bs.js";
import * as BrowserDoService$Meta3dEvent from "../browser/BrowserDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../../data/ContainerManager.bs.js";
import * as NameEventDoService$Meta3dEvent from "../event/NameEventDoService.bs.js";
import * as ManageEventDoService$Meta3dEvent from "../event/ManageEventDoService.bs.js";
import * as HandleDomEventDoService$Meta3dEvent from "../event/handle/HandleDomEventDoService.bs.js";
import * as HandleMouseEventDoService$Meta3dEvent from "../event/handle/HandleMouseEventDoService.bs.js";
import * as HandleTouchEventDoService$Meta3dEvent from "../event/handle/HandleTouchEventDoService.bs.js";
import * as CreateCustomEventDoService$Meta3dEvent from "../event/event/CreateCustomEventDoService.bs.js";
import * as HandleKeyboardEventDoService$Meta3dEvent from "../event/handle/HandleKeyboardEventDoService.bs.js";
import * as HandlePointDomEventDoService$Meta3dEvent from "../event/handle/HandlePointDomEventDoService.bs.js";

var _getBody = BodyDoService$Meta3dEvent.getBodyExn;

function setBody(body, state) {
  return {
          eventData: state.eventData,
          canvas: state.canvas,
          body: Caml_option.some(body),
          browser: state.browser
        };
}

function _fromPointDomEvent(eventName, state) {
  return Most.fromEvent(eventName, BodyDoService$Meta3dEvent.getBodyExn(state), false);
}

function _fromMobilePointDomEvent(eventName, state) {
  return Most.fromEvent(eventName, BodyDoService$Meta3dEvent.getBodyExn(state), {
              passive: false
            });
}

function _fromTouchMoveDomEventAndPreventnDefault(state) {
  var __x = _fromMobilePointDomEvent("touchmove", state);
  return Most.tap(HandlePointDomEventDoService$Meta3dEvent.preventDefault, __x);
}

function _fromKeyboardDomEvent(eventName, state) {
  return Most.fromEvent(eventName, BodyDoService$Meta3dEvent.getBodyExn(state), false);
}

function _convertMouseEventToPointEvent(eventName, param) {
  return {
          name: eventName,
          location: param.location,
          locationInView: param.locationInView,
          button: param.button,
          wheel: param.wheel,
          movementDelta: param.movementDelta,
          event: param.event
        };
}

function _bindDomEventToTriggerPointEvent(param, param$1, state) {
  var convertDomEventToPointEventFunc = param$1[1];
  var pointEventName = param[2];
  var customEventName = param[1];
  return Curry._4(param$1[0], param[0], (function (mouseEvent, state) {
                return ManageEventDoService$Meta3dEvent.triggerCustomGlobalEvent(CreateCustomEventDoService$Meta3dEvent.create(customEventName, Caml_option.some(Curry._2(convertDomEventToPointEventFunc, pointEventName, mouseEvent))), state)[0];
              }), state, undefined);
}

function _bindMouseEventToTriggerPointEvent(state, mouseEventName, customEventName, pointEventName) {
  return _bindDomEventToTriggerPointEvent([
              mouseEventName,
              customEventName,
              pointEventName
            ], [
              (function (param) {
                  var func = function (param$1, param$2, param$3, param$4) {
                    return ManageEventDoService$Meta3dEvent.onMouseEvent(param, param$1, param$2, param$3, param$4);
                  };
                  return function (param) {
                    var func$1 = Curry._1(func, param);
                    return function (param) {
                      return Curry._2(func$1, param, 0);
                    };
                  };
                }),
              _convertMouseEventToPointEvent
            ], state);
}

function _convertTouchEventToPointEvent(eventName, param) {
  return {
          name: eventName,
          location: param.location,
          locationInView: param.locationInView,
          button: undefined,
          wheel: undefined,
          movementDelta: param.movementDelta,
          event: param.event
        };
}

function _bindTouchEventToTriggerPointEvent(state, touchEventName, customEventName, pointEventName) {
  return _bindDomEventToTriggerPointEvent([
              touchEventName,
              customEventName,
              pointEventName
            ], [
              (function (param) {
                  var func = function (param$1, param$2, param$3, param$4) {
                    return ManageEventDoService$Meta3dEvent.onTouchEvent(param, param$1, param$2, param$3, param$4);
                  };
                  return function (param) {
                    var func$1 = Curry._1(func, param);
                    return function (param) {
                      return Curry._2(func$1, param, 0);
                    };
                  };
                }),
              _convertTouchEventToPointEvent
            ], state);
}

function bindDomEventToTriggerPointEvent(stateForEventHandler, browser) {
  if (browser < 2) {
    return _bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(stateForEventHandler, /* Click */1, NameEventDoService$Meta3dEvent.getPointTapEventName(undefined), /* PointTap */0), /* MouseUp */3, NameEventDoService$Meta3dEvent.getPointUpEventName(undefined), /* PointUp */2), /* MouseDown */2, NameEventDoService$Meta3dEvent.getPointDownEventName(undefined), /* PointDown */1), /* MouseWheel */5, NameEventDoService$Meta3dEvent.getPointScaleEventName(undefined), /* PointScale */4), /* MouseMove */4, NameEventDoService$Meta3dEvent.getPointMoveEventName(undefined), /* PointMove */3), /* MouseDragStart */6, NameEventDoService$Meta3dEvent.getPointDragStartEventName(undefined), /* PointDragStart */5), /* MouseDragOver */7, NameEventDoService$Meta3dEvent.getPointDragOverEventName(undefined), /* PointDragOver */6), /* MouseDragDrop */8, NameEventDoService$Meta3dEvent.getPointDragDropEventName(undefined), /* PointDragDrop */7);
  }
  if (browser >= 4) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "InitEventDoService.res",
            99,
            2
          ],
          Error: new Error()
        };
  }
  return _bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(stateForEventHandler, /* TouchTap */12, NameEventDoService$Meta3dEvent.getPointTapEventName(undefined), /* PointTap */0), /* TouchEnd */13, NameEventDoService$Meta3dEvent.getPointUpEventName(undefined), /* PointUp */2), /* TouchStart */15, NameEventDoService$Meta3dEvent.getPointDownEventName(undefined), /* PointDown */1), /* TouchMove */14, NameEventDoService$Meta3dEvent.getPointMoveEventName(undefined), /* PointMove */3), /* TouchDragStart */16, NameEventDoService$Meta3dEvent.getPointDragStartEventName(undefined), /* PointDragStart */5), /* TouchDragOver */17, NameEventDoService$Meta3dEvent.getPointDragOverEventName(undefined), /* PointDragOver */6), /* TouchDragDrop */18, NameEventDoService$Meta3dEvent.getPointDragDropEventName(undefined), /* PointDragDrop */7);
}

function _preventContextMenuEvent($$event) {
  HandleDomEventDoService$Meta3dEvent.preventDefault($$event);
  
}

function _execMouseEventHandle(eventName, $$event, eventExtensionProtocolName) {
  var state = ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName);
  ContainerManager$Meta3dEvent.setState(HandleMouseEventDoService$Meta3dEvent.execEventHandle(state, HandleMouseEventDoService$Meta3dEvent.convertMouseDomEventToMouseEvent(eventName, $$event, state)), eventExtensionProtocolName);
  
}

function _execMouseChangePositionEventHandle(mouseEventName, eventExtensionProtocolName, $$event, setPositionFunc) {
  var state = ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName);
  var mouseEvent = HandleMouseEventDoService$Meta3dEvent.convertMouseDomEventToMouseEvent(mouseEventName, $$event, state);
  ContainerManager$Meta3dEvent.setState(Curry._2(setPositionFunc, HandleMouseEventDoService$Meta3dEvent.execEventHandle(state, mouseEvent), mouseEvent), eventExtensionProtocolName);
  
}

function _execMouseMoveEventHandle(mouseEventName, $$event, eventExtensionProtocolName) {
  return _execMouseChangePositionEventHandle(mouseEventName, eventExtensionProtocolName, $$event, HandleMouseEventDoService$Meta3dEvent.setLastXYWhenMouseMove);
}

function _execMouseDragingEventHandle(mouseEventName, $$event, eventExtensionProtocolName) {
  return _execMouseChangePositionEventHandle(mouseEventName, eventExtensionProtocolName, $$event, HandleMouseEventDoService$Meta3dEvent.setLastXYByLocation);
}

function _execMouseDragStartEventHandle($$event, eventExtensionProtocolName) {
  var state = ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName);
  ContainerManager$Meta3dEvent.setState(HandleMouseEventDoService$Meta3dEvent.setLastXY(HandleMouseEventDoService$Meta3dEvent.setIsDrag(HandleMouseEventDoService$Meta3dEvent.execEventHandle(state, HandleMouseEventDoService$Meta3dEvent.convertMouseDomEventToMouseEvent(/* MouseDragStart */6, $$event, state)), true), undefined, undefined), eventExtensionProtocolName);
  
}

function _execMouseDragDropEventHandle($$event, eventExtensionProtocolName) {
  var state = ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName);
  ContainerManager$Meta3dEvent.setState(HandleMouseEventDoService$Meta3dEvent.setIsDrag(HandleMouseEventDoService$Meta3dEvent.execEventHandle(state, HandleMouseEventDoService$Meta3dEvent.convertMouseDomEventToMouseEvent(/* MouseDragDrop */8, $$event, state)), false), eventExtensionProtocolName);
  
}

function _execTouchEventHandle(touchEventName, $$event, eventExtensionProtocolName) {
  ContainerManager$Meta3dEvent.setState(HandleTouchEventDoService$Meta3dEvent.execEventHandle(ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName), touchEventName, $$event), eventExtensionProtocolName);
  
}

function _execTouchChangePositionEventHandle(touchEventName, eventExtensionProtocolName, $$event, setPositonFunc) {
  ContainerManager$Meta3dEvent.setState(Curry._3(setPositonFunc, HandleTouchEventDoService$Meta3dEvent.execEventHandle(ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName), touchEventName, $$event), touchEventName, $$event), eventExtensionProtocolName);
  
}

function _execTouchMoveEventHandle(touchEventName, $$event, eventExtensionProtocolName) {
  return _execTouchChangePositionEventHandle(touchEventName, eventExtensionProtocolName, $$event, HandleTouchEventDoService$Meta3dEvent.setLastXYWhenTouchMove);
}

function _execTouchDragingEventHandle(touchEventName, $$event, eventExtensionProtocolName) {
  return _execTouchChangePositionEventHandle(touchEventName, eventExtensionProtocolName, $$event, HandleTouchEventDoService$Meta3dEvent.setLastXYByLocation);
}

function _execTouchDragStartEventHandle($$event, eventExtensionProtocolName) {
  ContainerManager$Meta3dEvent.setState(HandleTouchEventDoService$Meta3dEvent.setLastXY(HandleTouchEventDoService$Meta3dEvent.setIsDrag(HandleTouchEventDoService$Meta3dEvent.execEventHandle(ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName), /* TouchDragStart */16, $$event), true), undefined, undefined), eventExtensionProtocolName);
  
}

function _execTouchDragDropEventHandle($$event, eventExtensionProtocolName) {
  ContainerManager$Meta3dEvent.setState(HandleTouchEventDoService$Meta3dEvent.setIsDrag(HandleTouchEventDoService$Meta3dEvent.execEventHandle(ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName), /* TouchDragDrop */18, $$event), false), eventExtensionProtocolName);
  
}

function _execKeyboardEventHandle(keyboardEventName, $$event, eventExtensionProtocolName) {
  ContainerManager$Meta3dEvent.setState(HandleKeyboardEventDoService$Meta3dEvent.execEventHandle(ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName), keyboardEventName, $$event), eventExtensionProtocolName);
  
}

function _fromPCDomEventArr(state, eventExtensionProtocolName) {
  var __x = Most.fromEvent("contextmenu", BodyDoService$Meta3dEvent.getBodyExn(state), false);
  var __x$1 = _fromPointDomEvent("click", state);
  var __x$2 = _fromPointDomEvent("mousedown", state);
  var __x$3 = _fromPointDomEvent("mouseup", state);
  var __x$4 = _fromPointDomEvent("mousemove", state);
  var __x$5 = _fromPointDomEvent("mousewheel", state);
  var __x$6 = _fromPointDomEvent("mousedown", state);
  var __x$7 = Most.tap((function ($$event) {
          return _execMouseDragStartEventHandle($$event, eventExtensionProtocolName);
        }), __x$6);
  var __x$8 = Most.flatMap((function ($$event) {
          var __x = Most.skip(2, _fromPointDomEvent("mousemove", state));
          var __x$1 = _fromPointDomEvent("mouseup", state);
          return Most.until(Most.tap((function ($$event) {
                            return _execMouseDragDropEventHandle($$event, eventExtensionProtocolName);
                          }), __x$1), __x);
        }), __x$7);
  var __x$9 = _fromKeyboardDomEvent("keyup", state);
  var __x$10 = _fromKeyboardDomEvent("keydown", state);
  var __x$11 = _fromKeyboardDomEvent("keypress", state);
  return [
          Most.tap((function ($$event) {
                  HandleDomEventDoService$Meta3dEvent.preventDefault($$event);
                  
                }), __x),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* Click */1, $$event, eventExtensionProtocolName);
                }), __x$1),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseDown */2, $$event, eventExtensionProtocolName);
                }), __x$2),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseUp */3, $$event, eventExtensionProtocolName);
                }), __x$3),
          Most.tap((function ($$event) {
                  return _execMouseMoveEventHandle(/* MouseMove */4, $$event, eventExtensionProtocolName);
                }), __x$4),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseWheel */5, $$event, eventExtensionProtocolName);
                }), __x$5),
          Most.tap((function ($$event) {
                  return _execMouseDragingEventHandle(/* MouseDragOver */7, $$event, eventExtensionProtocolName);
                }), __x$8),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyUp */9, $$event, eventExtensionProtocolName);
                }), __x$9),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyDown */10, $$event, eventExtensionProtocolName);
                }), __x$10),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyPress */11, $$event, eventExtensionProtocolName);
                }), __x$11)
        ];
}

function _fromMobileDomEventArr(state, eventExtensionProtocolName) {
  var __x = _fromMobilePointDomEvent("touchend", state);
  var __x$1 = Most.since(_fromMobilePointDomEvent("touchstart", state), __x);
  var __x$2 = _fromMobilePointDomEvent("touchend", state);
  var __x$3 = _fromMobilePointDomEvent("touchstart", state);
  var __x$4 = _fromTouchMoveDomEventAndPreventnDefault(state);
  var __x$5 = _fromMobilePointDomEvent("touchstart", state);
  var __x$6 = Most.tap((function ($$event) {
          return _execTouchDragStartEventHandle($$event, eventExtensionProtocolName);
        }), __x$5);
  var __x$7 = Most.flatMap((function ($$event) {
          var __x = _fromTouchMoveDomEventAndPreventnDefault(state);
          var __x$1 = _fromMobilePointDomEvent("touchend", state);
          return Most.until(Most.tap((function ($$event) {
                            return _execTouchDragDropEventHandle($$event, eventExtensionProtocolName);
                          }), __x$1), __x);
        }), __x$6);
  return [
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchTap */12, $$event, eventExtensionProtocolName);
                }), __x$1),
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchEnd */13, $$event, eventExtensionProtocolName);
                }), __x$2),
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchStart */15, $$event, eventExtensionProtocolName);
                }), __x$3),
          Most.tap((function ($$event) {
                  return _execTouchMoveEventHandle(/* TouchMove */14, $$event, eventExtensionProtocolName);
                }), __x$4),
          Most.tap((function ($$event) {
                  return _execTouchDragingEventHandle(/* TouchDragOver */17, $$event, eventExtensionProtocolName);
                }), __x$7)
        ];
}

function fromDomEvent(state, eventExtensionProtocolName) {
  var match = BrowserDoService$Meta3dEvent.getBrowser(state);
  var tmp;
  if (match >= 2) {
    if (match >= 4) {
      throw {
            RE_EXN_ID: "Match_failure",
            _1: [
              "InitEventDoService.res",
              443,
              4
            ],
            Error: new Error()
          };
    }
    tmp = _fromMobileDomEventArr(state, eventExtensionProtocolName);
  } else {
    tmp = _fromPCDomEventArr(state, eventExtensionProtocolName);
  }
  return Most.mergeArray(tmp);
}

var handleDomEventStreamError = Log$Meta3dCommonlib.logForDebug;

function initEvent(state, eventExtensionProtocolName) {
  var __x = fromDomEvent(state, eventExtensionProtocolName);
  var domEventStreamSubscription = __x.subscribe({
        next: (function (param) {
            
          }),
        error: Log$Meta3dCommonlib.logForDebug,
        complete: (function (param) {
            
          })
      });
  var state$1 = ManageEventDoService$Meta3dEvent.setDomEventStreamSubscription(state, domEventStreamSubscription);
  ContainerManager$Meta3dEvent.setState(bindDomEventToTriggerPointEvent(ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName), BrowserDoService$Meta3dEvent.getBrowser(state$1)), eventExtensionProtocolName);
  return state$1;
}

export {
  _getBody ,
  setBody ,
  _fromPointDomEvent ,
  _fromMobilePointDomEvent ,
  _fromTouchMoveDomEventAndPreventnDefault ,
  _fromKeyboardDomEvent ,
  _convertMouseEventToPointEvent ,
  _bindDomEventToTriggerPointEvent ,
  _bindMouseEventToTriggerPointEvent ,
  _convertTouchEventToPointEvent ,
  _bindTouchEventToTriggerPointEvent ,
  bindDomEventToTriggerPointEvent ,
  _preventContextMenuEvent ,
  _execMouseEventHandle ,
  _execMouseChangePositionEventHandle ,
  _execMouseMoveEventHandle ,
  _execMouseDragingEventHandle ,
  _execMouseDragStartEventHandle ,
  _execMouseDragDropEventHandle ,
  _execTouchEventHandle ,
  _execTouchChangePositionEventHandle ,
  _execTouchMoveEventHandle ,
  _execTouchDragingEventHandle ,
  _execTouchDragStartEventHandle ,
  _execTouchDragDropEventHandle ,
  _execKeyboardEventHandle ,
  _fromPCDomEventArr ,
  _fromMobileDomEventArr ,
  fromDomEvent ,
  handleDomEventStreamError ,
  initEvent ,
  
}
/* most Not a pure module */
