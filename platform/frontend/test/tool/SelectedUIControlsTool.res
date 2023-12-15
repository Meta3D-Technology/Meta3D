let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedContributes=list{},
  (),
) => {
  <SelectedUIControls service selectedContributes />
}

let buildSelectedUIControl = (
  ~displayName="e1",
  ~protocolIconBase64="i1",
  ~protocolConfigStr="",
  ~parentId=None,
  ~children=list{},
  ~id="e1",
  ~data=ContributeTool.buildContributeData(
    ~contributePackageData=ContributeTool.buildContributePackageData(~displayName, ()),
    (),
  ),
  (),
): ElementAssembleStoreType.uiControl => {
  {
    id,
    parentId,
    children,
    protocolIconBase64,
    protocolConfigStr,
    displayName,
    data,
  }
}

// let selectUIControl = (~id, ~dispatch) => {
//   SelectedUIControls.Method.selectUIControl(dispatch, id)
// }

let useSelector = ({apAssembleState}: AssembleSpaceStoreType.state) =>
  SelectedUIControls.Method.useSelector
