open StateType

let _setData = ({colors, intensities} as state, clonedDirectionLight, (color, intensity)) => {
  OperateTypeArrayDirectionLightUtils.setColor(clonedDirectionLight, color->Obj.magic, colors)
  OperateTypeArrayDirectionLightUtils.setIntensity(
    clonedDirectionLight,
    intensity->Obj.magic,
    intensities,
  )

  state
}

let _getData = ({colors, intensities} as state, sourceDirectionLight) => {
  (
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
