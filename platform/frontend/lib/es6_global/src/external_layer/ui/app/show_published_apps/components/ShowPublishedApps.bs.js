

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_string from "../../../../../../../../../../node_modules/rescript/lib/es6/js_string.js";
import * as Js_promise from "../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Nav$Frontend from "../../nav/components/Nav.bs.js";
import * as Loading$Frontend from "../../loading/components/Loading.bs.js";
import * as AppStore$Frontend from "../../store/AppStore.bs.js";
import * as LinkUtils$Frontend from "../../utils/LinkUtils.bs.js";
import * as ReactUtils$Frontend from "../../utils/ReactUtils.bs.js";
import * as ReduxUtils$Frontend from "../../utils/utils/ReduxUtils.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as MarketUtils$Frontend from "../../utils/utils/MarketUtils.bs.js";
import * as MessageUtils$Frontend from "../../utils/utils/MessageUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as PublishedAppUtils$Frontend from "../../utils/PublishedAppUtils.bs.js";

import 'antd/dist/reset.css'
;

function ShowPublishedApps(Props) {
  var service = Props.service;
  var account = Props.account;
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  var dispatchForApAssembleStore = ReduxUtils$Frontend.ApAssemble.useDispatch(ReactUtils$Frontend.useDispatchForAssembleSpaceStore);
  var dispatchForElementAssembleStore = ReduxUtils$Frontend.ElementAssemble.useDispatch(ReactUtils$Frontend.useDispatchForAssembleSpaceStore);
  var match = Curry._1(AppStore$Frontend.useSelector, (function (param) {
          return param.userCenterState;
        }));
  var notUseCacheForFindApp = match.notUseCacheForFindApp;
  var release = match.release;
  var match$1 = React.useState(function () {
        return Math.random();
      });
  var refresh = match$1[1];
  var match$2 = React.useState(function () {
        return false;
      });
  var setIsLoaded = match$2[1];
  var isLoaded = match$2[0];
  var match$3 = React.useState(function () {
        return [];
      });
  var setAllPublishApps = match$3[1];
  var allPublishApps = match$3[0];
  var match$4 = React.useState(function () {
        return [];
      });
  var setAllRecommendPublishApps = match$4[1];
  var match$5 = React.useState(function () {
        return 1;
      });
  var setPage = match$5[1];
  var match$6 = React.useState(function () {
        return 0;
      });
  var setDownloadProgress = match$6[1];
  var downloadProgress = match$6[0];
  var match$7 = React.useState(function () {
        return true;
      });
  var setIsDownloadFinish = match$7[1];
  var isDownloadFinish = match$7[0];
  var match$8 = React.useState(function () {
        
      });
  var setCurrentImportingKey = match$8[1];
  var currentImportingKey = match$8[0];
  var _onChange = function (page, pageSize) {
    Curry._1(setPage, (function (param) {
            return page;
          }));
  };
  var _buildCard = function (item) {
    var previewBase64 = OptionSt$Meta3dCommonlib.fromNullable(item.previewBase64);
    return React.createElement(Antd.Card, {
                key: PublishedAppUtils$Frontend.buildKey(item.account, item.appName),
                bodyStyle: {
                  padding: "20px"
                },
                cover: previewBase64 !== undefined ? React.createElement("div", {
                        style: {
                          padding: "20px"
                        }
                      }, React.createElement(Antd.Image, {
                            preview: false,
                            width: 400,
                            height: 200,
                            src: previewBase64
                          })) : null,
                children: React.createElement(Antd.Card.Meta, {
                      title: React.createElement("span", {
                            style: {
                              whiteSpace: "normal",
                              wordBreak: "break-all",
                              wordWrap: "break-word"
                            }
                          }, item.appName),
                      description: React.createElement(Antd.Space, {
                            direction: "vertical",
                            size: "middle",
                            children: null
                          }, Js_string.slice(0, 100, item.description), React.createElement(Antd.Space, {
                                direction: "horizontal",
                                size: "small",
                                children: null
                              }, Js_string.slice(0, 10, item.account), !isDownloadFinish && OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.map(currentImportingKey, (function (currentImportingKey) {
                                          return currentImportingKey === PublishedAppUtils$Frontend.buildKey(item.account, item.appName);
                                        })), false) ? React.createElement(Loading$Frontend.make, {
                                      text: "" + downloadProgress.toString() + "% 下载中"
                                    }) : null, React.createElement(Antd.Button, {
                                    onClick: (function (param) {
                                        Curry._1(setIsDownloadFinish, (function (param) {
                                                return false;
                                              }));
                                        Curry._1(setCurrentImportingKey, (function (param) {
                                                return PublishedAppUtils$Frontend.buildKey(item.account, item.appName);
                                              }));
                                        PublishedAppUtils$Frontend.importApp(service, [
                                              dispatch,
                                              dispatchForApAssembleStore,
                                              dispatchForElementAssembleStore
                                            ], [
                                              setDownloadProgress,
                                              (function (param) {
                                                  Curry._1(setIsDownloadFinish, (function (param) {
                                                          return true;
                                                        }));
                                                  Curry._1(setCurrentImportingKey, (function (param) {
                                                          
                                                        }));
                                                })
                                            ], notUseCacheForFindApp, release, item);
                                      }),
                                    children: "导入",
                                    type: "primary"
                                  }), React.createElement(Antd.Button, {
                                    onClick: (function (param) {
                                        LinkUtils$Frontend.openLink(PublishedAppUtils$Frontend.buildURL(item.account, item.appName));
                                      }),
                                    children: "运行",
                                    type: "default"
                                  })))
                    })
              });
  };
  var _buildCards = function (allPublishApps) {
    return React.createElement(Antd.Row, {
                gutter: [
                  16,
                  24
                ],
                children: ArraySt$Meta3dCommonlib.map(allPublishApps, (function (item) {
                        return React.createElement(Antd.Col, {
                                    children: _buildCard(item),
                                    span: 8
                                  });
                      }))
              });
  };
  RescriptReactRouter.watchUrl(function (url) {
        var match = url.path;
        if (match && match.hd === "ShowPublishedApps" && !match.tl) {
          Curry._1(setAllPublishApps, (function (param) {
                  return [];
                }));
          Curry._1(setIsLoaded, (function (param) {
                  return false;
                }));
          Curry._1(refresh, (function (param) {
                  return Math.random();
                }));
          return Curry._1(setPage, (function (param) {
                        return 1;
                      }));
        }
        
      });
  React.useEffect((function () {
          var __x = service.backend.findAllPublishApps(MarketUtils$Frontend.getLimitCount(undefined), 0);
          var __x$1 = Most.observe((function (allPublishApps) {
                  Curry._1(setAllPublishApps, (function (param) {
                          return allPublishApps;
                        }));
                }), __x);
          var __x$2 = Js_promise.then_((function (param) {
                  var __x = service.backend.findAllRecommendPublishApps();
                  return Most.observe((function (allRecommendPublishApps) {
                                Curry._1(setAllRecommendPublishApps, (function (param) {
                                        return allRecommendPublishApps;
                                      }));
                                Curry._1(setIsLoaded, (function (param) {
                                        return true;
                                      }));
                              }), __x);
                }), __x$1);
          Js_promise.$$catch((function (e) {
                  Curry._1(setIsLoaded, (function (param) {
                          return false;
                        }));
                  return MessageUtils$Frontend.errorWithExn(e, undefined);
                }), __x$2);
        }), [match$1[0]]);
  return React.createElement(Antd.Layout, {
              children: null
            }, React.createElement(Antd.Layout.Header, {
                  children: React.createElement(Nav$Frontend.make, {
                        currentKey: "2",
                        account: account
                      })
                }), React.createElement(Antd.Layout.Content, {
                  children: isLoaded ? React.createElement(React.Fragment, undefined, React.createElement(Antd.Typography.Title, {
                              children: "推荐"
                            }), _buildCards(match$4[0]), React.createElement(Antd.Typography.Title, {
                              children: "所有"
                            }), _buildCards(MarketUtils$Frontend.getCurrentPage(allPublishApps, match$5[0], MarketUtils$Frontend.getPageSize(undefined)))) : React.createElement(Loading$Frontend.make, {
                          text: "加载中，请稍候"
                        })
                }), React.createElement(Antd.Layout.Footer, {
                  children: isLoaded ? React.createElement(Antd.Pagination, {
                          defaultCurrent: 1,
                          defaultPageSize: MarketUtils$Frontend.getPageSize(undefined),
                          total: ArraySt$Meta3dCommonlib.length(allPublishApps),
                          showSizeChanger: false,
                          onChange: _onChange
                        }) : null
                }));
}

var make = ShowPublishedApps;

export {
  make ,
}
/*  Not a pure module */
