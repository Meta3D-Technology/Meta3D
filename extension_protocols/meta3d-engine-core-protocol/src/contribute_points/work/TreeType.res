type jobOrder = {
  insertElementName: PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type nodeData = {
  mutable getExecFuncs: list<WorkPluginContributeType.getExecFunc<RegisterWorkPluginType.states>>,
  mutable pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type rec tree = Node(WorkPluginContributeType.workPluginName, nodeData, list<tree>)
