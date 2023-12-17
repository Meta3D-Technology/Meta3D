let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~handleWhenShowUIControlsFunc=() => (),
  ~handleWhenSelectUIControlFunc=_ => (),
  ~handleWhenSelectTreeNodeFunc=_ => (),
  ~selectedContributes=list{},
  ~addUIControlButtonTarget=Obj.magic(1),
  ~selectSceneViewUIControlTarget=Obj.magic(1),
  ~rootTarget=Obj.magic(1),
  ~selectGameViewUIControlTarget=Obj.magic(1),
  (),
) => {
  <SelectedUIControls
    service
    handleWhenShowUIControlsFunc
    handleWhenSelectUIControlFunc
    handleWhenSelectTreeNodeFunc
    selectedContributes
    addUIControlButtonTarget
    selectSceneViewUIControlTarget
    rootTarget
    selectGameViewUIControlTarget
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
