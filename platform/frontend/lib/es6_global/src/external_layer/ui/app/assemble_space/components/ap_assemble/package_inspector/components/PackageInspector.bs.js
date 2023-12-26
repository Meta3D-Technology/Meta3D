

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as EventUtils$Frontend from "../../../../../utils/EventUtils.bs.js";
import * as ReduxUtils$Frontend from "../../../../../utils/utils/ReduxUtils.bs.js";
import * as MessageUtils$Frontend from "../../../../../utils/utils/MessageUtils.bs.js";
import * as PackageUtils$Frontend from "../../../utils/PackageUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

import 'antd/dist/reset.css'
;

function startPackage(dispatch, inspectorCurrentPackage) {
  return Curry._1(dispatch, {
              TAG: /* StartPackage */3,
              _0: inspectorCurrentPackage.id
            });
}

function unstartPackage(dispatch, inspectorCurrentPackage) {
  return Curry._1(dispatch, {
              TAG: /* UnStartPackage */4,
              _0: inspectorCurrentPackage.id
            });
}

function isPackageStoredInApp(id, storedPackageIdsInApp) {
  return ListSt$Meta3dCommonlib.includes(storedPackageIdsInApp, id);
}

function storePackageInApp(dispatchForApAssembleStore, inspectorCurrentPackage) {
  return Curry._1(dispatchForApAssembleStore, {
              TAG: /* StorePackageInApp */19,
              _0: inspectorCurrentPackage.id
            });
}

function unstorePackageInApp(dispatchForApAssembleStore, inspectorCurrentPackage) {
  return Curry._1(dispatchForApAssembleStore, {
              TAG: /* UnStorePackageInApp */20,
              _0: inspectorCurrentPackage.id
            });
}

function getInspectorCurrentPackage(param) {
  var selectedPackages = param[1];
  return OptionSt$Meta3dCommonlib.bind(param[0], (function (inspectorCurrentPackageId) {
                return ListSt$Meta3dCommonlib.getBy(selectedPackages, (function ($$package) {
                              return $$package.id === inspectorCurrentPackageId;
                            }));
              }));
}

function updateSelectedPackage(dispatch, service, inspectorCurrentPackage, extensions, contributes) {
  return Curry._1(dispatch, {
              TAG: /* UpdateSelectedPackage */16,
              _0: inspectorCurrentPackage.id,
              _1: service.meta3d.generatePackage([
                    ArraySt$Meta3dCommonlib.map(extensions, (function (param) {
                            return [
                                    param[0],
                                    service.meta3d.getExtensionFuncData(param[1])
                                  ];
                          })),
                    ArraySt$Meta3dCommonlib.map(contributes, (function (param) {
                            return [
                                    param[0],
                                    service.meta3d.getContributeFuncData(param[1])
                                  ];
                          }))
                  ], [], PackageUtils$Frontend.buildPackageData(inspectorCurrentPackage))
            });
}

function setExtension(param, newExtensionFuncDataStr, extensionPackageData) {
  Curry._1(param[0], (function (extensions) {
          return ArraySt$Meta3dCommonlib.map(extensions, (function (extension) {
                        var extensionPackageData_ = extension[0];
                        if (extensionPackageData_.name === extensionPackageData.name && extensionPackageData_.protocol.name === extensionPackageData.protocol.name) {
                          return [
                                  extensionPackageData_,
                                  newExtensionFuncDataStr
                                ];
                        } else {
                          return extension;
                        }
                      }));
        }));
  return Curry._1(param[1], (function (isDebugChangeMap) {
                return ImmutableHashMap$Meta3dCommonlib.set(isDebugChangeMap, extensionPackageData.protocol.name, true);
              }));
}

function setContribute(param, newContributeFuncDataStr, contributePackageData) {
  Curry._1(param[0], (function (contributes) {
          return ArraySt$Meta3dCommonlib.map(contributes, (function (contribute) {
                        var contributePackageData_ = contribute[0];
                        if (contributePackageData_.name === contributePackageData.name && contributePackageData_.protocol.name === contributePackageData.protocol.name) {
                          return [
                                  contributePackageData_,
                                  newContributeFuncDataStr
                                ];
                        } else {
                          return contribute;
                        }
                      }));
        }));
  return Curry._1(param[1], (function (isDebugChangeMap) {
                return ImmutableHashMap$Meta3dCommonlib.set(isDebugChangeMap, contributePackageData.protocol.name, true);
              }));
}

