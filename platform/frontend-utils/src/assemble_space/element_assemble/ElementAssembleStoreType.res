type protocolIconBase64 = string

type protocolConfigStr = string

type id = string

type name = string

type uiControl = {
  id: id,
  protocolIconBase64: protocolIconBase64,
  protocolConfigStr: protocolConfigStr,
  name: name,
  data: Meta3d.ExtensionFileType.contributeFileData,
}

type selectedUIControls = list<uiControl>

type actionName = string

type eventData = {
  eventName: Meta3dType.ContributeProtocolConfigType.eventName,
  actionName: actionName,
}

type event = array<eventData>

type rectField =
  | IntForRectField(int)
  | ElementStateFieldForRectField(string)

type rect = {
  x: rectField,
  y: rectField,
  width: rectField,
  height: rectField,
}

type isDraw =
  | BoolForIsDraw(bool)
  | ElementStateFieldForIsDraw(string)

type skinName = string

type skin = {skinName: skinName}

type uiControlInspectorData = {id: id, rect: rect, isDraw: isDraw, event: event, skin: skin}

type selectedUIControlInspectorData = list<uiControlInspectorData>

type elementStateFieldType = [#string | #int | #bool]

type elementStateFieldValue

type elementStateFieldData = {
  name: string,
  type_: elementStateFieldType,
  defaultValue: elementStateFieldValue,
}

type elementStateFields = list<elementStateFieldData>

type reducerHandler = {
  actionName: actionName,
  updatedElementStateFieldName: string,
}

type handlers = list<reducerHandler>

type reducers = {
  role: option<string>,
  // handlerActionName:string,
  handlers: handlers,
  // updatedElementStateFieldName: string,
}

// type reducer = list<reducer>

type elementInspectorData = {
  elementStateFields: elementStateFields,
  reducers: reducers,
}

type elementContributeData = (
  // (string, string, Js.Typed_array.ArrayBuffer.t),
  (string, string, string),
  ApAssembleStoreType.contribute,
)

type action =
  | Reset
  | ResetWhenSwitch
  | SelectUIControl(
      protocolIconBase64,
      protocolConfigStr,
      name,
      Meta3d.ExtensionFileType.contributeFileData,
      skin,
    )
  | SetInspectorCurrentUIControlId(id)
  | SetRect(id, rect)
  | SetIsDraw(id, isDraw)
  | SetSkin(id, skinName)
  | SetAction(id, (Meta3dType.ContributeProtocolConfigType.eventName, option<actionName>))
  | SetVisualExtension(ApAssembleStoreType.extension)
  | SetRunVisualExtension(ApAssembleStoreType.extension)
  | SetElementContributeData(elementContributeData)
  | ShowElementInspector
  // | AddElementStateField(elementStateFieldData)
  | SetElementStateFields(elementStateFields)
  | SetRole(option<string>)
  | SetHandlers(handlers)
  | Import(selectedUIControls, selectedUIControlInspectorData, elementInspectorData)

type state = {
  selectedUIControls: selectedUIControls,
  inspectorCurrentUIControlId: option<id>,
  selectedUIControlInspectorData: selectedUIControlInspectorData,
  visualExtension: option<ApAssembleStoreType.extension>,
  runVisualExtension: option<ApAssembleStoreType.extension>,
  elementContributeData: option<elementContributeData>,
  isShowElementInspector: bool,
  elementInspectorData: elementInspectorData,
}
