let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dEngineCoreSceneviewProtocol.ServiceType.service,
> = api => {
  getIsDebug: DirectorForJs.getIsDebug,
  setIsDebug: DirectorForJs.setIsDebug,
  prepare: DirectorForJs.prepare,
  init: DirectorForJs.init,
  registerPipeline: DirectorForJs.registerPipeline,
  unregisterPipeline: DirectorForJs.unregisterPipeline,
  registerComponent: DirectorForJs.registerComponent,
  unregisterComponent: DirectorForJs.unregisterComponent,
  createAndSetComponentState: DirectorForJs.createAndSetComponentState,
  unsafeGetUsedComponentContribute: DirectorForJs.unsafeGetUsedComponentContribute,
  setUsedComponentContribute: DirectorForJs.setUsedComponentContribute,
  createComponent: DirectorForJs.createComponent,
  setComponentData: DirectorForJs.setComponentData,
  addComponent: DirectorForJs.addComponent,
  removeComponent: DirectorForJs.removeComponent,
  hasComponent: DirectorForJs.hasComponent,
  getComponent: DirectorForJs.getComponent,
  getNeedDisposedComponents: DirectorForJs.getNeedDisposedComponents,
  deferDisposeComponent: DirectorForJs.deferDisposeComponent,
  disposeComponents: DirectorForJs.disposeComponents,
  getAllComponents: DirectorForJs.getAllComponents,
  getComponentData: DirectorForJs.getComponentData,
  getComponentGameObjects: DirectorForJs.getComponentGameObjects,
  getComponentState: DirectorForJs.getComponentState,
  setGameObjectContribute: DirectorForJs.setGameObjectContribute,
  createAndSetGameObjectState: DirectorForJs.createAndSetGameObjectState,
  createGameObject: DirectorForJs.createGameObject,
  getNeedDisposedGameObjects: DirectorForJs.getNeedDisposedGameObjects,
  deferDisposeGameObject: DirectorForJs.deferDisposeGameObject,
  disposeGameObjects: DirectorForJs.disposeGameObjects,
  cloneGameObject: DirectorForJs.cloneGameObject,
  getAllGameObjects: DirectorForJs.getAllGameObjects,
  runPipeline: DirectorForJs.runPipeline(
    api,
    (StateContainer.unsafeGetMeta3dState, StateContainer.setMeta3dState),
  ),
  // getStates: DirectorForJs.getStates,
  // setStates: DirectorForJs.setStates,
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dEngineCoreSceneviewProtocol.StateType.state,
> = () => {
  CreateState.createState()
}

let getExtensionLife: Meta3dType.Index.getExtensionLife<
  Meta3dEngineCoreSceneviewProtocol.ServiceType.service,
> = (api, extensionProtocolName) => {
  {
    onRegister: Js.Nullable.null,
    onRestore: Meta3dCommonlib.NullableSt.return(DirectorForJs.restore(api,extensionProtocolName)),
    onDeepCopy: Meta3dCommonlib.NullableSt.return(DirectorForJs.deepCopy(api, extensionProtocolName)),
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}
