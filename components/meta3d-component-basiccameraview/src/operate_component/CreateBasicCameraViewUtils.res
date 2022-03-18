let create = (state: StateType.state): (StateType.state, StateType.basicCameraView) => {
  let index = state.maxIndex
  let (disposedBasicCameraViews, index, newIndex) =
    state.disposedBasicCameraViews->Meta3dCommonlib.IndexComponentUtils.generateIndex(index)

  (
    {
      ...state,
      maxIndex: newIndex,
      disposedBasicCameraViews: disposedBasicCameraViews,
    },
    index,
  )
}
