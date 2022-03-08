type service = {
  getIsDebug: StateType.state => bool,
  setIsDebug: (StateType.state, bool) => StateType.state,
  prepare: unit => unit,
  init: StateType.state => StateType.state,
  registerWorkPlugin: (
    ~state: StateType.state,
    ~contribute: WorkPluginManagerType.workPluginContribute,
    ~jobOrders: RegisterWorkPluginVOType.jobOrders=?,
    unit,
  ) => StateType.state,
  unregisterWorkPlugin: (
    StateType.state,
    WorkPluginContributeType.workPluginName,
  ) => StateType.state,
  registerComponent: (
    StateType.state,
    RegisterComponentType.componentContribute,
  ) => StateType.state,
  unregisterComponent: (StateType.state, ComponentContributeType.componentName) => StateType.state,
  createAndSetComponentState: (
    StateType.state,
    ComponentContributeType.componentName,
    RegisterComponentType.config,
  ) => StateType.state,
  unsafeGetUsedComponentContribute: (
    StateType.state,
    ComponentContributeType.componentName,
  ) => RegisterComponentType.usedComponentContribute,
  setUsedComponentContribute: (
    StateType.state,
    RegisterComponentType.usedComponentContribute,
    ComponentContributeType.componentName,
  ) => StateType.state,
  createComponent: RegisterComponentType.usedComponentContribute => (
    RegisterComponentType.usedComponentContribute,
    RegisterComponentType.component,
  ),
  setComponentData: (
    RegisterComponentType.usedComponentContribute,
    RegisterComponentType.component,
    RegisterComponentType.dataName,
    ComponentContributeType.dataValue,
  ) => RegisterComponentType.usedComponentContribute,
  addComponent: (
    RegisterComponentType.usedComponentContribute,
    GameObjectContributeType.gameObject,
    RegisterComponentType.component,
  ) => RegisterComponentType.usedComponentContribute,
  hasComponent: (
    RegisterComponentType.usedComponentContribute,
    GameObjectContributeType.gameObject,
  ) => bool,
  getComponent: (
    RegisterComponentType.usedComponentContribute,
    GameObjectContributeType.gameObject,
  ) => Js.Nullable.t<RegisterComponentType.component>,
  deferDisposeComponent: (
    RegisterComponentType.usedComponentContribute,
    RegisterComponentType.component,
  ) => RegisterComponentType.usedComponentContribute,
  batchDisposeComponents: (
    RegisterComponentType.usedComponentContribute,
    array<RegisterComponentType.component>,
  ) => RegisterComponentType.usedComponentContribute,
  getAllComponents: RegisterComponentType.usedComponentContribute => array<
    RegisterComponentType.component,
  >,
  getComponentData: (
    RegisterComponentType.usedComponentContribute,
    RegisterComponentType.component,
    RegisterComponentType.dataName,
  ) => Js.Nullable.t<ComponentContributeType.dataValue>,
  getComponentGameObjects: (
    RegisterComponentType.usedComponentContribute,
    RegisterComponentType.component,
  ) => array<GameObjectContributeType.gameObject>,
  getComponentState: (
    StateType.state,
    ComponentContributeType.componentName,
  ) => Js.Nullable.t<RegisterComponentType.state>,
  setGameObjectContribute: (
    StateType.state,
    GameObjectType.gameObjectContribute,
  ) => StateType.state,
  createAndSetGameObjectState: (StateType.state, GameObjectType.config) => StateType.state,
  createGameObject: StateType.state => (StateType.state, GameObjectType.gameObject),
  deferDisposeGameObject: (StateType.state, GameObjectType.gameObject) => StateType.state,
  batchDisposeGameObjects: (StateType.state, array<GameObjectType.gameObject>) => StateType.state,
  getAllGameObjects: StateType.state => array<GameObjectType.gameObject>,
  runPipeline: (
    StateType.state,
    Meta3dType.Index.state,
    PipelineType.pipelineName,
  ) => // TODO change to Promist.t, hidden Stream!
  Meta3dBsMostProtocol.StreamType.stream<StateType.state>,
}
