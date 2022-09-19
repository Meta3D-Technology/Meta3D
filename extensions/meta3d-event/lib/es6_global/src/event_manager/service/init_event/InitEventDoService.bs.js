

import * as Most from "most";
import * as Curry from "../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
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

function bindDomEventToTriggerPointEvent(state) {
  var match = BrowserDoService$Meta3dEvent.getBrowser(state);
  if (match < 2) {
    return _bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(state, /* Click */1, NameEventDoService$Meta3dEvent.getPointTapEventName(undefined), /* PointTap */0), /* MouseUp */3, NameEventDoService$Meta3dEvent.getPointUpEventName(undefined), /* PointUp */2), /* MouseDown */2, NameEventDoService$Meta3dEvent.getPointDownEventName(undefined), /* PointDown */1), /* MouseWheel */5, NameEventDoService$Meta3dEvent.getPointScaleEventName(undefined), /* PointScale */4), /* MouseMove */4, NameEventDoService$Meta3dEvent.getPointMoveEventName(undefined), /* PointMove */3), /* MouseDragStart */6, NameEventDoService$Meta3dEvent.getPointDragStartEventName(undefined), /* PointDragStart */5), /* MouseDragOver */7, NameEventDoService$Meta3dEvent.getPointDragOverEventName(undefined), /* PointDragOver */6), /* MouseDragDrop */8, NameEventDoService$Meta3dEvent.getPointDragDropEventName(undefined), /* PointDragDrop */7);
  }
  if (match >= 4) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "InitEventDoService.res",
            96,
            2
          ],
          Error: new Error()
        };
  }
  return _bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(state, /* TouchTap */12, NameEventDoService$Meta3dEvent.getPointTapEventName(undefined), /* PointTap */0), /* TouchEnd */13, NameEventDoService$Meta3dEvent.getPointUpEventName(undefined), /* PointUp */2), /* TouchStart */15, NameEventDoService$Meta3dEvent.getPointDownEventName(undefined), /* PointDown */1), /* TouchMove */14, NameEventDoService$Meta3dEvent.getPointMoveEventName(undefined), /* PointMove */3), /* TouchDragStart */16, NameEventDoService$Meta3dEvent.getPointDragStartEventName(undefined), /* PointDragStart */5), /* TouchDragOver */17, NameEventDoService$Meta3dEvent.getPointDragOverEventName(undefined), /* PointDragOver */6), /* TouchDragDrop */18, NameEventDoService$Meta3dEvent.getPointDragDropEventName(undefined), /* PointDragDrop */7);
}

function _preventContextMenuEvent($$event) {
  HandleDomEventDoService$Meta3dEvent.preventDefault($$event);
  
}

function _execMouseEventHandle(eventName, $$event) {
  var state = ContainerManager$Meta3dEvent.getState(undefined);
  ContainerManager$Meta3dEvent.setState(HandleMouseEventDoService$Meta3dEvent.execEventHandle(state, HandleMouseEventDoService$Meta3dEvent.convertMouseDomEventToMouseEvent(eventName, $$event, state)));
  
}

function _execMouseChangePositionEventHandle(mouseEventName, $$event, setPositionFunc) {
  var state = ContainerManager$Meta3dEvent.getState(undefined);
  var mouseEvent = HandleMouseEventDoService$Meta3dEvent.convertMouseDomEventToMouseEvent(mouseEventName, $$event, state);
  ContainerManager$Meta3dEvent.setState(Curry._2(setPositionFunc, HandleMouseEventDoService$Meta3dEvent.execEventHandle(state, mouseEvent), mouseEvent));
  
}

function _execMouseMoveEventHandle(mouseEventName, $$event) {
  return _execMouseChangePositionEventHandle(mouseEventName, $$event, HandleMouseEventDoService$Meta3dEvent.setLastXYWhenMouseMove);
}

function _execMouseDragingEventHandle(mouseEventName, $$event) {
  return _execMouseChangePositionEventHandle(mouseEventName, $$event, HandleMouseEventDoService$Meta3dEvent.setLastXYByLocation);
}

