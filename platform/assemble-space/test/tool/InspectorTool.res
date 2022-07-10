let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <Inspector service />
}

let startExtension = (~dispatch, ~inspectorCurrentExtension) => {
  Inspector.Method.startExtension(dispatch, inspectorCurrentExtension)
}

let unstartExtension = (~dispatch, ~inspectorCurrentExtension) => {
  Inspector.Method.unstartExtension(dispatch, inspectorCurrentExtension)
}

let setExtensionNewName = (~dispatch, ~inspectorCurrentExtension, ~newName) => {
  Inspector.Method.setExtensionNewName(dispatch, inspectorCurrentExtension, newName)
}

let getInspectorCurrentExtension = Inspector.Method.getInspectorCurrentExtension

let useSelector = Inspector.Method.useSelector
