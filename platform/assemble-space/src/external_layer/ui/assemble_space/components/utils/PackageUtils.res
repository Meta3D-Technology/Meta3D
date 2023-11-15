open FrontendUtils.AssembleSpaceType

// let _getExtensionNewName = (newName, data: Meta3d.ExtensionFileType.extensionFileData) => {
//   newName->Meta3dCommonlib.OptionSt.getWithDefault(data.extensionPackageData.name)
// }

// let _getContributeNewName = (newName, data: Meta3d.ExtensionFileType.contributeFileData) => {
//   newName->Meta3dCommonlib.OptionSt.getWithDefault(data.contributePackageData.name)
// }

let getEntryExtensionName = selectedExtensions => {
  selectedExtensions
  ->Meta3dCommonlib.ArraySt.filter(({isEntry}: FrontendUtils.PackageAssembleStoreType.extension) =>
    isEntry
  )
  ->Meta3dCommonlib.ArraySt.map(({data}) => data.extensionPackageData.name)
  ->Meta3dCommonlib.ArraySt.getExn(0)
}

let getEntryExtensionProtocolData = selectedExtensions => {
  selectedExtensions
  ->Meta3dCommonlib.ArraySt.filter(({isEntry}: FrontendUtils.PackageAssembleStoreType.extension) =>
    isEntry
  )
  ->Meta3dCommonlib.ArraySt.map(({
    protocolName,
    protocolVersion,
    protocolIconBase64,
    protocolDisplayName,
    protocolRepoLink,
    protocolDescription,
    protocolConfigStr,
    data,
  }) => (
    protocolName,
    protocolVersion,
    data.extensionPackageData.protocol.version,
    protocolIconBase64,
    protocolDisplayName,
    protocolRepoLink,
    protocolDescription,
    protocolConfigStr,
  ))
  ->Meta3dCommonlib.ArraySt.getExn(0)
}

let generatePackage = (
  service,
  selectPackages,
  selectedExtensions,
  selectedContributes,
  packageData,
) => {
  service.meta3d.generatePackage(.
    service.meta3d.convertAllFileDataForPackage(.
      selectedExtensions->Meta3dCommonlib.ArraySt.map((
        {data}: FrontendUtils.PackageAssembleStoreType.extension,
      ) => data),
      selectedContributes->Meta3dCommonlib.ArraySt.map((
        {data}: FrontendUtils.PackageAssembleStoreType.contribute,
      ) => data),
      // selectPackages->Meta3dCommonlib.ArraySt.map((
      //   {protocol, entryExtensionName}: FrontendUtils.PackageAssembleStoreType.package,
      // ) => (
      //   (
      //     {
      //       name: protocol.name,
      //       version: protocol.version,
      //     }: Meta3d.ExtensionFileType.extensionProtocolData
      //   ),
      //   entryExtensionName,
      // )),

      [getEntryExtensionName(selectedExtensions)],
    ),
    selectPackages->Meta3dCommonlib.ArraySt.map((
      {binaryFile}: FrontendUtils.PackageAssembleStoreType.package,
    ) => binaryFile),
    packageData,
  )
}

let getPackageAllExtensionAndContributeFileData = (service, packageBinaryFile) => {
  let rec _func = (allExtensionFileData, allContributeFileData, packageBinaryFile) => {
    let (
      allExtensionFileData_,
      allContributeFileData_,
      allSubPackagesNotStoredInApp,
      _,
    ) = service.meta3d.getAllDataOfPackage(. packageBinaryFile)

    allSubPackagesNotStoredInApp->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. (allExtensionFileData, allContributeFileData), subPackageBinaryFile) => {
        _func(allExtensionFileData, allContributeFileData, subPackageBinaryFile)
      },
      (
        allExtensionFileData->Js.Array.concat(allExtensionFileData_, _),
        allContributeFileData->Js.Array.concat(allContributeFileData_, _),
      ),
    )
  }

  _func([], [], packageBinaryFile)
}

let buildPackageData = (
  {
    protocol,
    entryExtensionName,
    version,
    name,
    protocolConfigStr,
  }: FrontendUtils.AssembleSpaceCommonType.packageData,
): Meta3d.AppAndPackageFileType.packageData => {
  (
    protocol,
    entryExtensionName,
    version,
    name,
    protocolConfigStr->Meta3dCommonlib.OptionSt.getWithDefault(""),
  )
}
