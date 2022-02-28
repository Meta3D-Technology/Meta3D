type workPluginContribute = IWorkForJs.workPluginContribute<
  RegisterWorkPluginType.state,
  RegisterWorkPluginType.states,
>

type allRegisteredWorkPluginContribute = list<StateType.registeredWorkPluginContribute>

type elementFunc = IWorkForJs.elementFunc<RegisterWorkPluginType.states>

type getElementFuncs = list<IWorkForJs.getElementFunc<RegisterWorkPluginType.states>>

type jobOrder = {
  insertPluginName: IWorkForJs.pluginName,
  insertElementName: PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type specificPipelineRelatedData = {
  pluginName: IWorkForJs.pluginName,
  getElementFunc: IWorkForJs.getElementFunc<RegisterWorkPluginType.states>,
  pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type treeData = (list<TreeType.tree>, option<IWorkForJs.pluginName>)

type treeDataList = list<treeData>
