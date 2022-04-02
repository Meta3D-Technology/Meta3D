open StateType

let add = (
  {gameObjectMap, gameObjectArcballCameraControllerMap} as state,
  gameObject,
  cameraController,
) => {
  let gameObject = gameObject

  {
    ...state,
    gameObjectMap: gameObjectMap->Meta3dCommonlib.ImmutableSparseMap.set(
      cameraController,
      gameObject,
    ),
    gameObjectArcballCameraControllerMap: gameObjectArcballCameraControllerMap->Meta3dCommonlib.ImmutableSparseMap.set(
      gameObject,
      cameraController,
    ),
  }
}
