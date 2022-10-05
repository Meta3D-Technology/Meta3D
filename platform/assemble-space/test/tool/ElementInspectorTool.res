let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <ElementInspector service />
}

let buildElementStateFieldData = (
  ~name,
  ~defaultValue,
  ~type_=#int,
  (),
): FrontendUtils.UIViewStoreType.elementStateFieldData => {
  name: name,
  type_: type_,
  defaultValue: defaultValue->Obj.magic,
}

let submitElementState = ElementInspector.Method.onFinish
