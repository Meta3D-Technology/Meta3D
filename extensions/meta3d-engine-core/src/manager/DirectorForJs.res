let _convertJobOrders = (
  jobOrders: Meta3dEngineCoreProtocol.RegisterWorkPluginVOType.jobOrders,
): Meta3dEngineCoreProtocol.RegisterWorkPluginType.jobOrders => {
  jobOrders->Meta3dCommonlib.ArraySt.map((
    {pipelineName, insertElementName, insertAction} as jobOrder,
  ): Meta3dEngineCoreProtocol.RegisterWorkPluginType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: switch insertAction {
    | #before => Meta3dEngineCoreProtocol.RegisterWorkPluginType.Before
    | #after => Meta3dEngineCoreProtocol.RegisterWorkPluginType.After
    },
  })
}

let registerWorkPlugin = (
  ~state,
  ~contribute,
  ~jobOrders: Meta3dEngineCoreProtocol.RegisterWorkPluginVOType.jobOrders=[],
  (),
) => {
  state->WorkPluginManager.registerPlugin(contribute, jobOrders->_convertJobOrders)
}

let unregisterWorkPlugin = WorkPluginManager.unregisterPlugin

let prepare = () => {
  ()
}

let init = state => {
  state->WorkPluginManager.init
}

let runPipeline = (
  (
    api: Meta3dType.Index.api,
    {
      meta3dBsMostExtensionName,
    }: Meta3dEngineCoreProtocol.DependentExtensionType.dependentExtensionNameMap,
  ),
  state,
  meta3dState,
  pipelineName: Meta3dEngineCoreProtocol.PipelineType.pipelineName,
) => {
  let mostService: Meta3dBsMostProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    meta3dBsMostExtensionName,
  )

  state
  ->WorkPluginManager.runPipeline(mostService, pipelineName)
  // ->Meta3dCommonlib.Result.mapSuccess(mostService.map(StateContainer.setState, _))
  ->Meta3dCommonlib.Result.handleFail(Meta3dCommonlib.Exception.throwErr)
}

let getIsDebug = PluginDataManager.getIsDebug

let setIsDebug = PluginDataManager.setIsDebug

let registerComponent = (state, componentContribute) => {
  state
  ->ComponentManager.registerComponent(componentContribute)
  // ->Meta3dCommonlib.Result.mapSuccess(StateContainer.setState)
  ->Meta3dCommonlib.Result.handleFail(Meta3dCommonlib.Exception.throwErr)
}

let unregisterComponent = ComponentManager.unregisterComponent

let createAndSetComponentState = ComponentManager.createAndSetComponentState

let unsafeGetUsedComponentContribute = ComponentManager.unsafeGetUsedComponentContribute

let setUsedComponentContribute = ComponentManager.setUsedComponentContribute

let createComponent = ComponentManager.createComponent

let setComponentData = ComponentManager.setComponentData

let addComponent = ComponentManager.addComponent

let removeComponent = ComponentManager.removeComponent

let hasComponent = ComponentManager.hasComponent

let getComponent = ComponentManager.getComponent

let deferDisposeComponent = ComponentManager.deferDisposeComponent

let disposeComponents = ComponentManager.disposeComponents

let getAllComponents = ComponentManager.getAllComponents

let getComponentData = ComponentManager.getComponentData

let getComponentGameObjects = ComponentManager.getComponentGameObjects

let setGameObjectContribute = GameObjectManager.setGameObjectContribute

let createAndSetGameObjectState = GameObjectManager.createAndSetState

let createGameObject = GameObjectManager.createGameObject

let deferDisposeGameObject = GameObjectManager.deferDisposeGameObject

let disposeGameObjects = GameObjectManager.disposeGameObjects

let cloneGameObject = GameObjectManager.cloneGameObject

let getAllGameObjects = GameObjectManager.getAllGameObjects

let getComponentState = (
  state,
  componentName: Meta3dEngineCoreProtocol.ComponentContributeType.componentName,
) => {
  state->ComponentManager.getComponentState(componentName)->Meta3dCommonlib.OptionSt.toNullable
}
