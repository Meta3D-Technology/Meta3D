open StateType

let get = ({gameObjectPBRMaterialMap}, gameObject) => {
  gameObjectPBRMaterialMap
  ->Meta3dCommonlib.MutableSparseMap.unsafeGet(
    gameObject,
  )
  ->Js.Nullable.return
}
