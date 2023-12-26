

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Semver from "semver";
import * as Js_array from "../../../../../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as Help$Frontend from "../../help/components/Help.bs.js";
import * as IdUtils$Frontend from "../../utils/utils/IdUtils.bs.js";
import * as UserUtils$Frontend from "../../utils/UserUtils.bs.js";
import * as ApAssemble$Frontend from "./ap_assemble/components/ApAssemble.bs.js";
import * as LocalUtils$Frontend from "./utils/LocalUtils.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ReduxUtils$Frontend from "../../utils/utils/ReduxUtils.bs.js";
import * as CustomUtils$Frontend from "./utils/CustomUtils.bs.js";
import * as MessageUtils$Frontend from "../../utils/utils/MessageUtils.bs.js";
import * as CodeEditUtils$Frontend from "../utils/CodeEditUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ElementAssemble$Frontend from "./element_assemble/components/ElementAssemble.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as PackageAssemble$Frontend from "./package_assemble/components/PackageAssemble.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ContributeTypeUtils$Frontend from "../../utils/utils/ContributeTypeUtils.bs.js";
import * as AssembleSpaceStoreType$Frontend from "../../utils/utils/assemble_space/AssembleSpaceStoreType.bs.js";

import 'antd/dist/reset.css'
;

function resetWhenEnter(dispatch) {
  return Curry._1(dispatch, {
              RE_EXN_ID: AssembleSpaceStoreType$Frontend.ResetWhenEnter
            });
}

function _merge(mergedCustoms, customs) {
  return ArraySt$Meta3dCommonlib.removeDuplicateItemsWithBuildKeyFunc(Js_array.concat(customs, mergedCustoms), (function (param) {
                return param.name;
              }));
}

function _mergeCustoms(selectedElementsFromMarket) {
  var match = ListSt$Meta3dCommonlib.reduce(selectedElementsFromMarket, [
        [],
        []
      ], (function (param, param$1) {
          return [
                  _merge(param[0], param$1.customInputs),
                  _merge(param[1], param$1.customActions)
                ];
        }));
  return [
          ListSt$Meta3dCommonlib.fromArray(match[0]),
          ListSt$Meta3dCommonlib.fromArray(match[1])
        ];
}

var getImportedElementCustom = _mergeCustoms;

function _mergeCustomAndUnEditableLocal(customs, param) {
  var name = param[0];
  return ListSt$Meta3dCommonlib.push(ListSt$Meta3dCommonlib.filter(customs, (function (custom) {
                    return custom.name !== name;
                  })), {
              name: name,
              originFileStr: undefined,
              transpiledFileStr: param[1]
            });
}

function _mergeCustomAndLocalBundled(getNameFunc, customs, localBundledSource) {
  var name = OptionSt$Meta3dCommonlib.getExn(Curry._1(getNameFunc, localBundledSource));
  return ListSt$Meta3dCommonlib.push(ListSt$Meta3dCommonlib.filter(customs, (function (custom) {
                    return custom.name !== name;
                  })), {
              name: name,
              originFileStr: CodeEditUtils$Frontend.convertTranspliedCodeToES6Code(localBundledSource),
              transpiledFileStr: CodeEditUtils$Frontend.convertTranspliedCodeToUMDCode(localBundledSource)
            });
}

function removeInputsAndActions(selectedContributes) {
  return ListSt$Meta3dCommonlib.filter(selectedContributes, (function (param) {
                var protocolName = param[0].protocolName;
                if (ContributeTypeUtils$Frontend.isInput(protocolName)) {
                  return false;
                } else {
                  return !ContributeTypeUtils$Frontend.isAction(protocolName);
                }
              }));
}

function _convert(service, isLocalFunc, getNameFunc, isUnEditableCustomFunc, getUnEditableCustomNameFunc, selectedContributes, customs) {
  var locals = ListSt$Meta3dCommonlib.filter(selectedContributes, (function (param) {
          return Curry._1(isLocalFunc, param[0].protocolName);
        }));
  var customs$1 = ListSt$Meta3dCommonlib.reduce(ListSt$Meta3dCommonlib.map(ListSt$Meta3dCommonlib.filter(locals, (function (param) {
                  return Curry._1(isUnEditableCustomFunc, param[0].data.contributePackageData.name);
                })), (function (param) {
              var data = param[0].data;
              return [
                      Curry._1(getUnEditableCustomNameFunc, data.contributePackageData.name),
                      service.meta3d.getContributeFuncDataStr(data.contributeFuncData)
                    ];
            })), customs, _mergeCustomAndUnEditableLocal);
  return ListSt$Meta3dCommonlib.reduce(ListSt$Meta3dCommonlib.map(ListSt$Meta3dCommonlib.filter(locals, (function (param) {
                        return !Curry._1(isUnEditableCustomFunc, param[0].data.contributePackageData.name);
                      })), (function (param) {
                    return service.meta3d.getContributeFuncDataStr(param[0].data.contributeFuncData);
                  })), customs$1, (function (param, param$1) {
                return _mergeCustomAndLocalBundled(getNameFunc, param, param$1);
              }));
}

