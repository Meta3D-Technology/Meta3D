

import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as SelectedExtensionsUtils$Frontend from "../../../utils/SelectedExtensionsUtils.bs.js";

import 'antd/dist/reset.css'
;

function selectExtension(dispatch, id) {
  return Curry._1(dispatch, {
              TAG: /* SetInspectorCurrentExtensionId */2,
              _0: id
            });
}

function useSelector(param) {
  return param.selectedExtensions;
}

var Method = {
  selectExtension: selectExtension,
  useSelector: useSelector
};

function PackageSelectedExtensions(Props) {
  var service = Props.service;
  return React.createElement(SelectedExtensionsUtils$Frontend.make, {
              service: service,
              useDispatch: ReduxUtils$Frontend.PackageAssemble.useDispatch,
              useSelectorResult: ListSt$Meta3dCommonlib.map(ReduxUtils$Frontend.PackageAssemble.useSelector(service.react.useSelector, useSelector), (function (param) {
                      return [
                              param.id,
                              param.protocolIconBase64,
                              param.data
                            ];
                    })),
              selectExtension: selectExtension
            });
}

var make = PackageSelectedExtensions;

export {
  Method ,
  make ,
}
/*  Not a pure module */
