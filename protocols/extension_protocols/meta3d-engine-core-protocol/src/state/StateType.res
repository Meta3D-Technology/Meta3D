type jobName = string

type stream<'a> = Meta3dBsMostProtocol.StreamType.stream<'a>

type pipelineData = PipelineType.pipelineData

type createStateFunc<'config, 'state> = (Meta3dType.Index.state, 'config) => 'state

type initFunc<'state> = 'state => unit

type workPluginName = string

type allPipelineData = array<pipelineData>

type pluginData = {isDebug: bool}

type rec state = {
  allRegisteredWorkPluginContribute: list<registeredWorkPluginContribute>,
  states: RegisterWorkPluginType.states,
  pluginData: pluginData,
  componentContributeData: RegisterComponentType.componentContributeData,
  gameObjectContribute: option<GameObjectType.gameObjectContribute>,
  mutable usedGameObjectContribute: option<GameObjectType.usedGameObjectContribute>,
}
and execFunc = (Meta3dType.Index.state, operateStatesFuncs) => stream<Meta3dType.Index.state>
and getExecFunc = (PipelineType.pipelineName, jobName) => Js.Nullable.t<execFunc>
and workPluginContribute<'config, 'state, 'states> = {
  workPluginName: workPluginName,
  createStateFunc: createStateFunc<'config, 'state>,
  initFunc: initFunc<'state>,
  getExecFunc: getExecFunc,
  allPipelineData: allPipelineData,
}
// and getWorkPluginContribute<'state, 'config, 'states> = 'config => workPluginContribute<
//   'state,
//   'states,
// >
and registeredWorkPluginContribute = (
  workPluginContribute<
    Js.Nullable.t<RegisterWorkPluginType.config>,
    RegisterWorkPluginType.state,
    RegisterWorkPluginType.states,
  >,
  Js.Nullable.t<RegisterWorkPluginType.config>,
  RegisterWorkPluginType.jobOrders,
)
and operateStatesFuncs = {
  api: Meta3dType.Index.api,
  getStatesFunc: Meta3dType.Index.state => RegisterWorkPluginType.states,
  setStatesFunc: (Meta3dType.Index.state, RegisterWorkPluginType.states) => Meta3dType.Index.state,
  meta3dEngineCoreExtensionProtocolName: Meta3dType.Index.extensionProtocolName,
}
