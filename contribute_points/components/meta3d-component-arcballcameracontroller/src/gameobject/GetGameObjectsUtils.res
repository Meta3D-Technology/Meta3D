open StateType

let get = ({gameObjectMap}, cameraController) =>
  switch gameObjectMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController) {
  | None => []
  | Some(gameObject) => [gameObject]
  }
