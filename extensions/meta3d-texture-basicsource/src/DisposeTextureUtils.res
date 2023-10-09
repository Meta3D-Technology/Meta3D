open Meta3dTextureBasicsourceProtocol.StateType

let _disposeData = (
  {wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, flipYs, images} as state,
  texture,
) => {
  ...state,
  wrapSs: wrapSs->Meta3dCommonlib.ImmutableSparseMap.remove(texture),
  wrapTs: wrapTs->Meta3dCommonlib.ImmutableSparseMap.remove(texture),
  magFilters: magFilters->Meta3dCommonlib.ImmutableSparseMap.remove(texture),
  minFilters: minFilters->Meta3dCommonlib.ImmutableSparseMap.remove(texture),
  formats: formats->Meta3dCommonlib.ImmutableSparseMap.remove(texture),
  types: types->Meta3dCommonlib.ImmutableSparseMap.remove(texture),
  isNeedUpdates: isNeedUpdates->Meta3dCommonlib.ImmutableSparseMap.remove(texture),
  flipYs: flipYs->Meta3dCommonlib.ImmutableSparseMap.remove(texture),
  images: images->Meta3dCommonlib.ImmutableSparseMap.remove(texture),
}

let disposeTexture = ({materials} as state, texture, material) => {
  let materials = materials->GroupTextureUtils.removeMaterial(texture, material)

  GroupTextureUtils.isGroupTexture(materials, texture)
    ? {
        ...state,
        materials,
      }
    : {
        ...state,
        materials,
      }->_disposeData(texture)
}
