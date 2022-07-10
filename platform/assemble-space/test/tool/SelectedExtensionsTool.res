let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <SelectedExtensions service />
}

let buildSelectedExtension = (
  ~name="e1",
  ~protocolIconBase64="i1",
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

let selectExtension = (~id, ~dispatch) => {
  SelectedExtensions.Method.selectExtension(dispatch, id)
}

let useSelector = SelectedExtensions.Method.useSelector