function convertLocalToCustom(service, param, selectedContributes) {
  return [
          _convert(service, LocalUtils$Frontend.isLocalInput, CustomUtils$Frontend.getInputName, (function (param) {
                  return false;
                }), (function (param) {
                  return "";
                }), selectedContributes, param[0]),
          _convert(service, LocalUtils$Frontend.isLocalAction, CustomUtils$Frontend.getActionName, (function (name) {
                  return name === "meta3d-action-publish";
                }), (function (name) {
                  if (name === "meta3d-action-publish") {
                    return "Publish";
                  } else {
                    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("error", "", "", "", "")));
                  }
                }), selectedContributes, param[1])
        ];
}

function _getUIControls(selectedContributes) {
  return ListSt$Meta3dCommonlib.filter(selectedContributes, (function (param) {
                return ContributeTypeUtils$Frontend.decideContributeType(param[0].data.contributePackageData.protocol.name) === /* UIControl */0;
              }));
}

function _generateSelectedUIControls(service, selectedContributes, uiControls) {
  var selectedUIControls = ListSt$Meta3dCommonlib.toArray(_getUIControls(selectedContributes));
  var _generate = function (uiControls) {
    return ListSt$Meta3dCommonlib.fromArray(ArraySt$Meta3dCommonlib.map(uiControls, (function (param) {
                      var protocol = param.protocol;
                      var match = ArraySt$Meta3dCommonlib.find(selectedUIControls, (function (param) {
                              var selectedUIControl = param[0];
                              if (selectedUIControl.data.contributePackageData.protocol.name === protocol.name) {
                                return Semver.gte(Semver.minVersion(selectedUIControl.data.contributePackageData.protocol.version), Semver.minVersion(protocol.version));
                              } else {
                                return false;
                              }
                            }));
                      if (match === undefined) {
                        return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("ui control whose displayName:" + param.displayName + ", protocolName: " + protocol.name + " not select or protocolVersion: " + protocol.version + " not match", "", "", "", "")));
                      }
                      var match$1 = match[0];
                      var data = match$1.data;
                      return {
                              id: IdUtils$Frontend.generateId(service.other.random),
                              parentId: undefined,
                              children: _generate(param.children),
                              protocolIconBase64: match$1.protocolIconBase64,
                              protocolConfigStr: OptionSt$Meta3dCommonlib.getExn(OptionSt$Meta3dCommonlib.map(match[1], (function (param) {
                                          return param.configStr;
                                        }))),
                              displayName: data.contributePackageData.displayName,
                              data: data
                            };
                    })));
  };
  var _addParentId = function (uiControls, parentId) {
    return ListSt$Meta3dCommonlib.map(uiControls, (function (uiControl) {
                  return {
                          id: uiControl.id,
                          parentId: parentId,
                          children: _addParentId(uiControl.children, uiControl.id),
                          protocolIconBase64: uiControl.protocolIconBase64,
                          protocolConfigStr: uiControl.protocolConfigStr,
                          displayName: uiControl.displayName,
                          data: uiControl.data
                        };
                }));
  };
  return _addParentId(_generate(uiControls), undefined);
}

function _generateSelectedUIControlInspectorData(uiControls, selectedUIControls) {
  var _generate = function (uiControls, selectedUIControls) {
    return ListSt$Meta3dCommonlib.fromArray(ArraySt$Meta3dCommonlib.mapi(uiControls, (function (param, index) {
                      return {
                              id: OptionSt$Meta3dCommonlib.getExn(ListSt$Meta3dCommonlib.nth(selectedUIControls, index)).id,
                              rect: param.rect,
                              specific: param.specific,
                              isDraw: param.isDraw,
                              input: OptionSt$Meta3dCommonlib.fromNullable(param.input),
                              event: param.event,
                              children: _generate(param.children, OptionSt$Meta3dCommonlib.getExn(ListSt$Meta3dCommonlib.nth(selectedUIControls, index)).children)
                            };
                    })));
  };
  return _generate(uiControls, selectedUIControls);
}

