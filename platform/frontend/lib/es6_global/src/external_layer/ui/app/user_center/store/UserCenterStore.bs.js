

import * as LoginUtils$Frontend from "../../utils/LoginUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ContributeTypeUtils$Frontend from "../../utils/utils/ContributeTypeUtils.bs.js";
import * as SelectedElementContributeUtils$Frontend from "../../utils/SelectedElementContributeUtils.bs.js";

function _removeOtherSelectedExtensionsOfSameProtocolName(selectedExtensions, data) {
  var protocolName = data.protocolName;
  return ListSt$Meta3dCommonlib.filter(selectedExtensions, (function (param) {
                return param[0].protocolName !== protocolName;
              }));
}

function _removeOtherSelectedContributesOfSameProtocolNameExceptInput(selectedContributes, data) {
  var protocolName = data.protocolName;
  var name = data.data.contributePackageData.name;
  if (ContributeTypeUtils$Frontend.isInput(protocolName)) {
    return ListSt$Meta3dCommonlib.filter(selectedContributes, (function (param) {
                  return param[0].data.contributePackageData.name !== name;
                }));
  } else {
    return ListSt$Meta3dCommonlib.filter(selectedContributes, (function (param) {
                  return param[0].protocolName !== protocolName;
                }));
  }
}

function _removeOtherSelectedContributesOfSameProtocolName(selectedContributes, data) {
  var protocolName = data.protocolName;
  return ListSt$Meta3dCommonlib.filter(selectedContributes, (function (param) {
                return param[0].protocolName !== protocolName;
              }));
}

function _removeOtherSelectedPackagesOfSameProtocolName(selectedPackages, data) {
  var protocolName = data.protocol.name;
  return ListSt$Meta3dCommonlib.filter(selectedPackages, (function (selectedPackage) {
                return selectedPackage.protocol.name !== protocolName;
              }));
}

function _removeOtherSelectedElementOfSameName(selectedElements, elementAssembleData) {
  var elementName = elementAssembleData.elementName;
  return ListSt$Meta3dCommonlib.filter(selectedElements, (function (selectedElement) {
                return selectedElement.elementName !== elementName;
              }));
}

function _createState(param) {
  return {
          account: LoginUtils$Frontend.readAccount(undefined),
          release: undefined,
          selectedExtensions: /* [] */0,
          selectedContributes: /* [] */0,
          selectedPackages: /* [] */0,
          selectedElements: /* [] */0,
          importedPackageIds: /* [] */0,
          currentAppName: undefined,
          notUseCacheForFindApp: false,
          isInCreateFromScratchTourPhase1: false,
          isInCreateFromScratchTourPhase3: false
        };
}

