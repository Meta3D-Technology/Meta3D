let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <RunUIVisual service />
}

let startApp = RunUIVisual.Method.startApp

let getVisualExtensionName = RunUIVisual.Method._getVisualExtensionName
