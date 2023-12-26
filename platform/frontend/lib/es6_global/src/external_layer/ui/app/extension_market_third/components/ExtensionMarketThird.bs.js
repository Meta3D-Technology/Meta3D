

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Main$Meta3d from "../../../../../../../../../../node_modules/meta3d/lib/es6_global/src/Main.bs.js";
import * as AppStore$Frontend from "../../store/AppStore.bs.js";
import * as MarketUtils$Frontend from "../../utils/utils/MarketUtils.bs.js";
import * as SelectUtils$Frontend from "../../utils/utils/SelectUtils.bs.js";
import * as AppStoreType$Frontend from "../../utils/utils/assemble_space/AppStoreType.bs.js";
import * as MessageUtils$Frontend from "../../utils/utils/MessageUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as UIDescriptionUtils$Frontend from "../../utils/UIDescriptionUtils.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

import 'antd/dist/reset.css'
;

function ExtensionMarketThird(Props) {
  var service = Props.service;
  var extensionProtocolItem = Props.extensionProtocolItem;
  var allPublishExtensionProtocolConfigs = Props.allPublishExtensionProtocolConfigs;
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  var match = Curry._1(AppStore$Frontend.useSelector, (function (param) {
          return param.userCenterState;
        }));
  var selectedExtensions = match.selectedExtensions;
  var match$1 = React.useState(function () {
        return false;
      });
  var setIsLoaded = match$1[1];
  var isLoaded = match$1[0];
  var match$2 = React.useState(function () {
        return 1;
      });
  var setPage = match$2[1];
  var page = match$2[0];
  var match$3 = React.useState(function () {
        return [];
      });
  var setAllPublishExtensions = match$3[1];
  var allPublishExtensions = match$3[0];
  var match$4 = React.useState(function () {
        return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
      });
  var setSelectPublishExtension = match$4[1];
  var selectPublishExtension = match$4[0];
  var match$5 = React.useState(function () {
        return 0;
      });
  var setDownloadProgress = match$5[1];
  var match$6 = React.useState(function () {
        return false;
      });
  var setIsDownloadBegin = match$6[1];
  var _groupAllPublishExtensions = function (allPublishExtensions) {
    return MarketUtils$Frontend.groupAllPublishItems([
                (function (param) {
                    return param.info.name;
                  }),
                (function (param) {
                    return param.info.version;
                  })
              ], allPublishExtensions);
  };
  var _onChange = function (page, pageSize) {
    Curry._1(setPage, (function (param) {
            return page;
          }));
  };
  React.useEffect((function () {
          var __x = service.backend.getAllPublishExtensionInfos(MarketUtils$Frontend.getLimitCount(undefined), 0, extensionProtocolItem.name, extensionProtocolItem.version);
          var __x$1 = Most.observe((function (data) {
                  Curry._1(setAllPublishExtensions, (function (param) {
                          return ArraySt$Meta3dCommonlib.map(data, (function (info) {
                                        return {
                                                protocolName: extensionProtocolItem.name,
                                                protocolVersion: extensionProtocolItem.version,
                                                protocolIconBase64: extensionProtocolItem.iconBase64,
                                                protocolDisplayName: extensionProtocolItem.displayName,
                                                protocolRepoLink: extensionProtocolItem.repoLink,
                                                protocolDescription: extensionProtocolItem.description,
                                                info: info
                                              };
                                      }));
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
  var tmp;
  if (isLoaded) {
    var protocolName = extensionProtocolItem.name;
    var protocolVersion = extensionProtocolItem.version;
    tmp = React.createElement(React.Fragment, undefined, match$6[0] ? React.createElement("p", undefined, "" + match$5[0].toString() + "% downloading...") : null, React.createElement(Antd.List, {
              itemLayout: "horizontal",
              dataSource: MarketUtils$Frontend.getCurrentPage(_groupAllPublishExtensions(allPublishExtensions), page, MarketUtils$Frontend.getPageSize(undefined)),
              renderItem: (function (items) {
                  var firstItem = OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.getFirst(items));
                  var extensionProtocolItem = OptionSt$Meta3dCommonlib.getWithDefault(ImmutableHashMap$Meta3dCommonlib.get(selectPublishExtension, firstItem.info.name), firstItem);
                  return React.createElement(Antd.List.Item, {
                              children: null
                            }, React.createElement(Antd.List.Item.Meta, {
                                  title: React.createElement(Antd.Typography.Title, {
                                        level: 3,
                                        children: extensionProtocolItem.info.displayName
                                      }),
                                  description: UIDescriptionUtils$Frontend.build(extensionProtocolItem.info.account, extensionProtocolItem.info.repoLink, extensionProtocolItem.info.description),
                                  key: extensionProtocolItem.info.displayName
                                }), SelectUtils$Frontend.buildSelectWithoutEmpty((function (version) {
                                    Curry._1(setSelectPublishExtension, (function (value) {
                                            return ImmutableHashMap$Meta3dCommonlib.set(value, extensionProtocolItem.info.name, OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.find(items, (function (extensionProtocolItem) {
                                                                  return extensionProtocolItem.info.version === version;
                                                                }))));
                                          }));
                                  }), extensionProtocolItem.info.version, ArraySt$Meta3dCommonlib.map(items, (function (extensionProtocolItem) {
                                        return extensionProtocolItem.info.version;
                                      }))), MarketUtils$Frontend.isSelect((function (param) {
                                    var match = param[0];
                                    return "" + match.version + "_" + match.data.extensionPackageData.name + "";
                                  }), "" + extensionProtocolItem.info.version + "_" + extensionProtocolItem.info.name + "", selectedExtensions) ? React.createElement(Antd.Button, {
                                    onClick: (function (param) {
                                        Curry._1(dispatch, {
                                              RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                              _1: {
                                                TAG: /* NotSelectExtension */1,
                                                _0: extensionProtocolItem.info.name,
                                                _1: extensionProtocolItem.info.version
                                              }
                                            });
                                      }),
                                    children: "取消选择"
                                  }) : React.createElement(Antd.Button, {
                                    onClick: (function (param) {
                                        Curry._1(setIsDownloadBegin, (function (param) {
                                                return true;
                                              }));
                                        var __x = service.backend.findPublishExtension((function (progress) {
                                                Curry._1(setDownloadProgress, (function (param) {
                                                        return progress;
                                                      }));
                                              }), MarketUtils$Frontend.getLimitCount(undefined), 0, extensionProtocolItem.info.account, extensionProtocolItem.info.name, extensionProtocolItem.info.version);
                                        var __x$1 = Most.observe((function (file) {
                                                if (NullableSt$Meta3dCommonlib.isNullable(file)) {
                                                  Curry._1(setIsDownloadBegin, (function (param) {
                                                          return false;
                                                        }));
                                                  return MessageUtils$Frontend.error("找不到extension file", undefined);
                                                } else {
                                                  Curry._1(setIsDownloadBegin, (function (param) {
                                                          return false;
                                                        }));
                                                  return Curry._1(dispatch, {
                                                              RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                                              _1: {
                                                                TAG: /* SelectExtension */0,
                                                                _0: {
                                                                  id: extensionProtocolItem.info.id,
                                                                  protocolName: extensionProtocolItem.protocolName,
                                                                  protocolVersion: extensionProtocolItem.protocolVersion,
                                                                  protocolIconBase64: extensionProtocolItem.protocolIconBase64,
                                                                  protocolDisplayName: extensionProtocolItem.protocolDisplayName,
                                                                  protocolRepoLink: extensionProtocolItem.protocolRepoLink,
                                                                  protocolDescription: extensionProtocolItem.protocolDescription,
                                                                  data: Main$Meta3d.loadExtension(NullableSt$Meta3dCommonlib.getExn(file)),
                                                                  version: extensionProtocolItem.info.version,
                                                                  account: extensionProtocolItem.info.account
                                                                },
                                                                _1: ArraySt$Meta3dCommonlib.find(allPublishExtensionProtocolConfigs, (function (param) {
                                                                        if (param.name === protocolName) {
                                                                          return param.version === protocolVersion;
                                                                        } else {
                                                                          return false;
                                                                        }
                                                                      }))
                                                              }
                                                            });
                                                }
                                              }), __x);
                                        Js_promise.$$catch((function (e) {
                                                Curry._1(setIsDownloadBegin, (function (param) {
                                                        return false;
                                                      }));
                                                return MessageUtils$Frontend.errorWithExn(e, undefined);
                                              }), __x$1);
                                      }),
                                    children: "选择"
                                  }));
                })
            }));
  } else {
    tmp = React.createElement("p", undefined, "loading...");
  }
  return React.createElement(Antd.Layout, {
              children: null
            }, React.createElement(Antd.Layout.Content, {
                  children: tmp
                }), React.createElement(Antd.Layout.Footer, {
                  children: isLoaded ? React.createElement(Antd.Pagination, {
                          current: page,
                          defaultPageSize: MarketUtils$Frontend.getPageSize(undefined),
                          total: ArraySt$Meta3dCommonlib.length(_groupAllPublishExtensions(allPublishExtensions)),
                          showSizeChanger: false,
                          onChange: _onChange
                        }) : null
                }));
}

var make = ExtensionMarketThird;

export {
  make ,
}
/*  Not a pure module */
