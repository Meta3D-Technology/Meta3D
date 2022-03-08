let _isNotNeedInitData = (childMap, index) => childMap->Meta3dCommonlib.MutableSparseMap.has(index)

let _initDataWhenCreate = (childrenMap, index) => {
  _isNotNeedInitData(childrenMap, index)
    ? ()
    : childrenMap->Meta3dCommonlib.MutableSparseMap.set(index, [])->ignore
}

let create = (state: Meta3dComponentTransformProtocol.Index.state): (Meta3dComponentTransformProtocol.Index.state, Meta3dComponentTransformProtocol.Index.transform) => {
  let index = state.maxIndex
  let (disposedTransformArray, index, newIndex) =
    state.disposedTransformArray->Meta3dCommonlib.IndexComponentUtils.generateIndex(index)

  state.maxIndex = newIndex
  state.disposedTransformArray = disposedTransformArray

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
