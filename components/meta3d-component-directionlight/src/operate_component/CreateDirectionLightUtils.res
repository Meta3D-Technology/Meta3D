let create = (state: StateType.state): (StateType.state, StateType.directionLight) => {
  let index = state.maxIndex
  // let newIndex = index->Meta3dCommonlib.IndexComponentUtils.generateIndex

// TODO fix for dispose
  let (_, index, newIndex) =
    []->Meta3dCommonlib.IndexComponentUtils.generateIndex(index)

  state.maxIndex = newIndex

  (
    state,
    index->Meta3dCommonlib.BufferComponentUtils.checkNotExceedMaxCountByIndex(
      ConfigUtils.getIsDebug(state),
      _,
      ConfigUtils.getDirectionLightCount(state),
    ),
  )
}
