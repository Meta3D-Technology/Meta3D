let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <SelectedContributes service />
}

let buildSelectedContribute = (
  ~name="e1",
  ~protocolIconBase64="i1",
  ~newName=None,
  ~id="e1",
  (),
): FrontendUtils.ApViewStoreType.contribute => {
  {
    id: id,
    protocolIconBase64: protocolIconBase64,
    newName: newName,
    data: {
      contributePackageData: ContributeTool.buildContributePackageData(~name, ()),
      contributeFuncData: Js.Typed_array.Uint8Array.make([]),
    },
  }
}

let selectContribute = (~id, ~dispatch) => {
  SelectedContributes.Method.selectContribute(dispatch, id)
}

let useSelector =({apViewState}: FrontendUtils.AssembleSpaceStoreType.state)=> SelectedContributes.Method.useSelector
