

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../../../../../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Icons from "@ant-design/icons";
import * as IntUtils$Frontend from "../../utils/IntUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../utils/utils/ReduxUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";

import 'antd/dist/reset.css'
;

function _generateName(customNames, prefix) {
  var _index = 1;
  while(true) {
    var index = _index;
    var result = "" + prefix + "" + IntUtils$Frontend.intToString(index) + "";
    if (!ListSt$Meta3dCommonlib.includes(customNames, result)) {
      return result;
    }
    _index = index + 1 | 0;
    continue ;
  };
}

function addCustom(dispatch, buildAddActionFunc, buildDefaultOriginFileStrFunc, buildDefaultTranspiledFileStrFunc, prefix, customs) {
  var name = _generateName(ListSt$Meta3dCommonlib.map(customs, (function (custom) {
              return custom.name;
            })), prefix);
  return Curry._1(dispatch, Curry._1(buildAddActionFunc, {
                  name: name,
                  originFileStr: Curry._1(buildDefaultOriginFileStrFunc, name),
                  transpiledFileStr: Curry._1(buildDefaultTranspiledFileStrFunc, name)
                }));
}

function removeCustom(dispatch, buildRemoveActionFunc, currentCustomName) {
  if (currentCustomName !== undefined) {
    return Curry._1(dispatch, Curry._1(buildRemoveActionFunc, Caml_option.valFromOption(currentCustomName)));
  }
  
}

function convertToTreeData(customs) {
  return ListSt$Meta3dCommonlib.toArray(ListSt$Meta3dCommonlib.map(customs, (function (param) {
                    var name = param.name;
                    return {
                            title: name,
                            key: name,
                            icon: null,
                            children: []
                          };
                  })));
}

function onSelect(param, buildSelectActionFunc, setCurrentCustomNameToGlobalFunc, selectedKeysValue, info) {
  Curry._1(setCurrentCustomNameToGlobalFunc, info.node.key);
  Curry._1(param[1], (function (param) {
          return selectedKeysValue;
        }));
  return Curry._1(param[0], Curry._1(buildSelectActionFunc, info.node.key));
}

function useSelector(param) {
  return param.eventEmitter;
}

var Method = {
  _generateName: _generateName,
  addCustom: addCustom,
  removeCustom: removeCustom,
  convertToTreeData: convertToTreeData,
  onSelect: onSelect,
  useSelector: useSelector
};

function CustomDomUtils(Props) {
  var service = Props.service;
  var buildSelectActionFunc = Props.buildSelectActionFunc;
  var buildAddActionFunc = Props.buildAddActionFunc;
  var buildRemoveActionFunc = Props.buildRemoveActionFunc;
  var buildDefaultOriginFileStrFunc = Props.buildDefaultOriginFileStrFunc;
  var buildDefaultTranspiledFileStrFunc = Props.buildDefaultTranspiledFileStrFunc;
  var setCurrentCustomNameToGlobalFunc = Props.setCurrentCustomNameToGlobalFunc;
  var addButtonTarget = Props.addButtonTarget;
  var addEventName = Props.addEventName;
  var selectEventName = Props.selectEventName;
  var currentCustomName = Props.currentCustomName;
  var customs = Props.customs;
  var prefix = Props.prefix;
  var dispatch = ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var eventEmitter = service.react.useAllSelector(useSelector);
  var match = Curry._1(service.react.useState, (function (param) {
          return [];
        }));
  var setSelectedKeys = match[1];
  return React.createElement(Antd.Space, {
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
                          eventEmitter.emit(addEventName, 1);
                          addCustom(dispatch, buildAddActionFunc, buildDefaultOriginFileStrFunc, buildDefaultTranspiledFileStrFunc, prefix, customs);
                        }),
                      ref: addButtonTarget
                    }), React.createElement(Antd.Button, {
                      icon: React.createElement(Icons.DeleteOutlined, {}),
                      onClick: (function (param) {
                          removeCustom(dispatch, buildRemoveActionFunc, currentCustomName);
                        })
                    })), React.createElement(Antd.Tree, {
                  autoExpandParent: false,
                  treeData: convertToTreeData(customs),
                  selectedKeys: match[0],
                  onSelect: (function (selectedKeysValue, info) {
                      eventEmitter.emit(selectEventName, info.node.key);
                      onSelect([
                            dispatch,
                            setSelectedKeys
                          ], buildSelectActionFunc, setCurrentCustomNameToGlobalFunc, selectedKeysValue, info);
                    }),
                  showIcon: false
                }));
}

var make = CustomDomUtils;

export {
  Method ,
  make ,
}
/*  Not a pure module */
