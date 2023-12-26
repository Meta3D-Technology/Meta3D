

import * as Js_string from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/js_string.js";
import * as BoolUtils$Frontend from "../../../utils/BoolUtils.bs.js";
import * as NumberUtils$Frontend from "../../../utils/NumberUtils.bs.js";
import * as HierachyUtils$Frontend from "../../utils/HierachyUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as SpecificUtils$Frontend from "../../utils/SpecificUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

function _buildUIControls(service, selectedUIControls, selectedUIControlInspectorData) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(selectedUIControls, (function (uiControls, param) {
                var data = param.data;
                var match = data.contributePackageData.protocol;
                return ArraySt$Meta3dCommonlib.push(uiControls, {
                            displayName: service.meta3d.execGetContributeFunc(data.contributeFuncData).uiControlName,
                            protocol: {
                              name: match.name,
                              version: match.version,
                              configLib: service.meta3d.serializeUIControlProtocolConfigLib(param.protocolConfigStr)
                            },
                            data: OptionSt$Meta3dCommonlib.getExn(HierachyUtils$Frontend.findSelectedUIControlData(undefined, [
                                      (function (data) {
                                          return data.id;
                                        }),
                                      (function (data) {
                                          return data.children;
                                        })
                                    ], ListSt$Meta3dCommonlib.fromArray(selectedUIControlInspectorData), param.id)),
                            children: _buildUIControls(service, ListSt$Meta3dCommonlib.toArray(param.children), selectedUIControlInspectorData)
                          });
              }), []);
}

function buildElementMR(service, elementName, selectedUIControls, selectedUIControlInspectorData) {
  return {
          element: {
            elementName: elementName,
            execOrder: 0
          },
          uiControls: _buildUIControls(service, selectedUIControls, selectedUIControlInspectorData)
        };
}

function _getInputName(data) {
  return OptionSt$Meta3dCommonlib.map(data.input, (function (input) {
                return input.inputName;
              }));
}

function _handleVariableName(variableName) {
  return Js_string.replaceByRe(/-/g, "_", variableName);
}

function _generateGetUIControlsAndInputsStr(service, uiControls) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(uiControls, (function (str, param) {
                var displayName = param.displayName;
                var inputName = _getInputName(param.data);
                return str + (
                        Js_string.includes("getUIControlFunc(meta3dState,\"" + displayName + "\")", str) ? "" : "\n    let " + _handleVariableName(displayName) + " = getUIControlFunc(meta3dState,\"" + displayName + "\")\n    "
                      ) + (
                        inputName !== undefined && !Js_string.includes("getInputFunc(meta3dState,\"" + inputName + "\")", str) ? "\n    let " + _handleVariableName(inputName) + " = getInputFunc(meta3dState,\"" + inputName + "\")\n    " : ""
                      );
              }), "");
}

function getActionName($$event, eventName) {
  return OptionSt$Meta3dCommonlib.toNullable(OptionSt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.find($$event, (function (eventData) {
                        return eventData.eventName === eventName;
                      })), (function (param) {
                    return param.actionName;
                  })));
}

function _generateHandleUIControlEventStr(service, configLib, $$event) {
  return service.meta3d.generateHandleUIControlEventStr(configLib, ArraySt$Meta3dCommonlib.map(service.meta3d.getUIControlSupportedEventNames(configLib), (function (eventName) {
                    return getActionName($$event, eventName);
                  })));
}

function _generateRectField(rectField) {
  return rectField._0.toString();
}

function _generateRect(rect) {
  return "{\n    x: " + rect.x._0.toString() + ",\n    y: " + rect.y._0.toString() + ",\n    width: " + rect.width._0.toString() + ",\n    height: " + rect.height._0.toString() + "\n    }";
}

