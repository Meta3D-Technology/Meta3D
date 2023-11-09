open StateType

let mark = (state, cameraController, isDirty) => {
  {
    ...state,
    dirtyMap: state.dirtyMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraController, isDirty),
  }
}

let isDirty = (state, cameraController) => {
  let {dirtyMap} = state

  dirtyMap->Meta3dCommonlib.MutableSparseMap.unsafeGet(cameraController) ===
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
