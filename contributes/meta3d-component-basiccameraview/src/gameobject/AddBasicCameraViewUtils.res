open StateType

let add = ({gameObjectMap, gameObjectBasicCameraViewMap} as state, gameObject, cameraView) => {
  let gameObject = gameObject

  {
    ...state,
    gameObjectMap: gameObjectMap->Meta3dCommonlib.ImmutableSparseMap.set(
      cameraView,
      gameObject,
    ),
    gameObjectBasicCameraViewMap: gameObjectBasicCameraViewMap->Meta3dCommonlib.ImmutableSparseMap.set(
      gameObject,
      cameraView,
    ),
  }
}
