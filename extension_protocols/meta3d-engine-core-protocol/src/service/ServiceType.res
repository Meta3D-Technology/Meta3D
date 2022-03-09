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
    ComponentType.config,
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
    ComponentType.component,
  ),
  setComponentData: (
    RegisterComponentType.usedComponentContribute,
    ComponentType.component,
    ComponentType.dataName,
    ComponentContributeType.dataValue,
  ) => RegisterComponentType.usedComponentContribute,
  addComponent: (
    RegisterComponentType.usedComponentContribute,
    GameObjectType.gameObject,
    ComponentType.component,
  ) => RegisterComponentType.usedComponentContribute,
  removeComponent: (
    RegisterComponentType.usedComponentContribute,
    GameObjectType.gameObject,
    ComponentType.component,
  ) => RegisterComponentType.usedComponentContribute,
  hasComponent: (
    RegisterComponentType.usedComponentContribute,
    GameObjectType.gameObject,
  ) => bool,
  getComponent: (
    RegisterComponentType.usedComponentContribute,
    GameObjectType.gameObject,
  ) => Js.Nullable.t<ComponentType.component>,
  deferDisposeComponent: (
    RegisterComponentType.usedComponentContribute,
    ComponentType.component,
  ) => RegisterComponentType.usedComponentContribute,
  disposeComponents: (
    RegisterComponentType.usedComponentContribute,
    array<ComponentType.component>,
  ) => RegisterComponentType.usedComponentContribute,
  getAllComponents: RegisterComponentType.usedComponentContribute => array<
    ComponentType.component,
  >,
  getComponentData: (
    RegisterComponentType.usedComponentContribute,
    ComponentType.component,
    ComponentType.dataName,
  ) => Js.Nullable.t<ComponentContributeType.dataValue>,
  getComponentGameObjects: (
    RegisterComponentType.usedComponentContribute,
    ComponentType.component,
  ) => array<GameObjectType.gameObject>,
  getComponentState: (
    StateType.state,
    ComponentContributeType.componentName,
  ) => Js.Nullable.t<ComponentType.state>,
  setGameObjectContribute: (
    StateType.state,
    GameObjectType.gameObjectContribute,
  ) => StateType.state,
  createAndSetGameObjectState: (StateType.state, GameObjectType.config) => StateType.state,
  createGameObject: StateType.state => (StateType.state, GameObjectType.gameObject),
  deferDisposeGameObject: (StateType.state, GameObjectType.gameObject) => StateType.state,
  disposeGameObjects: (StateType.state, array<GameObjectType.gameObject>) => StateType.state,
  getAllGameObjects: StateType.state => array<GameObjectType.gameObject>,
  runPipeline: (
    StateType.state,
    Meta3dType.Index.state,
    PipelineType.pipelineName,
  ) => // TODO change to Promist.t, hidden Stream!
  Meta3dBsMostProtocol.StreamType.stream<StateType.state>,
}