function useEffectOnce(param, service, param$1) {
  var setContributes = param[2];
  var setExtensions = param[1];
  var setInspectorCurrentPackage = param[0];
  var inspectorCurrentPackage = getInspectorCurrentPackage([
        param$1[0],
        param$1[1]
      ]);
  if (inspectorCurrentPackage !== undefined) {
    Curry._1(setInspectorCurrentPackage, (function (param) {
            return inspectorCurrentPackage;
          }));
    var match = PackageUtils$Frontend.getPackageAllExtensionAndContributeFileData(service, inspectorCurrentPackage.binaryFile);
    var allContributeFileData = match[1];
    var allExtensionFileData = match[0];
    Curry._1(setExtensions, (function (param) {
            return ArraySt$Meta3dCommonlib.map(allExtensionFileData, (function (param) {
                          return [
                                  param[0],
                                  service.meta3d.getExtensionFuncDataStr(param[1])
                                ];
                        }));
          }));
    return Curry._1(setContributes, (function (param) {
                  return ArraySt$Meta3dCommonlib.map(allContributeFileData, (function (param) {
                                return [
                                        param[0],
                                        service.meta3d.getContributeFuncDataStr(param[1])
                                      ];
                              }));
                }));
  }
  Curry._1(setInspectorCurrentPackage, (function (param) {
          
        }));
  Curry._1(setExtensions, (function (param) {
          return [];
        }));
  return Curry._1(setContributes, (function (param) {
                return [];
              }));
}

function showDebug(setIsShowDebug) {
  return Curry._1(setIsShowDebug, (function (param) {
                return true;
              }));
}

function useSelector(param) {
  return [
          param.inspectorCurrentPackageId,
          param.selectedPackages,
          param.storedPackageIdsInApp
        ];
}

var Method = {
  startPackage: startPackage,
  unstartPackage: unstartPackage,
  isPackageStoredInApp: isPackageStoredInApp,
  storePackageInApp: storePackageInApp,
  unstorePackageInApp: unstorePackageInApp,
  getInspectorCurrentPackage: getInspectorCurrentPackage,
  updateSelectedPackage: updateSelectedPackage,
  setExtension: setExtension,
  setContribute: setContribute,
  useEffectOnce: useEffectOnce,
  showDebug: showDebug,
  useSelector: useSelector
};

