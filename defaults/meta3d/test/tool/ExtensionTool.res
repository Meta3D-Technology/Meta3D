let buildGetServiceFunc = service => {
  api => service
}

let buildGetLifeFunc = (
  ~onRegister=Js.Nullable.null,
  ~onStart=Js.Nullable.null,
  ~onInit=Js.Nullable.null,
  ~onUpdate=Js.Nullable.null,
  ~onRestore=Js.Nullable.null,
  ~onDeepCopy=Js.Nullable.null,
  (),
): Meta3dType.Index.getExtensionLife<Meta3dType.Index.extensionService> => {
  (api, extensionProtocolName) => {
    onRegister,
    onStart,
    onInit,
    onUpdate,
    onRestore,
    onDeepCopy,
  }
}
