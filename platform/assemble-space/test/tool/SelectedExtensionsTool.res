let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <SelectedExtensions service />
}

let buildSelectedExtension = (
  ~name,
  ~protocolIconBase64,
  ~newName=None,
  ~isStart=false,
  ~id="e1",
  (),
): FrontendUtils.AssembleSpaceStoreType.extension => {
  {
    id: id,
    protocolIconBase64: protocolIconBase64,
    newName: newName,
    isStart: isStart,
    data: {
      extensionPackageData: ExtensionTool.buildExtensionPackageData(~name, ()),
      extensionFuncData: Js.Typed_array.Uint8Array.make([]),
    },
  }
}
