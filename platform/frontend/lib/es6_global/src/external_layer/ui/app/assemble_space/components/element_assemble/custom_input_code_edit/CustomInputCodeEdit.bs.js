

import * as React from "react";
import * as CustomUtils$Frontend from "../../utils/CustomUtils.bs.js";
import * as CodeEditUtils$Frontend from "../../../utils/CodeEditUtils.bs.js";
import * as CustomCodeEditUtils$Frontend from "../utils/CustomCodeEditUtils.bs.js";

import 'antd/dist/reset.css'
;

function useSelector(param) {
  return param.elementAssembleState.customInputs;
}

var Method = {
  useSelector: useSelector
};

function CustomInputCodeEdit(Props) {
  var service = Props.service;
  var currentCustomInputName = Props.currentCustomInputName;
  var customInputs = service.react.useSelector(useSelector);
  return React.createElement(CustomCodeEditUtils$Frontend.make, {
              service: service,
              getCurrentCustomNameFromGlobalFunc: CodeEditUtils$Frontend.getCurrentCustomInputNameFromGlobal,
              getNameFunc: CustomUtils$Frontend.getInputName,
              setCurrentCustomNameToGlobalFunc: CodeEditUtils$Frontend.setCurrentCustomInputNameToGlobal,
              buildUpdateActionFunc: (function (name, newName, newOriginCode, newTranspiledCode) {
                  return {
                          TAG: /* UpdateCustomInputFileStr */15,
                          _0: name,
                          _1: newName,
                          _2: newOriginCode,
                          _3: newTranspiledCode
                        };
                }),
              currentCustomName: currentCustomInputName,
              customs: customInputs
            });
}

var make = CustomInputCodeEdit;

export {
  Method ,
  make ,
}
/*  Not a pure module */
