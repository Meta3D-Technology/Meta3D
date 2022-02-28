type jobOrder = {
  insertElementName: PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type nodeData = {
  mutable getElementFuncs: list<IWorkForJs.getElementFunc<RegisterWorkPluginType.states>>,
  mutable pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type rec tree = Node(IWorkForJs.pluginName, nodeData, list<tree>)
