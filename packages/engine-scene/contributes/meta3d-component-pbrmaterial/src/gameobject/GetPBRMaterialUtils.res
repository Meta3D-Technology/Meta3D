open StateType

let get = ({gameObjectPBRMaterialMap}, gameObject) => {
  gameObjectPBRMaterialMap->Meta3dCommonlib.MutableSparseMap.getNullable(gameObject)
}
