open StateType

let _removeComponent = (map, gameObject) => Meta3dCommonlib.MutableSparseMap.remove(map, gameObject)

let _removeGameObject = (map, component) => Meta3dCommonlib.MutableSparseMap.remove(map, component)

let remove = ({gameObjectMap, gameObjectTransformMap} as state, gameObject, transform) => {
  gameObjectMap->_removeGameObject(transform)->ignore

  gameObjectTransformMap->_removeComponent(gameObject)->ignore

  state
}
