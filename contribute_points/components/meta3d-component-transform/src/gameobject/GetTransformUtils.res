open StateType

let get = ({gameObjectTransformMap}, gameObject) => {
  gameObjectTransformMap->Meta3dCommonlib.MutableSparseMap.getNullable(
    gameObject,
  )
}
