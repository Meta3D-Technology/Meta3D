open StateType

let setName = (state, light, name) => {
  let {names} = state

  {
    ...state,
    names: names->Meta3dCommonlib.ImmutableSparseMap.set(light, name),
  }
}

let setData = (.
  {colors, intensities} as state,
  light,
  dataName: Meta3dEngineCoreProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreProtocol.ComponentContributeType.dataValue,
): StateType.state => {
   switch dataName {
  | dataName if dataName == Meta3dComponentDirectionlightProtocol.Index.dataName.name =>
    setName(state, light, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentDirectionlightProtocol.Index.dataName.color =>
   OperateTypeArrayDirectionLightUtils.setColor(light, dataValue->Obj.magic, colors)

   state
  | dataName if dataName == Meta3dComponentDirectionlightProtocol.Index.dataName.intensity =>
    OperateTypeArrayDirectionLightUtils.setIntensity(light, dataValue->Obj.magic, intensities)

    state
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildFatalMessage(
          ~title="setData",
          ~description=j`unknown dataName:${dataName->Obj.magic}`,
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}
