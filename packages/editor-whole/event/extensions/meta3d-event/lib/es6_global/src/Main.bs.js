

import * as EventManager$Meta3dEvent from "./EventManager.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ManageEventAPIForSrc$Meta3dEvent from "./event_manager/api/ManageEventAPIForSrc.bs.js";
import * as CreateEventManagerState$Meta3dEvent from "./event_manager/data/CreateEventManagerState.bs.js";

function getExtensionService(api) {
  return {
          trigger: (function (param, param$1, param$2, param$3) {
              return EventManager$Meta3dEvent.trigger(api, param, param$1, param$2, param$3);
            }),
          registerAction: EventManager$Meta3dEvent.registerAction,
          onPointEvent: (function (param, param$1) {
              return EventManager$Meta3dEvent.onPointEvent(api, param, param$1);
            }),
          onCustomGlobalEvent: ManageEventAPIForSrc$Meta3dEvent.onCustomGlobalEvent,
          offCustomGlobalEventByHandleFunc: ManageEventAPIForSrc$Meta3dEvent.offCustomGlobalEventByHandleFunc,
          onCustomGlobalEvent2: (function (param, param$1, param$2) {
              return ManageEventAPIForSrc$Meta3dEvent.onCustomGlobalEvent2(api, param, param$1, param$2);
            }),
          triggerCustomGlobalEvent2: (function (param, param$1, param$2) {
              return ManageEventAPIForSrc$Meta3dEvent.triggerCustomGlobalEvent2(api, param, param$1, param$2);
            }),
          onCustomGlobalEvent3: (function (param, param$1, param$2) {
              return ManageEventAPIForSrc$Meta3dEvent.onCustomGlobalEvent3(api, param, param$1, param$2);
            }),
          triggerCustomGlobalEvent3: (function (param, param$1, param$2) {
              return ManageEventAPIForSrc$Meta3dEvent.triggerCustomGlobalEvent3(api, param, param$1, param$2);
            }),
          createCustomEvent: ManageEventAPIForSrc$Meta3dEvent.createCustomEvent,
          initEvent: (function (param, param$1) {
              return EventManager$Meta3dEvent.initEvent(api, param, param$1);
            }),
          setBrowser: (function (param, param$1, param$2) {
              return EventManager$Meta3dEvent.setBrowser(api, param, param$1, param$2);
            }),
          setCanvas: (function (param, param$1, param$2) {
              return EventManager$Meta3dEvent.setCanvas(api, param, param$1, param$2);
            }),
          setBody: (function (param, param$1, param$2) {
              return EventManager$Meta3dEvent.setBody(api, param, param$1, param$2);
            }),
          getBrowserChromeType: EventManager$Meta3dEvent.getBrowserChromeType,
          getBrowserFirefoxType: EventManager$Meta3dEvent.getBrowserFirefoxType,
          getBrowserAndroidType: EventManager$Meta3dEvent.getBrowserAndroidType,
          getBrowserIOSType: EventManager$Meta3dEvent.getBrowserIOSType,
          getBrowserUnknownType: EventManager$Meta3dEvent.getBrowserUnknownType,
          getPointDownEventName: EventManager$Meta3dEvent.getPointDownEventName,
          getPointUpEventName: EventManager$Meta3dEvent.getPointUpEventName,
          getPointTapEventName: EventManager$Meta3dEvent.getPointTapEventName,
          getPointMoveEventName: EventManager$Meta3dEvent.getPointMoveEventName,
          getPointScaleEventName: EventManager$Meta3dEvent.getPointScaleEventName,
          getPointDragStartEventName: EventManager$Meta3dEvent.getPointDragStartEventName,
          getPointDragOverEventName: EventManager$Meta3dEvent.getPointDragOverEventName,
          getAllActionContributes: EventManager$Meta3dEvent.getAllActionContributes
        };
}

function createExtensionState(param) {
  return EventManager$Meta3dEvent.createExtensionState(undefined);
}

function getExtensionLife(api, extensionProtocolName) {
  return {
          onRegister: null,
          onRestore: null,
          onDeepCopy: NullableSt$Meta3dCommonlib.$$return(function (meta3dState) {
                var state = api.getExtensionState(meta3dState, extensionProtocolName);
                return api.setExtensionState(meta3dState, extensionProtocolName, {
                            actionContributeMap: state.actionContributeMap,
                            eventManagerState: CreateEventManagerState$Meta3dEvent.deepCopy(state.eventManagerState)
                          });
              }),
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
}
/* EventManager-Meta3dEvent Not a pure module */
