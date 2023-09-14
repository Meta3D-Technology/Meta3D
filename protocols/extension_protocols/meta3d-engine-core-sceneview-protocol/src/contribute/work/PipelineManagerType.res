type pipelineContributeForRegister = StateType.pipelineContribute<
  Js.Nullable.t<RegisterPipelineType.config>,
  RegisterPipelineType.state,
>

type allRegisteredPipelineContribute = list<StateType.registeredPipelineContribute>

type execFunc = StateType.execFunc

type getExecFuncs = list<StateType.getExecFunc>

type jobOrder = {
  insertPipelineName: StateType.pipelineName,
  insertElementName: PipelineType.elementName,
  insertAction: RegisterPipelineType.insertAction,
}

type specificPipelineRelatedData = {
  pipelineName: StateType.pipelineName,
  getExecFunc: StateType.getExecFunc,
  pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type treeData = (list<TreeType.tree>, option<StateType.pipelineName>)

type treeDataList = list<treeData>
