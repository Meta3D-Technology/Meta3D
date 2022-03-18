open StateType

let get = ({gameObjectPerspectiveCameraProjectionMap}, gameObject) => {
  gameObjectPerspectiveCameraProjectionMap
  ->Meta3dCommonlib.ImmutableSparseMap.unsafeGet(
    gameObject,
  )
  ->Js.Nullable.return
}
