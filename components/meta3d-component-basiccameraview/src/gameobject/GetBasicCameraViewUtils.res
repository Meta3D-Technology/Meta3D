open StateType

let get = ({gameObjectBasicCameraViewMap}, gameObject) => {
  gameObjectBasicCameraViewMap
  ->Meta3dCommonlib.ImmutableSparseMap.unsafeGet(
    gameObject,
  )
  ->Js.Nullable.return
}
