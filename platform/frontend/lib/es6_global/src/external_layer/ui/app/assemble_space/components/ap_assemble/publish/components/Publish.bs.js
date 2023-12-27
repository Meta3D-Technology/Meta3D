

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Caml_array from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Js_promise from "../../../../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Loading$Frontend from "../../../../../loading/components/Loading.bs.js";
import * as Icons from "@ant-design/icons";
import * as AppUtils$Frontend from "../../../utils/AppUtils.bs.js";
import * as IntUtils$Frontend from "../../../utils/IntUtils.bs.js";
import * as BoolUtils$Frontend from "../../../utils/BoolUtils.bs.js";
import * as UserUtils$Frontend from "../../../../../utils/UserUtils.bs.js";
import * as EventUtils$Frontend from "../../../../../utils/EventUtils.bs.js";
import * as UploadUtils$Frontend from "../../../utils/UploadUtils.bs.js";
import * as AppStoreType$Frontend from "../../../../../utils/utils/assemble_space/AppStoreType.bs.js";
import * as ElementUtils$Frontend from "../../../../../utils/utils/ElementUtils.bs.js";
import * as MessageUtils$Frontend from "../../../../../utils/utils/MessageUtils.bs.js";
import * as HierachyUtils$Frontend from "../../../element_assemble/utils/HierachyUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as Result$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ElementVisualUtils$Frontend from "../../../element_assemble/utils/ElementVisualUtils.bs.js";
import * as ElementContributeUtils$Frontend from "../../../element_assemble/utils/ElementContributeUtils.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

import 'antd/dist/reset.css'
;

function _isSelectedNothing(selectedPackages, selectedContributes) {
  if (ArraySt$Meta3dCommonlib.length(selectedPackages) === 0) {
    return ListSt$Meta3dCommonlib.length(selectedContributes) === 0;
  } else {
    return false;
  }
}

function getStartPackageNeedConfigData(service, selectedPackages) {
  var match = ListSt$Meta3dCommonlib.find(selectedPackages, (function (param) {
          return param.isStart;
        }));
  if (match === undefined) {
    return Result$Meta3dCommonlib.fail("找不到启动包");
  }
  var protocolConfigStr = match.protocolConfigStr;
  if (protocolConfigStr !== undefined) {
    return Result$Meta3dCommonlib.succeed(service.meta3d.getNeedConfigData(service.meta3d.serializeStartPackageProtocolConfigLib(protocolConfigStr)));
  } else {
    return Result$Meta3dCommonlib.fail("启动包应该有protocolConfigStr");
  }
}

function _buildConfigData(values, startPackageNeedConfigData, apInspectorData) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(startPackageNeedConfigData, (function (map, param) {
                var type_ = param.type_;
                var name = param.name;
                var value = Caml_array.get(values, "configData_" + name + "");
                return ImmutableHashMap$Meta3dCommonlib.set(map, name, type_ === "int" ? IntUtils$Frontend.stringToInt(value) : (
                              type_ === "string" ? value : BoolUtils$Frontend.stringToBool(value)
                            ));
              }), ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "isDebug", apInspectorData.isDebug), "clearColor", apInspectorData.clearColor), "skinName", OptionSt$Meta3dCommonlib.toNullable(apInspectorData.skinName)));
}

function _convertToUIControls(selectedUIControlInspectorData, selectedUIControls) {
  return ListSt$Meta3dCommonlib.toArray(ListSt$Meta3dCommonlib.map(selectedUIControlInspectorData, (function (param) {
                    var match = OptionSt$Meta3dCommonlib.getExn(HierachyUtils$Frontend.findSelectedUIControlData(undefined, [
                              (function (data) {
                                  return data.id;
                                }),
                              (function (data) {
                                  return data.children;
                                })
                            ], selectedUIControls, param.id));
                    var data = match.data;
                    return {
                            protocol: {
                              name: data.contributePackageData.protocol.name,
                              version: data.contributePackageData.protocol.version
                            },
                            displayName: match.displayName,
                            rect: param.rect,
                            isDraw: param.isDraw,
                            input: OptionSt$Meta3dCommonlib.toStrictNullable(param.input),
                            event: param.event,
                            specific: param.specific,
                            children: _convertToUIControls(param.children, selectedUIControls)
                          };
                  })));
}