function _execMouseDragStartEventHandle($$event) {
  var state = ContainerManager$Meta3dEvent.getState(undefined);
  ContainerManager$Meta3dEvent.setState(HandleMouseEventDoService$Meta3dEvent.setLastXY(HandleMouseEventDoService$Meta3dEvent.setIsDrag(HandleMouseEventDoService$Meta3dEvent.execEventHandle(state, HandleMouseEventDoService$Meta3dEvent.convertMouseDomEventToMouseEvent(/* MouseDragStart */6, $$event, state)), true), undefined, undefined));
  
}

function _execMouseDragDropEventHandle($$event) {
  var state = ContainerManager$Meta3dEvent.getState(undefined);
  ContainerManager$Meta3dEvent.setState(HandleMouseEventDoService$Meta3dEvent.setIsDrag(HandleMouseEventDoService$Meta3dEvent.execEventHandle(state, HandleMouseEventDoService$Meta3dEvent.convertMouseDomEventToMouseEvent(/* MouseDragDrop */8, $$event, state)), false));
  
}

function _execTouchEventHandle(touchEventName, $$event) {
  ContainerManager$Meta3dEvent.setState(HandleTouchEventDoService$Meta3dEvent.execEventHandle(ContainerManager$Meta3dEvent.getState(undefined), touchEventName, $$event));
  
}

function _execTouchChangePositionEventHandle(touchEventName, $$event, setPositonFunc) {
  ContainerManager$Meta3dEvent.setState(Curry._3(setPositonFunc, HandleTouchEventDoService$Meta3dEvent.execEventHandle(ContainerManager$Meta3dEvent.getState(undefined), touchEventName, $$event), touchEventName, $$event));
  
}

function _execTouchMoveEventHandle(touchEventName, $$event) {
  return _execTouchChangePositionEventHandle(touchEventName, $$event, HandleTouchEventDoService$Meta3dEvent.setLastXYWhenTouchMove);
}

function _execTouchDragingEventHandle(touchEventName, $$event) {
  return _execTouchChangePositionEventHandle(touchEventName, $$event, HandleTouchEventDoService$Meta3dEvent.setLastXYByLocation);
}

function _execTouchDragStartEventHandle($$event) {
  ContainerManager$Meta3dEvent.setState(HandleTouchEventDoService$Meta3dEvent.setLastXY(HandleTouchEventDoService$Meta3dEvent.setIsDrag(HandleTouchEventDoService$Meta3dEvent.execEventHandle(ContainerManager$Meta3dEvent.getState(undefined), /* TouchDragStart */16, $$event), true), undefined, undefined));
  
}

function _execTouchDragDropEventHandle($$event) {
  ContainerManager$Meta3dEvent.setState(HandleTouchEventDoService$Meta3dEvent.setIsDrag(HandleTouchEventDoService$Meta3dEvent.execEventHandle(ContainerManager$Meta3dEvent.getState(undefined), /* TouchDragDrop */18, $$event), false));
  
}

function _execKeyboardEventHandle(keyboardEventName, $$event) {
  ContainerManager$Meta3dEvent.setState(HandleKeyboardEventDoService$Meta3dEvent.execEventHandle(ContainerManager$Meta3dEvent.getState(undefined), keyboardEventName, $$event));
  
}

