type workPluginContribute = WorkPluginContributeType.workPluginContribute<
  RegisterWorkPluginType.state,
  RegisterWorkPluginType.states,
>

type allRegisteredWorkPluginContribute = list<StateType.registeredWorkPluginContribute>

type elementFunc = WorkPluginContributeType.elementFunc<RegisterWorkPluginType.states>

type getElementFuncs = list<WorkPluginContributeType.getElementFunc<RegisterWorkPluginType.states>>

type jobOrder = {
  insertPluginName: WorkPluginContributeType.pluginName,
  insertElementName: PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type specificPipelineRelatedData = {
  pluginName: WorkPluginContributeType.pluginName,
  getElementFunc: WorkPluginContributeType.getElementFunc<RegisterWorkPluginType.states>,
  pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type treeData = (list<TreeType.tree>, option<WorkPluginContributeType.pluginName>)

type treeDataList = list<treeData>
