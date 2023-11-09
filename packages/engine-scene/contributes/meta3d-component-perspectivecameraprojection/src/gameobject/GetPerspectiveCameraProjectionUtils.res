open StateType

let get = ({gameObjectPerspectiveCameraProjectionMap}, gameObject) => {
  gameObjectPerspectiveCameraProjectionMap->Meta3dCommonlib.ImmutableSparseMap.getNullable(
    gameObject,
  )
}
