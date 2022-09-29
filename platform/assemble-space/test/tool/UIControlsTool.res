let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <UIControls service />
}

let buildSelectedContribute = (
  ~protocolName="e1",
  ~protocolIconBase64="i1",
  ~newName=None,
  ~id="e1",
  (),
): FrontendUtils.ApViewStoreType.contribute => {
  {
    id: id,
    protocolIconBase64: protocolIconBase64,
    newName: newName,
    data: {
      contributePackageData: ContributeTool.buildContributePackageData(
        ~protocol={
          name: protocolName,
          version: "0.0.1",
        },
        (),
      ),
      contributeFuncData: Js.Typed_array.Uint8Array.make([]),
    },
  }
}

let selectUIControl = UIControls.Method.selectUIControl
