

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ExtensionsContributesUtils$Frontend from "../../../utils/ExtensionsContributesUtils.bs.js";

import 'antd/dist/reset.css'
;

function selectAll(dispatch, selectedPackagesFromMarket, selectedExtensionsFromMarket, selectedContributesFromMarket) {
  ListSt$Meta3dCommonlib.forEach(selectedExtensionsFromMarket, (function (param) {
          var extension = param[0];
          return Curry._1(dispatch, {
                      TAG: /* SelectExtension */1,
                      _0: extension.protocolIconBase64,
                      _1: extension.protocolDisplayName,
                      _2: extension.protocolRepoLink,
                      _3: extension.protocolDescription,
                      _4: ExtensionsContributesUtils$Frontend.getProtocolConfigStr(param[1]),
                      _5: extension
                    });
        }));
  ListSt$Meta3dCommonlib.forEach(selectedContributesFromMarket, (function (param) {
          var contribute = param[0];
          return Curry._1(dispatch, {
                      TAG: /* SelectContribute */5,
                      _0: contribute.protocolIconBase64,
                      _1: ExtensionsContributesUtils$Frontend.getProtocolConfigStr(param[1]),
                      _2: contribute
                    });
        }));
  ListSt$Meta3dCommonlib.forEach(selectedPackagesFromMarket, (function ($$package) {
          return Curry._1(dispatch, {
                      TAG: /* SelectPackage */0,
                      _0: $$package
                    });
        }));
}

var Method = {
  selectAll: selectAll
};

function PackageController(Props) {
  var service = Props.service;
  var selectedPackagesFromMarket = Props.selectedPackagesFromMarket;
  var selectedExtensionsFromMarket = Props.selectedExtensionsFromMarket;
  var selectedContributesFromMarket = Props.selectedContributesFromMarket;
  var dispatch = ReduxUtils$Frontend.PackageAssemble.useDispatch(service.react.useDispatch);
  return React.createElement(React.Fragment, undefined, React.createElement(Antd.Button, {
                  onClick: (function (param) {
                      selectAll(dispatch, selectedPackagesFromMarket, selectedExtensionsFromMarket, selectedContributesFromMarket);
                    }),
                  children: "选择所有"
                }));
}

var make = PackageController;

export {
  Method ,
  make ,
}
/*  Not a pure module */
