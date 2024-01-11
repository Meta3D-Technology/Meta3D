// // type id = string

// type extension = AssembleSpaceCommonType.extension

// type selectedExtensions = list<AssembleSpaceCommonType.extensionData>

// type contribute = AssembleSpaceCommonType.contribute

// type selectedContributes = list<AssembleSpaceCommonType.contributeData>

// type packageData = AssembleSpaceCommonType.packageData

// type selectedPackages = list<packageData>

// // type selectedContributeProtocolConfigs = list<
// //   option<CommonType.protocolConfig>,
// // >

// type account = string

// type name = string

// type action =
//   | SelectExtension(extension, option<CommonType.protocolConfig>)
//   | NotSelectExtension(name, AssembleSpaceCommonType.version)
//   | SelectContribute(contribute, option<CommonType.protocolConfig>)
//   | NotSelectContribute(name, AssembleSpaceCommonType.version)
//   | SelectPackage(packageData)
//   // | NotSelectPackage(id)
//   | NotSelectPackage(name, AssembleSpaceCommonType.version)
//   | SetAccount(account)
//   | ImportPackage(id, selectedExtensions, selectedContributes)
//   | ImportApp(id, selectedExtensions, selectedContributes, selectedPackages)
//   | UpdateSelectedPackagesAndExtensionsAndContributes(selectedPackages)

// type state = {
//   account: option<string>,
//   selectedExtensions: selectedExtensions,
//   selectedContributes: selectedContributes,
//   selectedPackages: selectedPackages,
//   importedPackageIds: list<id>,
//   importedAppIds: list<id>,
// }

open UserCenterStoreType

let _removeOtherSelectedExtensionsOfSameProtocolName = (
  selectedExtensions: selectedExtensions,
  data: extension,
) => {
  let protocolName = data.protocolName

  selectedExtensions->Meta3dCommonlib.ListSt.filter(((selectedExtension, _)) => {
    selectedExtension.protocolName !== protocolName
  })
}

let _removeOtherSelectedContributesOfSameProtocolNameExceptInput = (
  selectedContributes: selectedContributes,
  data: contribute,
) => {
  let protocolName = data.protocolName
  let name = data.data.contributePackageData.name

  ContributeTypeUtils.isInput(protocolName)
    ? selectedContributes->Meta3dCommonlib.ListSt.filter(((selectedContribute, _)) => {
        selectedContribute.data.contributePackageData.name !== name
      })
    : selectedContributes->Meta3dCommonlib.ListSt.filter(((selectedContribute, _)) => {
        selectedContribute.protocolName !== protocolName
      })
}

let _removeOtherSelectedContributesOfSameProtocolName = (
  selectedContributes: selectedContributes,
  data: contribute,
) => {
  let protocolName = data.protocolName

  selectedContributes->Meta3dCommonlib.ListSt.filter(((selectedContribute, _)) => {
    selectedContribute.protocolName !== protocolName
  })
}

let _removeOtherSelectedPackagesOfSameProtocolName = (
  selectedPackages: selectedPackages,
  data: packageData,
) => {
  let protocolName = data.protocol.name

  selectedPackages->Meta3dCommonlib.ListSt.filter(selectedPackage => {
    selectedPackage.protocol.name !== protocolName
  })
}

let _removeOtherSelectedElementOfSameName = (
  selectedElements: selectedElements,
  elementAssembleData: BackendCloudbaseType.elementAssembleData,
) => {
  let elementName = elementAssembleData.elementName

  selectedElements->Meta3dCommonlib.ListSt.filter(selectedElement => {
    selectedElement.elementName !== elementName
  })
}

let _createState = () => {
  account: Meta3dUserUtils.Main.readAccount()->Meta3dCommonlib.OptionSt.fromNullable,
  release: None,
  selectedExtensions: list{},
  selectedContributes: list{},
  selectedPackages: list{},
  selectedElements: list{},
  importedPackageIds: list{},
  // importedAppIds: list{},
  currentAppName: None,
  notUseCacheForFindApp: false,
  // notUseCacheForFindFinalApp:false,
  isInCreateFromScratchTourPhase1: false,
  // isJumpToCreateFromScratchTourPhase1Guide: false,
  isInCreateFromScratchTourPhase3: false,
}

