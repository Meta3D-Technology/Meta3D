open FrontendUtils.AssembleSpaceType

// let _getExtensionNewName = (newName, data: Meta3d.ExtensionFileType.extensionFileData) => {
//   newName->Meta3dCommonlib.OptionSt.getWithDefault(data.extensionPackageData.name)
// }

// let _getContributeNewName = (newName, data: Meta3d.ExtensionFileType.contributeFileData) => {
//   newName->Meta3dCommonlib.OptionSt.getWithDefault(data.contributePackageData.name)
// }

let generateApp = (
  service,
  (selectPackages, allPackagesStoredInApp),
  selectedContributes,
  selectedElements: list<FrontendUtils.BackendCloudbaseType.elementAssembleData>,
  // (customInputs, customActions),
  configData,
) => {
  service.meta3d.generateApp(.
    service.meta3d.convertAllFileDataForApp(.
      selectedContributes->Meta3dCommonlib.ArraySt.map((
        {data}: FrontendUtils.ApAssembleStoreType.contribute,
      ) => data),
    ),
    selectPackages->Meta3dCommonlib.ArraySt.map((
      {binaryFile}: FrontendUtils.PackageAssembleStoreType.package,
    ) => binaryFile),
    allPackagesStoredInApp,
    selectedElements->Meta3dCommonlib.ListSt.toArray,
    // (customInputs->Meta3dCommonlib.ListSt.toArray, customActions->Meta3dCommonlib.ListSt.toArray),
    configData,
    selectPackages
    ->Meta3dCommonlib.ArraySt.find(({isStart}: FrontendUtils.PackageAssembleStoreType.package) =>
      isStart
    )
    ->Meta3dCommonlib.OptionSt.map(({protocol}) => protocol.name)
    ->Meta3dCommonlib.OptionSt.getExn,
  )
}

let splitPackages = (selectedPackages, storedPackageIdsInApp) => {
  (
    selectedPackages
    ->Meta3dCommonlib.ListSt.filter(({id}: FrontendUtils.AssembleSpaceCommonType.packageData) => {
      !(storedPackageIdsInApp->Meta3dCommonlib.ListSt.includes(id))
    })
    ->Meta3dCommonlib.ListSt.toArray,
    selectedPackages
    ->Meta3dCommonlib.ListSt.filter(({id}: FrontendUtils.AssembleSpaceCommonType.packageData) => {
      storedPackageIdsInApp->Meta3dCommonlib.ListSt.includes(id)
    })
    ->Meta3dCommonlib.ListSt.map(({
      protocol,
      entryExtensionName,
      version,
      name,
      binaryFile,
      protocolConfigStr,
    }) => (
      (
        protocol,
        entryExtensionName,
        version,
        name,
        protocolConfigStr->Meta3dCommonlib.OptionSt.getWithDefault(""),
      ),
      binaryFile,
    ))
    ->Meta3dCommonlib.ListSt.toArray,
  )
}
