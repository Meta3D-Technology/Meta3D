type id = string

type extension = {
  id: id,
  data: Meta3d.ExtensionFileType.extensionFileData,
  version: string,
  account: string,
}

type extensionData = (extension, option<CommonType.protocolConfig>)

type contribute = {
  id: id,
  data: Meta3d.ExtensionFileType.contributeFileData,
  version: string,
  account: string,
}

type contributeData = (contribute, option<CommonType.protocolConfig>)
