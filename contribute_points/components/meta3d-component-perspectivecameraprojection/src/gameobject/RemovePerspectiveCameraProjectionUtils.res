open StateType

let _removeComponent = (map, gameObject) => Meta3dCommonlib.MutableSparseMap.remove(map, gameObject)

let _removeGameObject = (map, component) => Meta3dCommonlib.MutableSparseMap.remove(map, component)

let remove = ({gameObjectMap, gameObjectPerspectiveCameraProjectionMap} as state, gameObject, cameraProjection) => {
  gameObjectMap->_removeGameObject(cameraProjection)->ignore

  gameObjectPerspectiveCameraProjectionMap->_removeComponent(gameObject)->ignore

  state
}
