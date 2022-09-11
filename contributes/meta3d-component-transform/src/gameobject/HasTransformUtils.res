open StateType

let has = ({gameObjectTransformMap}, gameObject) => {
  gameObjectTransformMap->Meta3dCommonlib.MutableSparseMap.has(gameObject)
}
