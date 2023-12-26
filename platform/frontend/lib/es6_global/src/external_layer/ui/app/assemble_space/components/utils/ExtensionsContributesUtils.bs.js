

import * as Curry from "../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Semver from "semver";
import * as Caml_obj from "../../../../../../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function getItems(param, protocols, selectedItemsFromMarket) {
  var getPushedDataFunc = param[3];
  var getDisplayNameFromItemFunc = param[2];
  var getDisplayNameFromResultDataFunc = param[1];
  var getProtocolFunc = param[0];
  return ArraySt$Meta3dCommonlib.reduceOneParam(ArraySt$Meta3dCommonlib.sort(protocols, (function (a, b) {
                    if (Semver.gt(a.version, b.version)) {
                      return 1;
                    } else {
                      return -1;
                    }
                  })), (function (result, protocol) {
                var version = protocol.version;
                var name = protocol.name;
                return ListSt$Meta3dCommonlib.reduce(ListSt$Meta3dCommonlib.filter(selectedItemsFromMarket, (function (param) {
                                  var protocol = Curry._1(getProtocolFunc, param[0]);
                                  if (protocol.name === name) {
                                    return Semver.satisfies(version, protocol.version);
                                  } else {
                                    return false;
                                  }
                                })), result, (function (result, param) {
                              var item = param[0];
                              if (ArraySt$Meta3dCommonlib.includesByFunc(result, (function (data) {
                                        return Caml_obj.equal(Curry._1(getDisplayNameFromResultDataFunc, data), Curry._1(getDisplayNameFromItemFunc, item));
                                      }))) {
                                return result;
                              } else {
                                return ArraySt$Meta3dCommonlib.push(result, Curry._3(getPushedDataFunc, item, protocol, param[1]));
                              }
                            }));
              }), []);
}

function getProtocolConfigStr(protocolConfig) {
  return OptionSt$Meta3dCommonlib.map(protocolConfig, (function (param) {
                return param.configStr;
              }));
}

function buildBasicInfoUI(service, protocolName, protocolVersion, implementName, implementVersion, displayName) {
  return React.createElement(React.Fragment, undefined, service.ui.buildTitle(2, "基本信息", undefined), service.ui.buildText("协议名：" + protocolName + "", "default", undefined), service.ui.buildText("协议版本：" + protocolVersion + "", "default", undefined), service.ui.buildText("实现名：" + implementName + "", "default", undefined), service.ui.buildText("实现版本：" + implementVersion + "", "default", undefined), service.ui.buildText("显示名：" + displayName + "", "default", undefined));
}

export {
  getItems ,
  getProtocolConfigStr ,
  buildBasicInfoUI ,
}
/* react Not a pure module */
