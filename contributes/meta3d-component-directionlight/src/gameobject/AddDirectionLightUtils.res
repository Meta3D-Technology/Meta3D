open StateType

let add = ({gameObjectMap, gameObjectDirectionLightMap} as state, gameObject, light) => {
  let gameObject = gameObject

  gameObjectMap->Meta3dCommonlib.MutableSparseMap.set(light, gameObject)->ignore

  gameObjectDirectionLightMap->Meta3dCommonlib.MutableSparseMap.set(gameObject, light)->ignore

  state
}
