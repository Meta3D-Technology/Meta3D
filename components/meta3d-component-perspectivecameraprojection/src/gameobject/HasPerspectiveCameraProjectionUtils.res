open StateType

let has = ({gameObjectPerspectiveCameraProjectionMap}, gameObject) => {
  gameObjectPerspectiveCameraProjectionMap->Meta3dCommonlib.ImmutableSparseMap.has(
    gameObject,
  )
}
