let restore = (
  currentState: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  targetState: Meta3dEngineCoreSceneviewProtocol.StateType.state,
): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
  {
    ...targetState,
    states: targetState.allRegisteredPipelineContribute->Meta3dCommonlib.ListSt.reduce(
      targetState.states,
      (states, ({pipelineName, restoreFunc}, _, _)) => {
        restoreFunc
        ->Meta3dCommonlib.NullableSt.map((. restoreFunc) => {
          states->Meta3dCommonlib.ImmutableHashMap.set(
            pipelineName,
            restoreFunc(
              currentState.states->Meta3dCommonlib.ImmutableHashMap.getExn(pipelineName),
              states->Meta3dCommonlib.ImmutableHashMap.getExn(pipelineName),
            ),
          )
        })
        ->Meta3dCommonlib.NullableSt.getWithDefault(states)
      },
    ),
  }
}

let deepCopy = (
  state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
  {
    ...state,
    states: state.allRegisteredPipelineContribute->Meta3dCommonlib.ListSt.reduce(state.states, (
      states,
      ({pipelineName, deepCopyFunc}, _, _),
    ) => {
      deepCopyFunc
      ->Meta3dCommonlib.NullableSt.map((. deepCopyFunc) => {
        states->Meta3dCommonlib.ImmutableHashMap.set(
          pipelineName,
          deepCopyFunc(states->Meta3dCommonlib.ImmutableHashMap.getExn(pipelineName)),
        )
      })
      ->Meta3dCommonlib.NullableSt.getWithDefault(states)
    }),
  }
}
