open StateType

let get = ({gameObjectMap}, transform) =>
  switch gameObjectMap->Meta3dCommonlib.MutableSparseMap.get(transform) {
  | None => []
  | Some(gameObject) => [gameObject]
  }
