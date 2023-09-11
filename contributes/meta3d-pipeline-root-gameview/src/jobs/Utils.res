let getState = (
  states: Meta3dPipelineRootGameviewProtocol.StateType.states,
): Meta3dPipelineRootGameviewProtocol.StateType.state => {
  (states->Obj.magic)[Meta3dPipelineRootGameviewProtocol.StateType.pipelineName->Obj.magic]
}
