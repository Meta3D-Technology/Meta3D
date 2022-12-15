let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <PackageSelectedContributes service />
}

let buildSelectedContribute = (
  ~name="e1",
  ~protocolIconBase64="i1",
  ~protocolConfigStr=None,
  ~newName=None,
  ~id="e1",
  ~version="0.0.1",
  ~data=ContributeTool.buildContributeData(
    ~contributePackageData=ContributeTool.buildContributePackageData(~name, ()),
    (),
  ),
  (),
): FrontendUtils.PackageAssembleStoreType.contribute => {
  {
    id,
    version,
    protocolIconBase64,
    protocolConfigStr,
    newName,
    data,
  }
}

let selectContribute = (~id, ~dispatch) => {
  PackageSelectedContributes.Method.selectContribute(dispatch, id)
}

let useSelector = ({packageAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  PackageSelectedContributes.Method.useSelector
