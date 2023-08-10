let getAll = (state: StateType.state): array<StateType.gameObject> => {
  Meta3dCommonlib.ArraySt.range(0, state.maxUID - 1)
  ->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(
    GetNeedDisposedGameObjectsUtils.get(state),
  )
  ->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(state.disposedGameObjectArray)
}
