

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

import 'antd/dist/reset.css'
;

function getInspectorCurrentExtension(param) {
  var selectedExtensions = param[1];
  return OptionSt$Meta3dCommonlib.bind(param[0], (function (inspectorCurrentExtensionId) {
                return ListSt$Meta3dCommonlib.getBy(selectedExtensions, (function (extension) {
                              return extension.id === inspectorCurrentExtensionId;
                            }));
              }));
}

function markEntryExtension(dispatch, inspectorCurrentExtension) {
  return Curry._1(dispatch, {
              TAG: /* MarkEntryExtension */3,
              _0: inspectorCurrentExtension.id
            });
}

function unmarkEntryExtension(dispatch, inspectorCurrentExtension) {
  return Curry._1(dispatch, {
              TAG: /* UnMarkEntryExtension */4,
              _0: inspectorCurrentExtension.id
            });
}

function useSelector(param) {
  return [
          param.inspectorCurrentExtensionId,
          param.selectedExtensions
        ];
}

var Method = {
  getInspectorCurrentExtension: getInspectorCurrentExtension,
  markEntryExtension: markEntryExtension,
  unmarkEntryExtension: unmarkEntryExtension,
  useSelector: useSelector
};

function PackageExtensionInspector(Props) {
  var service = Props.service;
  var dispatch = ReduxUtils$Frontend.PackageAssemble.useDispatch(service.react.useDispatch);
  var inspectorCurrentExtension = getInspectorCurrentExtension(ReduxUtils$Frontend.PackageAssemble.useSelector(service.react.useSelector, useSelector));
  if (inspectorCurrentExtension !== undefined) {
    return React.createElement(Antd.Space, {
                direction: "vertical",
                size: "middle",
                children: inspectorCurrentExtension.isEntry ? React.createElement(Antd.Button, {
                        onClick: (function (param) {
                            Curry._1(dispatch, {
                                  TAG: /* UnMarkEntryExtension */4,
                                  _0: inspectorCurrentExtension.id
                                });
                          }),
                        children: "取消设为入口"
                      }) : React.createElement(Antd.Button, {
                        onClick: (function (param) {
                            Curry._1(dispatch, {
                                  TAG: /* MarkEntryExtension */3,
                                  _0: inspectorCurrentExtension.id
                                });
                          }),
                        children: "设为入口"
                      })
              });
  } else {
    return null;
  }
}

var make = PackageExtensionInspector;

export {
  Method ,
  make ,
}
/*  Not a pure module */
