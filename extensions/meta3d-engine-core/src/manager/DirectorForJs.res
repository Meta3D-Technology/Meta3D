let _convertJobOrders = (
  jobOrders: Meta3dEngineCoreType.RegisterWorkPluginVOType.jobOrders,
): Meta3dEngineCoreType.RegisterWorkPluginType.jobOrders => {
  jobOrders->Meta3dCommonlib.ArraySt.map((
    {pipelineName, insertElementName, insertAction} as jobOrder,
  ): Meta3dEngineCoreType.RegisterWorkPluginType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: switch insertAction {
    | #before => Meta3dEngineCoreType.RegisterWorkPluginType.Before
    | #after => Meta3dEngineCoreType.RegisterWorkPluginType.After
    },
  })
}

let registerWorkPlugin = (
  ~state,
  ~data,
  ~jobOrders: Meta3dEngineCoreType.RegisterWorkPluginVOType.jobOrders=[],
  (),
) => {
  state->WorkManager.registerPlugin(data, jobOrders->_convertJobOrders)
}

let unregisterWorkPlugin = (state, targetPluginName) => {
  state->WorkManager.unregisterPlugin(targetPluginName)
}

let prepare = () => {
  // let state = CreateState.createState()

  // StateContainer.setState(state)
  ()
}

let init = state => {
  // StateContainer.unsafeGetState()->WorkManager.init->StateContainer.setState

  state->WorkManager.init
}

let runPipeline = (
  state,
  (
    meta3dState,
    api: Meta3dType.ExtensionManagerType.api,
    {meta3dBsMostExtensionName}: Meta3dEngineCoreType.ServiceType.dependentExtensionNameMap,
  ),
  pipelineName: Meta3dEngineCoreType.PipelineType.pipelineName,
) => {
  let mostService = api.getServiceExn(meta3dState, meta3dBsMostExtensionName)

  state
  ->WorkManager.runPipeline(mostService, pipelineName)
  // ->Meta3dCommonlib.Result.mapSuccess(mostService.map(StateContainer.setState, _))
  ->Meta3dCommonlib.Result.handleFail(Meta3dCommonlib.Exception.throwErr)
}

let getIsDebug = () => {
  PluginDataManager.getIsDebug()
}

let setIsDebug = isDebug => {
  PluginDataManager.setIsDebug(isDebug)
}

let registerComponent = data => {
  StateContainer.unsafeGetState()
  ->ComponentManager.registerComponent(data)
  ->Meta3dCommonlib.Result.mapSuccess(StateContainer.setState)
  ->Meta3dCommonlib.Result.handleFail(Meta3dCommonlib.Exception.throwErr)
}

let unregisterComponent = componentName => {
  StateContainer.unsafeGetState()
  ->ComponentManager.unregisterComponent(componentName)
  ->StateContainer.setState
}

let createAndSetComponentState = (componentName, config) => {
  StateContainer.unsafeGetState()
  ->ComponentManager.createAndSetComponentState(componentName, config)
  ->StateContainer.setState
}

let unsafeGetRelatedComponentData = componentName => {
  StateContainer.unsafeGetState()->ComponentManager.unsafeGetUsedComponentData(componentName)
}

let setRelatedComponentData = (data, componentName) => {
  StateContainer.unsafeGetState()
  ->ComponentManager.setRelatedComponentData(data, componentName)
  ->StateContainer.setState
}

let createComponent = data => {
  data->ComponentManager.createComponent
}

let setComponentData = (data, component, dataName, dataValue) => {
  data->ComponentManager.setComponentData(component, dataName, dataValue)
}

let addComponent = (data, gameObject, component) => {
  data->ComponentManager.addComponent(gameObject, component)
}

let hasComponent = (data, gameObject) => {
  data->ComponentManager.hasComponent(gameObject)
}

let getComponent = (data, gameObject) => {
  data->ComponentManager.getComponent(gameObject)
}

let getAllComponents = data => {
  data->ComponentManager.getAllComponents
}

let getComponentData = (data, component, dataName) => {
  data->ComponentManager.getComponentData(component, dataName)
}

let getComponentGameObjects = (data, component) => {
  data->ComponentManager.getComponentGameObjects(component)
}

let setGameObjectData = data => {
  StateContainer.unsafeGetState()
  ->GameObjectManager.setGameObjectData(data)
  ->StateContainer.setState
}

let createAndSetGameObjectState = () => {
  StateContainer.unsafeGetState()->GameObjectManager.createAndSetState->StateContainer.setState
}

let createGameObject = () => {
  let (state, gameObject) = StateContainer.unsafeGetState()->GameObjectManager.createGameObject

  state->StateContainer.setState

  gameObject
}

let getAllGameObjects = () => {
  StateContainer.unsafeGetState()->GameObjectManager.getAllGameObjects
}

let getState = (componentName: Meta3dEngineCoreType.IComponentForJs.componentName) => {
  StateContainer.unsafeGetState()
  ->ComponentManager.getState(componentName)
  ->Meta3dCommonlib.OptionSt.toNullable
}
