let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <SelectedExtensions service />
}

let buildSelectedExtension = (
  ~name="e1",
  ~protocolIconBase64="i1",
  ~protocolConfigStr=None,
  ~newName=None,
  ~isStart=false,
  ~id="e1",
  ~version="",
  ~data=ExtensionTool.buildExtensionData(
    ~extensionPackageData=ExtensionTool.buildExtensionPackageData(~name, ()),
    (),
  ),
  (),
): FrontendUtils.ApAssembleStoreType.extension => {
  {
    id: id,
    protocolIconBase64: protocolIconBase64,
    protocolConfigStr: protocolConfigStr,
    version: version,
    newName: newName,
    isStart: isStart,
    data: data,
  }
}

let selectExtension = (~id, ~dispatch) => {
  SelectedExtensions.Method.selectExtension(dispatch, id)
}

let useSelector = ({apAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  SelectedExtensions.Method.useSelector(apAssembleState)
