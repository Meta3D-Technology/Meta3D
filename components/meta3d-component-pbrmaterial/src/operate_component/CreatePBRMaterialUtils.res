let create = (state: StateType.state): (StateType.state, Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial) => {
  let index = state.maxIndex
  // let newIndex = index->Meta3dCommonlib.IndexComponentUtils.generateIndex
  let (_,_, newIndex ) = index->Meta3dCommonlib.IndexComponentUtils.generateIndex([], _)

  state.maxIndex = newIndex

  (
    state,
    index->Meta3dCommonlib.BufferComponentUtils.checkNotExceedMaxCountByIndex(
      ConfigUtils.getIsDebug(state),
      _,
      ConfigUtils.getPBRMaterialCount(state),
    ),
  )
}
