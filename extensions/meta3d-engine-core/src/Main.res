let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dEngineCoreProtocol.DependentExtensionType.dependentExtensionNameMap,
  Meta3dEngineCoreProtocol.ServiceType.service,
> = (api, dependentExtensionNameMap) => {
  prepare: DirectorForJs.prepare,
  init: DirectorForJs.init,
  registerWorkPlugin: DirectorForJs.registerWorkPlugin,
  unregisterWorkPlugin: DirectorForJs.unregisterWorkPlugin,
  registerComponent: DirectorForJs.registerComponent,
  unregisterComponent: DirectorForJs.unregisterComponent,
  createAndSetComponentState: DirectorForJs.createAndSetComponentState,
  unsafeGetUsedComponentContribute: DirectorForJs.unsafeGetUsedComponentContribute,
  setUsedComponentContribute: DirectorForJs.setUsedComponentContribute,
  createComponent: DirectorForJs.createComponent,
  setComponentData: DirectorForJs.setComponentData,
  addComponent: DirectorForJs.addComponent,
  hasComponent: DirectorForJs.hasComponent,
  getComponent: DirectorForJs.getComponent,
  getAllComponents: DirectorForJs.getAllComponents,
  getComponentData: DirectorForJs.getComponentData,
  getComponentGameObjects: DirectorForJs.getComponentGameObjects,
  getComponentState: DirectorForJs.getComponentState,
  setGameObjectContribute: DirectorForJs.setGameObjectContribute,
  createAndSetGameObjectState: DirectorForJs.createAndSetGameObjectState,
  createGameObject: DirectorForJs.createGameObject,
  getAllGameObjects: DirectorForJs.getAllGameObjects,
  runPipeline: DirectorForJs.runPipeline((api, dependentExtensionNameMap)),
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dEngineCoreProtocol.StateType.state,
> = () => {
  CreateState.createState()
}
