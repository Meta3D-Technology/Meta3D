let create = (state: StateType.state): (StateType.state, StateType.directionLight) => {
  let index = state.maxIndex
  let (disposedDirectionLights, index, newIndex) =
    state.disposedDirectionLights->Meta3dCommonlib.IndexComponentUtils.generateIndex(index)

  state.maxIndex = newIndex
  state.disposedDirectionLights = disposedDirectionLights


  (
    state,
    index->Meta3dCommonlib.BufferComponentUtils.checkNotExceedMaxCountByIndex(
      ConfigUtils.getIsDebug(state),
      _,
      ConfigUtils.getDirectionLightCount(state),
    ),
  )
}
