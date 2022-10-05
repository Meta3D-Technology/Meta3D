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

type rect = {
  x: int,
  y: int,
  width: int,
  height: int,
}

type actionName = string

type eventData = {
  eventName: UIControlInspectorType.eventName,
  actionName: actionName,
}

type event = array<eventData>

type uiControlInspectorData = {id: id, rect: rect, event: event}

type selectedUIControlInspectorData = list<uiControlInspectorData>

type action =
  | Reset
  | SelectUIControl(protocolIconBase64, name, Meta3d.ExtensionFileType.contributeFileData)
  | SetInspectorCurrentUIControlId(id)
  | SetRect(id, rect)
  | SetAction(id, (UIControlInspectorType.eventName, option<actionName>))
  | SetVisualExtension(ApViewStoreType.extension)
  | SetElementContribute(ApViewStoreType.contribute)

type state = {
  selectedUIControls: selectedUIControls,
  inspectorCurrentUIControlId: option<id>,
  selectedUIControlInspectorData: selectedUIControlInspectorData,
  visualExtension: option<ApViewStoreType.extension>,
  elementContribute: option<ApViewStoreType.contribute>,
}
