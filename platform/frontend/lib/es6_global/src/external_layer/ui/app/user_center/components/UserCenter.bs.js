

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Nav$Frontend from "../../nav/components/Nav.bs.js";
import * as Help$Frontend from "../../help/components/Help.bs.js";
import * as Loading$Frontend from "../../loading/components/Loading.bs.js";
import * as AppStore$Frontend from "../../store/AppStore.bs.js";
import * as LinkUtils$Frontend from "../../utils/LinkUtils.bs.js";
import * as UserUtils$Frontend from "../../utils/UserUtils.bs.js";
import * as GuideUtils$Frontend from "../../utils/GuideUtils.bs.js";
import * as LoginUtils$Frontend from "../../utils/LoginUtils.bs.js";
import * as ReactUtils$Frontend from "../../utils/ReactUtils.bs.js";
import * as ReduxUtils$Frontend from "../../utils/utils/ReduxUtils.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as AppStoreType$Frontend from "../../utils/utils/assemble_space/AppStoreType.bs.js";
import * as MessageUtils$Frontend from "../../utils/utils/MessageUtils.bs.js";
import * as UIControlUtils$Frontend from "../../utils/UIControlUtils.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as PublishedAppUtils$Frontend from "../../utils/PublishedAppUtils.bs.js";
import * as AssembleSpaceUtils$Frontend from "../../assemble_space/utils/AssembleSpaceUtils.bs.js";
import * as SelectPackageUtils$Frontend from "../../utils/SelectPackageUtils.bs.js";
import * as CreateFromScratchGuideInUserCenter$Frontend from "../../guide/create_from_scratch_guide/components/CreateFromScratchGuideInUserCenter.bs.js";

import 'antd/dist/reset.css'
;

