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
//   actionName: CommonType.actionName,
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
