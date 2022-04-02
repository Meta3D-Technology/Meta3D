open StateType

let has = ({gameObjectArcballCameraControllerMap}, gameObject) => {
  gameObjectArcballCameraControllerMap->Meta3dCommonlib.ImmutableSparseMap.has(
    gameObject,
  )
}
