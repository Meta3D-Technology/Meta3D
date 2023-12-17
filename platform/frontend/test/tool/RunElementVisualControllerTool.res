let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~handleWhenRunFunc=() => (),
  ~runButtonTarget=Obj.magic(1),
  ~account="a1"->Some,
  ~selectedContributes=list{},
  (),
) => {
  <RunElementVisualController
    service handleWhenRunFunc account selectedContributes runButtonTarget
  />
}

// let getAndSetNewestVisualExtension = RunElementVisualController.Method.getAndSetNewestVisualExtension

// let getVisualExtensionName = RunElementVisualController.Method._getVisualExtensionName

// let getVisualExtensionProtocolName = RunElementVisualController.Method._getVisualExtensionProtocolName

// let loadAndBuildVisualExtension = (service, file) =>
//   ElementVisualUtils._loadAndBuildVisualExtension(service, file)

let run = RunElementVisualController.Method.run
