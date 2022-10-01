// TODO refactor: move type out
type protocol = {
  name: string,
  version: string,
  username: string,
  iconBase64: string,
}

type protocols = array<protocol>

type getAllPublishExtensionProtocols = unit => Meta3dBsMostProtocol.StreamType.stream<protocols>

type getAllPublishContributeProtocols = getAllPublishExtensionProtocols

type implement = {
  id: string,
  file: Js.Typed_array.ArrayBuffer.t,
  version: string,
  username: string,
}

type implements = array<implement>

type getAllPublishExtensions = (
  string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<implements>

type getAllPublishContributes = (
  string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<implements>

type publishAppData = {
  username: string,
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