function _fromPCDomEventArr(state) {
  var __x = Most.fromEvent("contextmenu", BodyDoService$Meta3dEvent.getBodyExn(state), false);
  var __x$1 = _fromPointDomEvent("click", state);
  var __x$2 = _fromPointDomEvent("mousedown", state);
  var __x$3 = _fromPointDomEvent("mouseup", state);
  var __x$4 = _fromPointDomEvent("mousemove", state);
  var __x$5 = _fromPointDomEvent("mousewheel", state);
  var __x$6 = _fromPointDomEvent("mousedown", state);
  var __x$7 = Most.tap(_execMouseDragStartEventHandle, __x$6);
  var __x$8 = Most.flatMap((function ($$event) {
          var __x = Most.skip(2, _fromPointDomEvent("mousemove", state));
          var __x$1 = _fromPointDomEvent("mouseup", state);
          return Most.until(Most.tap(_execMouseDragDropEventHandle, __x$1), __x);
        }), __x$7);
  var __x$9 = _fromKeyboardDomEvent("keyup", state);
  var __x$10 = _fromKeyboardDomEvent("keydown", state);
  var __x$11 = _fromKeyboardDomEvent("keypress", state);
  return [
          Most.tap((function ($$event) {
                  HandleDomEventDoService$Meta3dEvent.preventDefault($$event);
                  
                }), __x),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* Click */1, $$event);
                }), __x$1),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseDown */2, $$event);
                }), __x$2),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseUp */3, $$event);
                }), __x$3),
          Most.tap((function ($$event) {
                  return _execMouseChangePositionEventHandle(/* MouseMove */4, $$event, HandleMouseEventDoService$Meta3dEvent.setLastXYWhenMouseMove);
                }), __x$4),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseWheel */5, $$event);
                }), __x$5),
          Most.tap((function ($$event) {
                  return _execMouseChangePositionEventHandle(/* MouseDragOver */7, $$event, HandleMouseEventDoService$Meta3dEvent.setLastXYByLocation);
                }), __x$8),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyUp */9, $$event);
                }), __x$9),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyDown */10, $$event);
                }), __x$10),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyPress */11, $$event);
                }), __x$11)
        ];
}

function _fromMobileDomEventArr(state) {
  var __x = _fromMobilePointDomEvent("touchend", state);
  var __x$1 = Most.since(_fromMobilePointDomEvent("touchstart", state), __x);
  var __x$2 = _fromMobilePointDomEvent("touchend", state);
  var __x$3 = _fromMobilePointDomEvent("touchstart", state);
  var __x$4 = _fromTouchMoveDomEventAndPreventnDefault(state);
  var __x$5 = _fromMobilePointDomEvent("touchstart", state);
  var __x$6 = Most.tap(_execTouchDragStartEventHandle, __x$5);
  var __x$7 = Most.flatMap((function ($$event) {
          var __x = _fromTouchMoveDomEventAndPreventnDefault(state);
          var __x$1 = _fromMobilePointDomEvent("touchend", state);
          return Most.until(Most.tap(_execTouchDragDropEventHandle, __x$1), __x);
        }), __x$6);
  return [
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchTap */12, $$event);
                }), __x$1),
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchEnd */13, $$event);
                }), __x$2),
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchStart */15, $$event);
                }), __x$3),
          Most.tap((function ($$event) {
                  return _execTouchChangePositionEventHandle(/* TouchMove */14, $$event, HandleTouchEventDoService$Meta3dEvent.setLastXYWhenTouchMove);
                }), __x$4),
          Most.tap((function ($$event) {
                  return _execTouchChangePositionEventHandle(/* TouchDragOver */17, $$event, HandleTouchEventDoService$Meta3dEvent.setLastXYByLocation);
                }), __x$7)
        ];
}

function fromDomEvent(state) {
  var match = BrowserDoService$Meta3dEvent.getBrowser(state);
  var tmp;
  if (match >= 2) {
    if (match >= 4) {
      throw {
            RE_EXN_ID: "Match_failure",
            _1: [
              "InitEventDoService.res",
              419,
              4
            ],
            Error: new Error()
          };
    }
    tmp = _fromMobileDomEventArr(state);
  } else {
    tmp = _fromPCDomEventArr(state);
  }
  return Most.mergeArray(tmp);
}

var handleDomEventStreamError = Log$Meta3dCommonlib.logForDebug;

function initEvent(state) {
  var __x = fromDomEvent(state);
  var domEventStreamSubscription = __x.subscribe({
        next: (function (param) {
            
          }),
        error: Log$Meta3dCommonlib.logForDebug,
        complete: (function (param) {
            
          })
      });
  return bindDomEventToTriggerPointEvent(ManageEventDoService$Meta3dEvent.setDomEventStreamSubscription(state, domEventStreamSubscription));
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
