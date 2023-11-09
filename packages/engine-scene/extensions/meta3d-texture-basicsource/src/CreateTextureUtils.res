let create = (state: Meta3dTextureBasicsourceProtocol.StateType.state) => {
  let uid = state.maxUID

  let state = {
    ...state,
    maxUID:uid->succ,
    materials: state.materials->Meta3dCommonlib.ImmutableSparseMap.set(uid, []),
  }

  (state, uid)
}
