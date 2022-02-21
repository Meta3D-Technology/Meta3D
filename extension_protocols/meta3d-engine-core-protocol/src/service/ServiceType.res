type service = {
  prepare: unit => unit,
  init: StateType.state => StateType.state,
  registerWorkPlugin: (
    ~state: StateType.state,
    ~data: WorkManagerType.workPluginContribute,
    ~jobOrders: RegisterWorkPluginVOType.jobOrders=?,
    unit,
  ) => StateType.state,
  unregisterWorkPlugin: (StateType.state, string) => StateType.state,
  setGameObjectContribute: (
    StateType.state,
    GameObjectType.gameObjectContribute,
  ) => StateType.state,
  createAndSetGameObjectState: StateType.state => StateType.state,
  createGameObject: StateType.state => (StateType.state, GameObjectType.gameObject),
  getAllGameObjects: StateType.state => array<GameObjectType.gameObject>,
  runPipeline: (
    StateType.state,
    Meta3dType.Index.state,
    PipelineType.pipelineName,
  ) => Meta3dBsMostProtocol.ServiceType.stream<StateType.state>,
}
