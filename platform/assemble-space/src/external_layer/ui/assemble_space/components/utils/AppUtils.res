open FrontendUtils.AssembleSpaceType

let _getExtensionNewName = (newName, data: Meta3d.ExtensionFileType.extensionFileData) => {
  newName->Meta3dCommonlib.OptionSt.getWithDefault(data.extensionPackageData.name)
}

let _getContributeNewName = (newName, data: Meta3d.ExtensionFileType.contributeFileData) => {
  newName->Meta3dCommonlib.OptionSt.getWithDefault(data.contributePackageData.name)
}

let generateApp = (service, selectedExtensions, selectedContributes, configData) => {
  service.meta3d.generateApp(.
    service.meta3d.convertAllFileDataForApp(.
      selectedExtensions->Meta3dCommonlib.ArraySt.map((
        {data}: FrontendUtils.ApAssembleStoreType.extension,
      ) => data),
      selectedContributes->Meta3dCommonlib.ArraySt.map((
        {data}: FrontendUtils.ApAssembleStoreType.contribute,
      ) => data),
      // TODO finish
      [],
      (
        selectedExtensions->Meta3dCommonlib.ArraySt.map(({newName, data}) =>
          _getExtensionNewName(newName, data)
        ),
        selectedExtensions
        ->Meta3dCommonlib.ArraySt.filter(({isStart}) => isStart)
        ->Meta3dCommonlib.ArraySt.map(({newName, data}) => _getExtensionNewName(newName, data)),
        selectedContributes->Meta3dCommonlib.ArraySt.map(({newName, data}) =>
          _getContributeNewName(newName, data)
        ),
      ),
    ),
    // TODO finish
    [],
    configData,
  )
}
