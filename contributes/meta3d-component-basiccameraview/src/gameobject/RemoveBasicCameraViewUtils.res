open StateType

let _removeComponent = (map, gameObject) => Meta3dCommonlib.MutableSparseMap.remove(map, gameObject)

let _removeGameObject = (map, component) => Meta3dCommonlib.MutableSparseMap.remove(map, component)

let remove = ({gameObjectMap, gameObjectBasicCameraViewMap} as state, gameObject, cameraView) => {
  gameObjectMap->_removeGameObject(cameraView)->ignore

  gameObjectBasicCameraViewMap->_removeComponent(gameObject)->ignore

  state
}
