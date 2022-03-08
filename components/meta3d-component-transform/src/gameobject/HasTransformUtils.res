open Meta3dComponentTransformProtocol.Index

let has = ({gameObjectTransformMap}, gameObject) => {
  gameObjectTransformMap->Meta3dCommonlib.MutableSparseMap.has(gameObject -> GameObjectTypeConvertUtils.gameObjectToInt)
}
