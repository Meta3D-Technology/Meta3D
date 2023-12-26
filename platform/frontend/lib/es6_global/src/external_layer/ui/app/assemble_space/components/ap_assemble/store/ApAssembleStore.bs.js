

import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as IdUtils$Frontend from "../../../../utils/utils/IdUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function _createState(param) {
  return {
          selectedPackages: /* [] */0,
          selectedExtensions: /* [] */0,
          selectedContributes: /* [] */0,
          inspectorCurrentExtensionId: undefined,
          inspectorCurrentContributeId: undefined,
          inspectorCurrentPackageId: undefined,
          isShowApInspector: false,
          apInspectorData: {
            isDebug: true,
            clearColor: [
              1,
              1,
              1,
              1
            ],
            skinName: undefined
          },
          isPassDependencyGraphCheck: false,
          storedPackageIdsInApp: /* [] */0,
          isChangeSelectedPackagesByDebug: false
        };
}

function _setApIControlInspectorData(state, setFunc) {
  return {
          selectedPackages: state.selectedPackages,
          selectedExtensions: state.selectedExtensions,
          selectedContributes: state.selectedContributes,
          inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
          inspectorCurrentContributeId: state.inspectorCurrentContributeId,
          inspectorCurrentPackageId: state.inspectorCurrentPackageId,
          isShowApInspector: state.isShowApInspector,
          apInspectorData: Curry._1(setFunc, state.apInspectorData),
          isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
          storedPackageIdsInApp: state.storedPackageIdsInApp,
          isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
        };
}

function _resetInspector(state) {
  return {
          selectedPackages: state.selectedPackages,
          selectedExtensions: state.selectedExtensions,
          selectedContributes: state.selectedContributes,
          inspectorCurrentExtensionId: undefined,
          inspectorCurrentContributeId: undefined,
          inspectorCurrentPackageId: undefined,
          isShowApInspector: false,
          apInspectorData: state.apInspectorData,
          isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
          storedPackageIdsInApp: state.storedPackageIdsInApp,
          isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
        };
}

function _reset(state) {
  var init = _createState(undefined);
  return {
          selectedPackages: init.selectedPackages,
          selectedExtensions: init.selectedExtensions,
          selectedContributes: init.selectedContributes,
          inspectorCurrentExtensionId: init.inspectorCurrentExtensionId,
          inspectorCurrentContributeId: init.inspectorCurrentContributeId,
          inspectorCurrentPackageId: init.inspectorCurrentPackageId,
          isShowApInspector: init.isShowApInspector,
          apInspectorData: state.apInspectorData,
          isPassDependencyGraphCheck: init.isPassDependencyGraphCheck,
          storedPackageIdsInApp: state.storedPackageIdsInApp,
          isChangeSelectedPackagesByDebug: false
        };
}

function _unstartAllSelectedPackages(selectedPackages) {
  return ListSt$Meta3dCommonlib.map(selectedPackages, (function ($$package) {
                return {
                        id: $$package.id,
                        protocol: $$package.protocol,
                        entryExtensionName: $$package.entryExtensionName,
                        version: $$package.version,
                        name: $$package.name,
                        binaryFile: $$package.binaryFile,
                        isStart: false,
                        protocolConfigStr: $$package.protocolConfigStr
                      };
              }));
}

function _unstartAllSelectedExtensions(selectedExtensions) {
  return ListSt$Meta3dCommonlib.map(selectedExtensions, (function (extension) {
                return {
                        id: extension.id,
                        protocolIconBase64: extension.protocolIconBase64,
                        protocolConfigStr: extension.protocolConfigStr,
                        isStart: false,
                        version: extension.version,
                        data: extension.data
                      };
              }));
}

