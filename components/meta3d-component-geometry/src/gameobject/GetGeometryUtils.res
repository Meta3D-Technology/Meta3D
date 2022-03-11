open StateType

let get = ({gameObjectGeometryMap}, gameObject) => {
  gameObjectGeometryMap->Meta3dCommonlib.MutableSparseMap.getNullable(
    gameObject,
  )
}
