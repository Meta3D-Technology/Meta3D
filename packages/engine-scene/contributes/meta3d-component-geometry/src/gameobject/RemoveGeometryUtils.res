open StateType

let _removeComponent = (map, gameObject) => Meta3dCommonlib.MutableSparseMap.remove(map, gameObject)

let remove = ({gameObjectsMap, gameObjectGeometryMap} as state, gameObject, geometry) => {
  

  gameObjectsMap
  ->Meta3dCommonlib.ArrayMapUtils.removeValue(
    ConfigUtils.getIsDebug(state),
    geometry,
    gameObject,
  )
  ->ignore

  gameObjectGeometryMap->_removeComponent(gameObject)->ignore

  state
}
