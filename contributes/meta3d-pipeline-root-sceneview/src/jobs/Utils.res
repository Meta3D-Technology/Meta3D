let getState = (
  states: Meta3dPipelineRootSceneviewProtocol.StateType.states,
): Meta3dPipelineRootSceneviewProtocol.StateType.state => {
  (states->Obj.magic)[Meta3dPipelineRootSceneviewProtocol.StateType.pipelineName->Obj.magic]
}
