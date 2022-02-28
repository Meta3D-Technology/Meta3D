type jobOrder = {
  insertElementName: PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type nodeData = {
  mutable getElementFuncs: list<WorkPluginContributeType.getElementFunc<RegisterWorkPluginType.states>>,
  mutable pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type rec tree = Node(WorkPluginContributeType.pluginName, nodeData, list<tree>)
