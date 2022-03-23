type jobOrder = {
  insertElementName: PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type nodeData = {
  mutable getExecFuncs: list<StateType.getExecFunc>,
  mutable pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type rec tree = Node(StateType.workPluginName, nodeData, list<tree>)
