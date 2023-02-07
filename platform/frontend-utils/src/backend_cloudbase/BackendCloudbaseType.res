type account = string

type versionRange = string

type version = string

type protocolName = string

// type protocolVersion = versionRange
type protocolVersion = version

type protocolIconBase64 = string

type implementName = string

type implementVersion = version

// TODO refactor: move type out
type protocol = {
  name: protocolName,
  version: protocolVersion,
  account: account,
  iconBase64: protocolIconBase64,
}

type protocols = array<protocol>

type init = string => Meta3dBsMostProtocol.StreamType.stream<unit>

type handleLogin = account => Meta3dBsMostProtocol.StreamType.stream<unit>

type registerUser = (string, string) => Meta3dBsMostProtocol.StreamType.stream<unit>

type getAllPublishExtensionProtocols = unit => Meta3dBsMostProtocol.StreamType.stream<protocols>

type getAllPublishContributeProtocols = getAllPublishExtensionProtocols

// type protocolConfig = {
//   name: string,
//   version: string,
//   account: string,
//   configStr: string,
// }

type protocolConfigs = array<CommonType.protocolConfig>

type getAllPublishExtensionProtocolConfigs = unit => Meta3dBsMostProtocol.StreamType.stream<
  protocolConfigs,
>

type getAllPublishContributeProtocolConfigs = getAllPublishExtensionProtocolConfigs

type implementInfo = {
  id: string,
  name: implementName,
  version: implementVersion,
  account: account,
}

type implementInfos = array<implementInfo>

type onUploadProgressFunc = int => unit

type getAllPublishExtensionInfos = (
  . protocolName,
  protocolVersion,
) => Meta3dBsMostProtocol.StreamType.stream<implementInfos>

type getAllPublishContributeInfos = getAllPublishExtensionInfos

type onDownloadProgressFunc = int => unit

type findPublishExtension = (
  . onDownloadProgressFunc,
  account,
  implementName,
  implementVersion,
) => Meta3dBsMostProtocol.StreamType.stream<Js.Nullable.t<Js.Typed_array.ArrayBuffer.t>>

type findPublishContribute = findPublishExtension

// type loadExtension = (. Js.Typed_array.ArrayBuffer.t) => Meta3d.ExtensionFileType.extensionFileData

// type loadContribute = (
//   . Js.Typed_array.ArrayBuffer.t,
// ) => Meta3d.ExtensionFileType.contributeFileData

type appName = string

type publishAppInfo = {
  account: account,
  appName: appName,
}

type publishApp = (
  . onUploadProgressFunc,
  Js.Typed_array.ArrayBuffer.t,
  appName,
  account,
) => Meta3dBsMostProtocol.StreamType.stream<unit>

type findPublishApp = (
  . onDownloadProgressFunc,
  account,
  appName,
) => Meta3dBsMostProtocol.StreamType.stream<Js.Nullable.t<Js.Typed_array.ArrayBuffer.t>>

type findAllPublishAppsByAccount = (
  . account,
) => Meta3dBsMostProtocol.StreamType.stream<array<publishAppInfo>>

type publishElementContribute = (
  . onUploadProgressFunc,
  account,
  (string, string, string, string),
  Js.Typed_array.ArrayBuffer.t,
) => Meta3dBsMostProtocol.StreamType.stream<unit>

type rec uiControl = {
  name: string,
  rect: ElementAssembleStoreType.rect,
  isDraw: ElementAssembleStoreType.isDraw,
  event: ElementAssembleStoreType.event,
  specific: ElementAssembleStoreType.specific,
  children: array<uiControl>,
}

type inspectorData = {
  element: ElementAssembleStoreType.elementInspectorData,
  uiControls: array<uiControl>,
}

type elementName = string

type elementVersion = implementVersion

type publishElementAssembleData = (
  . account,
  elementName,
  elementVersion,
  inspectorData,
) => Meta3dBsMostProtocol.StreamType.stream<unit>

type implement = {
  id: string,
  file: Js.Typed_array.ArrayBuffer.t,
  version: implementVersion,
  account: account,
}

type implements = array<implement>

type getAllPublishNewestExtensions = (
  . protocolName,
) => Meta3dBsMostProtocol.StreamType.stream<implements>

type elementAssembleData = {
  elementName: elementName,
  elementVersion: elementVersion,
  inspectorData: inspectorData,
}

type getElementAssembleData = (
  . account,
  elementName,
  elementVersion,
) => Meta3dBsMostProtocol.StreamType.stream<elementAssembleData>

type entryExtensionProtocolName = protocolName

type entryExtensionProtocolVersion = protocolVersion

type entryExtensionProtocolVersionRange = versionRange

type entryExtensionProtocolIconBase64 = protocolIconBase64

type entryExtensionName = string

type publishPackage = (
  . onUploadProgressFunc,
  Js.Typed_array.ArrayBuffer.t,
  (
    entryExtensionProtocolName,
    entryExtensionProtocolVersion,
    entryExtensionProtocolVersionRange,
    entryExtensionProtocolIconBase64,
    entryExtensionName,
  ),
  (implementName, implementVersion),
  account,
) => Meta3dBsMostProtocol.StreamType.stream<unit>

type getAllPublishPackageEntryExtensionProtocols = getAllPublishExtensionProtocols

// type packageProtocol = {
//   version: Meta3d.ExtensionFileType.versionRange,
//   name: string,
//   iconBase64: string,
// }

type packageImplementInfo = {
  id: string,
  entryExtensionProtocolName: entryExtensionProtocolName,
  entryExtensionProtocolVersion: entryExtensionProtocolVersion,
  entryExtensionProtocolVersionRange: entryExtensionProtocolVersionRange,
  entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase64,
  entryExtensionName: entryExtensionName,
  name: implementName,
  version: implementVersion,
  account: account,
}

type packageImplementInfos = array<packageImplementInfo>

type getAllPublishPackageInfos = (
  . protocolName,
  protocolVersion,
) => Meta3dBsMostProtocol.StreamType.stream<packageImplementInfos>

type findPublishPackage = findPublishExtension
