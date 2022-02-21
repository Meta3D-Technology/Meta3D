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
  ()
}

let init = state => {
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

let registerComponent = (state, componentContribute) => {
  state
  ->ComponentManager.registerComponent(componentContribute)
  // ->Meta3dCommonlib.Result.mapSuccess(StateContainer.setState)
  ->Meta3dCommonlib.Result.handleFail(Meta3dCommonlib.Exception.throwErr)
}

let unregisterComponent = (state, componentName) => {
  state->ComponentManager.unregisterComponent(componentName)
}

let createAndSetComponentState = (state, componentName, config) => {
  state->ComponentManager.createAndSetComponentState(componentName, config)
}

let unsafeGetUsedComponentContribute = (state, componentName) => {
  state->ComponentManager.unsafeGetUsedComponentContribute(componentName)
}

let setUsedComponentContribute = (state, usedComponentContribute, componentName) => {
  state->ComponentManager.setUsedComponentContribute(usedComponentContribute, componentName)
}

let createComponent = usedComponentContribute => {
  usedComponentContribute->ComponentManager.createComponent
}

let setComponentData = (usedComponentContribute, component, dataName, dataValue) => {
  usedComponentContribute->ComponentManager.setComponentData(component, dataName, dataValue)
}

let addComponent = (usedComponentContribute, gameObject, component) => {
  usedComponentContribute->ComponentManager.addComponent(gameObject, component)
}

let hasComponent = (usedComponentContribute, gameObject) => {
  usedComponentContribute->ComponentManager.hasComponent(gameObject)
}

let getComponent = (usedComponentContribute, gameObject) => {
  usedComponentContribute->ComponentManager.getComponent(gameObject)
}

let getAllComponents = usedComponentContribute => {
  usedComponentContribute->ComponentManager.getAllComponents
}

let getComponentData = (usedComponentContribute, component, dataName) => {
  usedComponentContribute->ComponentManager.getComponentData(component, dataName)
}

let getComponentGameObjects = (usedComponentContribute, component) => {
  usedComponentContribute->ComponentManager.getComponentGameObjects(component)
}

let setGameObjectContribute = (state, gameObjectContribute) => {
  state->GameObjectManager.setGameObjectContribute(gameObjectContribute)
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

let getComponentState = (
  state,
  componentName: Meta3dEngineCoreProtocol.IComponentForJs.componentName,
) => {
  state->ComponentManager.getComponentState(componentName)->Meta3dCommonlib.OptionSt.toNullable
}
