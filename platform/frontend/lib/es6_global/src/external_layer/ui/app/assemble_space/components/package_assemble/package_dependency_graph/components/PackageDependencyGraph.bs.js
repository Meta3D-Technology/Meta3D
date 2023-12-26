

import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as DependencyGraphUtils$Frontend from "../../../utils/DependencyGraphUtils.bs.js";

function markIsPassDependencyGraphCheck(isPass) {
  
}

function convertSelectedExtensions(selectedExtensions) {
  return ListSt$Meta3dCommonlib.map(selectedExtensions, (function (param) {
                return {
                        id: param.id,
                        protocolIconBase64: param.protocolIconBase64,
                        protocolConfigStr: param.protocolConfigStr,
                        isStart: param.isEntry,
                        version: param.version,
                        data: param.data
                      };
              }));
}

function useSelector(param) {
  return [
          param.selectedPackages,
          param.selectedExtensions,
          param.selectedContributes
        ];
}

var Method = {
  markIsPassDependencyGraphCheck: markIsPassDependencyGraphCheck,
  convertSelectedExtensions: convertSelectedExtensions,
  useSelector: useSelector
};

function PackageDependencyGraph(Props) {
  var service = Props.service;
  var match = ReduxUtils$Frontend.PackageAssemble.useSelector(service.react.useSelector, useSelector);
  return React.createElement(DependencyGraphUtils$Frontend.make, {
              service: service,
              markIsPassDependencyGraphCheck: markIsPassDependencyGraphCheck,
              selectedPackages: match[0],
              storedPackageIdsInApp: /* [] */0,
              selectedExtensions: convertSelectedExtensions(match[1]),
              selectedContributes: match[2]
            });
}

var make = PackageDependencyGraph;

export {
  Method ,
  make ,
}
/* react Not a pure module */
