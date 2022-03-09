open Meta3dComponentGeometryProtocol.Index

let get = ({gameObjectGeometryMap}, gameObject) => {
  gameObjectGeometryMap->Meta3dCommonlib.MutableSparseMap.getNullable(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
}
