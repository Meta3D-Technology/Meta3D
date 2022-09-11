open StateType

let _removeComponent = (map, gameObject) => Meta3dCommonlib.MutableSparseMap.remove(map, gameObject)

let _removeGameObject = (map, component) => Meta3dCommonlib.MutableSparseMap.remove(map, component)

let remove = ({gameObjectMap, gameObjectArcballCameraControllerMap} as state, gameObject, cameraController) => {
  gameObjectMap->_removeGameObject(cameraController)->ignore

  gameObjectArcballCameraControllerMap->_removeComponent(gameObject)->ignore

  state
}
