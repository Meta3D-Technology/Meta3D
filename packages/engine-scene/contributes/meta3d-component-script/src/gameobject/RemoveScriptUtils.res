open StateType

let _removeComponent = (map, gameObject) => Meta3dCommonlib.MutableSparseMap.remove(map, gameObject)

let _removeGameObject = (map, component) => Meta3dCommonlib.MutableSparseMap.remove(map, component)

let remove = ({gameObjectMap, gameObjectScriptMap} as state, gameObject, script) => {
  gameObjectMap->_removeGameObject(script)->ignore

  gameObjectScriptMap->_removeComponent(gameObject)->ignore

  state
}
