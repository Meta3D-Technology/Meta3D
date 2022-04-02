open StateType

let getAll = ({gameObjectPerspectiveCameraProjectionMap}) => {
  gameObjectPerspectiveCameraProjectionMap->Meta3dCommonlib.ImmutableSparseMap.getValues
}
