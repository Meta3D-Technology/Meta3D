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
  ~data,
  ~jobOrders: Meta3dEngineCoreProtocol.RegisterWorkPluginVOType.jobOrders=[],
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
  let mostService: Meta3dBsMostProtocol.ServiceType.service = api.getServiceExn(
    meta3dState,
    meta3dBsMostExtensionName,
  )

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

let getComponentContribute = (data, component, dataName) => {
  data->ComponentManager.getComponentContribute(component, dataName)
}

let getComponentGameObjects = (data, component) => {
  data->ComponentManager.getComponentGameObjects(component)
}

let setGameObjectContribute = state => {
  state->GameObjectManager.setGameObjectContribute
}

let createAndSetGameObjectState = state => {
  state->GameObjectManager.createAndSetState
}

let createGameObject = state => {
  let (state, gameObject) = state->GameObjectManager.createGameObject

  (state, gameObject)
}

let getAllGameObjects = state => {
  state->GameObjectManager.getAllGameObjects
}

let getState = (componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName) => {
  StateContainer.unsafeGetState()
  ->ComponentManager.getState(componentName)
  ->Meta3dCommonlib.OptionSt.toNullable
}
