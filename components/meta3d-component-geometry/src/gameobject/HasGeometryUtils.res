open StateType

let has = ({gameObjectGeometryMap}, gameObject) => {
  gameObjectGeometryMap->Meta3dCommonlib.MutableSparseMap.has(gameObject -> GameObjectTypeConvertUtils.gameObjectToInt)
}
