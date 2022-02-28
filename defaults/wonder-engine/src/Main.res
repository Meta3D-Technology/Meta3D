open Meta3d.Main

let _getMeta3DEngineCoreExtensionName = () => "meta3d-engine-core"

let _getMeta3DBsMostExtensionName = () => "meta3d-bs-most"

let _getMeta3DEngineCoreExtensionDependentExtensionNameMap = () =>
  (
    {
      meta3dBsMostExtensionName: _getMeta3DBsMostExtensionName(),
    }: Meta3dEngineCoreProtocol.DependentExtensionType.dependentExtensionNameMap
  )->Obj.magic

let prepare = ({isDebug, float9Array1, float32Array1, transformCount}: Type.componentConfig) => {
  let state = prepare()

  // TODO remove magic?
  let state =
    state
    ->registerExtension(
      _getMeta3DBsMostExtensionName(),
      Meta3dBsMost.Main.getExtensionService->Obj.magic,
      ()->Obj.magic,
      Meta3dBsMost.Main.createExtensionState()->Obj.magic,
    )
    ->registerExtension(
      _getMeta3DEngineCoreExtensionName(),
      Meta3dEngineCore.Main.getExtensionService->Obj.magic,
      _getMeta3DEngineCoreExtensionDependentExtensionNameMap(),
      Meta3dEngineCore.Main.createExtensionState()->Obj.magic,
    )

  // TODO move to extension
  let engineCoreState: Meta3dEngineCoreProtocol.StateType.state = getExtensionState(
    state,
    _getMeta3DEngineCoreExtensionName(),
  )
  let {
    registerWorkPlugin,
    registerComponent,
    createAndSetComponentState,
    setGameObjectContribute,
    createAndSetGameObjectState,
  }: Meta3dEngineCoreProtocol.ServiceType.service = getExtensionService(
    state,
    _getMeta3DEngineCoreExtensionName(),
  )

  let engineCoreState =
    engineCoreState
    ->registerComponent(Meta3dComponentTransform.Main.getComponentContribute()->Obj.magic)
    ->createAndSetComponentState(
      Meta3dComponentTransformProtocol.Index.componentName,
      (
        {
          isDebug: isDebug,
          transformCount: transformCount,
          float9Array1: float9Array1,
          float32Array1: float32Array1,
        }: Meta3dComponentTransformProtocol.Index.config
      )->Obj.magic,
    )

  let engineCoreState =
    engineCoreState
    ->setGameObjectContribute(
      Meta3dGameobjectDataoriented.Main.getGameObjectContribute()->Obj.magic,
    )
    ->createAndSetGameObjectState

  let engineCoreState = registerWorkPlugin(
    ~state=engineCoreState,
    ~contribute=Meta3dWorkPluginRoot.Main.getWorkPluginContribute(
      getExtensionService(state, _getMeta3DBsMostExtensionName()),
    )->Obj.magic,
    (),
  )

  state->setExtensionState(_getMeta3DEngineCoreExtensionName(), engineCoreState->Obj.magic)
}

let init = state => {
  // TODO move to extension
  let {map}: Meta3dBsMostProtocol.ServiceType.service = getExtensionService(
    state,
    _getMeta3DBsMostExtensionName(),
  )
  let engineCoreState: Meta3dEngineCoreProtocol.StateType.state = getExtensionState(
    state,
    _getMeta3DEngineCoreExtensionName(),
  )
  let {init, runPipeline}: Meta3dEngineCoreProtocol.ServiceType.service = getExtensionService(
    state,
    _getMeta3DEngineCoreExtensionName(),
  )

  engineCoreState->init->runPipeline(state, "init")->map(engineCoreState => {
    state->setExtensionState(_getMeta3DEngineCoreExtensionName(), engineCoreState->Obj.magic)
  }, _)
}

module TransformAPI = {
  let create = state => {
    let engineCoreState: Meta3dEngineCoreProtocol.StateType.state = getExtensionState(
      state,
      _getMeta3DEngineCoreExtensionName(),
    )
    let {
      unsafeGetUsedComponentContribute,
      createComponent,
      setUsedComponentContribute,
    }: Meta3dEngineCoreProtocol.ServiceType.service = getExtensionService(
      state,
      _getMeta3DEngineCoreExtensionName(),
    )

    let contribute = unsafeGetUsedComponentContribute(
      engineCoreState,
      Meta3dComponentTransformProtocol.Index.componentName,
    )

    let (contribute, transform) = contribute->createComponent

    let engineCoreState =
      engineCoreState->setUsedComponentContribute(
        contribute,
        Meta3dComponentTransformProtocol.Index.componentName,
      )

    (
      state->setExtensionState(_getMeta3DEngineCoreExtensionName(), engineCoreState->Obj.magic),
      transform,
    )
  }
}

module GameObjectAPI = {
  let create = state => {
    let engineCoreState: Meta3dEngineCoreProtocol.StateType.state = getExtensionState(
      state,
      _getMeta3DEngineCoreExtensionName(),
    )
    let {createGameObject}: Meta3dEngineCoreProtocol.ServiceType.service = getExtensionService(
      state,
      _getMeta3DEngineCoreExtensionName(),
    )

    let (engineCoreState, gameObject) = engineCoreState->createGameObject

    (
      state->setExtensionState(_getMeta3DEngineCoreExtensionName(), engineCoreState->Obj.magic),
      gameObject,
    )
  }

  let getAllGameObjects = state => {
    let engineCoreState: Meta3dEngineCoreProtocol.StateType.state = getExtensionState(
      state,
      _getMeta3DEngineCoreExtensionName(),
    )
    let {getAllGameObjects}: Meta3dEngineCoreProtocol.ServiceType.service = getExtensionService(
      state,
      _getMeta3DEngineCoreExtensionName(),
    )

    engineCoreState->getAllGameObjects
  }
}
