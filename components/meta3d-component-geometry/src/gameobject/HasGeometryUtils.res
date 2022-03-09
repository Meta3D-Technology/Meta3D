open Meta3dComponentGeometryProtocol.Index

let has = ({gameObjectGeometryMap}, gameObject) => {
  gameObjectGeometryMap->Meta3dCommonlib.MutableSparseMap.has(gameObject -> GameObjectTypeConvertUtils.gameObjectToInt)
}
