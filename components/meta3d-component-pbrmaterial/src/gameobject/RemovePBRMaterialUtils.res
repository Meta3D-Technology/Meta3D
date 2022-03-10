open StateType

let _removeComponent = (map, gameObject) => Meta3dCommonlib.MutableSparseMap.remove(map, gameObject)

let remove = ({gameObjectsMap, gameObjectPBRMaterialMap} as state, gameObject, pbrMaterial) => {
  let gameObject = gameObject->GameObjectTypeConvertUtils.gameObjectToInt

  gameObjectsMap
  ->Meta3dCommonlib.ArrayMapUtils.removeValue(
    ConfigUtils.getIsDebug(state),
    pbrMaterial,
    gameObject,
  )
  ->ignore

  gameObjectPBRMaterialMap->_removeComponent(gameObject)->ignore

  state
}
