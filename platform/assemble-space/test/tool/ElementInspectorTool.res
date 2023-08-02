let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <ElementInspector service />
}

let buildElementStateFieldData = (
  ~name,
  ~defaultValue,
  ~type_=#int,
  (),
): FrontendUtils.ElementAssembleStoreType.elementStateFieldData => {
  name,
  type_,
  defaultValue: defaultValue->Obj.magic,
}

let submitElementState = ElementInspector.Method.onFinishState

let buildElementInspectorData = (
  elementStateFields
): FrontendUtils.ElementAssembleStoreType.elementInspectorData => {
  {elementStateFields: elementStateFields}
}

// let setRole = ElementInspector.Method.setRole

// let submitHandlers = ElementInspector.Method.onFinishReducerHandlers