function reducer(state, action) {
  if (typeof action === "number") {
    switch (action) {
      case /* ResetWhenEnter */0 :
          return _reset(state);
      case /* ResetWhenSwitch */1 :
          return _resetInspector(state);
      case /* ShowApInspector */2 :
          var state$1 = _resetInspector(state);
          return {
                  selectedPackages: state$1.selectedPackages,
                  selectedExtensions: state$1.selectedExtensions,
                  selectedContributes: state$1.selectedContributes,
                  inspectorCurrentExtensionId: state$1.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state$1.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state$1.inspectorCurrentPackageId,
                  isShowApInspector: true,
                  apInspectorData: state$1.apInspectorData,
                  isPassDependencyGraphCheck: state$1.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state$1.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state$1.isChangeSelectedPackagesByDebug
                };
      
    }
  } else {
    switch (action.TAG | 0) {
      case /* SelectPackage */0 :
          return {
                  selectedPackages: ListSt$Meta3dCommonlib.push(state.selectedPackages, action._0),
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* SelectExtension */1 :
          var extension = action._2;
          return {
                  selectedPackages: state.selectedPackages,
                  selectedExtensions: ListSt$Meta3dCommonlib.push(state.selectedExtensions, {
                        id: IdUtils$Frontend.generateId(function (prim) {
                              return Math.random();
                            }),
                        protocolIconBase64: action._0,
                        protocolConfigStr: action._1,
                        isStart: false,
                        version: extension.version,
                        data: extension.data
                      }),
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: false,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* SetInspectorCurrentExtensionId */2 :
          var state$2 = _resetInspector(state);
          return {
                  selectedPackages: state$2.selectedPackages,
                  selectedExtensions: state$2.selectedExtensions,
                  selectedContributes: state$2.selectedContributes,
                  inspectorCurrentExtensionId: action._0,
                  inspectorCurrentContributeId: state$2.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state$2.inspectorCurrentPackageId,
                  isShowApInspector: state$2.isShowApInspector,
                  apInspectorData: state$2.apInspectorData,
                  isPassDependencyGraphCheck: state$2.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state$2.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state$2.isChangeSelectedPackagesByDebug
                };
      case /* StartPackage */3 :
          var id = action._0;
          return {
                  selectedPackages: ListSt$Meta3dCommonlib.map(_unstartAllSelectedPackages(state.selectedPackages), (function ($$package) {
                          if ($$package.id === id) {
                            return {
                                    id: $$package.id,
                                    protocol: $$package.protocol,
                                    entryExtensionName: $$package.entryExtensionName,
                                    version: $$package.version,
                                    name: $$package.name,
                                    binaryFile: $$package.binaryFile,
                                    isStart: true,
                                    protocolConfigStr: $$package.protocolConfigStr
                                  };
                          } else {
                            return $$package;
                          }
                        })),
                  selectedExtensions: _unstartAllSelectedExtensions(state.selectedExtensions),
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* UnStartPackage */4 :
          return {
                  selectedPackages: _unstartAllSelectedPackages(state.selectedPackages),
                  selectedExtensions: _unstartAllSelectedExtensions(state.selectedExtensions),
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* StartExtension */5 :
          var id$1 = action._0;
          return {
                  selectedPackages: state.selectedPackages,
                  selectedExtensions: ListSt$Meta3dCommonlib.map(_unstartAllSelectedExtensions(state.selectedExtensions), (function (extension) {
                          if (extension.id === id$1) {
                            return {
                                    id: extension.id,
                                    protocolIconBase64: extension.protocolIconBase64,
                                    protocolConfigStr: extension.protocolConfigStr,
                                    isStart: true,
                                    version: extension.version,
                                    data: extension.data
                                  };
                          } else {
                            return extension;
                          }
                        })),
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* UnStartExtension */6 :
          return {
                  selectedPackages: state.selectedPackages,
                  selectedExtensions: _unstartAllSelectedExtensions(state.selectedExtensions),
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* SelectContribute */7 :
          var contribute = action._2;
          return {
                  selectedPackages: state.selectedPackages,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: ListSt$Meta3dCommonlib.push(state.selectedContributes, {
                        id: IdUtils$Frontend.generateId(function (prim) {
                              return Math.random();
                            }),
                        protocolIconBase64: action._0,
                        protocolConfigStr: action._1,
                        version: contribute.version,
                        data: contribute.data
                      }),
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: false,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* SetInspectorCurrentContributeId */8 :
          var state$3 = _resetInspector(state);
          return {
                  selectedPackages: state$3.selectedPackages,
                  selectedExtensions: state$3.selectedExtensions,
                  selectedContributes: state$3.selectedContributes,
                  inspectorCurrentExtensionId: state$3.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: action._0,
                  inspectorCurrentPackageId: state$3.inspectorCurrentPackageId,
                  isShowApInspector: state$3.isShowApInspector,
                  apInspectorData: state$3.apInspectorData,
                  isPassDependencyGraphCheck: state$3.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state$3.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state$3.isChangeSelectedPackagesByDebug
                };
      case /* SetInspectorCurrentPackageId */9 :
          var state$4 = _resetInspector(state);
          return {
                  selectedPackages: state$4.selectedPackages,
                  selectedExtensions: state$4.selectedExtensions,
                  selectedContributes: state$4.selectedContributes,
                  inspectorCurrentExtensionId: state$4.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state$4.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: action._0,
                  isShowApInspector: state$4.isShowApInspector,
                  apInspectorData: state$4.apInspectorData,
                  isPassDependencyGraphCheck: state$4.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state$4.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state$4.isChangeSelectedPackagesByDebug
                };
      case /* SetIsDebug */10 :
          var isDebug = action._0;
          return _setApIControlInspectorData(state, (function (apInspectorData) {
                        return {
                                isDebug: isDebug,
                                clearColor: apInspectorData.clearColor,
                                skinName: apInspectorData.skinName
                              };
                      }));
      case /* SetClearColor */11 :
          var clearColor = action._0;
          return _setApIControlInspectorData(state, (function (apInspectorData) {
                        return {
                                isDebug: apInspectorData.isDebug,
                                clearColor: clearColor,
                                skinName: apInspectorData.skinName
                              };
                      }));
      case /* SetSkinName */12 :
          var skinName = action._0;
          return _setApIControlInspectorData(state, (function (apInspectorData) {
                        return {
                                isDebug: apInspectorData.isDebug,
                                clearColor: apInspectorData.clearColor,
                                skinName: skinName
                              };
                      }));
      case /* SetApInspectorData */13 :
          var apInspectorDataFromFile = action._0;
          return _setApIControlInspectorData(state, (function (apInspectorDaapInspectorDataFromFileta) {
                        return {
                                isDebug: apInspectorDataFromFile.isDebug,
                                clearColor: apInspectorDataFromFile.clearColor,
                                skinName: OptionSt$Meta3dCommonlib.fromNullable(apInspectorDataFromFile.skinName)
                              };
                      }));
      case /* UpdateSelectedExtension */14 :
          var extensionFuncData = action._1;
          var id$2 = action._0;
          return {
                  selectedPackages: state.selectedPackages,
                  selectedExtensions: ListSt$Meta3dCommonlib.map(state.selectedExtensions, (function (extension) {
                          if (extension.id !== id$2) {
                            return extension;
                          }
                          var init = extension.data;
                          return {
                                  id: extension.id,
                                  protocolIconBase64: extension.protocolIconBase64,
                                  protocolConfigStr: extension.protocolConfigStr,
                                  isStart: extension.isStart,
                                  version: extension.version,
                                  data: {
                                    extensionPackageData: init.extensionPackageData,
                                    extensionFuncData: extensionFuncData
                                  }
                                };
                        })),
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* UpdateSelectedContribute */15 :
          var contributeFuncData = action._1;
          var id$3 = action._0;
          return {
                  selectedPackages: state.selectedPackages,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: ListSt$Meta3dCommonlib.map(state.selectedContributes, (function (contribute) {
                          if (contribute.id !== id$3) {
                            return contribute;
                          }
                          var init = contribute.data;
                          return {
                                  id: contribute.id,
                                  protocolIconBase64: contribute.protocolIconBase64,
                                  protocolConfigStr: contribute.protocolConfigStr,
                                  version: contribute.version,
                                  data: {
                                    contributePackageData: init.contributePackageData,
                                    contributeFuncData: contributeFuncData
                                  }
                                };
                        })),
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* UpdateSelectedPackage */16 :
          var packageBinaryFile = action._1;
          var id$4 = action._0;
          return {
                  selectedPackages: ListSt$Meta3dCommonlib.map(state.selectedPackages, (function ($$package) {
                          if ($$package.id === id$4) {
                            return {
                                    id: $$package.id,
                                    protocol: $$package.protocol,
                                    entryExtensionName: $$package.entryExtensionName,
                                    version: $$package.version,
                                    name: $$package.name,
                                    binaryFile: packageBinaryFile,
                                    isStart: $$package.isStart,
                                    protocolConfigStr: $$package.protocolConfigStr
                                  };
                          } else {
                            return $$package;
                          }
                        })),
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: true
                };
      case /* MarkIsPassDependencyGraphCheck */17 :
          return {
                  selectedPackages: state.selectedPackages,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: action._0,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* UpdateSelectedPackagesAndExtensionsAndContributes */18 :
          return {
                  selectedPackages: action._0,
                  selectedExtensions: action._1,
                  selectedContributes: action._2,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: false
                };
      case /* StorePackageInApp */19 :
          return {
                  selectedPackages: state.selectedPackages,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: ListSt$Meta3dCommonlib.push(state.storedPackageIdsInApp, action._0),
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* UnStorePackageInApp */20 :
          return {
                  selectedPackages: state.selectedPackages,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: ListSt$Meta3dCommonlib.remove(state.storedPackageIdsInApp, action._0),
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* BatchStorePackagesInApp */21 :
          return {
                  selectedPackages: state.selectedPackages,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: ListSt$Meta3dCommonlib.concat(state.storedPackageIdsInApp, action._0),
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      case /* SetContributesAndPackages */22 :
          return {
                  selectedPackages: action._1,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: action._0,
                  inspectorCurrentExtensionId: state.inspectorCurrentExtensionId,
                  inspectorCurrentContributeId: state.inspectorCurrentContributeId,
                  inspectorCurrentPackageId: state.inspectorCurrentPackageId,
                  isShowApInspector: state.isShowApInspector,
                  apInspectorData: state.apInspectorData,
                  isPassDependencyGraphCheck: state.isPassDependencyGraphCheck,
                  storedPackageIdsInApp: state.storedPackageIdsInApp,
                  isChangeSelectedPackagesByDebug: state.isChangeSelectedPackagesByDebug
                };
      
    }
  }
}

var initialState = _createState(undefined);

export {
  _createState ,
  _setApIControlInspectorData ,
  _resetInspector ,
  _reset ,
  _unstartAllSelectedPackages ,
  _unstartAllSelectedExtensions ,
  reducer ,
  initialState ,
}
/* initialState Not a pure module */