function importElement(service, dispatchForElementAssembleStore, selectedElementsFromMarket, selectedContributes) {
  var mergedUIControls = ListSt$Meta3dCommonlib.reduce(selectedElementsFromMarket, [], (function (mergedUIControls, param) {
          return Js_array.concat(param.inspectorData.uiControls, mergedUIControls);
        }));
  var selectedUIControls = _generateSelectedUIControls(service, selectedContributes, mergedUIControls);
  return Curry._1(dispatchForElementAssembleStore, {
              TAG: /* Import */9,
              _0: selectedUIControls,
              _1: _generateSelectedUIControlInspectorData(mergedUIControls, selectedUIControls)
            });
}

function getCurrentKey(currentAssemble) {
  switch (currentAssemble) {
    case /* Ap */0 :
        return "1";
    case /* Element */1 :
        return "2";
    case /* Package */2 :
        return "3";
    
  }
}

function useSelector(param) {
  return param.docDrawerData;
}

var Method = {
  resetWhenEnter: resetWhenEnter,
  _merge: _merge,
  _mergeCustoms: _mergeCustoms,
  getImportedElementCustom: getImportedElementCustom,
  _mergeCustomAndUnEditableLocal: _mergeCustomAndUnEditableLocal,
  _mergeCustomAndLocalBundled: _mergeCustomAndLocalBundled,
  removeInputsAndActions: removeInputsAndActions,
  _convert: _convert,
  convertLocalToCustom: convertLocalToCustom,
  _getUIControls: _getUIControls,
  _generateSelectedUIControls: _generateSelectedUIControls,
  _generateSelectedUIControlInspectorData: _generateSelectedUIControlInspectorData,
  importElement: importElement,
  getCurrentKey: getCurrentKey,
  useSelector: useSelector
};

