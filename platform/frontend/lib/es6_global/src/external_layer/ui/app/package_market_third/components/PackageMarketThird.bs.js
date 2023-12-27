

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Main$Meta3d from "../../../../../../../../../../node_modules/meta3d/lib/es6_global/src/Main.bs.js";
import * as Loading$Frontend from "../../loading/components/Loading.bs.js";
import * as AppStore$Frontend from "../../store/AppStore.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as ImportUtils$Frontend from "../../utils/ImportUtils.bs.js";
import * as MarketUtils$Frontend from "../../utils/utils/MarketUtils.bs.js";
import * as SelectUtils$Frontend from "../../utils/utils/SelectUtils.bs.js";
import * as AppStoreType$Frontend from "../../utils/utils/assemble_space/AppStoreType.bs.js";
import * as MessageUtils$Frontend from "../../utils/utils/MessageUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as UIDescriptionUtils$Frontend from "../../utils/UIDescriptionUtils.bs.js";
import * as DownloadUtils$Meta3dFileUtils from "../../../../../../../../../../node_modules/meta3d-file-utils/lib/es6_global/src/DownloadUtils.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

import 'antd/dist/reset.css'
;

function PackageMarketThird(Props) {
  var service = Props.service;
  var packageEntryExtensionProtocolItem = Props.packageEntryExtensionProtocolItem;
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  var match = Curry._1(AppStore$Frontend.useSelector, (function (param) {
          return param.userCenterState;
        }));
  var importedPackageIds = match.importedPackageIds;
  var selectedPackages = match.selectedPackages;
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
  var setAllPublishPackages = match$3[1];
  var allPublishPackages = match$3[0];
  var match$4 = React.useState(function () {
        return 0;
      });
  var setDownloadProgress = match$4[1];
  var downloadProgress = match$4[0];
  var match$5 = React.useState(function () {
        return false;
      });
  var setIsDownloadBegin = match$5[1];
  var isDownloadBegin = match$5[0];
  var match$6 = React.useState(function () {
        
      });
  var setCurrentImportingKey = match$6[1];
  var currentImportingKey = match$6[0];
  var match$7 = React.useState(function () {
        return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
      });
  var setSelectPublishPackage = match$7[1];
  var selectPublishPackage = match$7[0];
  var _groupAllPublishPackages = function (allPublishPackages) {
    return MarketUtils$Frontend.groupAllPublishItems([
                (function (param) {
                    return param.name;
                  }),
                (function (param) {
                    return param.version;
                  })
              ], allPublishPackages);
  };
  var _buildPackageFileName = function (packageName, packageVersion) {
    return "" + packageName + "_" + packageVersion + "";
  };
  var _onChange = function (page, pageSize) {
    Curry._1(setPage, (function (param) {
            return page;
          }));
  };
  React.useEffect((function () {
          var __x = service.backend.getAllPublishPackageInfos(MarketUtils$Frontend.getLimitCount(undefined), 0, packageEntryExtensionProtocolItem.name, packageEntryExtensionProtocolItem.version);
          var __x$1 = Most.observe((function (data) {
                  Curry._1(setAllPublishPackages, (function (param) {
                          return data;
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
            }, React.createElement(Antd.Layout.Content, {
                  children: isLoaded ? React.createElement(React.Fragment, undefined, React.createElement(Antd.List, {
                              itemLayout: "horizontal",
                              dataSource: MarketUtils$Frontend.getCurrentPage(_groupAllPublishPackages(allPublishPackages), page, MarketUtils$Frontend.getPageSize(undefined)),
                              renderItem: (function (items) {
                                  var firstItem = OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.getFirst(items));
                                  var item = OptionSt$Meta3dCommonlib.getWithDefault(ImmutableHashMap$Meta3dCommonlib.get(selectPublishPackage, firstItem.name), firstItem);
                                  return React.createElement(Antd.List.Item, {
                                              children: null
                                            }, React.createElement(Antd.List.Item.Meta, {
                                                  title: React.createElement(Antd.Typography.Title, {
                                                        level: 3,
                                                        children: item.name
                                                      }),
                                                  description: UIDescriptionUtils$Frontend.buildWithoutRepoLink(item.account, item.description),
                                                  key: item.name
                                                }), isDownloadBegin && OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.map(currentImportingKey, (function (currentImportingKey) {
                                                        return currentImportingKey === item.name;
                                                      })), false) ? React.createElement(Loading$Frontend.make, {
                                                    text: "" + downloadProgress.toString() + "% 下载中"
                                                  }) : null, SelectUtils$Frontend.buildSelectWithoutEmpty((function (version) {
                                                    Curry._1(setSelectPublishPackage, (function (value) {
                                                            return ImmutableHashMap$Meta3dCommonlib.set(value, item.name, OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.find(items, (function (item) {
                                                                                  return item.version === version;
                                                                                }))));
                                                          }));
                                                  }), item.version, ArraySt$Meta3dCommonlib.map(items, (function (item) {
                                                        return item.version;
                                                      }))), MarketUtils$Frontend.isSelect((function (param) {
                                                    return "" + param.version + "_" + param.name + "";
                                                  }), "" + item.version + "_" + item.name + "", selectedPackages) ? React.createElement(Antd.Button, {
                                                    onClick: (function (param) {
                                                        Curry._1(dispatch, {
                                                              RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                                              _1: {
                                                                TAG: /* NotSelectPackage */5,
                                                                _0: item.name,
                                                                _1: item.version
                                                              }
                                                            });
                                                      }),
                                                    children: "取消选择"
                                                  }) : React.createElement(Antd.Button, {
                                                    onClick: (function (param) {
                                                        Curry._1(setIsDownloadBegin, (function (param) {
                                                                return true;
                                                              }));
                                                        Curry._1(setCurrentImportingKey, (function (param) {
                                                                return item.name;
                                                              }));
                                                        var __x = service.backend.findPublishPackage((function (progress) {
                                                                Curry._1(setDownloadProgress, (function (param) {
                                                                        return progress;
                                                                      }));
                                                              }), MarketUtils$Frontend.getLimitCount(undefined), 0, item.account, item.name, item.version);
                                                        var __x$1 = Most.observe((function (file) {
                                                                Curry._1(setIsDownloadBegin, (function (param) {
                                                                        return false;
                                                                      }));
                                                                Curry._1(setCurrentImportingKey, (function (param) {
                                                                        
                                                                      }));
                                                                if (NullableSt$Meta3dCommonlib.isNullable(file)) {
                                                                  return MessageUtils$Frontend.error("找不到package file", undefined);
                                                                }
                                                                var value = item.entryExtensionProtocolConfigStr;
                                                                var tmp = value === "" ? undefined : value;
                                                                Curry._1(dispatch, {
                                                                      RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                                                      _1: {
                                                                        TAG: /* SelectPackage */4,
                                                                        _0: {
                                                                          id: item.id,
                                                                          protocol: {
                                                                            version: item.entryExtensionProtocolVersionRange,
                                                                            name: item.entryExtensionProtocolName,
                                                                            iconBase64: item.entryExtensionProtocolIconBase64
                                                                          },
                                                                          entryExtensionName: item.entryExtensionName,
                                                                          version: item.version,
                                                                          name: item.name,
                                                                          binaryFile: NullableSt$Meta3dCommonlib.getExn(file),
                                                                          isStart: false,
                                                                          protocolConfigStr: tmp
                                                                        }
                                                                      }
                                                                    });
                                                              }), __x);
                                                        Js_promise.$$catch((function (e) {
                                                                Curry._1(setIsDownloadBegin, (function (param) {
                                                                        return false;
                                                                      }));
                                                                Curry._1(setCurrentImportingKey, (function (param) {
                                                                        
                                                                      }));
                                                                return MessageUtils$Frontend.errorWithExn(e, undefined);
                                                              }), __x$1);
                                                      }),
                                                    children: "选择"
                                                  }), React.createElement(Antd.Button, {
                                                  onClick: (function (param) {
                                                      Curry._1(setIsDownloadBegin, (function (param) {
                                                              return true;
                                                            }));
                                                      Curry._1(setCurrentImportingKey, (function (param) {
                                                              return item.name;
                                                            }));
                                                      var __x = service.backend.findPublishPackage((function (progress) {
                                                              Curry._1(setDownloadProgress, (function (param) {
                                                                      return progress;
                                                                    }));
                                                            }), MarketUtils$Frontend.getLimitCount(undefined), 0, item.account, item.name, item.version);
                                                      var __x$1 = Most.observe((function (file) {
                                                              Curry._1(setIsDownloadBegin, (function (param) {
                                                                      return false;
                                                                    }));
                                                              Curry._1(setCurrentImportingKey, (function (param) {
                                                                      
                                                                    }));
                                                              if (NullableSt$Meta3dCommonlib.isNullable(file)) {
                                                                return MessageUtils$Frontend.error("找不到package file", undefined);
                                                              } else {
                                                                return DownloadUtils$Meta3dFileUtils.createAndDownloadBlobFile(NullableSt$Meta3dCommonlib.getExn(file), _buildPackageFileName(item.name, item.version), "package");
                                                              }
                                                            }), __x);
                                                      Js_promise.$$catch((function (e) {
                                                              Curry._1(setIsDownloadBegin, (function (param) {
                                                                      return false;
                                                                    }));
                                                              Curry._1(setCurrentImportingKey, (function (param) {
                                                                      
                                                                    }));
                                                              return MessageUtils$Frontend.errorWithExn(e, undefined);
                                                            }), __x$1);
                                                    }),
                                                  children: "下载"
                                                }), MarketUtils$Frontend.isSelect((function (id) {
                                                    return id;
                                                  }), item.id, importedPackageIds) ? React.createElement(Antd.Button, {
                                                    disabled: true,
                                                    children: "已导入"
                                                  }) : React.createElement(Antd.Button, {
                                                    onClick: (function (param) {
                                                        Curry._1(setIsDownloadBegin, (function (param) {
                                                                return true;
                                                              }));
                                                        Curry._1(setCurrentImportingKey, (function (param) {
                                                                return item.name;
                                                              }));
                                                        var __x = service.backend.findPublishPackage((function (progress) {
                                                                Curry._1(setDownloadProgress, (function (param) {
                                                                        return progress;
                                                                      }));
                                                              }), MarketUtils$Frontend.getLimitCount(undefined), 0, item.account, item.name, item.version);
                                                        var __x$1 = Most.flatMap((function (file) {
                                                                Curry._1(setIsDownloadBegin, (function (param) {
                                                                        return false;
                                                                      }));
                                                                Curry._1(setCurrentImportingKey, (function (param) {
                                                                        
                                                                      }));
                                                                if (NullableSt$Meta3dCommonlib.isNullable(file)) {
                                                                  MessageUtils$Frontend.error("找不到package file", undefined);
                                                                  return Most.empty();
                                                                } else {
                                                                  return Most.just(Main$Meta3d.getAllDataOfPackage(NullableSt$Meta3dCommonlib.getExn(file)));
                                                                }
                                                              }), __x);
                                                        var __x$2 = ImportUtils$Frontend.importPackage([
                                                              service,
                                                              [
                                                                (function (param) {
                                                                    Curry._1(setIsDownloadBegin, (function (param) {
                                                                            return false;
                                                                          }));
                                                                    Curry._1(setCurrentImportingKey, (function (param) {
                                                                            
                                                                          }));
                                                                  }),
                                                                (function (selectedExtensions, selectedContributes, selectedPackages) {
                                                                    Curry._1(dispatch, {
                                                                          RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                                                          _1: {
                                                                            TAG: /* ImportPackage */10,
                                                                            _0: item.id,
                                                                            _1: selectedExtensions,
                                                                            _2: selectedContributes,
                                                                            _3: selectedPackages
                                                                          }
                                                                        });
                                                                  })
                                                              ]
                                                            ], __x$1);
                                                        Js_promise.then_((function (param) {
                                                                Curry._1(dispatch, {
                                                                      RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                                                      _1: {
                                                                        TAG: /* SetCurrentAppName */16,
                                                                        _0: ""
                                                                      }
                                                                    });
                                                                RescriptReactRouter.push("/AssembleSpace");
                                                                return Promise.resolve(undefined);
                                                              }), __x$2);
                                                      }),
                                                    children: "导入"
                                                  }));
                                })
                            })) : React.createElement(Loading$Frontend.make, {
                          text: "加载中，请稍候"
                        })
                }), React.createElement(Antd.Layout.Footer, {
                  children: isLoaded ? React.createElement(Antd.Pagination, {
                          current: page,
                          defaultPageSize: MarketUtils$Frontend.getPageSize(undefined),
                          total: ArraySt$Meta3dCommonlib.length(_groupAllPublishPackages(allPublishPackages)),
                          showSizeChanger: false,
                          onChange: _onChange
                        }) : null
                }));
}

var make = PackageMarketThird;

export {
  make ,
}
/*  Not a pure module */
