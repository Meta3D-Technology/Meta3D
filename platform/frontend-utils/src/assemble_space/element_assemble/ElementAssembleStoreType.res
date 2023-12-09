type elementStateFieldType = [#string | #int | #bool]

// type specificDataType = Meta3dType.UIControlProtocolConfigType.uiControlSpecicFieldType

external specificTypeToElementStateFieldType: CommonType.specificDataType => elementStateFieldType =
  "%identity"

type protocolIconBase64 = string

type protocolConfigStr = string

type id = string

type name = string

type displayName = string

type parentId = option<id>

type rec uiControl = {
  id: id,
  parentId: parentId,
  children: list<uiControl>,
  protocolIconBase64: protocolIconBase64,
  protocolConfigStr: protocolConfigStr,
  displayName: displayName,
  data: Meta3d.ExtensionFileType.contributeFileData,
}

type selectedUIControls = list<uiControl>

// type eventName = string

type actionName = CommonType.actionName

// type eventData = CommonType.eventData

// type event = CommonType.event

type rectField = CommonType.rectField

type rect = CommonType.rect

type isDraw = CommonType.isDraw

type specificDataValue = CommonType.specificDataValue

type specificData = CommonType.specificData

type specific = CommonType.specific

type inputName = CommonType.inputName

// type input = {
//   inputName: inputName,
//   // inputFileStr: option<CommonType.inputFileStr>,
// }
type input = CommonType.input

// type eventData = {
//   eventName: Meta3dType.ContributeProtocolConfigType.eventName,
//   actionName: actionName,
//   actionFileStr: option<CommonType.actionFileStr>,
// }

type eventData = CommonType.eventData

type event = array<eventData>

type rec uiControlInspectorData = {
  id: id,
  rect: rect,
  specific: specific,
  isDraw: isDraw,
  input: option<input>,
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

// type elementStateFields = list<elementStateFieldData>

// type reducerHandler = {
//   actionName: actionName,
//   updatedElementStateFieldName: string,
// }

// type handlers = list<reducerHandler>

// type reducers = {
//   role: option<string>,
//   // handlerActionName:string,
//   handlers: handlers,
//   // updatedElementStateFieldName: string,
// }

// type reducer = list<reducer>

// type elementInspectorData = {
//   elementStateFields: elementStateFields,
//   // reducers: reducers,
// }

type elementContribute = ApAssembleStoreType.contribute

type canvasData = Meta3dType.Index.canvasData

type customInput = AssembleSpaceCommonType.customInput

type customInputs = list<customInput>

type customAction = AssembleSpaceCommonType.customAction

type customActions = list<customAction>

type action =
  | Reset
  | ResetWhenSwitch
  | SelectUIControl(
      protocolIconBase64,
      protocolConfigStr,
      displayName,
      Meta3d.ExtensionFileType.contributeFileData,
      parentId,
      specific,
    )
  | UnSelectUIControlAndChildren(id)
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
  // | SetAction(id, (eventName, option<actionName>))
  | SetInput(id, option<inputName>)
  // | SetInputFileStr(id, inputName, CommonType.inputFileStr)
  | SetAction(id, (Meta3dType.ContributeProtocolConfigType.eventName, option<actionName>))
  // | SetActionFileStr(
  //     id,
  //     Meta3dType.ContributeProtocolConfigType.eventName,
  //     actionName,
  //     CommonType.actionFileStr,
  //   )
  // | SetVisualExtension(ApAssembleStoreType.extension)
  // | SetRunVisualExtension(ApAssembleStoreType.extension)
  | SetElementContribute(elementContribute)
  // | ShowElementInspector
  // | AddElementStateField(elementStateFieldData)
  // | SetElementStateFields(elementStateFields)
  // | SetRole(option<string>)
  // | SetHandlers(handlers)
  // | Import(selectedUIControls, selectedUIControlInspectorData, elementInspectorData)
  | Import(selectedUIControls, selectedUIControlInspectorData)
  | ImportElementCustom(customInputs)
  | SetCanvasData(canvasData)
  | AddCustomInput(customInput)
  | UpdateCustomInputFileStr(CommonType.inputName, CommonType.inputName, CommonType.inputFileStr)
  // | SetCustomActions(customActions)
  | SelectCustomInput(CommonType.inputName)

type state = {
  canvasData: canvasData,
  selectedUIControls: selectedUIControls,
  parentUIControlId: option<id>,
  inspectorCurrentUIControlId: option<id>,
  selectedUIControlInspectorData: selectedUIControlInspectorData,
  // visualExtension: option<ApAssembleStoreType.extension>,
  // runVisualExtension: option<ApAssembleStoreType.extension>,
  elementContribute: option<elementContribute>,
  // isShowElementInspector: bool,
  // elementInspectorData: elementInspectorData,
  isImportElement: bool,
  customInputs: customInputs,
  customActions: customActions,
  currentCustomInputName: option<CommonType.inputName>,
}
