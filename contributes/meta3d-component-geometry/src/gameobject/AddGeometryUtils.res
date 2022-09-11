open StateType

let add = ({gameObjectsMap, gameObjectGeometryMap} as state, gameObject, geometry) => {
  

  gameObjectsMap->Meta3dCommonlib.ArrayMapUtils.addValue(geometry, gameObject)->ignore

  gameObjectGeometryMap->Meta3dCommonlib.MutableSparseMap.set(gameObject, geometry)->ignore

  state
}