function reducer(state, action) {
  if (typeof action === "number") {
    switch (action) {
      case /* LogOut */0 :
          return {
                  account: undefined,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* RemoveElement */1 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: SelectedElementContributeUtils$Frontend.removeElementContribute(state.selectedContributes),
                  selectedPackages: state.selectedPackages,
                  selectedElements: /* [] */0,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* StartCreateFromScratchTourPhase1 */2 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: true,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* EndCreateFromScratchTourPhase1 */3 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: false,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* StartCreateFromScratchTourPhase3 */4 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: true
                };
      case /* EndCreateFromScratchTourPhase3 */5 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: false
                };
      case /* MarkNotUseCacheForFindApp */6 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: true,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* MarkUseCacheForFindApp */7 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: false,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      
    }
  } else {
    switch (action.TAG | 0) {
      case /* SelectExtension */0 :
          var data = action._0;
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: ListSt$Meta3dCommonlib.push(_removeOtherSelectedExtensionsOfSameProtocolName(state.selectedExtensions, data), [
                        data,
                        action._1
                      ]),
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* NotSelectExtension */1 :
          var version = action._1;
          var name = action._0;
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: ListSt$Meta3dCommonlib.filter(state.selectedExtensions, (function (param) {
                          var selectedExtension = param[0];
                          return !(selectedExtension.data.extensionPackageData.name === name && selectedExtension.version === version);
                        })),
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* SelectContribute */2 :
          var data$1 = action._0;
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: ListSt$Meta3dCommonlib.push(_removeOtherSelectedContributesOfSameProtocolNameExceptInput(state.selectedContributes, data$1), [
                        data$1,
                        action._1
                      ]),
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* NotSelectContribute */3 :
          var version$1 = action._1;
          var name$1 = action._0;
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: ListSt$Meta3dCommonlib.filter(state.selectedContributes, (function (param) {
                          var selectedContribute = param[0];
                          return !(selectedContribute.data.contributePackageData.name === name$1 && selectedContribute.version === version$1);
                        })),
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* SelectPackage */4 :
          var data$2 = action._0;
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: ListSt$Meta3dCommonlib.push(_removeOtherSelectedPackagesOfSameProtocolName(state.selectedPackages, data$2), data$2),
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* NotSelectPackage */5 :
          var version$2 = action._1;
          var name$2 = action._0;
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: ListSt$Meta3dCommonlib.filter(state.selectedPackages, (function (selectedPackage) {
                          return !(selectedPackage.name === name$2 && selectedPackage.version === version$2);
                        })),
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* SelectElement */6 :
          var elementAssembleData = action._0;
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: ListSt$Meta3dCommonlib.push(_removeOtherSelectedElementOfSameName(state.selectedElements, elementAssembleData), elementAssembleData),
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* NotSelectElement */7 :
          var version$3 = action._1;
          var name$3 = action._0;
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: ListSt$Meta3dCommonlib.filter(state.selectedElements, (function (elementAssembleData) {
                          return !(elementAssembleData.elementName === name$3 && elementAssembleData.elementVersion === version$3);
                        })),
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* SelectAllElements */8 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: action._0,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* SetAccount */9 :
          return {
                  account: action._0,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* ImportPackage */10 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: ListSt$Meta3dCommonlib.reduce(action._1, state.selectedExtensions, (function (result, selectedExtension) {
                          return ListSt$Meta3dCommonlib.push(_removeOtherSelectedExtensionsOfSameProtocolName(result, selectedExtension[0]), selectedExtension);
                        })),
                  selectedContributes: ListSt$Meta3dCommonlib.reduce(action._2, state.selectedContributes, (function (result, selectedContribute) {
                          return ListSt$Meta3dCommonlib.push(_removeOtherSelectedContributesOfSameProtocolNameExceptInput(result, selectedContribute[0]), selectedContribute);
                        })),
                  selectedPackages: ListSt$Meta3dCommonlib.reduce(action._3, state.selectedPackages, (function (result, packageData) {
                          return ListSt$Meta3dCommonlib.push(_removeOtherSelectedPackagesOfSameProtocolName(result, packageData), packageData);
                        })),
                  selectedElements: state.selectedElements,
                  importedPackageIds: ListSt$Meta3dCommonlib.push(state.importedPackageIds, action._0),
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* ImportApp */11 :
          var state_account = state.account;
          var state_release = state.release;
          var state_selectedExtensions = state.selectedExtensions;
          var state_selectedContributes = SelectedElementContributeUtils$Frontend.removeElementContribute(state.selectedContributes);
          var state_selectedPackages = state.selectedPackages;
          var state_selectedElements = state.selectedElements;
          var state_importedPackageIds = state.importedPackageIds;
          var state_currentAppName = state.currentAppName;
          var state_notUseCacheForFindApp = state.notUseCacheForFindApp;
          var state_isInCreateFromScratchTourPhase1 = state.isInCreateFromScratchTourPhase1;
          var state_isInCreateFromScratchTourPhase3 = state.isInCreateFromScratchTourPhase3;
          return {
                  account: state_account,
                  release: state_release,
                  selectedExtensions: ListSt$Meta3dCommonlib.reduce(action._2, state_selectedExtensions, (function (result, selectedExtension) {
                          return ListSt$Meta3dCommonlib.push(_removeOtherSelectedExtensionsOfSameProtocolName(result, selectedExtension[0]), selectedExtension);
                        })),
                  selectedContributes: ListSt$Meta3dCommonlib.reduce(action._3, state_selectedContributes, (function (result, selectedContribute) {
                          return ListSt$Meta3dCommonlib.push(_removeOtherSelectedContributesOfSameProtocolNameExceptInput(result, selectedContribute[0]), selectedContribute);
                        })),
                  selectedPackages: ListSt$Meta3dCommonlib.reduce(action._4, state_selectedPackages, (function (result, packageData) {
                          return ListSt$Meta3dCommonlib.push(_removeOtherSelectedPackagesOfSameProtocolName(result, packageData), packageData);
                        })),
                  selectedElements: state_selectedElements,
                  importedPackageIds: state_importedPackageIds,
                  currentAppName: action._1,
                  notUseCacheForFindApp: state_notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state_isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state_isInCreateFromScratchTourPhase3
                };
      case /* UpdateSelectedPackagesAndExtensionsAndContributes */12 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: action._1,
                  selectedContributes: action._2,
                  selectedPackages: action._0,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* SetContributes */13 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: action._0,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* SelectAllUIControls */14 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: ListSt$Meta3dCommonlib.reduce(action._0, state.selectedContributes, (function (result, uiControl) {
                          return ListSt$Meta3dCommonlib.push(_removeOtherSelectedContributesOfSameProtocolName(result, uiControl[0]), uiControl);
                        })),
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* SetPackages */15 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: action._0,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* SetCurrentAppName */16 :
          return {
                  account: state.account,
                  release: state.release,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: action._0,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      case /* SetRelease */17 :
          return {
                  account: state.account,
                  release: action._0,
                  selectedExtensions: state.selectedExtensions,
                  selectedContributes: state.selectedContributes,
                  selectedPackages: state.selectedPackages,
                  selectedElements: state.selectedElements,
                  importedPackageIds: state.importedPackageIds,
                  currentAppName: state.currentAppName,
                  notUseCacheForFindApp: state.notUseCacheForFindApp,
                  isInCreateFromScratchTourPhase1: state.isInCreateFromScratchTourPhase1,
                  isInCreateFromScratchTourPhase3: state.isInCreateFromScratchTourPhase3
                };
      
    }
  }
}

var initialState = _createState(undefined);

export {
  _removeOtherSelectedExtensionsOfSameProtocolName ,
  _removeOtherSelectedContributesOfSameProtocolNameExceptInput ,
  _removeOtherSelectedContributesOfSameProtocolName ,
  _removeOtherSelectedPackagesOfSameProtocolName ,
  _removeOtherSelectedElementOfSameName ,
  _createState ,
  reducer ,
  initialState ,
}
/* initialState Not a pure module */
