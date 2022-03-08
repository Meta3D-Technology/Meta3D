open Meta3dComponentTransformProtocol.Index

let getAll = ({gameObjectTransformMap}) => {
  gameObjectTransformMap->Meta3dCommonlib.MutableSparseMap.getValues
}
