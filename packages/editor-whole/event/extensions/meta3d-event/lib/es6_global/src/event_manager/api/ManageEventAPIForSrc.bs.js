

import * as Caml_option from "../../../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ContainerManager$Meta3dEvent from "../data/ContainerManager.bs.js";
import * as ManageEventDoService$Meta3dEvent from "../service/event/ManageEventDoService.bs.js";
import * as CreateCustomEventDoService$Meta3dEvent from "../service/event/event/CreateCustomEventDoService.bs.js";

function onCustomGlobalEvent(eventExtensionProtocolName, param) {
  var handleFunc = param[2];
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onCustomGlobalEvent(param[0], (function (customEvent, state) {
              handleFunc(customEvent);
              return [
                      state,
                      customEvent
                    ];
            }), ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName), param[1], undefined), eventExtensionProtocolName);
}

function offCustomGlobalEventByHandleFunc(eventExtensionProtocolName, param) {
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.offCustomGlobalEventByHandleFunc(param[0], param[1], ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName)), eventExtensionProtocolName);
}

function onCustomGlobalEvent2(api, meta3dState, eventExtensionProtocolName, param) {
  var handleFunc = param[2];
  var state = api.getExtensionState(meta3dState, eventExtensionProtocolName);
  var state_actionContributeMap = state.actionContributeMap;
  var state_eventManagerState = ManageEventDoService$Meta3dEvent.onCustomGlobalEvent2(param[0], (function (meta3dState, customEvent) {
          var meta3dState$1 = handleFunc(meta3dState, customEvent);
          return [
                  meta3dState$1,
                  customEvent
                ];
        }), state.eventManagerState, param[1], undefined);
  var state$1 = {
    actionContributeMap: state_actionContributeMap,
    eventManagerState: state_eventManagerState
  };
  return api.setExtensionState(meta3dState, eventExtensionProtocolName, state$1);
}

function triggerCustomGlobalEvent2(api, meta3dState, eventExtensionProtocolName, customEvent) {
  return Tuple2$Meta3dCommonlib.getFirst(ManageEventDoService$Meta3dEvent.triggerCustomGlobalEvent2(api, meta3dState, eventExtensionProtocolName, customEvent));
}

function onCustomGlobalEvent3(api, meta3dState, eventExtensionProtocolName, param) {
  var handleFunc = param[2];
  var state = api.getExtensionState(meta3dState, eventExtensionProtocolName);
  var state_actionContributeMap = state.actionContributeMap;
  var state_eventManagerState = ManageEventDoService$Meta3dEvent.onCustomGlobalEvent3(param[0], (function (meta3dState, customEvent) {
          return handleFunc(meta3dState, customEvent);
        }), state.eventManagerState, param[1], undefined);
  var state$1 = {
    actionContributeMap: state_actionContributeMap,
    eventManagerState: state_eventManagerState
  };
  return api.setExtensionState(meta3dState, eventExtensionProtocolName, state$1);
}

var triggerCustomGlobalEvent3 = ManageEventDoService$Meta3dEvent.triggerCustomGlobalEvent3;

function createCustomEvent(eventName, userData) {
  return CreateCustomEventDoService$Meta3dEvent.create(eventName, (userData == null) ? undefined : Caml_option.some(userData));
}

export {
  onCustomGlobalEvent ,
  offCustomGlobalEventByHandleFunc ,
  onCustomGlobalEvent2 ,
  triggerCustomGlobalEvent2 ,
  onCustomGlobalEvent3 ,
  triggerCustomGlobalEvent3 ,
  createCustomEvent ,
}
/* No side effect */
