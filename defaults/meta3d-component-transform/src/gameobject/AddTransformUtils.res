open StateType

let add = ({gameObjectMap, gameObjectTransformMap} as state, gameObject, transform) => {
  let gameObject = gameObject->GameObjectTypeConvertUtils.gameObjectToInt

  gameObjectMap->Meta3dCommonlib.MutableSparseMap.set(transform, gameObject)->ignore

  gameObjectTransformMap->Meta3dCommonlib.MutableSparseMap.set(gameObject, transform)->ignore

  state
}