function AssembleSpace(Props) {
  var service = Props.service;
  var account = Props.account;
  var selectedPackagesFromMarket = Props.selectedPackagesFromMarket;
  var selectedExtensionsFromMarket = Props.selectedExtensionsFromMarket;
  var selectedContributesFromMarket = Props.selectedContributesFromMarket;
  var selectedElementsFromMarket = Props.selectedElementsFromMarket;
  var assembleSpaceNavTarget = Props.assembleSpaceNavTarget;
  var dispatch = Curry._1(service.react.useDispatch, undefined);
  Curry._1(service.app.useDispatch, undefined);
  ReduxUtils$Frontend.ApAssemble.useDispatch(service.react.useDispatch);
  var dispatchForElementAssembleStore = ReduxUtils$Frontend.ElementAssemble.useDispatch(service.react.useDispatch);
  var docDrawerData = service.react.useSelector(useSelector);
  var match = Curry._1(service.react.useState, (function (param) {
          if (UserUtils$Frontend.isAdmin(account)) {
            return /* Ap */0;
          } else {
            return /* Element */1;
          }
        }));
  var setCurrentAssemble = match[1];
  var currentAssemble = match[0];
  var match$1 = Curry._1(service.react.useState, (function (param) {
          
        }));
  var setHandledSelectedContributesFromMarket = match$1[1];
  var handledSelectedContributesFromMarket = match$1[0];
  var match$2 = Curry._1(service.react.useState, (function (param) {
          return false;
        }));
  var setOpenHelpDrawer = match$2[1];
  Curry._1(service.react.useEffectOnce, (function (param) {
          Curry._1(dispatch, {
                RE_EXN_ID: AssembleSpaceStoreType$Frontend.ResetWhenEnter
              });
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  var __x = _mergeCustoms(selectedElementsFromMarket);
                  var match = convertLocalToCustom(service, __x, selectedContributesFromMarket);
                  var selectedContributesFromMarket$1 = removeInputsAndActions(selectedContributesFromMarket);
                  importElement(service, dispatchForElementAssembleStore, selectedElementsFromMarket, selectedContributesFromMarket$1);
                  Curry._1(dispatchForElementAssembleStore, {
                        TAG: /* SetCustom */19,
                        _0: match[0],
                        _1: match[1]
                      });
                  Curry._1(setHandledSelectedContributesFromMarket, (function (param) {
                          return selectedContributesFromMarket$1;
                        }));
                }), 5);
          return [
                  undefined,
                  undefined
                ];
        }));
  if (handledSelectedContributesFromMarket === undefined) {
    return null;
  }
  var tmp;
  switch (currentAssemble) {
    case /* Ap */0 :
        tmp = React.createElement(ApAssemble$Frontend.make, {
              service: service,
              account: account,
              selectedPackagesFromMarket: selectedPackagesFromMarket,
              selectedExtensionsFromMarket: selectedExtensionsFromMarket,
              selectedContributesFromMarket: handledSelectedContributesFromMarket
            });
        break;
    case /* Element */1 :
        tmp = React.createElement(ElementAssemble$Frontend.make, {
              service: service,
              account: account,
              selectedContributesFromMarket: handledSelectedContributesFromMarket,
              selectedPackagesFromMarket: selectedPackagesFromMarket,
              assembleSpaceNavTarget: assembleSpaceNavTarget
            });
        break;
    case /* Package */2 :
        tmp = React.createElement(PackageAssemble$Frontend.make, {
              service: service,
              account: account,
              selectedPackagesFromMarket: selectedPackagesFromMarket,
              selectedExtensionsFromMarket: selectedExtensionsFromMarket,
              selectedContributesFromMarket: handledSelectedContributesFromMarket
            });
        break;
    
  }
  return React.createElement(React.Fragment, undefined, React.createElement(Antd.Layout, {
                  children: null
                }, UserUtils$Frontend.isAdmin(account) ? React.createElement(Antd.Layout.Content, {
                        children: React.createElement(Antd.Menu, {
                              theme: "light",
                              mode: "horizontal",
                              defaultSelectedKeys: ["1"],
                              selectedKeys: [getCurrentKey(currentAssemble)],
                              items: [
                                {
                                  key: "1",
                                  label: "编辑器装配"
                                },
                                {
                                  key: "2",
                                  label: "页面装配"
                                },
                                {
                                  key: "3",
                                  label: "包装配"
                                }
                              ],
                              onClick: (function (param) {
                                  switch (param.key) {
                                    case "1" :
                                        break;
                                    case "2" :
                                        return Curry._1(setCurrentAssemble, (function (param) {
                                                      return /* Element */1;
                                                    }));
                                    case "3" :
                                        return Curry._1(setCurrentAssemble, (function (param) {
                                                      return /* Package */2;
                                                    }));
                                    default:
                                      
                                  }
                                  Curry._1(setCurrentAssemble, (function (param) {
                                          return /* Ap */0;
                                        }));
                                })
                            })
                      }) : null, React.createElement(Antd.Layout.Content, {
                      children: tmp
                    }), React.createElement(Antd.Layout.Footer, {
                      children: React.createElement(Antd.Button, {
                            onClick: (function (param) {
                                Curry._1(setOpenHelpDrawer, (function (param) {
                                        return true;
                                      }));
                              }),
                            children: "帮助",
                            type: "primary",
                            style: {
                              float: "right"
                            }
                          }),
                      style: {
                        borderTop: "solid 1px",
                        bottom: "0",
                        padding: "5px",
                        position: "sticky"
                      }
                    })), React.createElement(Antd.Drawer, {
                  title: "帮助",
                  placement: "right",
                  open: match$2[0],
                  onClose: (function (param) {
                      Curry._1(setOpenHelpDrawer, (function (param) {
                              return false;
                            }));
                    }),
                  children: React.createElement(Help$Frontend.make, {
                        guideTarget: NullableSt$Meta3dCommonlib.getEmpty(undefined)
                      })
                }), React.createElement(Antd.Drawer, {
                  title: "文档帮助",
                  placement: "right",
                  open: OptionSt$Meta3dCommonlib.isSome(docDrawerData),
                  onClose: (function (param) {
                      Curry._1(dispatch, {
                            RE_EXN_ID: AssembleSpaceStoreType$Frontend.CloseDocDrawer
                          });
                    }),
                  children: docDrawerData !== undefined ? React.createElement(Antd.List, {
                          itemLayout: "horizontal",
                          dataSource: ListSt$Meta3dCommonlib.toArray(docDrawerData),
                          renderItem: (function (param) {
                              var text = param[0];
                              return React.createElement(Antd.List.Item, {
                                          children: React.createElement(Antd.List.Item.Meta, {
                                                title: React.createElement(Antd.Typography.Link, {
                                                      href: param[1],
                                                      target: "_blank",
                                                      children: text
                                                    }),
                                                key: text
                                              })
                                        });
                            })
                        }) : null
                }));
}

var make = AssembleSpace;

export {
  Method ,
  make ,
}
/*  Not a pure module */
