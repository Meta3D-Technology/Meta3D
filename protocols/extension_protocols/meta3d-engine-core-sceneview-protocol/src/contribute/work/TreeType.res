type jobOrder = {
  insertElementName: PipelineType.elementName,
  insertAction: RegisterPipelineType.insertAction,
}

type nodeData = {
  mutable getExecFuncs: list<StateType.getExecFunc>,
  mutable pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type rec tree = Node(StateType.pipelineName, nodeData, list<tree>)
