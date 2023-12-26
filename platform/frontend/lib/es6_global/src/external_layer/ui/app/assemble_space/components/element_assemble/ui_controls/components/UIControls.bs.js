

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as IdUtils$Frontend from "../../../../../utils/utils/IdUtils.bs.js";
import * as EventUtils$Frontend from "../../../../../utils/EventUtils.bs.js";
import * as GuideUtils$Frontend from "../../../../../utils/GuideUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as MessageUtils$Frontend from "../../../../../utils/utils/MessageUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as SelectedContributesForElementUtils$Frontend from "../../utils/SelectedContributesForElementUtils.bs.js";

import 'antd/dist/reset.css'
;

function _convertSpecificType(specific) {
  return ArraySt$Meta3dCommonlib.map(specific, (function (param) {
                return {
                        name: param.name,
                        type_: param.type_,
                        value: /* SpecicFieldDataValue */{
                          _0: param.value
                        }
                      };
              }));
}

function _getScenViewUIControlProtocolName(param) {
  return "meta3d-ui-control-scene-view-protocol";
}

function _checkShouldOnlyHasOneSceneViewUIControlAtMost(protocolName, selectedUIControls) {
  if (protocolName === "meta3d-ui-control-scene-view-protocol" && ListSt$Meta3dCommonlib.length(ListSt$Meta3dCommonlib.filter(selectedUIControls, (function (uiControl) {
                return uiControl.data.contributePackageData.protocol.name === protocolName;
              }))) !== 0) {
    return "只能有1个Scene View UI Control";
  }
  
}

function selectUIControl(service, dispatch, eventEmitter, selectedUIControls, selectedContributes, protocolIconBase64, protocolConfigStr, displayName, data, parentUIControlId) {
  var protocolConfigStr$1 = OptionSt$Meta3dCommonlib.getExn(protocolConfigStr);
  var errorMessage = _checkShouldOnlyHasOneSceneViewUIControlAtMost(data.contributePackageData.protocol.name, selectedUIControls);
  if (errorMessage !== undefined) {
    return service.console.error(errorMessage, undefined);
  }
  var id = IdUtils$Frontend.generateId(service.other.random);
  Curry._1(dispatch, {
        TAG: /* SelectUIControl */0,
        _0: id,
        _1: protocolIconBase64,
        _2: protocolConfigStr$1,
        _3: displayName,
        _4: data,
        _5: parentUIControlId,
        _6: _convertSpecificType(service.meta3d.getUIControlSpecificDataFields(service.meta3d.serializeUIControlProtocolConfigLib(protocolConfigStr$1)))
      });
  Curry._1(dispatch, {
        TAG: /* SelectSelectedUIControl */2,
        _0: [
          service.meta3d.hasChildren,
          service.meta3d.serializeUIControlProtocolConfigLib
        ],
        _1: id
      });
  eventEmitter.emit(EventUtils$Frontend.getSelectUIControlEventName(undefined), data.contributePackageData.protocol.name);
}

function useSelector(param) {
  var elementAssembleState = param.assembleSpaceState.elementAssembleState;
  return [
          [
            elementAssembleState.selectedUIControls,
            elementAssembleState.parentUIControlId
          ],
          param.eventEmitter
        ];
}

var Method = {
  getUIControls: SelectedContributesForElementUtils$Frontend.getUIControls,
  _convertSpecificType: _convertSpecificType,
  _getScenViewUIControlProtocolName: _getScenViewUIControlProtocolName,
  _checkShouldOnlyHasOneSceneViewUIControlAtMost: _checkShouldOnlyHasOneSceneViewUIControlAtMost,
  selectUIControl: selectUIControl,
  useSelector: useSelector
};

function UIControls(Props) {
  var service = Props.service;
  var setIsShowUIControls = Props.setIsShowUIControls;
  var selectedContributes = Props.selectedContributes;
  var selectSceneViewUIControlTarget = Props.selectSceneViewUIControlTarget;
  var selectGameViewUIControlTarget = Props.selectGameViewUIControlTarget;
  var selectWindowUIControlTarget = Props.selectWindowUIControlTarget;
  var selectButtonUIControlTarget = Props.selectButtonUIControlTarget;
  var dispatch = ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var match = service.react.useAllSelector(useSelector);
  var eventEmitter = match[1];
  var match$1 = match[0];
  var parentUIControlId = match$1[1];
  var selectedUIControls = match$1[0];
  service.react.useEffect1((function (param) {
          
        }), []);
  return React.createElement(Antd.List, {
              grid: {
                gutter: 16,
                column: 3
              },
              dataSource: ListSt$Meta3dCommonlib.toArray(SelectedContributesForElementUtils$Frontend.getUIControls(selectedContributes)),
              renderItem: (function (param) {
                  var data = param.data;
                  var protocolConfigStr = param.protocolConfigStr;
                  var protocolIconBase64 = param.protocolIconBase64;
                  var displayName = data.contributePackageData.displayName;
                  return React.createElement(Antd.List.Item, {
                              children: React.createElement(Antd.Card, {
                                    bordered: false,
                                    key: param.id,
                                    onClick: (function (param) {
                                        MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                                                selectUIControl(service, dispatch, eventEmitter, selectedUIControls, selectedContributes, protocolIconBase64, protocolConfigStr, displayName, data, parentUIControlId);
                                                Curry._1(setIsShowUIControls, (function (param) {
                                                        return false;
                                                      }));
                                              }), 5);
                                      }),
                                    bodyStyle: {
                                      padding: "0px"
                                    },
                                    cover: React.createElement("div", {
                                          style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                          }
                                        }, React.createElement(Antd.Image, {
                                              preview: false,
                                              width: 50,
                                              height: 50,
                                              src: protocolIconBase64
                                            })),
                                    children: React.createElement(Antd.Card.Meta, {
                                          title: React.createElement(Antd.Row, {
                                                justify: "center",
                                                children: React.createElement("span", {
                                                      style: {
                                                        whiteSpace: "normal",
                                                        wordBreak: "break-all",
                                                        wordWrap: "break-word"
                                                      }
                                                    }, displayName)
                                              })
                                        })
                                  }),
                              ref: GuideUtils$Frontend.isSceneViewProtocolName(data.contributePackageData.protocol.name) ? selectSceneViewUIControlTarget : (
                                  GuideUtils$Frontend.isGameViewProtocolName(data.contributePackageData.protocol.name) ? selectGameViewUIControlTarget : (
                                      GuideUtils$Frontend.isWindowProtocolName(data.contributePackageData.protocol.name) ? selectWindowUIControlTarget : (
                                          GuideUtils$Frontend.isButtonProtocolName(data.contributePackageData.protocol.name) ? selectButtonUIControlTarget : NullableSt$Meta3dCommonlib.getEmpty(undefined)
                                        )
                                    )
                                )
                            });
                })
            });
}

var make = UIControls;

export {
  Method ,
  make ,
}
/*  Not a pure module */
