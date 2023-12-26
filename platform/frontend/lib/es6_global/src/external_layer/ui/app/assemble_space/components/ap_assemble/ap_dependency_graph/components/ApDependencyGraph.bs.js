

import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as DependencyGraphUtils$Frontend from "../../../utils/DependencyGraphUtils.bs.js";

function markIsPassDependencyGraphCheck(dispatch, isPass) {
  return Curry._1(dispatch, {
              TAG: /* MarkIsPassDependencyGraphCheck */17,
              _0: isPass
            });
}

function useSelector(param) {
  return [
          param.selectedPackages,
          param.selectedExtensions,
          param.selectedContributes,
          param.storedPackageIdsInApp
        ];
}

var Method = {
  markIsPassDependencyGraphCheck: markIsPassDependencyGraphCheck,
  useSelector: useSelector
};

function ApDependencyGraph(Props) {
  var service = Props.service;
  var dispatch = ReduxUtils$Frontend.ApAssemble.useDispatch(service.react.useDispatch);
  var match = ReduxUtils$Frontend.ApAssemble.useSelector(service.react.useSelector, useSelector);
  return React.createElement(DependencyGraphUtils$Frontend.make, {
              service: service,
              markIsPassDependencyGraphCheck: (function (param) {
                  return Curry._1(dispatch, {
                              TAG: /* MarkIsPassDependencyGraphCheck */17,
                              _0: param
                            });
                }),
              selectedPackages: match[0],
              storedPackageIdsInApp: match[3],
              selectedExtensions: match[1],
              selectedContributes: match[2]
            });
}

var make = ApDependencyGraph;

export {
  Method ,
  make ,
}
/* react Not a pure module */
