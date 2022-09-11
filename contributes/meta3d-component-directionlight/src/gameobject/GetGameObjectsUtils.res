open StateType

let get = ({gameObjectMap}, light) =>
  switch gameObjectMap->Meta3dCommonlib.MutableSparseMap.get(light) {
  | None => []
  | Some(gameObject) => [gameObject]
  }
