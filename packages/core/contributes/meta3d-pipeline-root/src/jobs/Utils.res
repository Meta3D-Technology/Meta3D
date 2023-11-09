let getState = (
  states: Meta3dPipelineRootProtocol.StateType.states,
): Meta3dPipelineRootProtocol.StateType.state => {
  (states->Obj.magic)[Meta3dPipelineRootProtocol.StateType.pipelineName->Obj.magic]
}
