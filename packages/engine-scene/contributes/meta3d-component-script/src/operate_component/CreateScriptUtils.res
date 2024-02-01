let create = (state: StateType.state): (StateType.state, StateType.script) => {
  let index = state.maxIndex
  let (disposedScripts, index, newIndex) =
    state.disposedScripts->Meta3dCommonlib.IndexComponentUtils.generateIndex(index)

  (
    {
      ...state,
      maxIndex: newIndex,
      disposedScripts,
    },
    index,
  )
}
