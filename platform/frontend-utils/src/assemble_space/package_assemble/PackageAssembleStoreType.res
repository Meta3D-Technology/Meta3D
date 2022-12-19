type protocolIconBase64 = string

type protocolConfigStr = string

type id = string

type newName = string

type version = string

type extension = {
  id: id,
  protocolIconBase64: protocolIconBase64,
  protocolConfigStr: option<protocolConfigStr>,
  newName: option<newName>,
  isEntry: bool,
  version: version,
  data: Meta3d.ExtensionFileType.extensionFileData,
}

type selectedExtensions = list<extension>

type contribute = {
  id: id,
  protocolIconBase64: protocolIconBase64,
  protocolConfigStr: option<protocolConfigStr>,
  newName: option<newName>,
  version: version,
  data: Meta3d.ExtensionFileType.contributeFileData,
}

type selectedContributes = list<contribute>

// type packageProtocol = {
//   version: versionRange,
//   name: string,
// }

// type package = {
//   id: id,
//   protocol: packageProtocol,
//   entryExtensionName: string,
//   binaryFile: Js.Typed_array.ArrayBuffer.t,
// }

// type selectedPackages = list<package>

type package = AssembleSpaceCommonType.packageData

type selectedPackages = list<package>

type action =
  | Reset
  | SelectPackage(package)
  | SelectExtension(
      protocolIconBase64,
      option<protocolConfigStr>,
      AssembleSpaceCommonType.extension,
    )
  | SetInspectorCurrentExtensionId(id)
  | MarkEntryExtension(id)
  | UnMarkEntryExtension(id)
  | SetExtensionNewName(id, newName)
  | SelectContribute(
      protocolIconBase64,
      option<protocolConfigStr>,
      AssembleSpaceCommonType.contribute,
    )
  | SetInspectorCurrentContributeId(id)
  | SetContributeNewName(id, newName)

type state = {
  selectedPackages: selectedPackages,
  selectedExtensions: selectedExtensions,
  selectedContributes: selectedContributes,
  inspectorCurrentExtensionId: option<id>,
  inspectorCurrentContributeId: option<id>,
}
