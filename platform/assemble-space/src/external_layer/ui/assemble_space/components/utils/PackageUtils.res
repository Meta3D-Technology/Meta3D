open FrontendUtils.AssembleSpaceType

let _getExtensionNewName = (newName, data: Meta3d.ExtensionFileType.extensionFileData) => {
  newName->Meta3dCommonlib.OptionSt.getWithDefault(data.extensionPackageData.name)
}

let _getContributeNewName = (newName, data: Meta3d.ExtensionFileType.contributeFileData) => {
  newName->Meta3dCommonlib.OptionSt.getWithDefault(data.contributePackageData.name)
}

let generatePackage = (service, selectedExtensions, selectedContributes) => {
  service.meta3d.generatePackage(.
    service.meta3d.convertAllFileData(.
      selectedExtensions->Meta3dCommonlib.ArraySt.map((
        {data}: FrontendUtils.PackageAssembleStoreType.extension,
      ) => data),
      selectedContributes->Meta3dCommonlib.ArraySt.map((
        {data}: FrontendUtils.PackageAssembleStoreType.contribute,
      ) => data),
      (
        selectedExtensions->Meta3dCommonlib.ArraySt.map(({newName, data}) =>
          _getExtensionNewName(newName, data)
        ),
        selectedExtensions
        ->Meta3dCommonlib.ArraySt.filter(({isEntry}) => isEntry)
        ->Meta3dCommonlib.ArraySt.map(({newName, data}) => _getExtensionNewName(newName, data)),
        selectedContributes->Meta3dCommonlib.ArraySt.map(({newName, data}) =>
          _getContributeNewName(newName, data)
        ),
      ),
    ),
  )
}
