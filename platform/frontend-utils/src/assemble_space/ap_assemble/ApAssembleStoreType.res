type protocolIconBase64 = string

type protocolConfigStr = string

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

type contribute = {
  id: id,
  protocolIconBase64: protocolIconBase64,
  protocolConfigStr: option<protocolConfigStr>,
  newName: option<newName>,
  data: Meta3d.ExtensionFileType.contributeFileData,
}

// type selectedContributes = list<(
//   contribute,
//   option<FrontendUtils.CommonType.protocolConfig>,
// )>

type selectedContributes = list<contribute>

type canvasData = {
  // id: string,
  width: int,
  height: int,
  // zIndex: int,
}

type action =
  | Reset
  | SelectExtension(protocolIconBase64, AssembleSpaceCommonType.extension)
  | SetInspectorCurrentExtensionId(id)
  | StartExtension(id)
  | UnStartExtension(id)
  | SetExtensionNewName(id, newName)
  | SelectContribute(
      protocolIconBase64,
      option<protocolConfigStr>,
      AssembleSpaceCommonType.contribute,
    )
  | SetInspectorCurrentContributeId(id)
  | SetContributeNewName(id, newName)
  | SetCanvasData(canvasData)

type state = {
  selectedExtensions: selectedExtensions,
  selectedContributes: selectedContributes,
  inspectorCurrentExtensionId: option<id>,
  inspectorCurrentContributeId: option<id>,
  canvasData: canvasData,
}
