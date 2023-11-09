open StateType

let mark = (state, cameraProjection, isDirty) => {
  {
    ...state,
    dirtyMap: state.dirtyMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraProjection, isDirty),
  }
}

let isDirty = (state, cameraProjection) => {
  let {dirtyMap} = state

  dirtyMap->Meta3dCommonlib.MutableSparseMap.unsafeGet(cameraProjection) ===
    true->Meta3dCommonlib.Contract.ensureCheck(isDirty => {
      open Meta3dCommonlib.Contract
      open Operators

      test(
        Meta3dCommonlib.Log.buildAssertMessage(~expect=j`return bool`, ~actual=j`not`),
        () => {
          isDirty->assertIsBool
        },
      )
    }, ConfigUtils.getIsDebug(state))
}
