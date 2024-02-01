open StateType

let has = ({gameObjectScriptMap}, gameObject) => {
  gameObjectScriptMap->Meta3dCommonlib.ImmutableSparseMap.has(
    gameObject,
  )
}
