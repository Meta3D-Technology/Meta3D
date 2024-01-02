

import * as BodyDoService$Meta3dEvent from "../../../src/event_manager/service/dom/BodyDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as EventExtensionTool$Meta3dEvent from "../api/EventExtensionTool.bs.js";
import * as ManageEventDoService$Meta3dEvent from "../../../src/event_manager/service/event/ManageEventDoService.bs.js";

var _isHostMethod = (function(object_, property) {
                     var type = typeof object_[property];

                    return type === "function" ||
                        (type === "object" && !!object_[property]) ||
                        type === "unknown";
                        });

var _extend = (function(destination, source){
                var property = "";

                for (property in source) {
                    destination[property] = source[property];
                }
                return destination;
                });

var getBody = BodyDoService$Meta3dEvent.getBodyExn;

function getPointEventBindedDom(param) {
  return BodyDoService$Meta3dEvent.getBodyExn(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)));
}

function getKeyboardEventBindedDom(param) {
  return BodyDoService$Meta3dEvent.getBodyExn(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)));
}

var triggerDomEvent = (function(eventName, oTarget, event){
                    var evObj = null,
                    dom = null;

                if (_isHostMethod(document, "createEvent")) {
                    /* 判断事件类型
                     switch (type) {
                     case 'abort':
                     case 'blur':
                     case 'change':
                     case 'error':
                     case 'focus':
                     case 'load':
                     case 'reset':
                     case 'resize':
                     case 'scroll':
                     case 'select':
                     case 'submit':
                     case 'unload':
                     evObj = document.createEvent('HTMLEvents');
                     evObj.initEvent(type, false, true);
                     break;
                     case 'DOMActivate':
                     case 'DOMFocusIn':
                     case 'DOMFocusOut':
                     case 'keydown':
                     case 'keypress':
                     case 'keyup':
                     evObj = document.createEvent('UIEevents');
                     evObj.initUIEvent(type, false, true);     //出错：参数过少
                     break;
                     case 'click':
                     case 'mousedown':
                     case 'mousemove':
                     case 'mouseout':
                     case 'mouseover':
                     case 'mouseup':
                     evObj = document.createEvent('MouseEvents');
                     evObj.initMouseEvent(type, false, true);  //出错：参数过少
                     break;
                     case 'DOMAttrModified':
                     case 'DOMNodeInserted':
                     case 'DOMNodeRemoved':
                     case 'DOMCharacterDataModified':
                     case 'DOMNodeInsertedIntoDocument':
                     case 'DOMNodeRemovedFromDocument':
                     case 'DOMSubtreeModified':
                     evObj = document.createEvent('MutationEvents');
                     evObj.initMutationEvent(type, false, true);   //出错：参数过少
                     break;
                     default:
                     throw new Error("超出范围！");
                     break;

                     }
                     */

                    //此处使用通用事件
                    evObj = document.createEvent('Events');
                    evObj.initEvent(eventName, false, true);

                    if(!!event){
                        _extend(evObj, event);
                    }

                    dom = oTarget;
                    dom.dispatchEvent(evObj);
                }
                /* else if (isHostMethod(document, "createEventObject")) {
                        dom = oTarget;
                        dom.fireEvent('on' + eventName);
                } */
                else{
                    throw new Error("trigger dom event error");
                }
                });

var buildFakeCanvas = (function(offsetData) {
var [ offsetLeft, offsetTop, offsetParent ] = offsetData;

    function _getOrCreateEventQueue(type){
        if(window.eventQueueMap === undefined){
window.eventQueueMap = {};
        }
        if(window.eventQueueMap[type] === undefined){
window.eventQueueMap[type] = [];
        }

        return window.eventQueueMap[type];
    }

return {
     nodeType: 1,
     style: {
       "left": "",
       "top": "",
       "width": "",
       "height": "",
       "position": "static",
     },
     width: 0.,
     height: 0.,
     offsetLeft: offsetLeft,
     offsetTop: offsetTop,
     offsetParent: offsetParent,



     addEventListener: (eventName, func, isCapture) => {
var queue = _getOrCreateEventQueue(eventName);

queue.push(func);
        },

        removeEventListener: (eventName, func, isCapture) => {
var queue = _getOrCreateEventQueue(eventName);

var index = queue.indexOf(func);

if(index === -1){
    return;
}

queue.splice(
    index, 1
);
        },

        dispatchEvent: (event) => {
var queue = _getOrCreateEventQueue(event.type);


queue.forEach((func) => {
    func(event)
});
        }

         }
         });

var _clearEventQueueMap = (function(){
    window.eventQueueMap = {};
    });

function restore(param) {
  _clearEventQueueMap();
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.unsubscribeDomEventStream(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined))), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

function triggerFirstMouseDragOverEvent(mouseEvent) {
  triggerDomEvent("mousemove", BodyDoService$Meta3dEvent.getBodyExn(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined))), mouseEvent);
  triggerDomEvent("mousemove", BodyDoService$Meta3dEvent.getBodyExn(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined))), mouseEvent);
  return triggerDomEvent("mousemove", BodyDoService$Meta3dEvent.getBodyExn(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined))), mouseEvent);
}

export {
  _isHostMethod ,
  _extend ,
  getBody ,
  getPointEventBindedDom ,
  getKeyboardEventBindedDom ,
  triggerDomEvent ,
  buildFakeCanvas ,
  _clearEventQueueMap ,
  restore ,
  triggerFirstMouseDragOverEvent ,
}
/* No side effect */
