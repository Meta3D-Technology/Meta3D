open StateType

let has = ({gameObjectPBRMaterialMap}, gameObject) => {
  gameObjectPBRMaterialMap->Meta3dCommonlib.MutableSparseMap.has(gameObject -> GameObjectTypeConvertUtils.gameObjectToInt)
}
