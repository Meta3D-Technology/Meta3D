

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Semver from "semver";
import * as Js_promise from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as MessageUtils$Frontend from "../../../../../utils/utils/MessageUtils.bs.js";
import * as PackageUtils$Frontend from "../../../utils/PackageUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as Result$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as SelectedContributesForElementUtils$Frontend from "../../../element_assemble/utils/SelectedContributesForElementUtils.bs.js";

import 'antd/dist/reset.css'
;

function _isSelectedNothing(selectedPackages, selectedExtensions, selectedContributes) {
  if (ArraySt$Meta3dCommonlib.length(selectedPackages) === 0 && ArraySt$Meta3dCommonlib.length(selectedExtensions) === 0) {
    return ArraySt$Meta3dCommonlib.length(selectedContributes) === 0;
  } else {
    return false;
  }
}

function _check(selectedPackages, selectedExtensions, selectedContributes) {
  if (_isSelectedNothing(selectedPackages, selectedExtensions, selectedContributes)) {
    return Result$Meta3dCommonlib.fail("请至少选择一个包或者扩展或者贡献");
  } else if (SelectedContributesForElementUtils$Frontend.hasUIControl(selectedContributes) || SelectedContributesForElementUtils$Frontend.hasAction(selectedContributes)) {
    return Result$Meta3dCommonlib.fail("不能选择UI Control 或者Action");
  } else if (ArraySt$Meta3dCommonlib.includesByFunc(selectedExtensions, (function (param) {
            return param.isEntry;
          }))) {
    return Result$Meta3dCommonlib.succeed(undefined);
  } else {
    return Result$Meta3dCommonlib.fail("找不到入口扩展");
  }
}

function onFinish(service, param, param$1, values) {
  var account = param$1[0];
  var setVisible = param[2];
  var setIsUploadBegin = param[1];
  var setUploadProgress = param[0];
  var packageName = values.packageName;
  var packageDescription = values.packageDescription;
  var selectedPackages = ListSt$Meta3dCommonlib.toArray(param$1[1]);
  var selectedExtensions = ListSt$Meta3dCommonlib.toArray(param$1[2]);
  var selectedContributes = ListSt$Meta3dCommonlib.toArray(param$1[3]);
  return Result$Meta3dCommonlib.either(_check(selectedPackages, selectedExtensions, selectedContributes), (function (param) {
                var match = PackageUtils$Frontend.getEntryExtensionProtocolData(selectedExtensions);
                var entryExtensionProtocolConfigStr = match[7];
                var entryExtensionProtocolDescription = match[6];
                var entryExtensionProtocolRepoLink = match[5];
                var entryExtensionProtocolDisplayName = match[4];
                var entryExtensionProtocolIconBase64 = match[3];
                var entryExtensionProtocolVersionRange = match[2];
                var entryExtensionProtocolVersion = match[1];
                var entryExtensionProtocolName = match[0];
                var __x = service.backend.findNewestPublishPackage((function (progress) {
                        
                      }), entryExtensionProtocolName, packageName);
                var __x$1 = Most.map((function (data) {
                        return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(data, (function (param) {
                                          return Semver.inc(param[2], "patch");
                                        })), "0.0.1");
                      }), __x);
                var __x$2 = Most.drain(Most.flatMap((function (packageVersion) {
                            var packageBinaryFile = PackageUtils$Frontend.generatePackage(service, selectedPackages, selectedExtensions, selectedContributes, [
                                  {
                                    version: entryExtensionProtocolVersion,
                                    name: entryExtensionProtocolName,
                                    iconBase64: entryExtensionProtocolIconBase64
                                  },
                                  PackageUtils$Frontend.getEntryExtensionName(selectedExtensions),
                                  packageVersion,
                                  packageName,
                                  OptionSt$Meta3dCommonlib.getWithDefault(entryExtensionProtocolConfigStr, "")
                                ]);
                            Curry._1(setIsUploadBegin, (function (param) {
                                    return true;
                                  }));
                            return service.backend.publishPackage((function (progress) {
                                          Curry._1(setUploadProgress, (function (param) {
                                                  return progress;
                                                }));
                                        }), packageBinaryFile, [
                                        entryExtensionProtocolName,
                                        entryExtensionProtocolVersion,
                                        entryExtensionProtocolVersionRange,
                                        entryExtensionProtocolIconBase64,
                                        entryExtensionProtocolDisplayName,
                                        entryExtensionProtocolRepoLink,
                                        entryExtensionProtocolDescription,
                                        OptionSt$Meta3dCommonlib.toStrictNullable(entryExtensionProtocolConfigStr),
                                        PackageUtils$Frontend.getEntryExtensionName(selectedExtensions)
                                      ], [
                                        packageName,
                                        packageVersion,
                                        packageDescription
                                      ], OptionSt$Meta3dCommonlib.getExn(account));
                          }), __x$1));
                var __x$3 = Js_promise.then_((function (param) {
                        Curry._1(setIsUploadBegin, (function (param) {
                                return false;
                              }));
                        Curry._1(setVisible, (function (param) {
                                return false;
                              }));
                        return Promise.resolve(undefined);
                      }), __x$2);
                return Js_promise.$$catch((function (e) {
                              Curry._1(setIsUploadBegin, (function (param) {
                                      return false;
                                    }));
                              return service.console.errorWithExn(e, undefined);
                            }), __x$3);
              }), (function (failMessage) {
                service.console.error(failMessage, undefined);
                return Promise.resolve(undefined);
              }));
}

