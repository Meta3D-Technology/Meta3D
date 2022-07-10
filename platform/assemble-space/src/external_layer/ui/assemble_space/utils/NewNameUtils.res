  let getName = (newName, data: Meta3d.ExtensionFileType.extensionFileData) => {
    newName->Meta3dCommonlib.OptionSt.getWithDefault(data.extensionPackageData.name)
  }