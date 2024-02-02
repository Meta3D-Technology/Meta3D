type service = {
  getIsDebug: Meta3dType.Index.state => bool,
  setIsDebug: (Meta3dType.Index.state, bool) => Meta3dType.Index.state,
  prepare: unit => unit,
  init: Meta3dType.Index.state => Meta3dType.Index.state,
  registerPipeline: (
    ~meta3dState: Meta3dType.Index.state,
    ~contribute: PipelineManagerType.pipelineContributeForRegister,
    ~config: Js.Nullable.t<RegisterPipelineType.config>=?,
    ~jobOrders: RegisterPipelineVOType.jobOrders=?,
    unit,
  ) => Meta3dType.Index.state,
  unregisterPipeline: (Meta3dType.Index.state, StateType.pipelineName) => Meta3dType.Index.state,
  registerComponent: (
    Meta3dType.Index.state,
    RegisterComponentType.componentContribute,
  ) => Meta3dType.Index.state,
  unregisterComponent: (
    Meta3dType.Index.state,
    ComponentContributeType.componentName,
  ) => Meta3dType.Index.state,
  createAndSetComponentState: (
    Meta3dType.Index.state,
    ComponentContributeType.componentName,
    ComponentType.config,
  ) => Meta3dType.Index.state,
  unsafeGetUsedComponentContribute: (
    Meta3dType.Index.state,
    ComponentContributeType.componentName,
  ) => RegisterComponentType.usedComponentContribute,
  setUsedComponentContribute: (
    Meta3dType.Index.state,
    RegisterComponentType.usedComponentContribute,
    ComponentContributeType.componentName,
  ) => Meta3dType.Index.state,
  createComponent: RegisterComponentType.usedComponentContribute => (
    RegisterComponentType.usedComponentContribute,
    ComponentType.component,
  ),
  setComponentData: (
    RegisterComponentType.usedComponentContribute,
    ComponentType.component,
    ComponentContributeType.dataName,
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
  ) => (RegisterComponentType.usedComponentContribute, array<ComponentType.component>),
  getAllComponents: RegisterComponentType.usedComponentContribute => array<ComponentType.component>,
  getComponentData: (
    RegisterComponentType.usedComponentContribute,
    ComponentType.component,
    ComponentContributeType.dataName,
  ) => Js.Nullable.t<ComponentContributeType.dataValue>,
  getNeedDisposedComponents: RegisterComponentType.usedComponentContribute => ComponentType.needDisposedComponents,
  getComponentGameObjects: (
    RegisterComponentType.usedComponentContribute,
    ComponentType.component,
  ) => array<Meta3dGameobjectProtocol.Index.gameObject>,
  getComponentState: (
    Meta3dType.Index.state,
    ComponentContributeType.componentName,
  ) => Js.Nullable.t<ComponentType.state>,
  setGameObjectContribute: (
    Meta3dType.Index.state,
    GameObjectType.gameObjectContribute,
  ) => Meta3dType.Index.state,
  createAndSetGameObjectState: (
    Meta3dType.Index.state,
    Meta3dGameobjectProtocol.Index.config,
  ) => Meta3dType.Index.state,
  createGameObject: Meta3dType.Index.state => (
    Meta3dType.Index.state,
    Meta3dGameobjectProtocol.Index.gameObject,
  ),
  getNeedDisposedGameObjects: Meta3dType.Index.state => array<
    Meta3dGameobjectProtocol.Index.gameObject,
  >,
  deferDisposeGameObject: (
    Meta3dType.Index.state,
    Meta3dGameobjectProtocol.Index.gameObject,
  ) => Meta3dType.Index.state,
  disposeGameObjects: (
    Meta3dType.Index.state,
    array<Meta3dGameobjectProtocol.Index.gameObject>,
  ) => (
    Meta3dType.Index.state,
    (
      array<Meta3dGameobjectProtocol.Index.gameObject>,
      array<ComponentType.component>,
      array<ComponentType.component>,
      array<ComponentType.component>,
      array<ComponentType.component>,
      array<ComponentType.component>,
      array<ComponentType.component>,
      array<ComponentType.component>,
      array<ComponentType.component>,
    ),
  ),
  cloneGameObject: (
    Meta3dType.Index.state,
    GameObjectContributeType.cloneCount,
    Meta3dGameobjectProtocol.Index.cloneConfig,
    Meta3dGameobjectProtocol.Index.gameObject,
  ) => (Meta3dType.Index.state, GameObjectContributeType.clonedGameObjects),
  getAllGameObjects: Meta3dType.Index.state => array<Meta3dGameobjectProtocol.Index.gameObject>,
  getGameObjectName: (
    Meta3dType.Index.state,
    Meta3dGameobjectProtocol.Index.gameObject,
  ) => Js.Nullable.t<Meta3dGameobjectProtocol.Index.name>,
  setGameObjectName: (
    Meta3dType.Index.state,
    Meta3dGameobjectProtocol.Index.gameObject,
    Meta3dGameobjectProtocol.Index.name,
  ) => Meta3dType.Index.state,
  runPipeline: (
    Meta3dType.Index.state,
    Meta3dType.Index.extensionProtocolName,
    PipelineType.pipelineName,
  ) => // TODO change to Promist.t, hidden Stream!
  Meta3dBsMostProtocol.StreamType.stream<Meta3dType.Index.state>,
}
