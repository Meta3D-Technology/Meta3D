open Meta3dComponentTransformProtocol.Index

let mark = (state, transform, isDirty) => {
  state.dirtyMap->Meta3dCommonlib.MutableSparseMap.set(transform, isDirty)->ignore

  state
}

let isDirty = (state, transform) => {
  let {dirtyMap} = state

  dirtyMap->Meta3dCommonlib.MutableSparseMap.unsafeGet(transform) ===
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
