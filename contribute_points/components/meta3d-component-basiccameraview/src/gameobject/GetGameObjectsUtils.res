open StateType

let get = ({gameObjectMap}, cameraView) =>
  switch gameObjectMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraView) {
  | None => []
  | Some(gameObject) => [gameObject]
  }
