let create = (state: StateType.state): (StateType.state, StateType.basicCameraView) => {
  let index = state.maxIndex
// TODO fix for dispose
  let (_, index, newIndex) =
    []->Meta3dCommonlib.IndexComponentUtils.generateIndex(index)


  (
    {
      ...state,
      maxIndex: newIndex,
    },
    index,
  )
}
