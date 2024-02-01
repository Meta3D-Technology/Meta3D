open StateType

let add = ({gameObjectMap, gameObjectScriptMap} as state, gameObject, script) => {
  let gameObject = gameObject

  {
    ...state,
    gameObjectMap: gameObjectMap->Meta3dCommonlib.ImmutableSparseMap.set(script, gameObject),
    gameObjectScriptMap: gameObjectScriptMap->Meta3dCommonlib.ImmutableSparseMap.set(
      gameObject,
      script,
    ),
  }
}
