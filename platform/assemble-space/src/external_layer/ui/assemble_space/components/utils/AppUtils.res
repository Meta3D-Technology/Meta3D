open FrontendUtils.AssembleSpaceType

// let _getExtensionNewName = (newName, data: Meta3d.ExtensionFileType.extensionFileData) => {
//   newName->Meta3dCommonlib.OptionSt.getWithDefault(data.extensionPackageData.name)
// }

// let _getContributeNewName = (newName, data: Meta3d.ExtensionFileType.contributeFileData) => {
//   newName->Meta3dCommonlib.OptionSt.getWithDefault(data.contributePackageData.name)
// }

let generateApp = (
  service,
  selectPackages,
  selectedExtensions,
  selectedContributes,
  configData,
) => {
  service.meta3d.generateApp(.
    service.meta3d.convertAllFileDataForApp(.
      selectedExtensions->Meta3dCommonlib.ArraySt.map((
        {data}: FrontendUtils.ApAssembleStoreType.extension,
      ) => data),
      selectedContributes->Meta3dCommonlib.ArraySt.map((
        {data}: FrontendUtils.ApAssembleStoreType.contribute,
      ) => data),
      // selectPackages->Meta3dCommonlib.ArraySt.map((
      //   {protocol}: FrontendUtils.PackageAssembleStoreType.package,
      // ): Meta3d.ExtensionFileType.extensionProtocolData => {
      //   name: protocol.name,
      //   version: protocol.version,
      // }),
      selectedExtensions
      ->Meta3dCommonlib.ArraySt.filter(({isStart}) => isStart)
      ->Meta3dCommonlib.ArraySt.map(({data}) => data.extensionPackageData.name),
    ),
    selectPackages->Meta3dCommonlib.ArraySt.map((
      {binaryFile}: FrontendUtils.PackageAssembleStoreType.package,
    ) => binaryFile),
    configData,
  )
}
