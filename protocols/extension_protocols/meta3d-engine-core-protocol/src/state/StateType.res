type jobName = string

type stream<'a> = Meta3dBsMostProtocol.StreamType.stream<'a>

type pipelineData = PipelineType.pipelineData

type createStateFunc<'state> = unit => 'state

type initFunc<'state> = 'state => unit

type workPluginName = string

type allPipelineData = array<pipelineData>

type pluginData = {isDebug: bool}

type rec state = {
  allRegisteredWorkPluginContribute: list<registeredWorkPluginContribute>,
  states: RegisterWorkPluginType.states,
  pluginData: pluginData,
  // componentContributeData: RegisterComponentType.componentContributeData,
  // gameObjectContribute: option<GameObjectType.gameObjectContribute>,
  // mutable usedGameObjectContribute: option<GameObjectType.usedGameObjectContribute>,
}
and execFunc = (state, operateStatesFuncs) => stream<state>
and getExecFunc = (PipelineType.pipelineName, jobName) => Js.Nullable.t<execFunc>
and workPluginContribute<'state, 'states> = {
  workPluginName: workPluginName,
  createStateFunc: createStateFunc<'state>,
  initFunc: initFunc<'state>,
  getExecFunc: getExecFunc,
  allPipelineData: allPipelineData,
}
and getWorkPluginContribute<'state, 'config, 'states> = 'config => workPluginContribute<
  'state,
  'states,
>
and registeredWorkPluginContribute = (
  workPluginContribute<RegisterWorkPluginType.state, RegisterWorkPluginType.states>,
  RegisterWorkPluginType.jobOrders,
)
and operateStatesFuncs = {
  getStatesFunc: state => RegisterWorkPluginType.states,
  setStatesFunc: (state, RegisterWorkPluginType.states) => state,
}
