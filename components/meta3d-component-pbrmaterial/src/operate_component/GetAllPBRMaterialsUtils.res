open Meta3dComponentPbrmaterialProtocol.Index

let getAll = ({gameObjectPBRMaterialMap}) => {
  gameObjectPBRMaterialMap->Meta3dCommonlib.MutableSparseMap.getValues
}
