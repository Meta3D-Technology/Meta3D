type username = string

// TODO refactor: move type out
type protocol = {
  name: string,
  version: string,
  username: username,
  iconBase64: string,
}

type protocols = array<protocol>

type getAllPublishExtensionProtocols = unit => Meta3dBsMostProtocol.StreamType.stream<protocols>

type getAllPublishContributeProtocols = getAllPublishExtensionProtocols

// type protocolConfig = {
//   name: string,
//   version: string,
//   username: string,
//   configStr: string,
// }

type protocolConfigs = array<CommonType.protocolConfig>

type getAllPublishContributeProtocolConfigs = unit => Meta3dBsMostProtocol.StreamType.stream<
  protocolConfigs,
>

type implement = {
  id: string,
  file: Js.Typed_array.ArrayBuffer.t,
  version: string,
  username: username,
}

type implements = array<implement>

type getAllPublishExtensions = (
  . string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<implements>

type getAllPublishContributes = (
  . string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<implements>

type publishAppData = {
  username: username,
  appName: string,
  appBinaryFile: Js.Typed_array.ArrayBuffer.t,
}

type publishApp = (
  . Js.Typed_array.ArrayBuffer.t,
  string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<unit>

type findPublishApp = (
  . string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<Js.Nullable.t<Js.Typed_array.ArrayBuffer.t>>

type findAllPublishApps = (
  . string,
) => Meta3dBsMostProtocol.StreamType.stream<array<publishAppData>>

type publishElementContribute = (
  . string,
  (string, string, string, string),
  Js.Typed_array.ArrayBuffer.t,
) => Js.Promise.t<unit>

type uiControl = {
  name: string,
  rect: ElementAssembleStoreType.rect,
  event: ElementAssembleStoreType.event,
}

type inspectorData = {
  element: ElementAssembleStoreType.elementInspectorData,
  uiControls: array<uiControl>,
}

type publishedElementAssembleData = (. string, string, string, inspectorData) => Js.Promise.t<unit>

type getAllPublishNewestExtensions = (
  . string,
) => Meta3dBsMostProtocol.StreamType.stream<implements>

type elementName = string

type elementVersion = string

type elementAssembleData = {
  elementName: elementName,
  elementVersion: elementVersion,
  inspectorData: inspectorData,
}

type getElementAssembleData = (
  . username,
  elementName,
  elementVersion,
) => Meta3dBsMostProtocol.StreamType.stream<elementAssembleData>
