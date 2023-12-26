

import * as React from "react";
import * as EventUtils$Frontend from "../../../../../utils/EventUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as CodeEditUtils$Frontend from "../../../../utils/CodeEditUtils.bs.js";
import * as CustomDomUtils$Frontend from "../../utils/CustomDomUtils.bs.js";
import * as CustomCodeUtils$Frontend from "../../utils/CustomCodeUtils.bs.js";

import 'antd/dist/reset.css'
;

function buildDefaultInputTranspiledFileStr(inputName) {
  return "window.Contribute = {\n    getContribute: (api) => {\n      return {\n        inputName: \"" + inputName + "\",\n        func: (meta3dState) =>{\n            return Promise.resolve(null)\n        }\n      }\n    }\n}";
}

function buildDefaultInputOriginFileStr(inputName) {
  return CustomCodeUtils$Frontend.convertCodeToES6(buildDefaultInputTranspiledFileStr(inputName));
}

function useSelector(param) {
  var elementAssembleState = param.elementAssembleState;
  return [
          elementAssembleState.customInputs,
          elementAssembleState.currentCustomInputName
        ];
}

var Method = {
  buildDefaultInputTranspiledFileStr: buildDefaultInputTranspiledFileStr,
  buildDefaultInputOriginFileStr: buildDefaultInputOriginFileStr,
  useSelector: useSelector
};

function CustomInputs(Props) {
  var service = Props.service;
  var addInputButtonTarget = Props.addInputButtonTarget;
  ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var match = service.react.useSelector(useSelector);
  return React.createElement(CustomDomUtils$Frontend.make, {
              service: service,
              buildSelectActionFunc: (function (key) {
                  return {
                          TAG: /* SelectCustomInput */17,
                          _0: key
                        };
                }),
              buildAddActionFunc: (function (customInput) {
                  return {
                          TAG: /* AddCustomInput */11,
                          _0: customInput
                        };
                }),
              buildRemoveActionFunc: (function (inputName) {
                  return {
                          TAG: /* RemoveCustomInput */13,
                          _0: inputName
                        };
                }),
              buildDefaultOriginFileStrFunc: buildDefaultInputOriginFileStr,
              buildDefaultTranspiledFileStrFunc: buildDefaultInputTranspiledFileStr,
              setCurrentCustomNameToGlobalFunc: CodeEditUtils$Frontend.setCurrentCustomInputNameToGlobal,
              addButtonTarget: addInputButtonTarget,
              addEventName: EventUtils$Frontend.getAddInputEventName(undefined),
              selectEventName: EventUtils$Frontend.getSelectInputInInputsEventName(undefined),
              currentCustomName: match[1],
              customs: match[0],
              prefix: "Input"
            });
}

var make = CustomInputs;

export {
  Method ,
  make ,
}
/*  Not a pure module */
