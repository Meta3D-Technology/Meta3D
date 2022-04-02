open StateType

let add = (
  {gameObjectMap, gameObjectPerspectiveCameraProjectionMap} as state,
  gameObject,
  cameraProjection,
) => {
  let gameObject = gameObject

  {
    ...state,
    gameObjectMap: gameObjectMap->Meta3dCommonlib.ImmutableSparseMap.set(
      cameraProjection,
      gameObject,
    ),
    gameObjectPerspectiveCameraProjectionMap: gameObjectPerspectiveCameraProjectionMap->Meta3dCommonlib.ImmutableSparseMap.set(
      gameObject,
      cameraProjection,
    ),
  }
}
