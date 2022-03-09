open Meta3dComponentPbrmaterialProtocol.Index

let get = ({gameObjectPBRMaterialMap}, gameObject) => {
  gameObjectPBRMaterialMap
  ->Meta3dCommonlib.MutableSparseMap.unsafeGet(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
  ->Js.Nullable.return
}
