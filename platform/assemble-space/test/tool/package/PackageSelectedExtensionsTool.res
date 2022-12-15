let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <PackageSelectedExtensions service />
}

let buildSelectedExtension = (
  ~name="e1",
  ~protocolIconBase64="i1",
  ~protocolConfigStr=None,
  ~newName=None,
  ~isEntry=false,
  ~id="e1",
  ~version="",
  ~data=ExtensionTool.buildExtensionData(
    ~extensionPackageData=ExtensionTool.buildExtensionPackageData(~name, ()),
    (),
  ),
  (),
): FrontendUtils.PackageAssembleStoreType.extension => {
  {
    id,
    protocolIconBase64,
    protocolConfigStr,
    version,
    newName,
    isEntry,
    data,
  }
}

let selectExtension = (~id, ~dispatch) => {
  PackageSelectedExtensions.Method.selectExtension(dispatch, id)
}

let useSelector = ({packageAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  PackageSelectedExtensions.Method.useSelector(packageAssembleState)
