let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <SelectedUIControls service />
}

let buildSelectedUIControl = (
  ~name="e1",
  ~protocolIconBase64="i1",
  ~protocolConfigStr="",
  ~parentId=None,
  ~id="e1",
  ~data=ContributeTool.buildContributeData(
    ~contributePackageData=ContributeTool.buildContributePackageData(~name, ()),
    (),
  ),
  (),
): FrontendUtils.ElementAssembleStoreType.uiControl => {
  {
    id: id,
    parentId: parentId,
    protocolIconBase64: protocolIconBase64,
    protocolConfigStr: protocolConfigStr,
    name: name,
    data: data,
  }
}

// let selectUIControl = (~id, ~dispatch) => {
//   SelectedUIControls.Method.selectUIControl(dispatch, id)
// }

let useSelector = ({apAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  SelectedUIControls.Method.useSelector
