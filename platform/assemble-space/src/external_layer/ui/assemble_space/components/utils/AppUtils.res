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
  //TODO remove
  selectedExtensions,
  selectedContributes,
  configData,
) => {
  service.meta3d.generateApp(.
    service.meta3d.convertAllFileDataForApp(.
      // selectedExtensions->Meta3dCommonlib.ArraySt.map((
      //   {data}: FrontendUtils.ApAssembleStoreType.extension,
      // ) => data),
      selectedContributes->Meta3dCommonlib.ArraySt.map((
        {data}: FrontendUtils.ApAssembleStoreType.contribute,
      ) => data),
      // selectPackages->Meta3dCommonlib.ArraySt.map((
      //   {protocol}: FrontendUtils.PackageAssembleStoreType.package,
      // ): Meta3d.ExtensionFileType.extensionProtocolData => {
      //   name: protocol.name,
      //   version: protocol.version,
      // }),
      // selectedExtensions
      // ->Meta3dCommonlib.ArraySt.filter(({isStart}) => isStart)
      // ->Meta3dCommonlib.ArraySt.map(({data}) => data.extensionPackageData.name),
    )->Meta3dCommonlib.Log.printForDebug,
    selectPackages->Meta3dCommonlib.ArraySt.map((
      {binaryFile}: FrontendUtils.PackageAssembleStoreType.package,
    ) => binaryFile),
    allPackagesStoredInApp,
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
