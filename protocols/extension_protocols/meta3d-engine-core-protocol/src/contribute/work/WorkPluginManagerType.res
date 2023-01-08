type workPluginContributeForRegister = StateType.workPluginContribute<
  Js.Nullable.t<RegisterWorkPluginType.config>,
  RegisterWorkPluginType.state,
  RegisterWorkPluginType.states,
>

type allRegisteredWorkPluginContribute = list<StateType.registeredWorkPluginContribute>

type execFunc = StateType.execFunc

type getExecFuncs = list<StateType.getExecFunc>

type jobOrder = {
  insertPluginName: StateType.workPluginName,
  insertElementName: PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type specificPipelineRelatedData = {
  workPluginName: StateType.workPluginName,
  getExecFunc: StateType.getExecFunc,
  pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type treeData = (list<TreeType.tree>, option<StateType.workPluginName>)

type treeDataList = list<treeData>
