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

  ContributeTypeUtils.isInput(protocolName)
    ? selectedContributes
    : selectedContributes->Meta3dCommonlib.ListSt.filter(((selectedContribute, _)) => {
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
  | ImportApp(appId, selectedExtensions, selectedContributes, selectedPackages) => {
      ...state,
      importedAppIds: state.importedAppIds->Meta3dCommonlib.ListSt.push(appId),
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
  | SetAccount(account) => {...state, account: Some(account)}
  | UpdateSelectedPackagesAndExtensionsAndContributesAndElements(
      selectedPackages,
      selectedExtensions,
      selectedContributes,
      selectedElements,
    ) => {
      ...state,
      selectedPackages,
      selectedExtensions,
      selectedContributes,
      selectedElements: selectedElements->Meta3dCommonlib.ListSt.length == 0
        ? state.selectedElements
        : selectedElements,
    }
  }
}

let initialState = {
  account: None,
  selectedExtensions: list{},
  selectedContributes: list{},
  selectedPackages: list{},
  selectedElements: list{},
  // customInputs: list{},
  // customActions: list{},
  importedPackageIds: list{},
  importedAppIds: list{},
}
