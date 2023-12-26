

import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as SelectedContributesUtils$Frontend from "../../../utils/SelectedContributesUtils.bs.js";

import 'antd/dist/reset.css'
;

function selectContribute(dispatch, id) {
  return Curry._1(dispatch, {
              TAG: /* SetInspectorCurrentContributeId */8,
              _0: id
            });
}

function useSelector(param) {
  return param.selectedContributes;
}

var Method = {
  selectContribute: selectContribute,
  useSelector: useSelector
};

function SelectedContributes(Props) {
  var service = Props.service;
  return React.createElement(SelectedContributesUtils$Frontend.make, {
              service: service,
              useDispatch: ReduxUtils$Frontend.ApAssemble.useDispatch,
              useSelectorResult: ListSt$Meta3dCommonlib.map(ReduxUtils$Frontend.ApAssemble.useSelector(service.react.useSelector, useSelector), (function (param) {
                      return [
                              param.id,
                              param.protocolIconBase64,
                              param.data
                            ];
                    })),
              selectContribute: selectContribute
            });
}

var make = SelectedContributes;

export {
  Method ,
  make ,
}
/*  Not a pure module */
