let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ~account="a1"->Some, ~selectedContributes=list{}, ()) => {
  <RunElementVisualController service account selectedContributes/>
}

// let getAndSetNewestVisualExtension = RunElementVisualController.Method.getAndSetNewestVisualExtension

// let getVisualExtensionName = RunElementVisualController.Method._getVisualExtensionName

// let getVisualExtensionProtocolName = RunElementVisualController.Method._getVisualExtensionProtocolName

// let loadAndBuildVisualExtension = (service, file) =>
//   ElementVisualUtils._loadAndBuildVisualExtension(service, file)

let run = RunElementVisualController.Method.run
