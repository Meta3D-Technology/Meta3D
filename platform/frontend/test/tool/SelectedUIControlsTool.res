let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <SelectedUIControls service />
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
    id: id,
    parentId: parentId,
    children: children,
    protocolIconBase64: protocolIconBase64,
    protocolConfigStr: protocolConfigStr,
    displayName: displayName,
    data: data,
  }
}

// let selectUIControl = (~id, ~dispatch) => {
//   SelectedUIControls.Method.selectUIControl(dispatch, id)
// }

let useSelector = ({apAssembleState}: AssembleSpaceStoreType.state) =>
  SelectedUIControls.Method.useSelector
