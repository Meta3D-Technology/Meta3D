type jobOrder = {
  insertElementName: Meta3dEngineCoreType.PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type nodeData = {
  mutable getExecFuncs: list<Meta3dEngineCoreType.IWorkForJs.getExecFunc<RegisterWorkPluginType.states>>,
  mutable pipelineData: Meta3dEngineCoreType.PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type rec tree = Node(Meta3dEngineCoreType.IWorkForJs.pluginName, nodeData, list<tree>)
