

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

function getInspectorCurrentContribute(param) {
  var selectedContributes = param[1];
  return OptionSt$Meta3dCommonlib.bind(param[0], (function (inspectorCurrentContributeId) {
                return ListSt$Meta3dCommonlib.getBy(selectedContributes, (function (contribute) {
                              return contribute.id === inspectorCurrentContributeId;
                            }));
              }));
}

function updateSelectedContribute(dispatch, service, contributeId, contributePackageData, contributeStr) {
  return Curry._1(dispatch, {
              TAG: /* UpdateSelectedContribute */15,
              _0: contributeId,
              _1: service.meta3d.loadContribute(service.meta3d.generateContribute(contributePackageData, contributeStr)).contributeFuncData
            });
}

function useEffectOnce(param, service, param$1) {
  var setContributeStr = param[1];
  var setInspectorCurrentContribute = param[0];
  var inspectorCurrentContribute = getInspectorCurrentContribute([
        param$1[0],
        param$1[1]
      ]);
  if (inspectorCurrentContribute !== undefined) {
    Curry._1(setInspectorCurrentContribute, (function (param) {
            return inspectorCurrentContribute;
          }));
    return Curry._1(setContributeStr, (function (param) {
                  return service.meta3d.getContributeFuncDataStr(inspectorCurrentContribute.data.contributeFuncData);
                }));
  } else {
    Curry._1(setInspectorCurrentContribute, (function (param) {
            
          }));
    return Curry._1(setContributeStr, (function (param) {
                  return "";
                }));
  }
}

function useSelector(param) {
  return [
          param.inspectorCurrentContributeId,
          param.selectedContributes
        ];
}

var Method = {
  getInspectorCurrentContribute: getInspectorCurrentContribute,
  updateSelectedContribute: updateSelectedContribute,
  useEffectOnce: useEffectOnce,
  useSelector: useSelector
};

function ContributeInspector(Props) {
  var service = Props.service;
  var match = Curry._1(service.react.useState, (function (param) {
          
        }));
  var setInspectorCurrentContribute = match[1];
  var inspectorCurrentContribute = match[0];
  var match$1 = Curry._1(service.react.useState, (function (param) {
          return "";
        }));
  var setContributeStr = match$1[1];
  var contributeStr = match$1[0];
  var match$2 = Curry._1(service.react.useState, (function (param) {
          return false;
        }));
  var setIsDebugChange = match$2[1];
  var match$3 = ReduxUtils$Frontend.ApAssemble.useSelector(service.react.useSelector, useSelector);
  var selectedContributes = match$3[1];
  var inspectorCurrentContributeId = match$3[0];
  var dispatch = ReduxUtils$Frontend.ApAssemble.useDispatch(service.react.useDispatch);
  service.react.useEffect1((function (param) {
          useEffectOnce([
                setInspectorCurrentContribute,
                setContributeStr
              ], service, [
                inspectorCurrentContributeId,
                selectedContributes
              ]);
        }), [
        inspectorCurrentContributeId,
        selectedContributes
      ]);
  if (inspectorCurrentContribute !== undefined) {
    return React.createElement(Antd.Space, {
                direction: "vertical",
                size: "middle",
                children: null
              }, ExtensionsContributesUtils$Frontend.buildBasicInfoUI(service, inspectorCurrentContribute.data.contributePackageData.protocol.name, inspectorCurrentContribute.data.contributePackageData.protocol.version, inspectorCurrentContribute.data.contributePackageData.name, inspectorCurrentContribute.data.contributePackageData.version, inspectorCurrentContribute.data.contributePackageData.displayName), service.ui.buildTitle(2, "Debug", undefined), React.createElement(React.Fragment, undefined, React.createElement(Antd.Input.TextArea, {
                        value: match$2[0] ? contributeStr : "",
                        onChange: (function (e) {
                            Curry._1(setContributeStr, (function (param) {
                                    return EventUtils$Frontend.getEventTargetValue(e);
                                  }));
                            Curry._1(setIsDebugChange, (function (param) {
                                    return true;
                                  }));
                          })
                      }), React.createElement(Antd.Button, {
                        onClick: (function (param) {
                            MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                                    updateSelectedContribute(dispatch, service, inspectorCurrentContribute.id, inspectorCurrentContribute.data.contributePackageData, contributeStr);
                                  }), 5);
                          }),
                        children: "提交"
                      })));
  } else {
    return null;
  }
}

var make = ContributeInspector;

export {
  Method ,
  make ,
}
/*  Not a pure module */