function PackageInspector(Props) {
  var service = Props.service;
  var dispatchForApAssembleStore = ReduxUtils$Frontend.ApAssemble.useDispatch(service.react.useDispatch);
  var match = Curry._1(service.react.useState, (function (param) {
          
        }));
  var setInspectorCurrentPackage = match[1];
  var inspectorCurrentPackage = match[0];
  var match$1 = Curry._1(service.react.useState, (function (param) {
          return [];
        }));
  var setExtensions = match$1[1];
  var extensions = match$1[0];
  var match$2 = Curry._1(service.react.useState, (function (param) {
          return [];
        }));
  var setContributes = match$2[1];
  var contributes = match$2[0];
  var match$3 = Curry._1(service.react.useState, (function (param) {
          return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
        }));
  var setIsDebugChangeMap = match$3[1];
  var isDebugChangeMap = match$3[0];
  var match$4 = Curry._1(service.react.useState, (function (param) {
          return false;
        }));
  var setIsShowDebug = match$4[1];
  var match$5 = ReduxUtils$Frontend.ApAssemble.useSelector(service.react.useSelector, useSelector);
  var selectedPackages = match$5[1];
  var inspectorCurrentPackageId = match$5[0];
  var dispatch = ReduxUtils$Frontend.ApAssemble.useDispatch(service.react.useDispatch);
  service.react.useEffect1((function (param) {
          useEffectOnce([
                setInspectorCurrentPackage,
                setExtensions,
                setContributes
              ], service, [
                inspectorCurrentPackageId,
                selectedPackages
              ]);
        }), [
        inspectorCurrentPackageId,
        selectedPackages
      ]);
  if (inspectorCurrentPackage !== undefined) {
    return React.createElement(Antd.Space, {
                direction: "vertical",
                size: "middle",
                children: null
              }, service.ui.buildTitle(2, "基本信息", undefined), service.ui.buildText("协议名：" + inspectorCurrentPackage.protocol.name + "", "default", undefined), service.ui.buildText("协议版本：" + inspectorCurrentPackage.protocol.version + "", "default", undefined), service.ui.buildText("包名：" + inspectorCurrentPackage.name + "", "default", undefined), service.ui.buildText("包版本：" + inspectorCurrentPackage.version + "", "default", undefined), service.ui.buildText("入口扩展名：" + inspectorCurrentPackage.entryExtensionName + "", "default", undefined), service.ui.buildTitle(2, "配置", undefined), ListSt$Meta3dCommonlib.includes(match$5[2], inspectorCurrentPackage.id) ? React.createElement(Antd.Button, {
                      onClick: (function (param) {
                          Curry._1(dispatchForApAssembleStore, {
                                TAG: /* UnStorePackageInApp */20,
                                _0: inspectorCurrentPackage.id
                              });
                        }),
                      children: "不保存在App中"
                    }) : React.createElement(Antd.Button, {
                      onClick: (function (param) {
                          Curry._1(dispatchForApAssembleStore, {
                                TAG: /* StorePackageInApp */19,
                                _0: inspectorCurrentPackage.id
                              });
                        }),
                      children: "保存在App中"
                    }), service.ui.buildTitle(2, "入口包", undefined), inspectorCurrentPackage.isStart ? React.createElement(Antd.Button, {
                      onClick: (function (param) {
                          Curry._1(dispatch, {
                                TAG: /* UnStartPackage */4,
                                _0: inspectorCurrentPackage.id
                              });
                        }),
                      children: "取消启动"
                    }) : React.createElement(Antd.Button, {
                      onClick: (function (param) {
                          Curry._1(dispatch, {
                                TAG: /* StartPackage */3,
                                _0: inspectorCurrentPackage.id
                              });
                        }),
                      children: "启动"
                    }), service.ui.buildTitle(2, "Debug", undefined), match$4[0] ? React.createElement(React.Fragment, undefined, React.createElement(Antd.Button, {
                          onClick: (function (param) {
                              MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                                      updateSelectedPackage(dispatch, service, inspectorCurrentPackage, extensions, contributes);
                                    }), 5);
                            }),
                          children: "提交全部"
                        }), service.ui.buildTitle(3, "Extension", undefined), React.createElement(Antd.List, {
                          itemLayout: "horizontal",
                          dataSource: extensions,
                          renderItem: (function (param) {
                              var extensionPackageData = param[0];
                              var isChange = ImmutableHashMap$Meta3dCommonlib.get(isDebugChangeMap, extensionPackageData.protocol.name);
                              return React.createElement(Antd.List.Item, {
                                          children: React.createElement(Antd.List.Item.Meta, {
                                                title: React.createElement(Antd.Typography.Title, {
                                                      level: 3,
                                                      children: extensionPackageData.name
                                                    }),
                                                description: React.createElement(Antd.Space, {
                                                      direction: "vertical",
                                                      size: "middle",
                                                      children: null
                                                    }, React.createElement(Antd.Space, {
                                                          direction: "horizontal",
                                                          size: "small",
                                                          children: React.createElement(Antd.Typography.Text, {
                                                                children: "协议名：" + extensionPackageData.protocol.name + ""
                                                              })
                                                        }), React.createElement(Antd.Input.TextArea, {
                                                          value: isChange !== undefined && isChange ? param[1] : "",
                                                          onChange: (function (e) {
                                                              setExtension([
                                                                    setExtensions,
                                                                    setIsDebugChangeMap
                                                                  ], EventUtils$Frontend.getEventTargetValue(e), extensionPackageData);
                                                            })
                                                        })),
                                                key: extensionPackageData.name
                                              })
                                        });
                            })
                        }), service.ui.buildTitle(3, "Contribute", undefined), React.createElement(Antd.List, {
                          itemLayout: "horizontal",
                          dataSource: contributes,
                          renderItem: (function (param) {
                              var contributePackageData = param[0];
                              var isChange = ImmutableHashMap$Meta3dCommonlib.get(isDebugChangeMap, contributePackageData.protocol.name);
                              return React.createElement(Antd.List.Item, {
                                          children: React.createElement(Antd.List.Item.Meta, {
                                                title: React.createElement(Antd.Typography.Title, {
                                                      level: 3,
                                                      children: contributePackageData.name
                                                    }),
                                                description: React.createElement(Antd.Space, {
                                                      direction: "vertical",
                                                      size: "middle",
                                                      children: null
                                                    }, React.createElement(Antd.Space, {
                                                          direction: "horizontal",
                                                          size: "small",
                                                          children: React.createElement(Antd.Typography.Text, {
                                                                children: "协议名：" + contributePackageData.protocol.name + ""
                                                              })
                                                        }), React.createElement(Antd.Input.TextArea, {
                                                          value: isChange !== undefined && isChange ? param[1] : "",
                                                          onChange: (function (e) {
                                                              setContribute([
                                                                    setContributes,
                                                                    setIsDebugChangeMap
                                                                  ], EventUtils$Frontend.getEventTargetValue(e), contributePackageData);
                                                            })
                                                        })),
                                                key: contributePackageData.name
                                              })
                                        });
                            })
                        })) : React.createElement(Antd.Button, {
                      onClick: (function (param) {
                          Curry._1(setIsShowDebug, (function (param) {
                                  return true;
                                }));
                        }),
                      children: "显示Debug"
                    }));
  } else {
    return null;
  }
}

var make = PackageInspector;

export {
  Method ,
  make ,
}
/*  Not a pure module */
