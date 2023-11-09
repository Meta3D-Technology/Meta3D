open StateType

let get = ({gameObjectArcballCameraControllerMap}, gameObject) => {
  gameObjectArcballCameraControllerMap->Meta3dCommonlib.ImmutableSparseMap.getNullable(gameObject)
}
