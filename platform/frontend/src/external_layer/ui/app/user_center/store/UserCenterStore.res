type id = string

// type extension = {
//   id: id,
//   data: Meta3d.ExtensionFileType.extensionFileData,
// }
type extension = FrontendUtils.AssembleSpaceCommonType.extension

type selectedExtensions = list<FrontendUtils.AssembleSpaceCommonType.extensionData>

type contribute = FrontendUtils.AssembleSpaceCommonType.contribute

type selectedContributes = list<FrontendUtils.AssembleSpaceCommonType.contributeData>

type packageData = FrontendUtils.AssembleSpaceCommonType.packageData

type selectedPackages = list<packageData>

// type selectedContributeProtocolConfigs = list<
//   option<FrontendUtils.CommonType.protocolConfig>,
// >

type account = string

type name = string

type action =
  | SelectExtension(extension, option<FrontendUtils.CommonType.protocolConfig>)
  | NotSelectExtension(name, FrontendUtils.AssembleSpaceCommonType.version)
  | SelectContribute(contribute, option<FrontendUtils.CommonType.protocolConfig>)
  | NotSelectContribute(name, FrontendUtils.AssembleSpaceCommonType.version)
  | SelectPackage(packageData)
  | NotSelectPackage(id)
  | SetAccount(account)
  | ImportPackage(id, selectedExtensions, selectedContributes)
  | ImportApp(id, selectedExtensions, selectedContributes)

type state = {
  account: option<string>,
  selectedExtensions: selectedExtensions,
  selectedContributes: selectedContributes,
  selectedPackages: selectedPackages,
  importedPackageIds: list<id>,
  importedAppIds: list<id>,
}

let _removeOtherSelectedExtensionsOfSameProtocolName = (
  selectedExtensions: selectedExtensions,
  data: extension,
) => {
  let protocolName = data.protocolName

  selectedExtensions->Meta3dCommonlib.ListSt.filter(((selectedExtension, _)) => {
    selectedExtension.protocolName !== protocolName
  })
}

let _removeOtherSelectedContributesOfSameProtocolNameExceptAction = (
  selectedContributes: selectedContributes,
  data: contribute,
) => {
  let protocolName = data.protocolName

  switch AssembleSpace.ContributeTypeUtils.decideContributeType(protocolName) {
  | Meta3dType.ContributeType.Action =>
    selectedContributes->Meta3dCommonlib.ListSt.filter(((selectedContribute, _)) => {
      selectedContribute.data.contributePackageData.name !== data.data.contributePackageData.name
    })
  | _ =>
    selectedContributes->Meta3dCommonlib.ListSt.filter(((selectedContribute, _)) => {
      selectedContribute.protocolName !== protocolName
    })
  }
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
        selectedExtension.data.extensionPackageData.name !== name &&
          selectedExtension.version !== version
      ),
    }
  | SelectContribute(data, protocolConfigOpt) => {
      ...state,
      selectedContributes: state.selectedContributes
      ->_removeOtherSelectedContributesOfSameProtocolNameExceptAction(data)
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
        selectedContribute.data.contributePackageData.name !== name &&
          selectedContribute.version !== version
      ),
    }
  | SelectPackage(data) => {
      ...state,
      selectedPackages: state.selectedPackages
      ->_removeOtherSelectedPackagesOfSameProtocolName(data)
      ->Meta3dCommonlib.ListSt.push(data),
    }
  | NotSelectPackage(id) => {
      ...state,
      selectedPackages: state.selectedPackages->Meta3dCommonlib.ListSt.filter(selectedPackage =>
        selectedPackage.id !== id
      ),
    }
  | ImportPackage(packageId, selectedExtensions, selectedContributes) => {
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
          ->_removeOtherSelectedContributesOfSameProtocolNameExceptAction(data)
          ->Meta3dCommonlib.ListSt.push(selectedContribute)
        },
      ),
    }
  | ImportApp(appId, selectedExtensions, selectedContributes) => {
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
          ->_removeOtherSelectedContributesOfSameProtocolNameExceptAction(data)
          ->Meta3dCommonlib.ListSt.push(selectedContribute)
        },
      ),
    }
  | SetAccount(account) => {...state, account: Some(account)}
  }
}

let initialState = {
  account: None,
  selectedExtensions: list{},
  selectedContributes: list{},
  selectedPackages: list{},
  importedPackageIds: list{},
  importedAppIds: list{},
  // selectedContributeProtocolConfigs: list{},
}
