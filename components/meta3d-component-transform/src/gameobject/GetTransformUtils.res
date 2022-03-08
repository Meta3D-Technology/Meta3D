open Meta3dComponentTransformProtocol.Index

let get = ({gameObjectTransformMap}, gameObject) => {
  gameObjectTransformMap->Meta3dCommonlib.MutableSparseMap.getNullable(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
}
