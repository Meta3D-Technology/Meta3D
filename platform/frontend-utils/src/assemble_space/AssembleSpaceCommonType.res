type id = string

type version = string

type iconBase64 = string

type protocolConfigStr = string

type extension = {
  id: id,
  protocolName: string,
  protocolVersion: version,
  protocolIconBase64: iconBase64,
  protocolDisplayName: string,
  protocolRepoLink: string,
  protocolDescription: string,
  data: Meta3d.ExtensionFileType.extensionFileData,
  version: version,
  account: string,
}

type extensionData = (extension, option<CommonType.protocolConfig>)

type contribute = {
  id: id,
  protocolName: string,
  protocolVersion: version,
  protocolIconBase64: iconBase64,
  data: Meta3d.ExtensionFileType.contributeFileData,
  version: version,
  account: string,
}

type contributeData = (contribute, option<CommonType.protocolConfig>)

// type packageProtocol = {
//   version: Meta3d.ExtensionFileType.versionRange,
//   name: string,
//   iconBase64: iconBase64,
// }

type packageProtocol = Meta3d.AppAndPackageFileType.packageProtocol

type packageData = {
  id: id,
  protocol: packageProtocol,
  entryExtensionName: string,
  version: version,
  name: string,
  binaryFile: Js.Typed_array.ArrayBuffer.t,
  isStart: bool,
  protocolConfigStr: option<protocolConfigStr>,
}

type storedPackageIdsInApp = list<id>

type customInput = CommonType.customInput

type customAction = CommonType.customAction
