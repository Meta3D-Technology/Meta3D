

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
import * as PackageMarketThird$Frontend from "../../package_market_third/components/PackageMarketThird.bs.js";
import * as UIDescriptionUtils$Frontend from "../../utils/UIDescriptionUtils.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

import 'antd/dist/reset.css'
;

function PackageMarket(Props) {
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
        return [];
      });
  var setAllPublishPackageEntryExtensionProtocols = match$1[1];
  var allPublishPackageEntryExtensionProtocols = match$1[0];
  var match$2 = React.useState(function () {
        return /* Second */0;
      });
  var setShowType = match$2[1];
  var match$3 = React.useState(function () {
        return 1;
      });
  var setPage = match$3[1];
  var page = match$3[0];
  var match$4 = React.useState(function () {
        
      });
  var setPackageEntryExtensionProtocolItem = match$4[1];
  var packageEntryExtensionProtocolItem = match$4[0];
  var match$5 = React.useState(function () {
        return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
      });
  var setSelectPublishPackageEntryExtensionProtocol = match$5[1];
  var selectPublishPackageEntryExtensionProtocol = match$5[0];
  var _onChange = function (page, pageSize) {
    Curry._1(setPage, (function (param) {
            return page;
          }));
  };
  RescriptReactRouter.watchUrl(function (url) {
        var match = url.path;
        if (match && match.hd === "PackageMarket" && !match.tl) {
          Curry._1(setSelectPublishPackageEntryExtensionProtocol, (function (param) {
                  return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
                }));
          Curry._1(setPackageEntryExtensionProtocolItem, (function (param) {
                  
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
          var __x = service.backend.getAllPublishPackageEntryExtensionProtocols(MarketUtils$Frontend.getLimitCount(undefined), 0);
          var __x$1 = Most.observe((function (protocols) {
                  Curry._1(setAllPublishPackageEntryExtensionProtocols, (function (param) {
                          return protocols;
                        }));
                  Curry._1(setIsLoaded, (function (param) {
                          return true;
                        }));
                }), __x);
          Js_promise.$$catch((function (e) {
                  Curry._1(setIsLoaded, (function (param) {
                          return false;
                        }));
                  return MessageUtils$Frontend.errorWithExn(e, undefined);
                }), __x$1);
        }), []);
  return React.createElement(Antd.Layout, {
              children: null
            }, React.createElement(Antd.Layout.Header, {
                  children: React.createElement(Nav$Frontend.make, {
                        currentKey: "5",
                        account: account
                      })
                }), React.createElement(Antd.Layout.Content, {
                  children: isLoaded ? (
                      packageEntryExtensionProtocolItem !== undefined ? React.createElement(PackageMarketThird$Frontend.make, {
                              service: service,
                              packageEntryExtensionProtocolItem: packageEntryExtensionProtocolItem
                            }) : React.createElement(Antd.List, {
                              itemLayout: "horizontal",
                              dataSource: MarketUtils$Frontend.getCurrentPage(MarketUtils$Frontend.groupAllPublishProtocols(allPublishPackageEntryExtensionProtocols), page, MarketUtils$Frontend.getPageSize(undefined)),
                              renderItem: (function (items) {
                                  var firstItem = OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.getFirst(items));
                                  var item = OptionSt$Meta3dCommonlib.getWithDefault(ImmutableHashMap$Meta3dCommonlib.get(selectPublishPackageEntryExtensionProtocol, firstItem.name), firstItem);
                                  return React.createElement(Antd.List.Item, {
                                              children: null
                                            }, React.createElement(Antd.List.Item.Meta, {
                                                  title: React.createElement(Antd.Typography.Title, {
                                                        onClick: (function (param) {
                                                            Curry._1(setShowType, (function (param) {
                                                                    return /* Third */1;
                                                                  }));
                                                            Curry._1(setPackageEntryExtensionProtocolItem, (function (param) {
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
                                                            Curry._1(setPackageEntryExtensionProtocolItem, (function (param) {
                                                                    return item;
                                                                  }));
                                                          })
                                                      }),
                                                  description: UIDescriptionUtils$Frontend.build(item.account, item.repoLink, item.description),
                                                  key: item.displayName
                                                }), SelectUtils$Frontend.buildSelectWithoutEmpty((function (version) {
                                                    Curry._1(setSelectPublishPackageEntryExtensionProtocol, (function (value) {
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
                  children: isLoaded && !match$2[0] ? React.createElement(Antd.Pagination, {
                          current: page,
                          defaultPageSize: MarketUtils$Frontend.getPageSize(undefined),
                          total: MarketUtils$Frontend.getAllProtocolsCount(allPublishPackageEntryExtensionProtocols),
                          showSizeChanger: false,
                          onChange: _onChange
                        }) : null
                }));
}

var make = PackageMarket;

export {
  make ,
}
/*  Not a pure module */
