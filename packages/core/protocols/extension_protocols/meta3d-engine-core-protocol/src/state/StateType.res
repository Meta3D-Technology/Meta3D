type jobName = string

type stream<'a> = Meta3dBsMostProtocol.StreamType.stream<'a>

type pipelineData = PipelineType.pipelineData

type createStateFunc<'config, 'state> = (Meta3dType.Index.state, 'config) => 'state

type restoreFunc<'state> = ('state, 'state) => 'state

type deepCopyFunc<'state> = 'state => 'state

type initFunc<'state> = 'state => unit

type pipelineName = string

// type groupName = string

// type groupStatus =
//   | Stop
//   | RunOnlyOnce

type allPipelineData = array<pipelineData>

type contributeData = {isDebug: bool}

type rec state = {
  allRegisteredPipelineContribute: list<registeredPipelineContribute>,
  states: RegisterPipelineType.states,
  contributeData: contributeData,
  componentContributeData: RegisterComponentType.componentContributeData,
  gameObjectContribute: option<GameObjectType.gameObjectContribute>,
  // groupStatusData: Meta3dCommonlibType.ImmutableHashMapType.t<groupName, groupStatus>,
  mutable usedGameObjectContribute: option<GameObjectType.usedGameObjectContribute>,
}
and execFunc = (Meta3dType.Index.state, operateStatesFuncs) => stream<Meta3dType.Index.state>
and getExecFunc = (PipelineType.pipelineName, jobName) => Js.Nullable.t<execFunc>
and pipelineContribute<'config, 'state> = {
  pipelineName: pipelineName,
  createStateFunc: createStateFunc<'config, 'state>,
  initFunc: initFunc<'state>,
  getExecFunc: getExecFunc,
  allPipelineData: allPipelineData,
  restoreFunc: Js.Nullable.t<restoreFunc<'state>>,
  deepCopyFunc: Js.Nullable.t<deepCopyFunc<'state>>,
}
// and getPipelineContribute<'state, 'config, 'states> = 'config => pipelineContribute<
//   'state,
//   'states,
// >
and registeredPipelineContribute = (
  pipelineContribute<Js.Nullable.t<RegisterPipelineType.config>, RegisterPipelineType.state>,
  Js.Nullable.t<RegisterPipelineType.config>,
  RegisterPipelineType.jobOrders,
)
and operateStatesFuncs = {
  api: Meta3dType.Index.api,
  getStatesFunc: (. Meta3dType.Index.state) => RegisterPipelineType.states,
  setStatesFunc: (Meta3dType.Index.state, RegisterPipelineType.states) => Meta3dType.Index.state,
  meta3dEngineCoreExtensionProtocolName: Meta3dType.Index.extensionProtocolName,
}
