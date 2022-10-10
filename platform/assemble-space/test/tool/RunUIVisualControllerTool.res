let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <RunUIVisualController service />
}

let getAndSetNewestVisualExtension = RunUIVisualController.Method.getAndSetNewestVisualExtension

let getVisualExtensionName = RunUIVisualController.Method._getVisualExtensionName

let getVisualExtensionProtocolName = RunUIVisualController.Method._getVisualExtensionProtocolName

let loadAndBuildVisualExtension = (service, file) =>
  UIVisualUtils._loadAndBuildVisualExtension(service, file, getVisualExtensionName())

let run = RunUIVisualController.Method.run
