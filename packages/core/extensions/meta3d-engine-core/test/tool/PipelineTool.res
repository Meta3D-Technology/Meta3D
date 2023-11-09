let getPipelineState = (state: Meta3dEngineCoreProtocol.StateType.state, pipelineName) => {
  state.states->Meta3dCommonlib.ImmutableHashMap.getExn(pipelineName)
}
