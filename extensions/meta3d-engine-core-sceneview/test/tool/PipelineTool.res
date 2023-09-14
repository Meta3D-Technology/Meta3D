let getPipelineState = (state: Meta3dEngineCoreSceneviewProtocol.StateType.state, pipelineName) => {
  state.states->Meta3dCommonlib.ImmutableHashMap.getExn(pipelineName)
}
