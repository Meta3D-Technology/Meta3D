let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <ExtensionInspector service />
}

let useEffectOnce = ExtensionInspector.Method.useEffectOnce

let startExtension = (~dispatch, ~inspectorCurrentExtension) => {
  ExtensionInspector.Method.startExtension(dispatch, inspectorCurrentExtension)
}

let unstartExtension = (~dispatch, ~inspectorCurrentExtension) => {
  ExtensionInspector.Method.unstartExtension(dispatch, inspectorCurrentExtension)
}

// let setExtensionNewName = (~dispatch, ~inspectorCurrentExtension, ~newName) => {
//   ExtensionInspector.Method.setExtensionNewName(dispatch, inspectorCurrentExtension, newName)
// }

let getInspectorCurrentExtension = ExtensionInspector.Method.getInspectorCurrentExtension

let useSelector = ({apAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  ExtensionInspector.Method.useSelector(apAssembleState)
