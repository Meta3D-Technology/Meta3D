type elementStateFieldType = [#string | #int | #bool]

type specificDataType = Meta3dType.UIControlProtocolConfigType.uiControlSpecicFieldType

external specificTypeToElementStateFieldType: specificDataType => elementStateFieldType =
  "%identity"

type protocolIconBase64 = string

type protocolConfigStr = string

type id = string

type name = string

type parentId = option<id>

type rec uiControl = {
  id: id,
  parentId: parentId,
  children: list<uiControl>,
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

type specificDataValue =
  | SpecicFieldDataValue(Meta3dType.UIControlProtocolConfigType.uiControlSpecicFieldValue)
  | ElementStateFieldForSpecificDataValue(string)

type specificData = {
  name: string,
  type_: specificDataType,
  value: specificDataValue,
}

type specific = array<specificData>

type rec uiControlInspectorData = {
  id: id,
  rect: rect,
  specific: specific,
  isDraw: isDraw,
  event: event,
  children: list<uiControlInspectorData>,
}
// and children = array<uiControlInspectorData>

type selectedUIControlInspectorData = list<uiControlInspectorData>

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

type elementContribute = ApAssembleStoreType.contribute

type action =
  | Reset
  | ResetWhenSwitch
  | SelectUIControl(
      protocolIconBase64,
      protocolConfigStr,
      name,
      Meta3d.ExtensionFileType.contributeFileData,
      parentId,
      specific,
    )
  | SelectRootUIControl
  | SelectSelectedUIControl(
      (
        Meta3dServiceCommonType.hasChildren,
        Meta3dServiceCommonType.serializeUIControlProtocolConfigLib,
      ),
      id,
    )
  | SetSpecificData(id, specific)
  | SetRect(id, rect)
  | SetIsDraw(id, isDraw)
  | SetAction(id, (Meta3dType.ContributeProtocolConfigType.eventName, option<actionName>))
  | SetVisualExtension(ApAssembleStoreType.extension)
  | SetRunVisualExtension(ApAssembleStoreType.extension)
  | SetElementContribute(elementContribute)
  | ShowElementInspector
  // | AddElementStateField(elementStateFieldData)
  | SetElementStateFields(elementStateFields)
  | SetRole(option<string>)
  | SetHandlers(handlers)
  | Import(selectedUIControls, selectedUIControlInspectorData, elementInspectorData)

type state = {
  selectedUIControls: selectedUIControls,
  parentUIControlId: option<id>,
  inspectorCurrentUIControlId: option<id>,
  selectedUIControlInspectorData: selectedUIControlInspectorData,
  visualExtension: option<ApAssembleStoreType.extension>,
  runVisualExtension: option<ApAssembleStoreType.extension>,
  elementContribute: option<elementContribute>,
  isShowElementInspector: bool,
  elementInspectorData: elementInspectorData,
}
