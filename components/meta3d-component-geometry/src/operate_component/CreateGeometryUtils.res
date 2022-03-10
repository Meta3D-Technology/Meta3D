let create = (state: StateType.state): (StateType.state, Meta3dComponentGeometryProtocol.Index.geometry) => {
  let index = state.maxIndex
  // let newIndex = index->Meta3dCommonlib.IndexComponentUtils.generateIndex
  let (_,_, newIndex ) = index->Meta3dCommonlib.IndexComponentUtils.generateIndex([], _)

  state.maxIndex = newIndex

  (
    state,
    index->Meta3dCommonlib.BufferComponentUtils.checkNotExceedMaxCountByIndex(
      ConfigUtils.getIsDebug(state),
      _,
      ConfigUtils.getGeometryCount(state),
    ),
  )
}