function _buildSelectedElement(account, selectedUIControlInspectorData, selectedUIControls, customInputs, customActions) {
  return {
          account: account,
          elementName: ElementContributeUtils$Frontend.getElementContributeName(undefined),
          elementVersion: ElementUtils$Frontend.getElementContributeVersion(undefined),
          inspectorData: {
            uiControls: _convertToUIControls(selectedUIControlInspectorData, selectedUIControls)
          },
          customInputs: ListSt$Meta3dCommonlib.toArray(customInputs),
          customActions: ListSt$Meta3dCommonlib.toArray(customActions)
        };
}

function _addGeneratedElementContribute(service, selectedContributes, account, selectedUIControls, selectedUIControlInspectorData) {
  return ListSt$Meta3dCommonlib.push(selectedContributes, ElementVisualUtils$Frontend.generateElementContribute(service, account, ElementContributeUtils$Frontend.buildElementContributeFileStr(service, selectedUIControls, selectedUIControlInspectorData)));
}

function _isRecommend(account) {
  return UserUtils$Frontend.isAdmin(account);
}

function onFinish(service, dispatchForAppStore, param, param$1, previewBase64, values) {
  var customActions = param$1[12];
  var customInputs = param$1[11];
  var selectedUIControlInspectorData = param$1[10];
  var selectedUIControls = param$1[9];
  var apInspectorData = param$1[6];
  var canvasData = param$1[5];
  var selectedContributes = param$1[4];
  var previousAppName = param$1[2];
  var eventEmitter = param$1[0];
  var setPreviewBase64 = param[3];
  var setVisible = param[2];
  var setIsUploadBegin = param[1];
  var setUploadProgress = param[0];
  var appName = values.appName;
  var appDescription = values.appDescription;
  var account = OptionSt$Meta3dCommonlib.getExn(param$1[1]);
  var match = AppUtils$Frontend.splitPackages(param$1[3], param$1[7]);
  var allPackagesStoredInApp = match[1];
  var selectedPackages = match[0];
  if (_isSelectedNothing(selectedPackages, selectedContributes)) {
    service.console.error("请至少选择一个", undefined);
    return Promise.resolve(undefined);
  }
  if (param$1[8]) {
    service.console.error("Debug时修改了selectedPackages数据，请将对应的包更新为最新版本", undefined);
    return Promise.resolve(undefined);
  }
  Curry._1(dispatchForAppStore, {
        RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
        _1: {
          TAG: /* SetCurrentAppName */16,
          _0: appName
        }
      });
  var selectedContributes$1 = ListSt$Meta3dCommonlib.toArray(_addGeneratedElementContribute(service, selectedContributes, account, selectedUIControls, selectedUIControlInspectorData));
  return Result$Meta3dCommonlib.either(getStartPackageNeedConfigData(service, ListSt$Meta3dCommonlib.fromArray(selectedPackages)), (function (startPackageNeedConfigData) {
                var appBinaryFile = AppUtils$Frontend.generateApp(service, [
                      selectedPackages,
                      allPackagesStoredInApp
                    ], selectedContributes$1, {
                      hd: _buildSelectedElement(account, selectedUIControlInspectorData, selectedUIControls, customInputs, customActions),
                      tl: /* [] */0
                    }, NullableSt$Meta3dCommonlib.$$return([
                          {
                            width: canvasData.width,
                            height: canvasData.height
                          },
                          _buildConfigData(values, startPackageNeedConfigData, apInspectorData)
                        ]));
                Curry._1(setIsUploadBegin, (function (param) {
                        return true;
                      }));
                var __x = Most.drain(service.backend.publishApp((function (progress) {
                            Curry._1(setUploadProgress, (function (param) {
                                    return progress;
                                  }));
                          }), appBinaryFile, appName, account, appDescription, OptionSt$Meta3dCommonlib.toStrictNullable(previewBase64), UserUtils$Frontend.isAdmin(account)));
                var __x$1 = Js_promise.then_((function (param) {
                        Curry._1(setIsUploadBegin, (function (param) {
                                return false;
                              }));
                        Curry._1(setVisible, (function (param) {
                                return false;
                              }));
                        Curry._1(setPreviewBase64, (function (param) {
                                
                              }));
                        eventEmitter.emit(EventUtils$Frontend.getPublishAppEventName(undefined), 1);
                        if (previousAppName === appName) {
                          Curry._1(dispatchForAppStore, {
                                RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                _1: /* MarkNotUseCacheForFindApp */6
                              });
                        }
                        return Promise.resolve(undefined);
                      }), __x);
                return Js_promise.$$catch((function (e) {
                              Curry._1(setIsUploadBegin, (function (param) {
                                      return false;
                                    }));
                              Curry._1(setVisible, (function (param) {
                                      return false;
                                    }));
                              Curry._1(setPreviewBase64, (function (param) {
                                      
                                    }));
                              return service.console.errorWithExn(e, undefined);
                            }), __x$1);
              }), (function (failMessage) {
                service.console.error(failMessage, undefined);
                return Promise.resolve(undefined);
              }));
}

