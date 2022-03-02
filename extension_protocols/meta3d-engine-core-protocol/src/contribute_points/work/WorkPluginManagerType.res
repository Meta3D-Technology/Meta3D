type workPluginContribute = WorkPluginContributeType.workPluginContribute<
  RegisterWorkPluginType.state,
  RegisterWorkPluginType.states,
>

type allRegisteredWorkPluginContribute = list<StateType.registeredWorkPluginContribute>

type execFunc = WorkPluginContributeType.execFunc<RegisterWorkPluginType.states>

type getExecFuncs = list<WorkPluginContributeType.getExecFunc<RegisterWorkPluginType.states>>

type jobOrder = {
  insertPluginName: WorkPluginContributeType.workPluginName,
  insertElementName: PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type specificPipelineRelatedData = {
  workPluginName: WorkPluginContributeType.workPluginName,
  getExecFunc: WorkPluginContributeType.getExecFunc<RegisterWorkPluginType.states>,
  pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type treeData = (list<TreeType.tree>, option<WorkPluginContributeType.workPluginName>)

type treeDataList = list<treeData>
