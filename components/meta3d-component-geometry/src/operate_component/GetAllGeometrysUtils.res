open Meta3dComponentGeometryProtocol.Index

let getAll = ({gameObjectGeometryMap}) => {
  gameObjectGeometryMap->Meta3dCommonlib.MutableSparseMap.getValues
}
