let _initDataWhenCreate = (childrenMap, index) => {
  childrenMap->Meta3dCommonlib.MutableSparseMap.set(index, [])->ignore
}

let create = (state: StateType.state): (StateType.state, StateType.transform) => {
  let index = state.maxIndex
  let newIndex = index->Meta3dCommonlib.IndexComponentUtils.generateIndex

  state.maxIndex = newIndex

  _initDataWhenCreate(state.childrenMap, index)

  let state = DirtyTransformUtils.mark(state, index, true)

  (
    state,
    index->Meta3dCommonlib.BufferComponentUtils.checkNotExceedMaxCountByIndex(
      ConfigUtils.getIsDebug(state),
      _,
      ConfigUtils.getTransformCount(state),
    ),
  )
}
