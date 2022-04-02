open StateType

let has = ({gameObjectBasicCameraViewMap}, gameObject) => {
  gameObjectBasicCameraViewMap->Meta3dCommonlib.ImmutableSparseMap.has(
    gameObject,
  )
}