function UserCenter(Props) {
  var service = Props.service;
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  var dispatchForApAssembleStore = ReduxUtils$Frontend.ApAssemble.useDispatch(ReactUtils$Frontend.useDispatchForAssembleSpaceStore);
  var dispatchForElementAssembleStore = ReduxUtils$Frontend.ElementAssemble.useDispatch(ReactUtils$Frontend.useDispatchForAssembleSpaceStore);
  var match = Curry._1(AppStore$Frontend.useSelector, (function (param) {
          var userCenterState = param.userCenterState;
          return [
                  [
                    userCenterState.account,
                    userCenterState.release,
                    userCenterState.notUseCacheForFindApp,
                    userCenterState.isInCreateFromScratchTourPhase1
                  ],
                  param.assembleSpaceState.elementAssembleState.isInCreateFromScratchTourPhase2
                ];
        }));
  var isInCreateFromScratchTourPhase2 = match[1];
  var match$1 = match[0];
  var isInCreateFromScratchTourPhase1 = match$1[3];
  var notUseCacheForFindApp = match$1[2];
  var release = match$1[1];
  var account = match$1[0];
  var match$2 = React.useState(function () {
        
      });
  var setInfo = match$2[1];
  var info = match$2[0];
  var match$3 = React.useState(function () {
        return [];
      });
  var setAllPublishApps = match$3[1];
  var match$4 = React.useState(function () {
        return 0;
      });
  var setDownloadProgress = match$4[1];
  var downloadProgress = match$4[0];
  var createFromScratchButtonTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var publishedEditorsTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var navTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var guideTarget = React.useRef(NullableSt$Meta3dCommonlib.getEmpty(undefined));
  var _jumptToAssembleSpaceToCreateEmptyApp = function (dispatch, isInCreateFromScratchTourPhase2) {
    Curry._1(dispatch, {
          RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
          _1: {
            TAG: /* SetCurrentAppName */16,
            _0: "未命名的编辑器"
          }
        });
    Curry._1(setInfo, (function (param) {
            
          }));
    if (isInCreateFromScratchTourPhase2) {
      return RescriptReactRouter.push("/CreateFromScratchGuideBeginInElementAssemble");
    } else {
      return RescriptReactRouter.push("/AssembleSpace");
    }
  };
  React.useEffect((function () {
          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                  AssembleSpaceUtils$Frontend.resetWhenLeave(dispatchForElementAssembleStore);
                  Curry._1(setInfo, (function (param) {
                          return "加载中，请稍候";
                        }));
                  var __x = service.backend.findAllPublishAppsByAccount(OptionSt$Meta3dCommonlib.getExn(account));
                  var __x$1 = Most.observe((function (allPublishApps) {
                          Curry._1(setAllPublishApps, (function (param) {
                                  return allPublishApps;
                                }));
                          Curry._1(setInfo, (function (param) {
                                  
                                }));
                        }), __x);
                  Js_promise.$$catch((function (e) {
                          Curry._1(setAllPublishApps, (function (param) {
                                  return [];
                                }));
                          Curry._1(setInfo, (function (param) {
                                  
                                }));
                          return MessageUtils$Frontend.errorWithExn(e, undefined);
                        }), __x$1);
                }), 5);
        }), []);
  return React.createElement(Antd.Layout, {
              children: null
            }, React.createElement(Antd.Layout.Header, {
                  children: React.createElement(Nav$Frontend.make, {
                        currentKey: "1",
                        navTarget: navTarget,
                        account: account
                      })
                }), React.createElement(Antd.Layout, {
                  children: info !== undefined ? React.createElement(Loading$Frontend.make, {
                          text: info
                        }) : React.createElement(React.Fragment, undefined, React.createElement(Antd.Layout.Sider, {
                              theme: "light",
                              width: 300,
                              children: React.createElement(Help$Frontend.make, {
                                    guideTarget: guideTarget
                                  })
                            }), React.createElement(Antd.Layout.Content, {
                              children: null
                            }, React.createElement(CreateFromScratchGuideInUserCenter$Frontend.make, {
                                  service: service,
                                  createFromScratchButtonTarget: createFromScratchButtonTarget,
                                  publishedEditorsTarget: publishedEditorsTarget,
                                  navTarget: navTarget,
                                  guideTarget: guideTarget
                                }), React.createElement(Antd.Space, {
                                  direction: "vertical",
                                  size: "middle",
                                  children: null
                                }, React.createElement(Antd.Typography.Title, {
                                      children: "我的信息"
                                    }), React.createElement(Antd.Space, {
                                      direction: "horizontal",
                                      children: null
                                    }, React.createElement(Antd.Typography.Text, {
                                          children: "账户名：" + OptionSt$Meta3dCommonlib.getExn(account) + ""
                                        }), React.createElement(Antd.Button, {
                                          onClick: (function (param) {
                                              LoginUtils$Frontend.logOut(undefined);
                                              Curry._1(dispatch, {
                                                    RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                                    _1: /* LogOut */0
                                                  });
                                              RescriptReactRouter.push("/Login");
                                            }),
                                          children: "登出"
                                        })), React.createElement(Antd.Typography.Title, {
                                      children: "我发布的编辑器"
                                    }), React.createElement(Antd.Space, {
                                      direction: "horizontal",
                                      children: null
                                    }, React.createElement(Antd.Button, {
                                          onClick: (function (param) {
                                              MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                                                      RescriptReactRouter.push("/ShowPublishedApps");
                                                    }), 5);
                                            }),
                                          children: "导入模板来创建新的编辑器",
                                          type: "primary"
                                        }), React.createElement(Antd.Button, {
                                          onClick: (function (param) {
                                              MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                                                      if (!isInCreateFromScratchTourPhase1 && !GuideUtils$Frontend.readIsFinishCreateFromScratchTour(undefined)) {
                                                        GuideUtils$Frontend.startCreateFromScratchTour(dispatch, dispatchForElementAssembleStore);
                                                        return RescriptReactRouter.push("/CreateFromScratchGuideBeginInUserCenter");
                                                      }
                                                      Curry._1(setInfo, (function (param) {
                                                              return "加载中，请稍候";
                                                            }));
                                                      Curry._1(dispatch, {
                                                            RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                                            _1: /* RemoveElement */1
                                                          });
                                                      Curry._1(dispatch, {
                                                            RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                                            _1: /* EndCreateFromScratchTourPhase1 */3
                                                          });
                                                      var __x = UIControlUtils$Frontend.selectAllUIControls(service, dispatch, release);
                                                      var __x$1 = Js_promise.then_((function (param) {
                                                              return SelectPackageUtils$Frontend.selectEditorWholeAndEngineWholePackages(service, dispatch, release);
                                                            }), __x);
                                                      var __x$2 = Js_promise.then_((function (param) {
                                                              _jumptToAssembleSpaceToCreateEmptyApp(dispatch, isInCreateFromScratchTourPhase2);
                                                              return Promise.resolve(undefined);
                                                            }), __x$1);
                                                      Js_promise.$$catch((function (e) {
                                                              return MessageUtils$Frontend.errorWithExn(e, undefined);
                                                            }), __x$2);
                                                    }), 5);
                                            }),
                                          children: "从头创建新的编辑器",
                                          type: "default",
                                          ref: createFromScratchButtonTarget
                                        }), UserUtils$Frontend.isAdmin(account) ? React.createElement(Antd.Button, {
                                            onClick: (function (param) {
                                                _jumptToAssembleSpaceToCreateEmptyApp(dispatch, isInCreateFromScratchTourPhase2);
                                              }),
                                            children: "进入装配空间",
                                            type: "default"
                                          }) : null), React.createElement("section", {
                                      ref: publishedEditorsTarget
                                    }, React.createElement(Antd.List, {
                                          itemLayout: "horizontal",
                                          dataSource: match$3[0],
                                          renderItem: (function (item) {
                                              return React.createElement(Antd.List.Item, {
                                                          children: null
                                                        }, React.createElement(Antd.List.Item.Meta, {
                                                              title: React.createElement(Antd.Typography.Title, {
                                                                    level: 3,
                                                                    children: item.appName
                                                                  }),
                                                              key: PublishedAppUtils$Frontend.buildKey(item.account, item.appName)
                                                            }), React.createElement(Antd.Button, {
                                                              onClick: (function (param) {
                                                                  Curry._1(setInfo, (function (param) {
                                                                          return "" + downloadProgress.toString() + "% 下载中";
                                                                        }));
                                                                  PublishedAppUtils$Frontend.importApp(service, [
                                                                        dispatch,
                                                                        dispatchForApAssembleStore,
                                                                        dispatchForElementAssembleStore
                                                                      ], [
                                                                        setDownloadProgress,
                                                                        (function (param) {
                                                                            Curry._1(setInfo, (function (param) {
                                                                                    
                                                                                  }));
                                                                          })
                                                                      ], notUseCacheForFindApp, release, item);
                                                                }),
                                                              children: "编辑",
                                                              type: "primary"
                                                            }), React.createElement(Antd.Button, {
                                                              onClick: (function (param) {
                                                                  LinkUtils$Frontend.openLink(PublishedAppUtils$Frontend.buildURL(item.account, item.appName));
                                                                }),
                                                              children: "运行",
                                                              type: "default"
                                                            }));
                                            })
                                        })))))
                }));
}

var make = UserCenter;

export {
  make ,
}
/*  Not a pure module */