function useSelector(param) {
  return [
          param.selectedPackages,
          param.selectedExtensions,
          param.selectedContributes
        ];
}

var Method = {
  _isSelectedNothing: _isSelectedNothing,
  _check: _check,
  onFinish: onFinish,
  useSelector: useSelector
};

function PublishPackage(Props) {
  var service = Props.service;
  var account = Props.account;
  var match = ReduxUtils$Frontend.PackageAssemble.useSelector(service.react.useSelector, useSelector);
  var selectedContributes = match[2];
  var selectedExtensions = match[1];
  var selectedPackages = match[0];
  var match$1 = Curry._1(service.react.useState, (function (param) {
          return false;
        }));
  var setVisible = match$1[1];
  var visible = match$1[0];
  var match$2 = Curry._1(service.react.useState, (function (param) {
          return 0;
        }));
  var setUploadProgress = match$2[1];
  var match$3 = Curry._1(service.react.useState, (function (param) {
          return false;
        }));
  var setIsUploadBegin = match$3[1];
  return React.createElement(React.Fragment, undefined, React.createElement(Antd.Button, {
                  onClick: (function (param) {
                      Curry._1(setVisible, (function (param) {
                              return true;
                            }));
                    }),
                  children: "发布"
                }), visible ? React.createElement(Antd.Modal, {
                    title: "发布包",
                    visible: visible,
                    onOk: (function (param) {
                        Curry._1(setVisible, (function (param) {
                                return false;
                              }));
                      }),
                    onCancel: (function (param) {
                        Curry._1(setVisible, (function (param) {
                                return false;
                              }));
                      }),
                    footer: null,
                    children: match$3[0] ? React.createElement("p", undefined, "" + match$2[0].toString() + "% uploading...") : React.createElement(Antd.Form, {
                            initialValues: {
                              remember: true
                            },
                            labelCol: {
                              span: 8
                            },
                            wrapperCol: {
                              span: 6
                            },
                            autoComplete: "off",
                            onFinish: (function ($$event) {
                                MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                                        onFinish(service, [
                                              setUploadProgress,
                                              setIsUploadBegin,
                                              setVisible
                                            ], [
                                              account,
                                              selectedPackages,
                                              selectedExtensions,
                                              selectedContributes
                                            ], $$event);
                                      }), 5);
                              }),
                            children: null
                          }, React.createElement(Antd.Form.Item, {
                                label: "包名",
                                children: React.createElement(Antd.Input, {}),
                                name: "packageName",
                                rules: [{
                                    type: NullableSt$Meta3dCommonlib.getEmpty(undefined),
                                    required: true,
                                    message: "输入包名"
                                  }]
                              }), React.createElement(Antd.Form.Item, {
                                label: "包介绍",
                                children: React.createElement(Antd.Input, {}),
                                name: "packageDescription",
                                rules: [{
                                    type: NullableSt$Meta3dCommonlib.getEmpty(undefined),
                                    required: true,
                                    message: "输入包介绍"
                                  }]
                              }), React.createElement(Antd.Form.Item, {
                                children: React.createElement(Antd.Button, {
                                      htmlType: "submit",
                                      children: "发布"
                                    }),
                                wrapperCol: {
                                  offset: 8,
                                  span: 16
                                }
                              }))
                  }) : null);
}

var make = PublishPackage;

export {
  Method ,
  make ,
}
/*  Not a pure module */
