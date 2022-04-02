open StateType

let _removeComponent = (map, gameObject) => Meta3dCommonlib.MutableSparseMap.remove(map, gameObject)

let _removeGameObject = (map, component) => Meta3dCommonlib.MutableSparseMap.remove(map, component)

let remove = ({gameObjectMap, gameObjectDirectionLightMap} as state, gameObject, light) => {
  gameObjectMap->_removeGameObject(light)->ignore

  gameObjectDirectionLightMap->_removeComponent(gameObject)->ignore

  state
}