function useSelector(param) {
  var assembleSpaceState = param.assembleSpaceState;
  var elementAssembleState = assembleSpaceState.elementAssembleState;
  var apAssembleState = assembleSpaceState.apAssembleState;
  return [
          param.userCenterState.currentAppName,
          [
            [
              apAssembleState.selectedPackages,
              apAssembleState.selectedContributes,
              apAssembleState.apInspectorData,
              apAssembleState.isPassDependencyGraphCheck,
              apAssembleState.storedPackageIdsInApp,
              apAssembleState.isChangeSelectedPackagesByDebug
            ],
            [
              elementAssembleState.canvasData,
              elementAssembleState.selectedUIControls,
              elementAssembleState.selectedUIControlInspectorData,
              elementAssembleState.customInputs,
              elementAssembleState.customActions
            ]
          ],
          param.eventEmitter
        ];
}

var Method = {
  _isSelectedNothing: _isSelectedNothing,
  getStartPackageNeedConfigData: getStartPackageNeedConfigData,
  _buildConfigData: _buildConfigData,
  _convertToUIControls: _convertToUIControls,
  _buildSelectedElement: _buildSelectedElement,
  _addGeneratedElementContribute: _addGeneratedElementContribute,
  _isRecommend: _isRecommend,
  onFinish: onFinish,
  useSelector: useSelector
};

