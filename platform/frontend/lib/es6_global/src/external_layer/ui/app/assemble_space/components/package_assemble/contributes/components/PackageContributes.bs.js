

import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ContributesUtils$Frontend from "../../../utils/ContributesUtils.bs.js";

import 'antd/dist/reset.css'
;

function selectContribute(dispatch, protocolIconBase64, protocolConfigStr, contribute) {
  return Curry._1(dispatch, {
              TAG: /* SelectContribute */5,
              _0: protocolIconBase64,
              _1: protocolConfigStr,
              _2: contribute
            });
}

function useSelector(param) {
  return param.selectedContributes;
}

var Method = {
  selectContribute: selectContribute,
  useSelector: useSelector
};

function PackageContributes(Props) {
  var service = Props.service;
  var selectedContributesFromMarket = Props.selectedContributesFromMarket;
  return React.createElement(ContributesUtils$Frontend.make, {
              service: service,
              selectedContributesFromMarket: selectedContributesFromMarket,
              selectedContributeNames: ListSt$Meta3dCommonlib.map(ReduxUtils$Frontend.PackageAssemble.useSelector(service.react.useSelector, useSelector), (function (param) {
                      return param.data.contributePackageData.name;
                    })),
              useDispatch: ReduxUtils$Frontend.PackageAssemble.useDispatch,
              selectContribute: selectContribute
            });
}

var make = PackageContributes;

export {
  Method ,
  make ,
}
/*  Not a pure module */
