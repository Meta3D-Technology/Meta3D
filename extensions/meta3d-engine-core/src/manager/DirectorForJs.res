let _convertJobOrders = (
  jobOrders: RegisterWorkPluginVOType.jobOrders,
): RegisterWorkPluginType.jobOrders => {
  jobOrders->Meta3dCommonlib.ArraySt.map((
    {pipelineName, insertElementName, insertAction} as jobOrder,
  ): RegisterWorkPluginType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: switch insertAction {
    | #before => RegisterWorkPluginType.Before
    | #after => RegisterWorkPluginType.After
    },
  })
}

let registerWorkPlugin = (~data, ~jobOrders: RegisterWorkPluginVOType.jobOrders=[], ()) => {
  StateContainer.unsafeGetState()
  ->WorkManager.registerPlugin(data, jobOrders->_convertJobOrders)
  ->StateContainer.setState
}

let unregisterWorkPlugin = targetPluginName => {
  StateContainer.unsafeGetState()->WorkManager.unregisterPlugin(targetPluginName)->StateContainer.setState
}

let prepare = () => {
  let state = CreateState.createState()

  StateContainer.setState(state)
}

let init = () => {
  StateContainer.unsafeGetState()->WorkManager.init->StateContainer.setState
}

let runPipeline = (
  mostService: Meta3dBsMostType.ServiceType.service,
  pipelineName: Meta3dEngineCoreType.PipelineType.pipelineName,
) => {
  StateContainer.unsafeGetState()
  ->WorkManager.runPipeline(mostService, pipelineName)
  ->Meta3dCommonlib.Result.mapSuccess(mostService.map(StateContainer.setState, _))
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
  StateContainer.unsafeGetState()->ComponentManager.unregisterComponent(componentName)->StateContainer.setState
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
  StateContainer.unsafeGetState()->GameObjectManager.setGameObjectData(data)->StateContainer.setState
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
