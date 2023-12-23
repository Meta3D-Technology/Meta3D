let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  // ~handleWhenRunFunc=() => (),
  ~runButtonTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~account="a1"->Some,
  ~selectedContributes=list{},
  (),
) => {
  <RunElementVisualController service account selectedContributes runButtonTarget />
}

// let getAndSetNewestVisualExtension = RunElementVisualController.Method.getAndSetNewestVisualExtension

// let getVisualExtensionName = RunElementVisualController.Method._getVisualExtensionName

// let getVisualExtensionProtocolName = RunElementVisualController.Method._getVisualExtensionProtocolName

// let loadAndBuildVisualExtension = (service, file) =>
//   ElementVisualUtils._loadAndBuildVisualExtension(service, file)

let run = RunElementVisualController.Method.run
