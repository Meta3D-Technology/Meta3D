

import * as React from "react";
import * as CustomUtils$Frontend from "../../utils/CustomUtils.bs.js";
import * as CodeEditUtils$Frontend from "../../../utils/CodeEditUtils.bs.js";
import * as CustomCodeEditUtils$Frontend from "../utils/CustomCodeEditUtils.bs.js";

import 'antd/dist/reset.css'
;

function useSelector(param) {
  return param.elementAssembleState.customActions;
}

var Method = {
  useSelector: useSelector
};

function CustomActionCodeEdit(Props) {
  var service = Props.service;
  var currentCustomActionName = Props.currentCustomActionName;
  var customActions = service.react.useSelector(useSelector);
  return React.createElement(CustomCodeEditUtils$Frontend.make, {
              service: service,
              getCurrentCustomNameFromGlobalFunc: CodeEditUtils$Frontend.getCurrentCustomActionNameFromGlobal,
              getNameFunc: CustomUtils$Frontend.getActionName,
              setCurrentCustomNameToGlobalFunc: CodeEditUtils$Frontend.setCurrentCustomActionNameToGlobal,
              buildUpdateActionFunc: (function (name, newName, newOriginCode, newTranspiledCode) {
                  return {
                          TAG: /* UpdateCustomActionFileStr */16,
                          _0: name,
                          _1: newName,
                          _2: newOriginCode,
                          _3: newTranspiledCode
                        };
                }),
              currentCustomName: currentCustomActionName,
              customs: customActions
            });
}

var make = CustomActionCodeEdit;

export {
  Method ,
  make ,
}
/*  Not a pure module */
