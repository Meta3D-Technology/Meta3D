open StateType

let get = ({gameObjectBasicCameraViewMap}, gameObject) => {
  gameObjectBasicCameraViewMap->Meta3dCommonlib.ImmutableSparseMap.getNullable(gameObject)
}
