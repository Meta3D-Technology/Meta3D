let registerWorkPlugin = (
  ~contribute,
  ~jobOrders: Meta3dEngineCoreProtocol.RegisterWorkPluginVOType.jobOrders=[],
  (),
) => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.registerWorkPlugin(~state=_, ~contribute, ~jobOrders, ())
  ->StateContainer.setState
}

let unregisterWorkPlugin = targetPluginName => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.unregisterWorkPlugin(targetPluginName)
  ->StateContainer.setState
}

let prepare = () => {
  DirectorForJs.prepare
}

let init = () => {
  StateContainer.unsafeGetState()->DirectorForJs.init->StateContainer.setState
}

let runPipeline = (
  (
    api: Meta3dType.Index.api,
    {
      meta3dBsMostExtensionName,
    }: Meta3dEngineCoreProtocol.DependentExtensionType.dependentExtensionNameMap,
  ) as data,
  meta3dState,
  pipelineName,
) => {
  let mostService: Meta3dBsMostProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    meta3dBsMostExtensionName,
  )

  StateContainer.unsafeGetState()
  ->DirectorForJs.runPipeline(data, _, meta3dState, pipelineName)
  ->mostService.map(StateContainer.setState, _)
}

let getIsDebug = () => {
  StateContainer.unsafeGetState()->PluginDataManager.getIsDebug
}

let setIsDebug = isDebug => {
  StateContainer.unsafeGetState()->PluginDataManager.setIsDebug(isDebug)->StateContainer.setState
}

let registerComponent = contribute => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.registerComponent(contribute)
  ->StateContainer.setState
}

let unregisterComponent = componentName => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.unregisterComponent(componentName)
  ->StateContainer.setState
}

let createAndSetComponentState = (componentName, config) => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.createAndSetComponentState(componentName, config)
  ->StateContainer.setState
}

let unsafeGetUsedComponentContribute = componentName => {
  StateContainer.unsafeGetState()->DirectorForJs.unsafeGetUsedComponentContribute(componentName)
}

let createComponent = contribute => {
  contribute->DirectorForJs.createComponent
}

let setComponentData = (contribute, component, dataName, dataValue) => {
  contribute->DirectorForJs.setComponentData(component, dataName, dataValue)
}

let addComponent = (contribute, gameObject, component) => {
  contribute->DirectorForJs.addComponent(gameObject, component)
}

let removeComponent = (contribute, gameObject, component) => {
  contribute->DirectorForJs.removeComponent(gameObject, component)
}

let hasComponent = (contribute, gameObject) => {
  contribute->DirectorForJs.hasComponent(gameObject)
}

let getComponent = (contribute, gameObject) => {
  contribute->DirectorForJs.getComponent(gameObject)
}

let deferDisposeComponent = DirectorForJs.deferDisposeComponent

let disposeComponents = DirectorForJs.disposeComponents

let getAllComponents = contribute => {
  contribute->DirectorForJs.getAllComponents
}

let getComponentData = (contribute, component, dataName) => {
  contribute->DirectorForJs.getComponentData(component, dataName)
}

let getComponentGameObjects = (contribute, component) => {
  contribute->DirectorForJs.getComponentGameObjects(component)
}

let setGameObjectContribute = contribute => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.setGameObjectContribute(contribute)
  ->StateContainer.setState
}

let createAndSetGameObjectState = config => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.createAndSetGameObjectState(config)
  ->StateContainer.setState
}

let createGameObject = () => {
  let (state, gameObject) = StateContainer.unsafeGetState()->DirectorForJs.createGameObject

  state->StateContainer.setState

  gameObject
}

let deferDisposeGameObject = gameObject => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.deferDisposeGameObject(gameObject)
  ->StateContainer.setState
}

let disposeGameObjects = gameObjects => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.disposeGameObjects(gameObjects)
  ->StateContainer.setState
}

let getAllGameObjects = () => {
  StateContainer.unsafeGetState()->DirectorForJs.getAllGameObjects
}

let getComponentState = componentName => {
  StateContainer.unsafeGetState()->DirectorForJs.getComponentState(componentName)
}

let getGameObjectState = () => {
  (StateContainer.unsafeGetState()->GameObjectManager._unsafeGetUsedGameObjectContribute).state
}
