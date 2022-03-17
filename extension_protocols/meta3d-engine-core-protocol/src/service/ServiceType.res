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
    Meta3dGameobjectProtocol.Index.gameObject,
    ComponentType.component,
  ) => RegisterComponentType.usedComponentContribute,
  removeComponent: (
    RegisterComponentType.usedComponentContribute,
    Meta3dGameobjectProtocol.Index.gameObject,
    ComponentType.component,
  ) => RegisterComponentType.usedComponentContribute,
  hasComponent: (
    RegisterComponentType.usedComponentContribute,
    Meta3dGameobjectProtocol.Index.gameObject,
  ) => bool,
  getComponent: (
    RegisterComponentType.usedComponentContribute,
    Meta3dGameobjectProtocol.Index.gameObject,
  ) => Js.Nullable.t<ComponentType.component>,
  deferDisposeComponent: (
    RegisterComponentType.usedComponentContribute,
    (ComponentType.component, Meta3dGameobjectProtocol.Index.gameObject),
  ) => RegisterComponentType.usedComponentContribute,
  disposeComponents: (
    RegisterComponentType.usedComponentContribute,
    ComponentType.batchDisposeData,
  ) => RegisterComponentType.usedComponentContribute,
  getAllComponents: RegisterComponentType.usedComponentContribute => array<ComponentType.component>,
  getComponentData: (
    RegisterComponentType.usedComponentContribute,
    ComponentType.component,
    ComponentType.dataName,
  ) => Js.Nullable.t<ComponentContributeType.dataValue>,
  getComponentGameObjects: (
    RegisterComponentType.usedComponentContribute,
    ComponentType.component,
  ) => array<Meta3dGameobjectProtocol.Index.gameObject>,
  getComponentState: (
    StateType.state,
    ComponentContributeType.componentName,
  ) => Js.Nullable.t<ComponentType.state>,
  setGameObjectContribute: (
    StateType.state,
    GameObjectType.gameObjectContribute,
  ) => StateType.state,
  createAndSetGameObjectState: (
    StateType.state,
    Meta3dGameobjectProtocol.Index.config,
  ) => StateType.state,
  createGameObject: StateType.state => (StateType.state, Meta3dGameobjectProtocol.Index.gameObject),
  deferDisposeGameObject: (
    StateType.state,
    Meta3dGameobjectProtocol.Index.gameObject,
  ) => StateType.state,
  disposeGameObjects: (
    StateType.state,
    array<Meta3dGameobjectProtocol.Index.gameObject>,
  ) => StateType.state,
  cloneGameObject: (
    StateType.state,
    GameObjectContributeType.cloneCount,
    Meta3dGameobjectProtocol.Index.cloneConfig,
    Meta3dGameobjectProtocol.Index.gameObject,
  ) => (StateType.state, GameObjectContributeType.clonedGameObjects),
  getAllGameObjects: StateType.state => array<Meta3dGameobjectProtocol.Index.gameObject>,
  runPipeline: (
    StateType.state,
    Meta3dType.Index.state,
    PipelineType.pipelineName,
  ) => // TODO change to Promist.t, hidden Stream!
  Meta3dBsMostProtocol.StreamType.stream<StateType.state>,
}
