open StateType

let get = ({gameObjectMap}, script) =>
  switch gameObjectMap->Meta3dCommonlib.ImmutableSparseMap.get(script) {
  | None => []
  | Some(gameObject) => [gameObject]
  }
