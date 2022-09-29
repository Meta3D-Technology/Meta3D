let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <SelectedUIControls service />
}

let buildSelectedUIControl = (
  ~name="e1",
  ~protocolIconBase64="i1",
  ~id="e1",
  (),
): FrontendUtils.UIViewStoreType.uiControl => {
  {
    id: id,
    protocolIconBase64: protocolIconBase64,
    name: name,
    data: {
      contributePackageData: ContributeTool.buildContributePackageData(~name, ()),
      contributeFuncData: Js.Typed_array.Uint8Array.make([]),
    },
  }
}

// let selectUIControl = (~id, ~dispatch) => {
//   SelectedUIControls.Method.selectUIControl(dispatch, id)
// }

let useSelector = ({apViewState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  SelectedUIControls.Method.useSelector
