open StateType

let get = ({gameObjectMap}, cameraProjection) =>
  switch gameObjectMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraProjection) {
  | None => []
  | Some(gameObject) => [gameObject]
  }
