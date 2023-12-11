let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <SelectedContributes service />
}

let buildSelectedContribute = (
  ~name="e1",
  ~protocolIconBase64="i1",
  ~protocolConfigStr=None,
  // ~newName=None,
  ~id="e1",
  ~version="0.0.1",
  ~data=ContributeTool.buildContributeData(
    ~contributePackageData=ContributeTool.buildContributePackageData(~name, ()),
    (),
  ),
  (),
): ApAssembleStoreType.contribute => {
  {
    id: id,
    version: version,
    protocolIconBase64: protocolIconBase64,
    protocolConfigStr: protocolConfigStr,
    // newName: newName,
    data: data,
  }
}

let selectContribute = (~id, ~dispatch) => {
  SelectedContributes.Method.selectContribute(dispatch, id)
}

let useSelector = ({apAssembleState}: AssembleSpaceStoreType.state) =>
  SelectedContributes.Method.useSelector
