type protocolIconBase64 = string

type id = string

type newName = string

type extension = {
  id: id,
  protocolIconBase64: protocolIconBase64,
  newName: option<newName>,
  isStart: bool,
  data: Meta3d.ExtensionFileType.extensionFileData,
}

type selectedExtensions = list<extension>

type action =
  | SelectExtension(protocolIconBase64, AssembleSpaceCommonType.extension)
  | SetInspectorCurrentExtensionId(id)
  | StartExtension(id)
  | UnStartExtension(id)
  | SetExtensionNewName(id, newName)

type state = {
  selectedExtensions: selectedExtensions,
  // inspectorCurrentExtension: option<extension>,
  inspectorCurrentExtensionId: option<id>,
}
