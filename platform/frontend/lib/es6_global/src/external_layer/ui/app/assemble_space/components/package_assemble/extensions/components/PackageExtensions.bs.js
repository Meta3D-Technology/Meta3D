

import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ExtensionsUtils$Frontend from "../../../utils/ExtensionsUtils.bs.js";

import 'antd/dist/reset.css'
;

function selectExtension(dispatch, protocolIconBase64, protocolDisplayName, protocolRepoLink, protocolDescription, protocolConfigStr, extension) {
  return Curry._1(dispatch, {
              TAG: /* SelectExtension */1,
              _0: protocolIconBase64,
              _1: protocolDisplayName,
              _2: protocolRepoLink,
              _3: protocolDescription,
              _4: protocolConfigStr,
              _5: extension
            });
}

function useSelector(param) {
  return param.selectedExtensions;
}

var Method = {
  selectExtension: selectExtension,
  useSelector: useSelector
};

function PackageExtensions(Props) {
  var service = Props.service;
  var selectedExtensionsFromMarket = Props.selectedExtensionsFromMarket;
  return React.createElement(ExtensionsUtils$Frontend.make, {
              service: service,
              selectedExtensionsFromMarket: selectedExtensionsFromMarket,
              selectedExtensionNames: ListSt$Meta3dCommonlib.map(ReduxUtils$Frontend.PackageAssemble.useSelector(service.react.useSelector, useSelector), (function (param) {
                      return param.data.extensionPackageData.name;
                    })),
              useDispatch: ReduxUtils$Frontend.PackageAssemble.useDispatch,
              selectExtension: selectExtension
            });
}

var make = PackageExtensions;

export {
  Method ,
  make ,
}
/*  Not a pure module */
