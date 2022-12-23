let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <RunElementVisual service />
}

let startApp = RunElementVisual.Method.startApp

let getVisualExtensionProtocolName = RunElementVisual.Method._getVisualExtensionProtocolName