function _generateSpecific(specific) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(specific, (function (result, param) {
                var type_ = param.type_;
                var value = param.value._0;
                return result + ("" + param.name + ": ") + (
                        type_ === "bool" ? "" + BoolUtils$Frontend.boolToString(value) + "," : (
                            type_ === "menuItems" ? "" + JSON.stringify(value) + "," : (
                                type_ === "select" ? "" + SpecificUtils$Frontend.convertValueToString(value, type_) + "," : (
                                    type_ === "imageBase64" ? (
                                        NullableSt$Meta3dCommonlib.isNullable(value) ? "null," : "\"" + value + "\","
                                      ) : (
                                        type_ === "number" ? "" + NumberUtils$Frontend.numberToString(value) + "," : "\"" + SpecificUtils$Frontend.convertValueToString(value, type_) + "\","
                                      )
                                  )
                              )
                          )
                      );
              }), "{") + "}";
}

function _generateIsDrawIfBegin(isDraw) {
  return "if(" + BoolUtils$Frontend.boolToString(isDraw._0) + "){";
}

function _generateIsDrawIfEnd(param) {
  return "}";
}

function _generateChildren(service, children) {
  if (ArraySt$Meta3dCommonlib.length(children) === 0) {
    return "childrenFunc:(meta3dState) => new Promise((resolve, reject) => resolve(meta3dState))";
  }
  var str = "childrenFunc: (meta3dState) =>{\n    " + _generateGetUIControlsAndInputsStr(service, children);
  var str$1 = str + _generateAllDrawUIControlAndHandleEventStr(service, children) + "\n        return new Promise((resolve, reject) => resolve(meta3dState))\n        ";
  return str$1 + "}";
}

function _generateAllDrawUIControlAndHandleEventStr(service, uiControls) {
  var match = ArraySt$Meta3dCommonlib.reduceOneParam(uiControls, (function (param, param$1) {
          var data = param$1.data;
          return [
                  param[0] + _generateIsDrawIfBegin(data.isDraw) + ("\n                 return " + _handleVariableName(param$1.displayName) + "(meta3dState,\n        ") + OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.map(_getInputName(data), _handleVariableName), "null") + "," + ("\n        " + _generateRect(data.rect) + ",\n        ") + ("\n                {\n        ..." + _generateSpecific(data.specific) + ",\n      " + _generateChildren(service, param$1.children) + "\n                }\n                    ).then(data =>{\n                meta3dState = data[0]\n") + _generateHandleUIControlEventStr(service, param$1.protocol.configLib, data.event),
                  param[1] + 1 | 0
                ];
        }), [
        "\n                let data = null\n  ",
        0
      ]);
  var str = match[0] + "\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n                ";
  return ArraySt$Meta3dCommonlib.reduceOneParam(ArraySt$Meta3dCommonlib.range(0, match[1] - 1 | 0), (function (str, param) {
                return str + "})}";
              }), str);
}

function generateElementContributeFileStr(service, mr) {
  var match = mr.element;
  var str = "\nwindow.Contribute = {\n    getContribute: (api) => {\n        return {\n            elementName:\"" + match.elementName + "\",\n            execOrder: " + match.execOrder.toString() + ",\n            elementState: {},\n            elementFunc: (meta3dState, elementState) => {\n                let ui = api.getPackageService(meta3dState, \"meta3d-editor-whole-protocol\").ui(meta3dState)\n\n                let { getUIControlFunc, getInputFunc } = ui\n";
  var str$1 = str + _generateGetUIControlsAndInputsStr(service, mr.uiControls);
  var str$2 = str$1 + _generateAllDrawUIControlAndHandleEventStr(service, mr.uiControls);
  var str$3 = str$2 + "\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  ";
  return str$3 + "\n            }\n        }\n    }\n}\n  ";
}

export {
  _buildUIControls ,
  buildElementMR ,
  _getInputName ,
  _handleVariableName ,
  _generateGetUIControlsAndInputsStr ,
  getActionName ,
  _generateHandleUIControlEventStr ,
  _generateRectField ,
  _generateRect ,
  _generateSpecific ,
  _generateIsDrawIfBegin ,
  _generateIsDrawIfEnd ,
  _generateChildren ,
  _generateAllDrawUIControlAndHandleEventStr ,
  generateElementContributeFileStr ,
}
/* No side effect */
