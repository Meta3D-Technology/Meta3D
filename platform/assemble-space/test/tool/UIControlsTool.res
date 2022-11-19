let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <UIControls service />
}

let buildSelectedContribute = (
  ~protocolName="e1",
  ~protocolIconBase64="i1",
  ~protocolConfigStr=None,
  ~newName=None,
  ~id="e1",
  ~version="0.0.1",
  (),
): FrontendUtils.ApAssembleStoreType.contribute => {
  {
    id: id,
    version: version,
    protocolIconBase64: protocolIconBase64,
    protocolConfigStr: protocolConfigStr,
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

let buildSpecific = (
  ~name="s1",
  ~type_=#string,
  ~value="d1"->Obj.magic,
  (),
): Meta3dType.UIControlProtocolConfigType.uiControlSpecicFieldData => {
  {
    name: name,
    type_: type_,
    value: value,
  }
}
