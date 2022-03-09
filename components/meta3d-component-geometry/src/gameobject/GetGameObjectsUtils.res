open Meta3dComponentGeometryProtocol.Index

let get = ({gameObjectsMap}, geometry) =>
  gameObjectsMap
  ->Meta3dCommonlib.MutableSparseMap.get(geometry)
  ->Meta3dCommonlib.OptionSt.getWithDefault([])
  ->Meta3dCommonlib.ArraySt.map(GameObjectTypeConvertUtils.intToGameObject)
