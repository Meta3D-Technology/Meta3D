// type actionName = string

// type eventData = {
//   eventName: Meta3dType.Index.eventName,
//   actionName: actionName,
// }

// type event = array<eventData>

// type rect = Meta3dType.Index.rect

// type elementStateFieldType = [#string | #int]

// type elementStateFieldValue

// type elementStateFieldData = {
//   name: string,
//   type_: elementStateFieldType,
//   defaultValue: elementStateFieldValue,
// }

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

// // type reducer = list<reducer>

// type elementInspectorData = {
//   elementStateFields: elementStateFields,
//   reducers: reducers,
// }

type protocolConfigStr = string

type protocolConfig = {
  name: string,
  version: string,
  account: string,
  configStr: protocolConfigStr,
}

type rectField = IntForRectField(int)

type rect = {
  x: rectField,
  y: rectField,
  width: rectField,
  height: rectField,
}

type isDraw = BoolForIsDraw(bool)

type inputName = string

type input = {inputName: inputName}

type inputFileStr = string

type actionFileStr = string

type actionName = string

type fileStr = string

type custom = {
  name: string,
  originFileStr: fileStr,
  transpiledFileStr: option<fileStr>,
}

type customInput = custom

type customAction = custom

type eventData = {
  eventName: Meta3dType.ContributeProtocolConfigType.eventName,
  actionName: actionName,
}

// type event = array<eventData>

type specificDataType = Meta3dType.UIControlProtocolConfigType.uiControlSpecicFieldType

type specificDataValue =
  SpecicFieldDataValue(Meta3dType.UIControlProtocolConfigType.uiControlSpecicFieldValue)
// | ElementStateFieldForSpecificDataValue(string)

type specificData = {
  name: string,
  type_: specificDataType,
  value: specificDataValue,
}

type specific = array<specificData>
