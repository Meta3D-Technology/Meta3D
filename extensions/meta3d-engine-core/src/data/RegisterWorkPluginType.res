type state

type states = Meta3dCommonlibType.ImmutableHashMapType.t<
  Meta3dEngineCoreType.IWorkForJs.pluginName,
  state,
>

type config

type insertAction =
  | Before
  | After

type jobOrder = {
  pipelineName: Meta3dEngineCoreType.PipelineType.pipelineName,
  insertElementName: Meta3dEngineCoreType.PipelineType.elementName,
  insertAction: insertAction,
}

type jobOrders = array<jobOrder>
