

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Icons from "@ant-design/icons";
import * as EventUtils$Frontend from "../../../../../utils/EventUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as UIControls$Frontend from "../../ui_controls/components/UIControls.bs.js";
import * as HierachyUtils$Frontend from "../../utils/HierachyUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as SpecificUtils$Frontend from "../../utils/SpecificUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

import 'antd/dist/reset.css'
;

function getRootKey(param) {
  return "root";
}

function _selectUIControl(service, dispatch, id) {
  if (id === "root") {
    return Curry._1(dispatch, /* SelectRootUIControl */2);
  } else {
    return Curry._1(dispatch, {
                TAG: /* SelectSelectedUIControl */2,
                _0: [
                  service.meta3d.hasChildren,
                  service.meta3d.serializeUIControlProtocolConfigLib
                ],
                _1: id
              });
  }
}

function _findLabel(id, selectedUIControlInspectorData) {
  return OptionSt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.find(OptionSt$Meta3dCommonlib.getExn(HierachyUtils$Frontend.findSelectedUIControlData(undefined, [
                          (function (data) {
                              return data.id;
                            }),
                          (function (data) {
                              return data.children;
                            })
                        ], selectedUIControlInspectorData, id)).specific, (function (param) {
                    return param.name === "label";
                  })), (function (param) {
                return SpecificUtils$Frontend.getSpecificDataValue(param.value);
              }));
}

function findTitle(id, title, selectedUIControls, selectedUIControlInspectorData) {
  if (id === "root") {
    return title;
  }
  var match = OptionSt$Meta3dCommonlib.getExn(HierachyUtils$Frontend.findSelectedUIControlData(undefined, [
            (function (data) {
                return data.id;
              }),
            (function (data) {
                return data.children;
              })
          ], selectedUIControls, id));
  return OptionSt$Meta3dCommonlib.getWithDefault(_findLabel(id, selectedUIControlInspectorData), match.displayName);
}

function convertToTreeData(service, selectedUIControls, selectedUIControlInspectorData) {
  return ListSt$Meta3dCommonlib.toArray(ListSt$Meta3dCommonlib.map(selectedUIControls, (function (param) {
                    var id = param.id;
                    return {
                            title: React.createElement(Antd.Space, {
                                  wrap: true,
                                  direction: "horizontal",
                                  children: service.ui.buildText(OptionSt$Meta3dCommonlib.getWithDefault(_findLabel(id, selectedUIControlInspectorData), param.displayName), "default", undefined)
                                }),
                            key: id,
                            icon: React.createElement(Antd.Image, {
                                  preview: false,
                                  width: 20,
                                  height: 20,
                                  src: param.protocolIconBase64
                                }),
                            children: convertToTreeData(service, param.children, selectedUIControlInspectorData)
                          };
                  })));
}

function addRootTreeNode(allTreeData) {
  return [{
            title: "root",
            key: "root",
            icon: null,
            children: allTreeData
          }];
}

function getAllKeys(selectedUIControls) {
  return HierachyUtils$Frontend.reduceAllSelectedUIControlData([], (function (result, data) {
                return ArraySt$Meta3dCommonlib.push(result, data.id);
              }), (function (data) {
                return data.children;
              }), selectedUIControls);
}

function onSelect(service, param, selectedKeysValue, info) {
  Curry._1(param[1], (function (param) {
          return selectedKeysValue;
        }));
  return _selectUIControl(service, param[0], info.node.key);
}

function unselectUIControl(dispatch, isDebug, selectedKeys) {
  if (ArraySt$Meta3dCommonlib.length(selectedKeys) === 0) {
    return ;
  } else {
    Curry._1(dispatch, {
          TAG: /* UnSelectUIControlAndChildren */1,
          _0: ArraySt$Meta3dCommonlib.getExn(selectedKeys, 0)
        });
    return Curry._1(dispatch, /* SelectRootUIControl */2);
  }
}

function useSelector(param) {
  var assembleSpaceState = param.assembleSpaceState;
  var elementAssembleState = assembleSpaceState.elementAssembleState;
  return [
          [
            assembleSpaceState.apAssembleState.apInspectorData.isDebug,
            elementAssembleState.selectedUIControls,
            elementAssembleState.selectedUIControlInspectorData
          ],
          param.eventEmitter
        ];
}

