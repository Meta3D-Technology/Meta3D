let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <PackageSelectedExtensions service />
}

let buildSelectedExtension = (
  ~name="e1",
  ~protocolName="ep1",
  ~protocolVersion="0.0.1",
  ~protocolIconBase64="i1",
  ~protocolConfigStr=None,
  ~protocolDisplayName="d1",
  ~protocolRepoLink="",
  ~protocolDescription="dp1",
  // ~newName=None,
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
    protocolName,
    protocolVersion,
    protocolIconBase64,
    protocolConfigStr,
    version,
    protocolDisplayName,
    protocolRepoLink,
    protocolDescription,
    isEntry,
    data,
  }
}

let selectExtension = (~id, ~dispatch) => {
  PackageSelectedExtensions.Method.selectExtension(dispatch, id)
}

let useSelector = ({packageAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  PackageSelectedExtensions.Method.useSelector(packageAssembleState)
