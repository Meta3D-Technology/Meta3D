

import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as SelectedPackagesUtils$Frontend from "../../utils/SelectedPackagesUtils.bs.js";

import 'antd/dist/reset.css'
;

function useSelector(param) {
  return param.selectedPackages;
}

var Method = {
  useSelector: useSelector
};

function PackageSelectedPackages(Props) {
  var service = Props.service;
  return React.createElement(SelectedPackagesUtils$Frontend.make, {
              service: service,
              useDispatch: ReduxUtils$Frontend.PackageAssemble.useDispatch,
              useSelectorResult: ListSt$Meta3dCommonlib.map(ReduxUtils$Frontend.PackageAssemble.useSelector(service.react.useSelector, useSelector), (function (param) {
                      return [
                              param.id,
                              param.protocol.iconBase64,
                              param.name
                            ];
                    }))
            });
}

var make = PackageSelectedPackages;

export {
  Method ,
  make ,
}
/*  Not a pure module */