var Method = {
  getRootKey: getRootKey,
  _selectUIControl: _selectUIControl,
  _findLabel: _findLabel,
  findTitle: findTitle,
  convertToTreeData: convertToTreeData,
  addRootTreeNode: addRootTreeNode,
  getAllKeys: getAllKeys,
  onSelect: onSelect,
  unselectUIControl: unselectUIControl,
  useSelector: useSelector
};

function SelectedUIControls(Props) {
  var service = Props.service;
  var selectedContributes = Props.selectedContributes;
  var addUIControlButtonTarget = Props.addUIControlButtonTarget;
  var selectSceneViewUIControlTarget = Props.selectSceneViewUIControlTarget;
  var selectedUIControlTarget = Props.selectedUIControlTarget;
  var selectGameViewUIControlTarget = Props.selectGameViewUIControlTarget;
  var selectWindowUIControlTarget = Props.selectWindowUIControlTarget;
  var selectButtonUIControlTarget = Props.selectButtonUIControlTarget;
  var dispatch = ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  Curry._1(service.react.useState, (function (param) {
          return ["root"];
        }));
  var match = Curry._1(service.react.useState, (function (param) {
          return [];
        }));
  var setSelectedKeys = match[1];
  var selectedKeys = match[0];
  var match$1 = Curry._1(service.react.useState, (function (param) {
          return false;
        }));
  var setIsShowUIControls = match$1[1];
  var match$2 = service.react.useAllSelector(useSelector);
  var eventEmitter = match$2[1];
  var match$3 = match$2[0];
  var selectedUIControlInspectorData = match$3[2];
  var selectedUIControls = match$3[1];
  var isDebug = match$3[0];
  return React.createElement(React.Fragment, undefined, React.createElement(Antd.Space, {
                  direction: "vertical",
                  size: "middle",
                  children: null
                }, React.createElement(Antd.Space, {
                      wrap: true,
                      direction: "horizontal",
                      children: null
                    }, React.createElement(Antd.Button, {
                          icon: React.createElement(Icons.FileAddOutlined, {}),
                          onClick: (function (param) {
                              Curry._1(setIsShowUIControls, (function (param) {
                                      return true;
                                    }));
                              eventEmitter.emit(EventUtils$Frontend.getAddUIControlsEventName(undefined), 1);
                            }),
                          ref: addUIControlButtonTarget
                        }), React.createElement(Antd.Button, {
                          icon: React.createElement(Icons.DeleteOutlined, {}),
                          onClick: (function (param) {
                              unselectUIControl(dispatch, isDebug, selectedKeys);
                            })
                        })), React.createElement("section", {
                      ref: selectedUIControlTarget
                    }, React.createElement(Antd.Tree, {
                          autoExpandParent: true,
                          treeData: addRootTreeNode(convertToTreeData(service, selectedUIControls, selectedUIControlInspectorData)),
                          expandedKeys: getAllKeys(selectedUIControls),
                          selectedKeys: selectedKeys,
                          onSelect: (function (selectedKeysValue, info) {
                              onSelect(service, [
                                    dispatch,
                                    setSelectedKeys
                                  ], selectedKeysValue, info);
                              eventEmitter.emit(EventUtils$Frontend.getSelectTreeNodeEventName(undefined), findTitle(info.node.key, info.node.title, selectedUIControls, selectedUIControlInspectorData));
                            }),
                          showIcon: true
                        }))), React.createElement(Antd.Modal, {
                  title: "UI Controls",
                  visible: match$1[0],
                  onOk: (function (param) {
                      Curry._1(setIsShowUIControls, (function (param) {
                              return false;
                            }));
                    }),
                  onCancel: (function (param) {
                      Curry._1(setIsShowUIControls, (function (param) {
                              return false;
                            }));
                    }),
                  footer: null,
                  children: React.createElement(UIControls$Frontend.make, {
                        service: service,
                        setIsShowUIControls: setIsShowUIControls,
                        selectedContributes: selectedContributes,
                        selectSceneViewUIControlTarget: selectSceneViewUIControlTarget,
                        selectGameViewUIControlTarget: selectGameViewUIControlTarget,
                        selectWindowUIControlTarget: selectWindowUIControlTarget,
                        selectButtonUIControlTarget: selectButtonUIControlTarget
                      })
                }));
}

var make = SelectedUIControls;

export {
  Method ,
  make ,
}
/*  Not a pure module */
