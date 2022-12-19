type id = string

type version = string

type extension = {
  id: id,
  data: Meta3d.ExtensionFileType.extensionFileData,
  version: version,
  account: string,
}

type extensionData = (extension, option<CommonType.protocolConfig>)

type contribute = {
  id: id,
  data: Meta3d.ExtensionFileType.contributeFileData,
  version: version,
  account: string,
}

type contributeData = (contribute, option<CommonType.protocolConfig>)

type packageProtocol = {
  version: Meta3d.ExtensionFileType.versionRange,
  name: string,
  iconBase64: string,
}

type packageData = {
  id: id,
  protocol: packageProtocol,
  entryExtensionName: string,
  version: version,
  name: string,
  binaryFile: Js.Typed_array.ArrayBuffer.t,
}
