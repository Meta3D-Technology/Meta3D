open StateType

let getName = (state, light) => state.names->Meta3dCommonlib.ImmutableSparseMap.getNullable(light)

let getData = (. {colors, intensities} as state, light, dataName: int): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName if dataName == Meta3dComponentDirectionlightProtocol.Index.dataName.name =>
    getName(state, light)->Obj.magic
  | dataName if dataName == Meta3dComponentDirectionlightProtocol.Index.dataName.color =>
    Meta3dComponentWorkerUtils.OperateTypeArrayDirectionLightUtils.getColor(light, colors)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentDirectionlightProtocol.Index.dataName.intensity =>
    Meta3dComponentWorkerUtils.OperateTypeArrayDirectionLightUtils.getIntensity(light, intensities)
    ->Obj.magic
    ->Js.Nullable.return
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildFatalMessage(
          ~title="getData",
          ~description=j`unknown dataName:${dataName->Obj.magic}`,
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}
