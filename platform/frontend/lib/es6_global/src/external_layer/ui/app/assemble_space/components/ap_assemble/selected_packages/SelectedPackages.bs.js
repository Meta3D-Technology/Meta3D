

import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as SelectedPackagesUtils$Frontend from "../../utils/SelectedPackagesUtils.bs.js";

import 'antd/dist/reset.css'
;

function selectPackage(dispatch, id) {
  return Curry._1(dispatch, {
              TAG: /* SetInspectorCurrentPackageId */9,
              _0: id
            });
}

function useSelector(param) {
  return param.selectedPackages;
}

var Method = {
  selectPackage: selectPackage,
  useSelector: useSelector
};

function SelectedPackages(Props) {
  var service = Props.service;
  return React.createElement(SelectedPackagesUtils$Frontend.make, {
              service: service,
              useDispatch: ReduxUtils$Frontend.ApAssemble.useDispatch,
              useSelectorResult: ListSt$Meta3dCommonlib.map(ReduxUtils$Frontend.ApAssemble.useSelector(service.react.useSelector, useSelector), (function (param) {
                      return [
                              param.id,
                              param.protocol.iconBase64,
                              param.name
                            ];
                    })),
              selectPackage: selectPackage
            });
}

var make = SelectedPackages;

export {
  Method ,
  make ,
}
/*  Not a pure module */
