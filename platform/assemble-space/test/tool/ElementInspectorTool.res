let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <ElementInspector service />
}

let buildElementStateFieldData = (
  ~name,
  ~defaultValue,
  ~type_=#int,
  (),
): FrontendUtils.ElementAssembleStoreType.elementStateFieldData => {
  name: name,
  type_: type_,
  defaultValue: defaultValue->Obj.magic,
}

let submitElementState = ElementInspector.Method.onFinishState

let buildElementInspectorData = (
  elementStateFields,
  reducers,
): FrontendUtils.ElementAssembleStoreType.elementInspectorData => {
  {elementStateFields: elementStateFields, reducers: reducers}
}

let setRole = ElementInspector.Method.setRole

let submitHandlers = ElementInspector.Method.onFinishReducerHandlers
