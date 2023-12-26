

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import Moment from "moment";
import * as Js_promise from "../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Caml_option from "../../../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Main$Meta3d from "../../../../../../../../../node_modules/meta3d/lib/es6_global/src/Main.bs.js";
import * as Login$Frontend from "../login/components/Login.bs.js";
import * as AppStore$Frontend from "../store/AppStore.bs.js";
import * as EnterApp$Frontend from "../enter_app/components/EnterApp.bs.js";
import * as Register$Frontend from "../register/components/Register.bs.js";
import * as UserUtils$Frontend from "../utils/UserUtils.bs.js";
import * as LoginUtils$Frontend from "../utils/LoginUtils.bs.js";
import * as ReactUtils$Frontend from "../utils/ReactUtils.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as UserCenter$Frontend from "../user_center/components/UserCenter.bs.js";
import * as AppStoreType$Frontend from "../utils/utils/assemble_space/AppStoreType.bs.js";
import * as MessageUtils$Frontend from "../utils/utils/MessageUtils.bs.js";
import * as Antd__Message$Frontend from "../utils/utils/externals/antd/Antd__Message.bs.js";
import * as AssembleSpace$Frontend from "../assemble_space/components/AssembleSpace.bs.js";
import * as IndexdDBUtils$Frontend from "../utils/IndexdDBUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as PackageMarket$Frontend from "../package_market/components/PackageMarket.bs.js";
import * as UIControlUtils$Frontend from "../utils/UIControlUtils.bs.js";
import * as UrlSearchUtils$Frontend from "../utils/utils/url/UrlSearchUtils.bs.js";
import * as ExtensionMarket$Frontend from "../extension_market/components/ExtensionMarket.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as AssembleSpaceNav$Frontend from "../assemble_space/components/nav/components/AssembleSpaceNav.bs.js";
import * as BackendCloudbase$Frontend from "../../../../externals/backend_cloudbase/BackendCloudbase.bs.js";
import * as ContributeMarket$Frontend from "../contribute_market/components/ContributeMarket.bs.js";
import * as RunElementVisual$Frontend from "../assemble_space/components/element_assemble/run_element_visual/components/RunElementVisual.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ShowPublishedApps$Frontend from "../show_published_apps/components/ShowPublishedApps.bs.js";
import * as SelectPackageUtils$Frontend from "../utils/SelectPackageUtils.bs.js";
import * as CreateFromScratchGuideBeginInUserCenter$Frontend from "../guide/create_from_scratch_guide/components/CreateFromScratchGuideBeginInUserCenter.bs.js";
import * as CreateFromScratchGuideBeginInElementAssemble$Frontend from "../guide/create_from_scratch_guide/components/CreateFromScratchGuideBeginInElementAssemble.bs.js";

import 'antd/dist/reset.css'
;

function judgeToJumpToLogin(buildUI, account, service) {
  if (account !== undefined) {
    return Curry._1(buildUI, undefined);
  } else {
    RescriptReactRouter.push("/Login");
    return React.createElement(Login$Frontend.make, {
                service: service
              });
  }
}

var Method = {
  judgeToJumpToLogin: judgeToJumpToLogin
};