// let _reset = state => {
//   {
//     ..._createState(),
//     account: state.account,
//   }
// }

let reducer = (state, action) => {
  switch action {
  | SelectExtension(data, protocolConfigOpt) => {
      ...state,
      selectedExtensions: state.selectedExtensions
      ->_removeOtherSelectedExtensionsOfSameProtocolName(data)
      ->Meta3dCommonlib.ListSt.push((data, protocolConfigOpt)),
    }
  | NotSelectExtension(name, version) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.filter(((
        selectedExtension,
        _,
      )) =>
        !(
          selectedExtension.data.extensionPackageData.name == name &&
            selectedExtension.version == version
        )
      ),
    }
  | SelectContribute(data, protocolConfigOpt) => {
      ...state,
      selectedContributes: state.selectedContributes
      ->_removeOtherSelectedContributesOfSameProtocolNameExceptInput(data)
      ->Meta3dCommonlib.ListSt.push((data, protocolConfigOpt)),
      // selectedContributeProtocolConfigs: state.selectedContributeProtocolConfigs->Meta3dCommonlib.ListSt.push(
      //   protocolConfigOpt,
      // ),
    }
  | NotSelectContribute(name, version) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.filter(((
        selectedContribute,
        _,
      )) =>
        !(
          selectedContribute.data.contributePackageData.name == name &&
            selectedContribute.version == version
        )
      ),
    }
  | SelectPackage(data) => {
      ...state,
      selectedPackages: state.selectedPackages
      ->_removeOtherSelectedPackagesOfSameProtocolName(data)
      ->Meta3dCommonlib.ListSt.push(data),
    }
  // | NotSelectPackage(id) => {
  //     ...state,
  //     selectedPackages: state.selectedPackages->Meta3dCommonlib.ListSt.filter(selectedPackage =>
  //       selectedPackage.id !== id
  //     ),
  //   }
  | NotSelectPackage(name, version) => {
      ...state,
      selectedPackages: state.selectedPackages->Meta3dCommonlib.ListSt.filter(selectedPackage =>
        !(selectedPackage.name == name && selectedPackage.version == version)
      ),
    }
  | SelectElement(elementAssembleData) => {
      ...state,
      selectedElements: state.selectedElements
      ->_removeOtherSelectedElementOfSameName(elementAssembleData)
      ->Meta3dCommonlib.ListSt.push(elementAssembleData),
    }
  | NotSelectElement(name, version) => {
      ...state,
      selectedElements: state.selectedElements->Meta3dCommonlib.ListSt.filter(elementAssembleData =>
        !(elementAssembleData.elementName == name && elementAssembleData.elementVersion == version)
      ),
    }
  | SelectAllElements(elements) => {
      ...state,
      selectedElements: elements,
    }
  // | SetCustomData(customInputs, customActions) => {
  //     ...state,
  //     customInputs,
  //     customActions,
  //   }
  | ImportPackage(packageId, selectedExtensions, selectedContributes, selectedPackages) => {
      ...state,
      importedPackageIds: state.importedPackageIds->Meta3dCommonlib.ListSt.push(packageId),
      selectedExtensions: selectedExtensions->Meta3dCommonlib.ListSt.reduce(
        state.selectedExtensions,
        (result, (data, protocolConfigOpt) as selectedExtension) => {
          result
          ->_removeOtherSelectedExtensionsOfSameProtocolName(data)
          ->Meta3dCommonlib.ListSt.push(selectedExtension)
        },
      ),
      selectedContributes: selectedContributes->Meta3dCommonlib.ListSt.reduce(
        state.selectedContributes,
        (result, (data, protocolConfigOpt) as selectedContribute) => {
          result
          ->_removeOtherSelectedContributesOfSameProtocolNameExceptInput(data)
          ->Meta3dCommonlib.ListSt.push(selectedContribute)
        },
      ),
      selectedPackages: selectedPackages->Meta3dCommonlib.ListSt.reduce(state.selectedPackages, (
        result,
        packageData,
      ) => {
        result
        ->_removeOtherSelectedPackagesOfSameProtocolName(packageData)
        ->Meta3dCommonlib.ListSt.push(packageData)
      }),
    }
  | ImportApp(appId, appName, selectedExtensions, selectedContributes, selectedPackages) => {
      let state = {
        ...state,
        selectedContributes: state.selectedContributes->SelectedElementContributeUtils.removeElementContribute,
      }

      {
        ...state,
        currentAppName: appName->Some,
        // importedAppIds: state.importedAppIds->Meta3dCommonlib.ListSt.push(appId),
        selectedExtensions: selectedExtensions->Meta3dCommonlib.ListSt.reduce(
          state.selectedExtensions,
          (result, (data, protocolConfigOpt) as selectedExtension) => {
            result
            ->_removeOtherSelectedExtensionsOfSameProtocolName(data)
            ->Meta3dCommonlib.ListSt.push(selectedExtension)
          },
        ),
        selectedContributes: selectedContributes->Meta3dCommonlib.ListSt.reduce(
          state.selectedContributes,
          (result, (data, protocolConfigOpt) as selectedContribute) => {
            result
            ->_removeOtherSelectedContributesOfSameProtocolNameExceptInput(data)
            ->Meta3dCommonlib.ListSt.push(selectedContribute)
          },
        ),
        selectedPackages: selectedPackages->Meta3dCommonlib.ListSt.reduce(state.selectedPackages, (
          result,
          packageData,
        ) => {
          result
          ->_removeOtherSelectedPackagesOfSameProtocolName(packageData)
          ->Meta3dCommonlib.ListSt.push(packageData)
        }),
      }
    }
  | SetAccount(account) => {...state, account: Some(account)}
  | UpdateSelectedPackagesAndExtensionsAndContributes(
      selectedPackages,
      selectedExtensions,
      selectedContributes,
      // selectedElements,
    ) => {
      ...state,
      selectedPackages,
      selectedExtensions,
      selectedContributes,
      // selectedElements: selectedElements->Meta3dCommonlib.ListSt.length == 0
      //   ? state.selectedElements
      //   : selectedElements,
    }
  | SetContributes(selectedContributes) => {...state, selectedContributes}
  | SelectAllUIControls(allUIControls) => {
      ...state,
      selectedContributes: allUIControls->Meta3dCommonlib.ListSt.reduce(state.selectedContributes, (
        result,
        (data, protocolConfigOpt) as uiControl,
      ) => {
        result
        ->_removeOtherSelectedContributesOfSameProtocolName(data)
        ->Meta3dCommonlib.ListSt.push(uiControl)
      }),
    }
  | SetPackages(selectedPackages) => {...state, selectedPackages}
  | SetCurrentAppName(appName) => {
      ...state,
      currentAppName: appName->Some,
    }
  // | ResetWhenEnter => state->_reset
  | LogOut => {
      ...state,
      account: None,
    }
  | RemoveElement => {
      ...state,
      selectedContributes: state.selectedContributes->SelectedElementContributeUtils.removeElementContribute,
      selectedElements: list{},
    }
  | SetRelease(release) => {
      ...state,
      release: release->Some,
    }
  | StartCreateFromScratchTourPhase1 => {
      ...state,
      isInCreateFromScratchTourPhase1: true,
      // isJumpToCreateFromScratchTourPhase1Guide:true
    }
  // | EndJumpToCreateFromScratchTourPhase1Guide => {
  //     ...state,
  //     // isJumpToCreateFromScratchTourPhase1Guide:false
  //   }
  | EndCreateFromScratchTourPhase1 => {
      ...state,
      isInCreateFromScratchTourPhase1: false,
      // isJumpToCreateFromScratchTourPhase1Guide:false
    }
  | StartCreateFromScratchTourPhase3 => {
      ...state,
      isInCreateFromScratchTourPhase3: true,
    }
  | EndCreateFromScratchTourPhase3 => {
      ...state,
      isInCreateFromScratchTourPhase3: false,
    }
  | MarkNotUseCacheForFindApp => {
      ...state,
      notUseCacheForFindApp: true,
    }
  | MarkUseCacheForFindApp => {
      ...state,
      notUseCacheForFindApp: false,
    }
  // | MarkNotUseCacheForFindFinalApp => {
  //     ...state,
  //     notUseCacheForFindFinalApp: true,
  //   }
  // | MarkUseCacheForFindFinalApp => {
  //     ...state,
  //     notUseCacheForFindFinalApp: false,
  //   }
  }
}

let initialState = _createState()
