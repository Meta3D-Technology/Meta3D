open StateType

let _setData = ({colors, intensities} as state, clonedDirectionLight, (name, color, intensity)) => {
  OperateTypeArrayDirectionLightUtils.setColor(clonedDirectionLight, color->Obj.magic, colors)
  OperateTypeArrayDirectionLightUtils.setIntensity(
    clonedDirectionLight,
    intensity->Obj.magic,
    intensities,
  )

  name
  ->Meta3dCommonlib.OptionSt.map(name => {
    SetDirectionLightDataUtils.setName(state, clonedDirectionLight, name)
  })
  ->Meta3dCommonlib.OptionSt.getWithDefault(state)
}

let _getData = ({colors, intensities} as state, sourceDirectionLight) => {
  (
    GetDirectionLightDataUtils.getName(state, sourceDirectionLight)->Meta3dCommonlib.OptionSt.fromNullable,
    Meta3dComponentWorkerUtils.OperateTypeArrayDirectionLightUtils.getColor(
      sourceDirectionLight,
      colors,
    ),
    Meta3dComponentWorkerUtils.OperateTypeArrayDirectionLightUtils.getIntensity(
      sourceDirectionLight,
      intensities,
    ),
  )
}

let clone = (state, countRange, sourceDirectionLight) => {
  Meta3dCommonlib.CloneUtils.clone(
    state,
    (CreateDirectionLightUtils.create, _getData, _setData),
    countRange,
    sourceDirectionLight,
  )
}
