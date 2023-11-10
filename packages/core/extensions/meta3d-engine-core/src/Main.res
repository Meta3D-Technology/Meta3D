let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dEngineCoreProtocol.ServiceType.service,
> = api => {
  getIsDebug: meta3dState => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")->DirectorForJs.getIsDebug
  },
  setIsDebug: (meta3dState, value) => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.setIsDebug(value)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  prepare: DirectorForJs.prepare,
  init: meta3dState => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.init(meta3dState)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  registerPipeline: (~meta3dState, ~contribute, ~config=Js.Nullable.null, ~jobOrders=[], ()) => {
    DirectorForJs.registerPipeline(
      ~state=api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol"),
      ~contribute,
      ~config,
      ~jobOrders,
      (),
    )->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  unregisterPipeline: (meta3dState, value) => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.unregisterPipeline(value)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  registerComponent: (meta3dState, value) => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.registerComponent(value)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  unregisterComponent: (meta3dState, value) => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.unregisterComponent(value)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  createAndSetComponentState: (meta3dState, componentName, config) => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.createAndSetComponentState(componentName, config)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  unsafeGetUsedComponentContribute: (meta3dState, value) => {
    api.getExtensionState(.
      meta3dState,
      "meta3d-engine-core-protocol",
    )->DirectorForJs.unsafeGetUsedComponentContribute(value)
  },
  setUsedComponentContribute: (meta3dState, usedComponentContribute, componentName) => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.setUsedComponentContribute(usedComponentContribute, componentName)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
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
  getComponentState: (meta3dState, value) => {
    api.getExtensionState(.
      meta3dState,
      "meta3d-engine-core-protocol",
    )->DirectorForJs.getComponentState(value)
  },
  setGameObjectContribute: (meta3dState, value) => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.setGameObjectContribute(value)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  createAndSetGameObjectState: (meta3dState, value) => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.createAndSetGameObjectState(value)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  createGameObject: meta3dState => {
    let (state, gameObject) =
      api.getExtensionState(.
        meta3dState,
        "meta3d-engine-core-protocol",
      )->DirectorForJs.createGameObject

    (state->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _), gameObject)
  },
  getNeedDisposedGameObjects: meta3dState => {
    api.getExtensionState(.
      meta3dState,
      "meta3d-engine-core-protocol",
    )->DirectorForJs.getNeedDisposedGameObjects
  },
  deferDisposeGameObject: (meta3dState, value) => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.deferDisposeGameObject(value)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  disposeGameObjects: (meta3dState, value) => {
    let (state, data) =
      api.getExtensionState(.
        meta3dState,
        "meta3d-engine-core-protocol",
      )->DirectorForJs.disposeGameObjects(value)

    (state->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _), data->Obj.magic)
  },
  cloneGameObject: (meta3dState, count, cloneConfig, sourceGameObject) => {
    let (state, clonedGameObjects) =
      api.getExtensionState(.
        meta3dState,
        "meta3d-engine-core-protocol",
      )->DirectorForJs.cloneGameObject(count, cloneConfig, sourceGameObject)

    (
      state->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _),
      clonedGameObjects,
    )
  },
  getAllGameObjects: meta3dState => {
    api.getExtensionState(.
      meta3dState,
      "meta3d-engine-core-protocol",
    )->DirectorForJs.getAllGameObjects
  },
  getGameObjectName: (meta3dState, gameObject) => {
    api.getExtensionState(.
      meta3dState,
      "meta3d-engine-core-protocol",
    )->DirectorForJs.getGameObjectName(gameObject)
  },
  setGameObjectName: (meta3dState, gameObject, name) => {
    api.getExtensionState(. meta3dState, "meta3d-engine-core-protocol")
    ->DirectorForJs.setGameObjectName(gameObject, name)
    ->api.setExtensionState(. meta3dState, "meta3d-engine-core-protocol", _)
  },
  runPipeline: DirectorForJs.runPipeline(
    api,
    (StateContainer.unsafeGetMeta3dState, StateContainer.setMeta3dState),
  ),
  // getStates: DirectorForJs.getStates,
  // setStates: DirectorForJs.setStates,
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dEngineCoreProtocol.StateType.state,
> = () => {
  CreateState.createState()
}

let getExtensionLife: Meta3dType.Index.getExtensionLife<
  Meta3dEngineCoreProtocol.ServiceType.service,
> = (api, extensionProtocolName) => {
  {
    onRegister: Js.Nullable.null,
    onRestore: Meta3dCommonlib.NullableSt.return(DirectorForJs.restore(api, extensionProtocolName)),
    onDeepCopy: Meta3dCommonlib.NullableSt.return(
      DirectorForJs.deepCopy(api, extensionProtocolName),
    ),
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}
