let create = (state: StateType.state): (StateType.state, StateType.perspectiveCameraProjection) => {
  let index = state.maxIndex
  let (disposedPerspectiveCameraProjections, index, newIndex) =
    state.disposedPerspectiveCameraProjections->Meta3dCommonlib.IndexComponentUtils.generateIndex(index)

  let state =
    DirtyPerspectiveCameraProjectionUtils.mark(
      state,
      index,
      true,
    )->OperatePerspectiveCameraProjectionUtils.setPMatrix(
      index,
      Meta3dCommonlib.Matrix4.createIdentityMatrix4(),
    )

  (
    {
      ...state,
      maxIndex: newIndex,
      disposedPerspectiveCameraProjections: disposedPerspectiveCameraProjections,
    },
    index,
  )
}
