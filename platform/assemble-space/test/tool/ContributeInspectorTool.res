let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <ContributeInspector service />
}

let setContributeNewName = (~dispatch, ~inspectorCurrentContribute, ~newName) => {
  ContributeInspector.Method.setContributeNewName(dispatch, inspectorCurrentContribute, newName)
}

let getInspectorCurrentContribute = ContributeInspector.Method.getInspectorCurrentContribute

let useSelector = ({apViewState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  ContributeInspector.Method.useSelector
