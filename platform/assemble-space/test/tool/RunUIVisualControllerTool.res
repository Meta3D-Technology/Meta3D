let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <RunUIVisualController service />
}

let getAndSetVisualExtension = RunUIVisualController.Method.getAndSetVisualExtension

let getVisualExtensionName = RunUIVisualController.Method._getVisualExtensionName

let getVisualExtensionProtocolName = RunUIVisualController.Method._getVisualExtensionProtocolName

let getVisualExtensionProtocolVersion = RunUIVisualController.Method._getVisualExtensionProtocolVersion

let getVisualExtensionVersion = RunUIVisualController.Method._getVisualExtensionVersion

let loadAndBuildVisualExtension = (service, file) =>
  UIVisualUtils._loadAndBuildVisualExtension(service, file, getVisualExtensionName())

let run = RunUIVisualController.Method.run

let getRunUIVisualAppName = UIVisualUtils.getRunUIVisualAppName
