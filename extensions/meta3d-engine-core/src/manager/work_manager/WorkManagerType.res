type registeredWorkPlugin = Meta3dEngineCoreType.IWorkForJs.registeredWorkPlugin<
  RegisterWorkPluginType.state,
  RegisterWorkPluginType.states,
>

type allRegisteredWorkPluginData = list<StateType.registeredWorkPluginData>

type execFunc = Meta3dEngineCoreType.IWorkForJs.execFunc<RegisterWorkPluginType.states>

type getExecFuncs = list<Meta3dEngineCoreType.IWorkForJs.getExecFunc<RegisterWorkPluginType.states>>

type jobOrder = {
  insertPluginName: Meta3dEngineCoreType.IWorkForJs.pluginName,
  insertElementName: Meta3dEngineCoreType.PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type specificPipelineRelatedData = {
  pluginName: Meta3dEngineCoreType.IWorkForJs.pluginName,
  getExecFunc: Meta3dEngineCoreType.IWorkForJs.getExecFunc<RegisterWorkPluginType.states>,
  pipelineData: Meta3dEngineCoreType.PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type treeData = (list<TreeType.tree>, option<Meta3dEngineCoreType.IWorkForJs.pluginName>)

type treeDataList = list<treeData>
