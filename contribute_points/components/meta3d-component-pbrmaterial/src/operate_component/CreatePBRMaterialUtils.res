let create = (state: StateType.state): (StateType.state, Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial) => {
  let index = state.maxIndex
  let (disposedPBRMaterials, index, newIndex) =
    state.disposedPBRMaterials->Meta3dCommonlib.IndexComponentUtils.generateIndex(index)

  state.maxIndex = newIndex
  state.disposedPBRMaterials = disposedPBRMaterials

  (
    state,
    index->Meta3dCommonlib.BufferComponentUtils.checkNotExceedMaxCountByIndex(
      ConfigUtils.getIsDebug(state),
      _,
      ConfigUtils.getPBRMaterialCount(state),
    ),
  )
}