function Publish(Props) {
  var service = Props.service;
  var account = Props.account;
  var publishButtonTarget = Props.publishButtonTarget;
  var publishModalTarget = Props.publishModalTarget;
  var dispatchForAppStore = Curry._1(service.app.useDispatch, undefined);
  var match = service.react.useAllSelector(useSelector);
  var eventEmitter = match[2];
  var match$1 = match[1];
  var match$2 = match$1[1];
  var customActions = match$2[4];
  var customInputs = match$2[3];
  var selectedUIControlInspectorData = match$2[2];
  var selectedUIControls = match$2[1];
  var canvasData = match$2[0];
  var match$3 = match$1[0];
  var isChangeSelectedPackagesByDebug = match$3[5];
  var storedPackageIdsInApp = match$3[4];
  var isPassDependencyGraphCheck = match$3[3];
  var apInspectorData = match$3[2];
  var selectedContributes = match$3[1];
  var selectedPackages = match$3[0];
  var currentAppName = match[0];
  var match$4 = Curry._1(service.react.useState, (function (param) {
          return false;
        }));
  var setVisible = match$4[1];
  var visible = match$4[0];
  var match$5 = Curry._1(service.react.useState, (function (param) {
          
        }));
  var setPreviewBase64 = match$5[1];
  var previewBase64 = match$5[0];
  var match$6 = Curry._1(service.react.useState, (function (param) {
          return 0;
        }));
  var setUploadProgress = match$6[1];
  var match$7 = Curry._1(service.react.useState, (function (param) {
          return false;
        }));
  var setIsUploadBegin = match$7[1];
  return React.createElement(React.Fragment, undefined, React.createElement(Antd.Button, {
                  onClick: (function (param) {
                      Curry._1(setVisible, (function (param) {
                              return true;
                            }));
                      eventEmitter.emit(EventUtils$Frontend.getShowPublishAppModalEventName(undefined), 1);
                    }),
                  children: "发布",
                  ref: publishButtonTarget
                }), visible ? React.createElement(Antd.Modal, {
                    title: "发布编辑器",
                    visible: visible,
                    onOk: (function (param) {
                        Curry._1(setVisible, (function (param) {
                                return false;
                              }));
                        Curry._1(setPreviewBase64, (function (param) {
                                
                              }));
                      }),
                    onCancel: (function (param) {
                        Curry._1(setVisible, (function (param) {
                                return false;
                              }));
                        Curry._1(setPreviewBase64, (function (param) {
                                
                              }));
                      }),
                    footer: null,
                    children: match$7[0] ? React.createElement(Loading$Frontend.make, {
                            text: "" + match$6[0].toString() + "% 上传中"
                          }) : React.createElement("section", {
                            ref: publishModalTarget
                          }, React.createElement(Antd.Form, {
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
                                            if (isPassDependencyGraphCheck) {
                                              onFinish(service, dispatchForAppStore, [
                                                    setUploadProgress,
                                                    setIsUploadBegin,
                                                    setVisible,
                                                    setPreviewBase64
                                                  ], [
                                                    eventEmitter,
                                                    account,
                                                    OptionSt$Meta3dCommonlib.getExn(currentAppName),
                                                    selectedPackages,
                                                    selectedContributes,
                                                    canvasData,
                                                    apInspectorData,
                                                    storedPackageIdsInApp,
                                                    isChangeSelectedPackagesByDebug,
                                                    selectedUIControls,
                                                    selectedUIControlInspectorData,
                                                    customInputs,
                                                    customActions
                                                  ], previewBase64, $$event);
                                              return ;
                                            } else {
                                              return MessageUtils$Frontend.error("请通过DependencyGraph检查", undefined);
                                            }
                                          }), 5);
                                  }),
                                children: null
                              }, React.createElement(Antd.Form.Item, {
                                    label: "编辑器名",
                                    children: React.createElement(Antd.Input, {}),
                                    name: "appName",
                                    rules: [{
                                        type: NullableSt$Meta3dCommonlib.getEmpty(undefined),
                                        required: true,
                                        message: "输入编辑器名"
                                      }]
                                  }), React.createElement(Antd.Form.Item, {
                                    label: "预览图",
                                    children: null,
                                    name: "appPreview"
                                  }, React.createElement(Antd.Upload, {
                                        showUploadList: false,
                                        children: React.createElement(Antd.Button, {
                                              icon: React.createElement(Icons.UploadOutlined, {}),
                                              children: "上传"
                                            }),
                                        beforeUpload: (function (file) {
                                            return UploadUtils$Frontend.handleUploadImage((function (file, imageBase64) {
                                                          Curry._1(setPreviewBase64, (function (param) {
                                                                  return imageBase64;
                                                                }));
                                                        }), (function (param, param$1) {
                                                          
                                                        }), (function ($$event, param) {
                                                          MessageUtils$Frontend.error("error", undefined);
                                                        }), file);
                                          }),
                                        listType: "pictureCard"
                                      }), previewBase64 !== undefined ? React.createElement(Antd.Image, {
                                          preview: true,
                                          width: 200,
                                          height: 200,
                                          src: previewBase64
                                        }) : null), React.createElement(Antd.Form.Item, {
                                    label: "介绍",
                                    children: React.createElement(Antd.Input, {}),
                                    name: "appDescription",
                                    rules: [{
                                        type: NullableSt$Meta3dCommonlib.getEmpty(undefined),
                                        required: true,
                                        message: "输入介绍"
                                      }]
                                  }), React.createElement("h1", undefined, "Config Data"), Result$Meta3dCommonlib.either(getStartPackageNeedConfigData(service, selectedPackages), (function (startPackageNeedConfigData) {
                                      return ArraySt$Meta3dCommonlib.map(startPackageNeedConfigData, (function (item) {
                                                    var match = item.type_;
                                                    return React.createElement(Antd.Form.Item, {
                                                                label: item.name,
                                                                children: match === "string" || match === "int" ? React.createElement(Antd.Input, {}) : React.createElement(Antd.Select, {
                                                                        children: null
                                                                      }, React.createElement(Antd.Select.Option, {
                                                                            value: "true",
                                                                            children: "true"
                                                                          }), React.createElement(Antd.Select.Option, {
                                                                            value: "false",
                                                                            children: "false"
                                                                          })),
                                                                name: "configData_" + item.name + ""
                                                              });
                                                  }));
                                    }), (function (failMessage) {
                                      return null;
                                    })), React.createElement(Antd.Form.Item, {
                                    children: React.createElement(Antd.Button, {
                                          htmlType: "submit",
                                          children: "发布"
                                        }),
                                    wrapperCol: {
                                      offset: 8,
                                      span: 16
                                    }
                                  })))
                  }) : null);
}

var make = Publish;

export {
  Method ,
  make ,
}
/*  Not a pure module */
