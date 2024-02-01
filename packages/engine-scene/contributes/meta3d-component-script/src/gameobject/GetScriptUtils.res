open StateType

let get = ({gameObjectScriptMap}, gameObject) => {
  gameObjectScriptMap->Meta3dCommonlib.ImmutableSparseMap.getNullable(
    gameObject,
  )
}
