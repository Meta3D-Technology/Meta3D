let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <PackageContributeInspector />
}

// let setContributeNewName = (~dispatch, ~inspectorCurrentContribute, ~newName) => {
//   PackageContributeInspector.Method.setContributeNewName(
//     dispatch,
//     inspectorCurrentContribute,
//     newName,
//   )
// }

// let getInspectorCurrentContribute = PackageContributeInspector.Method.getInspectorCurrentContribute

// let useSelector = ({packageAssembleState}: AssembleSpaceStoreType.state) =>
//   PackageContributeInspector.Method.useSelector
