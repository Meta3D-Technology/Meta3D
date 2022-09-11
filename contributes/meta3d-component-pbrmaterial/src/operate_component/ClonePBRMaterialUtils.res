open StateType

let _setData = ({diffuseColors, speculars} as state, clonedMaterial, (diffuseColor, specular)) => {
  OperateTypeArrayPBRMaterialUtils.setDiffuseColor(
    clonedMaterial,
    diffuseColor->Obj.magic,
    diffuseColors,
  )
  OperateTypeArrayPBRMaterialUtils.setSpecular(clonedMaterial, specular->Obj.magic, speculars)

  state
}

let _getData = ({diffuseColors, speculars} as state, sourceMaterial) => {
  (
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getDiffuseColor(
      sourceMaterial,
      diffuseColors,
    ),
    Meta3dComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getSpecular(
      sourceMaterial,
      speculars,
    ),
  )
}

let _handleShareMaterial = (state, sourceMaterial, countRange) => (
  state,
  countRange->Js.Array.map(_ => sourceMaterial, _),
)

let _handleNotShareMaterial = (state, sourceMaterial, countRange) => {
  Meta3dCommonlib.CloneUtils.clone(
    state,
    (CreatePBRMaterialUtils.create, _getData, _setData),
    countRange,
    sourceMaterial,
  )
}

let clone = (
  state,
  countRange,
  {isShare}: Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
  sourceMaterial,
) => {
  isShare
    ? _handleShareMaterial(state, sourceMaterial, countRange)
    : _handleNotShareMaterial(state, sourceMaterial, countRange)
}
