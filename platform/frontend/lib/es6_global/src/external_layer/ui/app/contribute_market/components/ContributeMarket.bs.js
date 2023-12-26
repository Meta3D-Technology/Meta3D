

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Nav$Frontend from "../../nav/components/Nav.bs.js";
import * as AppStore$Frontend from "../../store/AppStore.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as MarketUtils$Frontend from "../../utils/utils/MarketUtils.bs.js";
import * as SelectUtils$Frontend from "../../utils/utils/SelectUtils.bs.js";
import * as MessageUtils$Frontend from "../../utils/utils/MessageUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as UIDescriptionUtils$Frontend from "../../utils/UIDescriptionUtils.bs.js";
import * as ContributeMarketThird$Frontend from "../../contribute_market_third/components/ContributeMarketThird.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

import 'antd/dist/reset.css'
;

function ContributeMarket(Props) {
  var service = Props.service;
  var account = Props.account;
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
  var setAllPublishContributeProtocols = match$3[1];
  var allPublishContributeProtocols = match$3[0];
  var match$4 = React.useState(function () {
        return [];
      });
  var setAllPublishContributeProtocolConfigs = match$4[1];
  var match$5 = React.useState(function () {
        
      });
  var setContributeProtocolItem = match$5[1];
  var contributeProtocolItem = match$5[0];
  var match$6 = React.useState(function () {
        return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
      });
  var setSelectPublishContributeProtocol = match$6[1];
  var selectPublishContributeProtocol = match$6[0];
  var _onChange = function (page, pageSize) {
    Curry._1(setPage, (function (param) {
            return page;
          }));
  };
  RescriptReactRouter.watchUrl(function (url) {
        var match = url.path;
        if (match && match.hd === "ContributeMarket" && !match.tl) {
          Curry._1(setSelectPublishContributeProtocol, (function (param) {
                  return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
                }));
          Curry._1(setContributeProtocolItem, (function (param) {
                  
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
          var __x = service.backend.getAllPublishContributeProtocols(MarketUtils$Frontend.getLimitCount(undefined), 0);
          var __x$1 = Most.flatMap((function (protocols) {
                  var __x = Curry._2(service.backend.getAllPublishContributeProtocolConfigs, MarketUtils$Frontend.getLimitCount(undefined), 0);
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
                  Curry._1(setAllPublishContributeProtocols, (function (param) {
                          return protocols;
                        }));
                  Curry._1(setAllPublishContributeProtocolConfigs, (function (param) {
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
                        currentKey: "4",
                        account: account
                      })
                }), React.createElement(Antd.Layout.Content, {
                  children: isLoaded ? (
                      contributeProtocolItem !== undefined ? React.createElement(ContributeMarketThird$Frontend.make, {
                              service: service,
                              contributeProtocolItem: contributeProtocolItem,
                              allPublishContributeProtocolConfigs: match$4[0]
                            }) : React.createElement(Antd.List, {
                              itemLayout: "horizontal",
                              dataSource: MarketUtils$Frontend.getCurrentPage(MarketUtils$Frontend.groupAllPublishProtocols(allPublishContributeProtocols), page, MarketUtils$Frontend.getPageSize(undefined)),
                              renderItem: (function (items) {
                                  var firstItem = OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.getFirst(items));
                                  var item = OptionSt$Meta3dCommonlib.getWithDefault(ImmutableHashMap$Meta3dCommonlib.get(selectPublishContributeProtocol, firstItem.name), firstItem);
                                  return React.createElement(Antd.List.Item, {
                                              children: null
                                            }, React.createElement(Antd.List.Item.Meta, {
                                                  title: React.createElement(Antd.Typography.Title, {
                                                        onClick: (function (param) {
                                                            Curry._1(setShowType, (function (param) {
                                                                    return /* Third */1;
                                                                  }));
                                                            Curry._1(setContributeProtocolItem, (function (param) {
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
                                                            Curry._1(setContributeProtocolItem, (function (param) {
                                                                    return item;
                                                                  }));
                                                          })
                                                      }),
                                                  description: UIDescriptionUtils$Frontend.build(item.account, item.repoLink, item.description),
                                                  key: item.displayName
                                                }), SelectUtils$Frontend.buildSelectWithoutEmpty((function (version) {
                                                    Curry._1(setSelectPublishContributeProtocol, (function (value) {
                                                            return ImmutableHashMap$Meta3dCommonlib.set(value, item.name, OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.find(items, (function (item) {
                                                                                  return item.version === version;
                                                                                }))));
                                                          }));
                                                  }), item.version, ArraySt$Meta3dCommonlib.map(items, (function (item) {
                                                        return item.version;
                                                      }))));
                                })
                            })
                    ) : React.createElement("p", undefined, "loading...")
                }), React.createElement(Antd.Layout.Footer, {
                  children: isLoaded && !match$1[0] ? React.createElement(Antd.Pagination, {
                          current: page,
                          defaultPageSize: MarketUtils$Frontend.getPageSize(undefined),
                          total: MarketUtils$Frontend.getAllProtocolsCount(allPublishContributeProtocols),
                          showSizeChanger: false,
                          onChange: _onChange
                        }) : null
                }));
}

var make = ContributeMarket;

export {
  make ,
}
/*  Not a pure module */
