type protocolIconBase64 = string

type id = string

type name = string

type uiControl = {
  id: id,
  protocolIconBase64: protocolIconBase64,
  name: name,
  data: Meta3d.ExtensionFileType.contributeFileData,
}

type selectedUIControls = list<uiControl>

type action =
  | Reset
  | SelectUIControl(protocolIconBase64, name, Meta3d.ExtensionFileType.contributeFileData)
  | SetInspectorCurrentUIControlId(id)
  | SetVisualExtension(ApViewStoreType.extension)

type state = {
  selectedUIControls: selectedUIControls,
  inspectorCurrentUIControlId: option<id>,
  visualExtension: option<ApViewStoreType.extension>,
}
