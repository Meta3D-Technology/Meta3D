

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Nav$Frontend from "../../nav/components/Nav.bs.js";
import * as Loading$Frontend from "../../loading/components/Loading.bs.js";
import * as AppStore$Frontend from "../../store/AppStore.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as MarketUtils$Frontend from "../../utils/utils/MarketUtils.bs.js";
import * as SelectUtils$Frontend from "../../utils/utils/SelectUtils.bs.js";
import * as MessageUtils$Frontend from "../../utils/utils/MessageUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as UIDescriptionUtils$Frontend from "../../utils/UIDescriptionUtils.bs.js";
import * as ExtensionMarketThird$Frontend from "../../extension_market_third/components/ExtensionMarketThird.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

import 'antd/dist/reset.css'
;

function ExtensionMarket(Props) {
  var service = Props.service;
  var account = Props.account;
  Curry._1(AppStore$Frontend.useDispatch, undefined);
  Curry._1(AppStore$Frontend.useSelector, (function (param) {
          return param.userCenterState;
        }));
  var match = React.useState(function () {
        return false;
      });
  var setIsLoaded = match[1];
  var isLoaded = match[0];
  var match$1 = React.useState(function () {
        return /* Second */0;
      });
  var setShowType = match$1[1];
  var match$2 = React.useState(function () {
        return 1;
      });
  var setPage = match$2[1];
  var page = match$2[0];
  var match$3 = React.useState(function () {
        return [];
      });
  var setAllPublishExtensionProtocols = match$3[1];
  var allPublishExtensionProtocols = match$3[0];
  var match$4 = React.useState(function () {
        return [];
      });
  var setAllPublishExtensionProtocolConfigs = match$4[1];
  var match$5 = React.useState(function () {
        
      });
  var setExtensionProtocolItem = match$5[1];
  var extensionProtocolItem = match$5[0];
  var match$6 = React.useState(function () {
        return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
      });
  var setSelectPublishExtensionProtocol = match$6[1];
  var selectPublishExtensionProtocol = match$6[0];
  var _onChange = function (page, pageSize) {
    Curry._1(setPage, (function (param) {
            return page;
          }));
  };
  RescriptReactRouter.watchUrl(function (url) {
        var match = url.path;
        if (match && match.hd === "ExtensionMarket" && !match.tl) {
          Curry._1(setSelectPublishExtensionProtocol, (function (param) {
                  return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
                }));
          Curry._1(setExtensionProtocolItem, (function (param) {
                  
                }));
          Curry._1(setShowType, (function (param) {
                  return /* Second */0;
                }));
          return Curry._1(setPage, (function (param) {
                        return 1;
                      }));
        }
        
      });
  React.useEffect((function () {
          var __x = service.backend.getAllPublishExtensionProtocols(MarketUtils$Frontend.getLimitCount(undefined), 0);
          var __x$1 = Most.flatMap((function (protocols) {
                  var __x = Curry._2(service.backend.getAllPublishExtensionProtocolConfigs, MarketUtils$Frontend.getLimitCount(undefined), 0);
                  return Most.map((function (protocolConfigs) {
                                return [
                                        ArraySt$Meta3dCommonlib.filter(protocols, (function (param) {
                                                return MarketUtils$Frontend.isNotInnerProtocol(param.name);
                                              })),
                                        ArraySt$Meta3dCommonlib.filter(protocolConfigs, (function (param) {
                                                return MarketUtils$Frontend.isNotInnerProtocol(param.name);
                                              }))
                                      ];
                              }), __x);
                }), __x);
          var __x$2 = Most.observe((function (param) {
                  var protocolConfigs = param[1];
                  var protocols = param[0];
                  Curry._1(setAllPublishExtensionProtocols, (function (param) {
                          return protocols;
                        }));
                  Curry._1(setAllPublishExtensionProtocolConfigs, (function (param) {
                          return protocolConfigs;
                        }));
                  Curry._1(setIsLoaded, (function (param) {
                          return true;
                        }));
                }), __x$1);
          Js_promise.$$catch((function (e) {
                  Curry._1(setIsLoaded, (function (param) {
                          return false;
                        }));
                  return MessageUtils$Frontend.errorWithExn(e, undefined);
                }), __x$2);
        }), []);
  return React.createElement(Antd.Layout, {
              children: null
            }, React.createElement(Antd.Layout.Header, {
                  children: React.createElement(Nav$Frontend.make, {
                        currentKey: "3",
                        account: account
                      })
                }), React.createElement(Antd.Layout.Content, {
                  children: isLoaded ? (
                      extensionProtocolItem !== undefined ? React.createElement(ExtensionMarketThird$Frontend.make, {
                              service: service,
                              extensionProtocolItem: extensionProtocolItem,
                              allPublishExtensionProtocolConfigs: match$4[0]
                            }) : React.createElement(Antd.List, {
                              itemLayout: "horizontal",
                              dataSource: MarketUtils$Frontend.getCurrentPage(MarketUtils$Frontend.groupAllPublishProtocols(allPublishExtensionProtocols), page, MarketUtils$Frontend.getPageSize(undefined)),
                              renderItem: (function (items) {
                                  var firstItem = OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.getFirst(items));
                                  var item = OptionSt$Meta3dCommonlib.getWithDefault(ImmutableHashMap$Meta3dCommonlib.get(selectPublishExtensionProtocol, firstItem.name), firstItem);
                                  return React.createElement(Antd.List.Item, {
                                              children: null
                                            }, React.createElement(Antd.List.Item.Meta, {
                                                  title: React.createElement(Antd.Typography.Title, {
                                                        onClick: (function (param) {
                                                            Curry._1(setShowType, (function (param) {
                                                                    return /* Third */1;
                                                                  }));
                                                            Curry._1(setExtensionProtocolItem, (function (param) {
                                                                    return item;
                                                                  }));
                                                          }),
                                                        level: 3,
                                                        children: item.displayName
                                                      }),
                                                  avatar: React.createElement("img", {
                                                        height: "50px",
                                                        src: item.iconBase64,
                                                        width: "50px",
                                                        onClick: (function (param) {
                                                            Curry._1(setExtensionProtocolItem, (function (param) {
                                                                    return item;
                                                                  }));
                                                          })
                                                      }),
                                                  description: UIDescriptionUtils$Frontend.build(item.account, item.repoLink, item.description),
                                                  key: item.displayName
                                                }), SelectUtils$Frontend.buildSelectWithoutEmpty((function (version) {
                                                    Curry._1(setSelectPublishExtensionProtocol, (function (value) {
                                                            return ImmutableHashMap$Meta3dCommonlib.set(value, item.name, OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.find(items, (function (item) {
                                                                                  return item.version === version;
                                                                                }))));
                                                          }));
                                                  }), item.version, ArraySt$Meta3dCommonlib.map(items, (function (item) {
                                                        return item.version;
                                                      }))));
                                })
                            })
                    ) : React.createElement(Loading$Frontend.make, {
                          text: "加载中，请稍候"
                        })
                }), React.createElement(Antd.Layout.Footer, {
                  children: isLoaded && !match$1[0] ? React.createElement(Antd.Pagination, {
                          current: page,
                          defaultPageSize: MarketUtils$Frontend.getPageSize(undefined),
                          total: MarketUtils$Frontend.getAllProtocolsCount(allPublishExtensionProtocols),
                          showSizeChanger: false,
                          onChange: _onChange
                        }) : null
                }));
}

var make = ExtensionMarket;

export {
  make ,
}
/*  Not a pure module */
