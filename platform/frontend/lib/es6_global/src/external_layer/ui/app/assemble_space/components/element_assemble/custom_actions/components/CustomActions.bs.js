

import * as React from "react";
import * as EventUtils$Frontend from "../../../../../utils/EventUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as CodeEditUtils$Frontend from "../../../../utils/CodeEditUtils.bs.js";
import * as CustomDomUtils$Frontend from "../../utils/CustomDomUtils.bs.js";
import * as CustomCodeUtils$Frontend from "../../utils/CustomCodeUtils.bs.js";

import 'antd/dist/reset.css'
;

function buildDefaultActionTranspiledFileStr(actionName) {
  return "window.Contribute = {\n  getContribute: (api) => {\n    return {\n      actionName: \"" + actionName + "\",\n      init: (meta3dState) => {\n        let eventSourcingService = api.getPackageService(meta3dState, \"meta3d-editor-whole-protocol\").event(meta3dState).eventSourcing(meta3dState)\n\n        return new Promise((resolve, reject) => {\n          resolve(eventSourcingService.on(meta3dState, \"\", 0, (meta3dState) => {\n            return Promise.resolve(meta3dState)\n          }, (meta3dState) => {\n            return Promise.resolve(meta3dState)\n          }))\n        })\n      },\n      handler: (meta3dState, uiData) => {\n        return new Promise((resolve, reject) => {\n          let eventSourcingService = api.getPackageService(meta3dState, \"meta3d-editor-whole-protocol\").event(meta3dState).eventSourcing(meta3dState)\n\n          resolve(eventSourcingService.addEvent(meta3dState, {\n            name: \"\",\n            inputData: []\n          }))\n        })\n      },\n      createState: () => {\n        return null\n      }\n    }\n  }\n}";
}

function buildDefaultActionOriginFileStr(actionName) {
  return CustomCodeUtils$Frontend.convertCodeToES6(buildDefaultActionTranspiledFileStr(actionName));
}

function useSelector(param) {
  var elementAssembleState = param.elementAssembleState;
  return [
          elementAssembleState.customActions,
          elementAssembleState.currentCustomActionName
        ];
}

var Method = {
  buildDefaultActionTranspiledFileStr: buildDefaultActionTranspiledFileStr,
  buildDefaultActionOriginFileStr: buildDefaultActionOriginFileStr,
  useSelector: useSelector
};

function CustomActions(Props) {
  var service = Props.service;
  var addActionButtonTarget = Props.addActionButtonTarget;
  ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var match = service.react.useSelector(useSelector);
  return React.createElement(CustomDomUtils$Frontend.make, {
              service: service,
              buildSelectActionFunc: (function (key) {
                  return {
                          TAG: /* SelectCustomAction */18,
                          _0: key
                        };
                }),
              buildAddActionFunc: (function (customAction) {
                  return {
                          TAG: /* AddCustomAction */12,
                          _0: customAction
                        };
                }),
              buildRemoveActionFunc: (function (actionName) {
                  return {
                          TAG: /* RemoveCustomAction */14,
                          _0: actionName
                        };
                }),
              buildDefaultOriginFileStrFunc: buildDefaultActionOriginFileStr,
              buildDefaultTranspiledFileStrFunc: buildDefaultActionTranspiledFileStr,
              setCurrentCustomNameToGlobalFunc: CodeEditUtils$Frontend.setCurrentCustomActionNameToGlobal,
              addButtonTarget: addActionButtonTarget,
              addEventName: EventUtils$Frontend.getAddActionEventName(undefined),
              selectEventName: EventUtils$Frontend.getSelectActionInActionsEventName(undefined),
              currentCustomName: match[1],
              customs: match[0],
              prefix: "Action"
            });
}

var make = CustomActions;

export {
  Method ,
  make ,
}
/*  Not a pure module */
