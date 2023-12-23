let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  // ~handleWhenSelectUIControlFunc=_ => (),
  // ~handleWhenShowUIControlsFunc=() => (),
  ~selectedContributes=list{},
  ~setIsShowUIControls=ReactHookTool.buildEmptySetStateFunc(),
  ~selectSceneViewUIControlTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~selectGameViewUIControlTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~selectTreeUIControlTarget=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  (),
) => {
  <UIControls
    service
    // handleWhenShowUIControlsFunc
    // handleWhenSelectUIControlFunc
    setIsShowUIControls
    selectedContributes
    selectSceneViewUIControlTarget
    selectGameViewUIControlTarget
    selectTreeUIControlTarget
  />
}

let buildSelectedContribute = (
  ~protocolName="e1",
  ~protocolIconBase64="i1",
  ~protocolConfigStr=None,
  // ~newName=None,
  ~name="e1",
  ~displayName="ed1",
  ~id="e1",
  ~version="0.0.1",
  (),
): ApAssembleStoreType.contribute => {
  {
    id,
    version,
    protocolIconBase64,
    protocolConfigStr,
    // newName: newName,
    data: {
      contributePackageData: ContributeTool.buildContributePackageData(
        ~name,
        ~displayName,
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
    name,
    type_,
    value,
  }
}

let getScenViewUIControlProtocolName = UIControls.Method._getScenViewUIControlProtocolName
