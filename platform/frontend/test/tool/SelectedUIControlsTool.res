let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  // ~handleWhenShowUIControlsFunc=() => (),
  // ~handleWhenSelectUIControlFunc=_ => (),
  // ~handleWhenSelectTreeNodeFunc=_ => (),
  ~selectedContributes=list{},
  ~addUIControlButtonTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~selectSceneViewUIControlTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~selectedUIControlTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~selectGameViewUIControlTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~selectTreeUIControlTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  (),
) => {
  <SelectedUIControls
    service
    // handleWhenShowUIControlsFunc
    // handleWhenSelectUIControlFunc
    // handleWhenSelectTreeNodeFunc
    selectedContributes
    addUIControlButtonTarget
    selectSceneViewUIControlTarget
    selectedUIControlTarget
    selectGameViewUIControlTarget
    selectTreeUIControlTarget
  />
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

let convertToTreeData = SelectedUIControls.Method.convertToTreeData
