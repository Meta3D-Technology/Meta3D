

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as EventUtils$Frontend from "../../../../../utils/EventUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as MessageUtils$Frontend from "../../../../../utils/utils/MessageUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ExtensionsContributesUtils$Frontend from "../../../utils/ExtensionsContributesUtils.bs.js";

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

function startExtension(dispatch, inspectorCurrentExtension) {
  return Curry._1(dispatch, {
              TAG: /* StartExtension */5,
              _0: inspectorCurrentExtension.id
            });
}

function unstartExtension(dispatch, inspectorCurrentExtension) {
  return Curry._1(dispatch, {
              TAG: /* UnStartExtension */6,
              _0: inspectorCurrentExtension.id
            });
}

function updateSelectedExtension(dispatch, service, extensionId, extensionPackageData, extensionStr) {
  return Curry._1(dispatch, {
              TAG: /* UpdateSelectedExtension */14,
              _0: extensionId,
              _1: service.meta3d.loadExtension(service.meta3d.generateExtension(extensionPackageData, extensionStr)).extensionFuncData
            });
}

function useEffectOnce(param, service, param$1) {
  var setExtensionStr = param[1];
  var setInspectorCurrentExtension = param[0];
  var inspectorCurrentExtension = getInspectorCurrentExtension([
        param$1[0],
        param$1[1]
      ]);
  if (inspectorCurrentExtension !== undefined) {
    Curry._1(setInspectorCurrentExtension, (function (param) {
            return inspectorCurrentExtension;
          }));
    return Curry._1(setExtensionStr, (function (param) {
                  return service.meta3d.getExtensionFuncDataStr(inspectorCurrentExtension.data.extensionFuncData);
                }));
  } else {
    Curry._1(setInspectorCurrentExtension, (function (param) {
            
          }));
    return Curry._1(setExtensionStr, (function (param) {
                  return "";
                }));
  }
}

function useSelector(param) {
  return [
          param.inspectorCurrentExtensionId,
          param.selectedExtensions
        ];
}

var Method = {
  getInspectorCurrentExtension: getInspectorCurrentExtension,
  startExtension: startExtension,
  unstartExtension: unstartExtension,
  updateSelectedExtension: updateSelectedExtension,
  useEffectOnce: useEffectOnce,
  useSelector: useSelector
};

function ExtensionInspector(Props) {
  var service = Props.service;
  var match = Curry._1(service.react.useState, (function (param) {
          
        }));
  var setInspectorCurrentExtension = match[1];
  var inspectorCurrentExtension = match[0];
  var match$1 = Curry._1(service.react.useState, (function (param) {
          return "";
        }));
  var setExtensionStr = match$1[1];
  var extensionStr = match$1[0];
  var match$2 = ReduxUtils$Frontend.ApAssemble.useSelector(service.react.useSelector, useSelector);
  var selectedExtensions = match$2[1];
  var inspectorCurrentExtensionId = match$2[0];
  var dispatch = ReduxUtils$Frontend.ApAssemble.useDispatch(service.react.useDispatch);
  service.react.useEffect1((function (param) {
          useEffectOnce([
                setInspectorCurrentExtension,
                setExtensionStr
              ], service, [
                inspectorCurrentExtensionId,
                selectedExtensions
              ]);
        }), [
        inspectorCurrentExtensionId,
        selectedExtensions
      ]);
  if (inspectorCurrentExtension !== undefined) {
    return React.createElement(Antd.Space, {
                direction: "vertical",
                size: "middle",
                children: null
              }, ExtensionsContributesUtils$Frontend.buildBasicInfoUI(service, inspectorCurrentExtension.data.extensionPackageData.protocol.name, inspectorCurrentExtension.data.extensionPackageData.protocol.version, inspectorCurrentExtension.data.extensionPackageData.name, inspectorCurrentExtension.data.extensionPackageData.version, inspectorCurrentExtension.data.extensionPackageData.displayName), service.ui.buildTitle(2, "入口扩展", undefined), inspectorCurrentExtension.isStart ? React.createElement(Antd.Button, {
                      onClick: (function (param) {
                          Curry._1(dispatch, {
                                TAG: /* UnStartExtension */6,
                                _0: inspectorCurrentExtension.id
                              });
                        }),
                      children: "取消启动"
                    }) : React.createElement(Antd.Button, {
                      onClick: (function (param) {
                          Curry._1(dispatch, {
                                TAG: /* StartExtension */5,
                                _0: inspectorCurrentExtension.id
                              });
                        }),
                      children: "启动"
                    }), service.ui.buildTitle(2, "Debug", undefined), React.createElement(React.Fragment, undefined, React.createElement(Antd.Input.TextArea, {
                        value: extensionStr,
                        onChange: (function (e) {
                            Curry._1(setExtensionStr, (function (param) {
                                    return EventUtils$Frontend.getEventTargetValue(e);
                                  }));
                          })
                      }), React.createElement(Antd.Button, {
                        onClick: (function (param) {
                            MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                                    updateSelectedExtension(dispatch, service, inspectorCurrentExtension.id, inspectorCurrentExtension.data.extensionPackageData, extensionStr);
                                  }), 5);
                          }),
                        children: "提交"
                      })));
  } else {
    return null;
  }
}

var make = ExtensionInspector;

export {
  Method ,
  make ,
}
/*  Not a pure module */
