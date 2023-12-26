

import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as PackagesUtils$Frontend from "../../utils/PackagesUtils.bs.js";

import 'antd/dist/reset.css'
;

function selectPackage(dispatch, $$package) {
  return Curry._1(dispatch, {
              TAG: /* SelectPackage */0,
              _0: $$package
            });
}

function useSelector(param) {
  return param.selectedPackages;
}

var Method = {
  selectPackage: selectPackage,
  useSelector: useSelector
};

function Packages(Props) {
  var service = Props.service;
  var selectedPackagesFromMarket = Props.selectedPackagesFromMarket;
  return React.createElement(PackagesUtils$Frontend.make, {
              service: service,
              selectedPackagesFromMarket: selectedPackagesFromMarket,
              selectedPackageNames: ListSt$Meta3dCommonlib.map(ReduxUtils$Frontend.ApAssemble.useSelector(service.react.useSelector, useSelector), (function (param) {
                      return param.name;
                    })),
              useDispatch: ReduxUtils$Frontend.ApAssemble.useDispatch,
              selectPackage: selectPackage
            });
}

var make = Packages;

export {
  Method ,
  make ,
}
/*  Not a pure module */