function App(Props) {
  var service = Props.service;
  var match = Antd.message.useMessage();
  Antd__Message$Frontend.setMessageAPI(match[0]);
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  var url = RescriptReactRouter.useUrl(undefined, undefined);
  var match$1 = Curry._1(AppStore$Frontend.useSelector, (function (param) {
          var userCenterState = param.userCenterState;
          return [
                  userCenterState.account,
                  userCenterState.selectedExtensions,
                  userCenterState.selectedContributes,
                  userCenterState.selectedPackages,
                  userCenterState.selectedElements,
                  userCenterState.currentAppName
                ];
        }));
  var currentAppName = match$1[5];
  var selectedElements = match$1[4];
  var selectedPackages = match$1[3];
  var selectedContributes = match$1[2];
  var selectedExtensions = match$1[1];
  var account = match$1[0];
  var release = React.useRef(undefined);
  var idleTasks = React.useRef(/* [] */0);
  var assembleSpaceNavTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var _buildAssembleSpaceService = function (param) {
    return {
            url: {
              getUrlParam: (function (paramName) {
                  return JSON.parse(UrlSearchUtils$Frontend.get(RescriptReactRouter.useUrl(undefined, undefined).search, paramName));
                })
            },
            tab: {
              openUrl: (function (url) {
                  Curry._1(window.open(url, "_blank").focus, undefined);
                })
            },
            storage: {
              initForElementVisualApp: (function (param) {
                  return IndexdDBUtils$Frontend.initForElementVisualApp(undefined);
                }),
              getElementVisualApp: IndexdDBUtils$Frontend.getElementVisualApp,
              setElementVisualApp: IndexdDBUtils$Frontend.setElementVisualApp
            },
            console: {
              error: MessageUtils$Frontend.error,
              errorWithExn: MessageUtils$Frontend.errorWithExn
            },
            react: {
              useCallback1: (function (func, param) {
                  return React.useCallback(Curry.__1(func), param);
                }),
              useState: (function (func) {
                  return React.useState(function () {
                              return Curry._1(func, undefined);
                            });
                }),
              useRef: (function (value) {
                  return React.useRef(value);
                }),
              useDispatch: ReactUtils$Frontend.useDispatchForAssembleSpaceStore,
              useAllSelector: (function (func) {
                  return Curry._1(AppStore$Frontend.useSelector, Curry.__1(func));
                }),
              useSelector: (function (func) {
                  return Curry._1(AppStore$Frontend.useSelector, (function (param) {
                                return Curry._1(func, param.assembleSpaceState);
                              }));
                }),
              useEffect: (function (func) {
                  React.useEffect(function () {
                        return Curry._1(func, undefined);
                      });
                }),
              useEffect1: (function (func, param) {
                  React.useEffect((function () {
                          return Curry._1(func, undefined);
                        }), param);
                }),
              useEffectOnce: (function (func) {
                  React.useEffect((function () {
                          return Curry._1(func, undefined)[1];
                        }), []);
                }),
              useEffectOnceAsync: (function (func) {
                  React.useEffect((function () {
                          return Curry._1(func, undefined)[1];
                        }), []);
                })
            },
            backend: BackendCloudbase$Frontend.buildAssembleSpaceService(undefined),
            meta3d: {
              getPackageService: Main$Meta3d.getPackageService,
              generateContribute: Main$Meta3d.generateContribute,
              loadContribute: Main$Meta3d.loadContribute,
              generateExtension: Main$Meta3d.generateExtension,
              loadExtension: Main$Meta3d.loadExtension,
              initExtension: Main$Meta3d.initExtension,
              updateExtension: Main$Meta3d.updateExtension,
              generatePackage: (function (param, allPackageBinaryFiles, packageData) {
                  return Main$Meta3d.generatePackage([
                              param[0],
                              param[1]
                            ], allPackageBinaryFiles, packageData);
                }),
              generateApp: Main$Meta3d.generateApp,
              convertAllFileDataForApp: Main$Meta3d.convertAllFileDataForApp,
              convertAllFileDataForPackage: Main$Meta3d.convertAllFileDataForPackage,
              loadApp: Main$Meta3d.loadApp,
              getExtensionFuncDataStr: Main$Meta3d.getExtensionFuncDataStr,
              getExtensionFuncData: Main$Meta3d.getExtensionFuncData,
              getContributeFuncDataStr: Main$Meta3d.getContributeFuncDataStr,
              getContributeFuncData: Main$Meta3d.getContributeFuncData,
              getAllDataOfPackage: Main$Meta3d.getAllDataOfPackage,
              execGetContributeFunc: (function (contributeFuncData) {
                  return Main$Meta3d.execGetContributeFunc(contributeFuncData, undefined);
                }),
              serializeUIControlProtocolConfigLib: Main$Meta3d.serializeUIControlProtocolConfigLib,
              getUIControlSpecificDataFields: Main$Meta3d.getUIControlSpecificDataFields,
              hasChildren: Main$Meta3d.hasChildren,
              getUIControlSupportedEventNames: Main$Meta3d.getUIControlSupportedEventNames,
              generateHandleUIControlEventStr: Main$Meta3d.generateHandleUIControlEventStr,
              serializeStartPackageProtocolConfigLib: Main$Meta3d.serializeStartPackageProtocolConfigLib,
              getNeedConfigData: Main$Meta3d.getNeedConfigData
            },
            other: {
              random: (function (prim) {
                  return Math.random();
                }),
              requestAnimationFirstFrame: (function (prim) {
                  return window.requestAnimationFrame(prim);
                }),
              requestAnimationOtherFrame: (function (prim) {
                  return window.requestAnimationFrame(prim);
                }),
              cancelAnimationFrame: (function (prim) {
                  window.cancelAnimationFrame(prim);
                })
            },
            dom: {
              querySelector: (function (str) {
                  return Caml_option.null_to_opt(document.querySelector(str));
                })
            },
            ui: {
              buildTitle: (function (level, children, param) {
                  return React.createElement(Antd.Typography.Title, {
                              level: level,
                              children: children
                            });
                }),
              buildText: (function (children, _type, param) {
                  return React.createElement(Antd.Typography.Text, {
                              type: _type,
                              children: children
                            });
                })
            },
            app: {
              useDispatch: (function (param) {
                  return Curry._1(AppStore$Frontend.useDispatch, undefined);
                }),
              dispatchUpdateSelectedPackagesAndExtensionsAndContributesAction: (function (dispatchForAppStore, dispatchForApAssembleStore, dispatchForPackageAssembleStore, param, param$1, param$2) {
                  Curry._1(dispatchForAppStore, {
                        RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                        _1: {
                          TAG: /* UpdateSelectedPackagesAndExtensionsAndContributes */12,
                          _0: param[0],
                          _1: param[1],
                          _2: param[2]
                        }
                      });
                  Curry._1(dispatchForApAssembleStore, {
                        TAG: /* UpdateSelectedPackagesAndExtensionsAndContributes */18,
                        _0: param$1[0],
                        _1: param$1[1],
                        _2: param$1[2]
                      });
                  Curry._1(dispatchForPackageAssembleStore, {
                        TAG: /* UpdateSelectedPackagesAndExtensionsAndContributes */7,
                        _0: param$2[0],
                        _1: param$2[1],
                        _2: param$2[2]
                      });
                })
            }
          };
  };
  var _getReleaseData = function (dispatch) {
    var __x = window.fetch("https://api.github.com/repos/Meta3D-Technology/Meta3D/releases/latest");
    var __x$1 = Js_promise.then_((function (param) {
            return Promise.resolve(param.json());
          }), __x);
    return Js_promise.then_((function (json) {
                  var published_at = json.published_at;
                  var release_version = json.tag_name;
                  var release_releaseDateUntilNow = Moment().subtract(Moment(published_at)).dayOfYear() - 1 | 0;
                  var release = {
                    version: release_version,
                    releaseDateUntilNow: release_releaseDateUntilNow
                  };
                  Curry._1(dispatch, {
                        RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                        _1: {
                          TAG: /* SetRelease */17,
                          _0: release
                        }
                      });
                  return Promise.resolve(release);
                }), __x$1);
  };
  React.useEffect((function () {
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  idleTasks.current = {
                    hd: (function (param) {
                        var __x = _getReleaseData(dispatch);
                        Js_promise.then_((function (release_) {
                                release.current = release_;
                                return Promise.resolve(undefined);
                              }), __x);
                        return true;
                      }),
                    tl: {
                      hd: (function (param) {
                          if (UserUtils$Frontend.isAdmin(account)) {
                            return true;
                          }
                          var release$1 = release.current;
                          if (release$1 !== undefined) {
                            UIControlUtils$Frontend.selectAllUIControls(service, dispatch, release$1);
                            return true;
                          } else {
                            return false;
                          }
                        }),
                      tl: {
                        hd: (function (param) {
                            if (UserUtils$Frontend.isAdmin(account)) {
                              return true;
                            }
                            var release$1 = release.current;
                            if (release$1 !== undefined) {
                              SelectPackageUtils$Frontend.selectEditorWholeAndEngineWholePackages(service, dispatch, release$1);
                              return true;
                            } else {
                              return false;
                            }
                          }),
                        tl: /* [] */0
                      }
                    }
                  };
                }), 5);
        }), []);
  React.useEffect((function () {
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  var _handle = function (deadline) {
                    var tasks = idleTasks.current;
                    while(deadline.timeRemaining() > 0 && ListSt$Meta3dCommonlib.length(tasks) > 0) {
                      var isTaskExec = Curry._1(OptionSt$Meta3dCommonlib.getExn(ListSt$Meta3dCommonlib.head(tasks)), undefined);
                      if (isTaskExec) {
                        tasks = OptionSt$Meta3dCommonlib.getWithDefault(ListSt$Meta3dCommonlib.tail(tasks), /* [] */0);
                      }
                      
                    };
                    idleTasks.current = tasks;
                    if (ListSt$Meta3dCommonlib.length(idleTasks.current) > 0) {
                      window.requestIdleCallback(_handle, NullableSt$Meta3dCommonlib.getEmpty(undefined));
                      return ;
                    }
                    
                  };
                  window.requestIdleCallback(_handle, NullableSt$Meta3dCommonlib.getEmpty(undefined));
                }), 5);
        }), []);
  var match$2 = url.path;
  var tmp;
  var exit = 0;
  if (match$2) {
    switch (match$2.hd) {
      case "AssembleSpace" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = judgeToJumpToLogin((function (param) {
                    if (currentAppName !== undefined) {
                      return React.createElement(Antd.Layout, {
                                  children: null
                                }, React.createElement(Antd.Layout.Header, {
                                      children: React.createElement(AssembleSpaceNav$Frontend.make, {
                                            service: _buildAssembleSpaceService(undefined),
                                            currentKey: "2",
                                            appName: currentAppName,
                                            assembleSpaceNavTarget: assembleSpaceNavTarget
                                          })
                                    }), React.createElement(Antd.Layout.Content, {
                                      children: React.createElement(AssembleSpace$Frontend.make, {
                                            service: _buildAssembleSpaceService(undefined),
                                            account: account,
                                            selectedPackagesFromMarket: selectedPackages,
                                            selectedExtensionsFromMarket: selectedExtensions,
                                            selectedContributesFromMarket: selectedContributes,
                                            selectedElementsFromMarket: selectedElements,
                                            assembleSpaceNavTarget: assembleSpaceNavTarget
                                          })
                                    }));
                    } else {
                      RescriptReactRouter.push("/UserCenter");
                      return null;
                    }
                  }), account, service);
          }
          break;
      case "ContributeMarket" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = judgeToJumpToLogin((function (param) {
                    return React.createElement(ContributeMarket$Frontend.make, {
                                service: service,
                                account: account
                              });
                  }), account, service);
          }
          break;
      case "CreateFromScratchGuideBeginInElementAssemble" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = judgeToJumpToLogin((function (param) {
                    return React.createElement(CreateFromScratchGuideBeginInElementAssemble$Frontend.make, {
                                account: account
                              });
                  }), account, service);
          }
          break;
      case "CreateFromScratchGuideBeginInUserCenter" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = judgeToJumpToLogin((function (param) {
                    return React.createElement(CreateFromScratchGuideBeginInUserCenter$Frontend.make, {
                                account: account
                              });
                  }), account, service);
          }
          break;
      case "EnterApp" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = React.createElement(EnterApp$Frontend.make, {
                  service: service
                });
          }
          break;
      case "ExtensionMarket" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = judgeToJumpToLogin((function (param) {
                    return React.createElement(ExtensionMarket$Frontend.make, {
                                service: service,
                                account: account
                              });
                  }), account, service);
          }
          break;
      case "Login" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = React.createElement(Login$Frontend.make, {
                  service: service
                });
          }
          break;
      case "PackageMarket" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = judgeToJumpToLogin((function (param) {
                    return React.createElement(PackageMarket$Frontend.make, {
                                service: service,
                                account: account
                              });
                  }), account, service);
          }
          break;
      case "Register" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = React.createElement(Register$Frontend.make, {
                  service: service
                });
          }
          break;
      case "RunElementVisual" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = React.createElement(RunElementVisual$Frontend.make, {
                  service: _buildAssembleSpaceService(undefined)
                });
          }
          break;
      case "ShowPublishedApps" :
          if (match$2.tl) {
            exit = 1;
          } else {
            tmp = judgeToJumpToLogin((function (param) {
                    return React.createElement(ShowPublishedApps$Frontend.make, {
                                service: service,
                                account: account
                              });
                  }), account, service);
          }
          break;
      case "meta3d" :
          if (match$2.tl) {
            exit = 1;
          } else {
            LoginUtils$Frontend.login(dispatch, "meta3d");
            tmp = null;
          }
          break;
      default:
        exit = 1;
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    tmp = judgeToJumpToLogin((function (param) {
            return React.createElement(UserCenter$Frontend.make, {
                        service: service
                      });
          }), account, service);
  }
  return React.createElement(React.Fragment, undefined, match[1], tmp);
}

var make = App;

export {
  Method ,
  make ,
}
/*  Not a pure module */
