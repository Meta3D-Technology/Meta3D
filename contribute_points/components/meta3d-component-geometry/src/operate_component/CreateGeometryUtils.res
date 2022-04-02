let create = (state: StateType.state): (StateType.state, Meta3dComponentGeometryProtocol.Index.geometry) => {
  let index = state.maxIndex
  let (disposedGeometrys, index, newIndex) =
    state.disposedGeometrys->Meta3dCommonlib.IndexComponentUtils.generateIndex(index)

  state.maxIndex = newIndex
  state.disposedGeometrys = disposedGeometrys

  (
    state,
    index->Meta3dCommonlib.BufferComponentUtils.checkNotExceedMaxCountByIndex(
      ConfigUtils.getIsDebug(state),
      _,
      ConfigUtils.getGeometryCount(state),
    ),
  )
}
