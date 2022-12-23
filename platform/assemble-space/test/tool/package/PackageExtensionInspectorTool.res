let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <PackageExtensionInspector service />
}

let markEntryExtension = (~dispatch, ~inspectorCurrentExtension) => {
  PackageExtensionInspector.Method.markEntryExtension(dispatch, inspectorCurrentExtension)
}

let unmarkEntryExtension = (~dispatch, ~inspectorCurrentExtension) => {
  PackageExtensionInspector.Method.unmarkEntryExtension(dispatch, inspectorCurrentExtension)
}

// let setExtensionNewName = (~dispatch, ~inspectorCurrentExtension, ~newName) => {
//   PackageExtensionInspector.Method.setExtensionNewName(dispatch, inspectorCurrentExtension, newName)
// }

let getInspectorCurrentExtension = PackageExtensionInspector.Method.getInspectorCurrentExtension

let useSelector = ({packageAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  PackageExtensionInspector.Method.useSelector(packageAssembleState)
