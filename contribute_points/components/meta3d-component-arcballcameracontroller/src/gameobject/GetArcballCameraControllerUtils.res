open StateType

let get = ({gameObjectArcballCameraControllerMap}, gameObject) => {
  gameObjectArcballCameraControllerMap
  ->Meta3dCommonlib.ImmutableSparseMap.unsafeGet(
    gameObject,
  )
  ->Js.Nullable.return
}
