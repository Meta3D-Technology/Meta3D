open Meta3d.Main

let _getMeta3DEngineCoreExtensionName = () => "meta3d-engine-core"

let _getMeta3DBsMostExtensionName = () => "meta3d-bs-most"

let _getMeta3DEngineCoreExtensionDependentExtensionNameMap = () =>
  (
    {
      meta3dBsMostExtensionName: _getMeta3DBsMostExtensionName(),
    }: Meta3dEngineCoreProtocol.DependentExtensionType.dependentExtensionNameMap
  )->Obj.magic

let prepare = () => {
  let state = prepare()

  // TODO remove magic?
  let state =
    state
    ->registerExtension(
      _getMeta3DBsMostExtensionName(),
      Meta3dBsMost.Main.getService->Obj.magic,
      ()->Obj.magic,
      Meta3dBsMost.Main.createState()->Obj.magic,
    )
    ->registerExtension(
      _getMeta3DEngineCoreExtensionName(),
      Meta3dEngineCore.Main.getService->Obj.magic,
      _getMeta3DEngineCoreExtensionDependentExtensionNameMap(),
      Meta3dEngineCore.Main.createState()->Obj.magic,
    )

  // TODO move to extension
  let engineCoreState: Meta3dEngineCoreProtocol.StateType.state = getExtensionStateExn(
    state,
    _getMeta3DEngineCoreExtensionName(),
  )
  let {registerWorkPlugin}: Meta3dEngineCoreProtocol.ServiceType.service = getServiceExn(
    state,
    _getMeta3DEngineCoreExtensionName(),
  )
  let engineCoreState = registerWorkPlugin(
    ~state=engineCoreState,
    ~data=Meta3dWorkPluginRoot.Main.getData(
      getServiceExn(state, _getMeta3DBsMostExtensionName()),
    )->Obj.magic,
    (),
  )

  state->setExtensionState(_getMeta3DEngineCoreExtensionName(), engineCoreState->Obj.magic)
}

let init = state => {
  // TODO move to extension
  let {map}: Meta3dBsMostProtocol.ServiceType.service = getServiceExn(
    state,
    _getMeta3DBsMostExtensionName(),
  )
  let engineCoreState: Meta3dEngineCoreProtocol.StateType.state = getExtensionStateExn(
    state,
    _getMeta3DEngineCoreExtensionName(),
  )
  let {init, runPipeline}: Meta3dEngineCoreProtocol.ServiceType.service = getServiceExn(
    state,
    _getMeta3DEngineCoreExtensionName(),
  )

  engineCoreState->init->runPipeline(state, "init")->map(engineCoreState => {
    state->setExtensionState(_getMeta3DEngineCoreExtensionName(), engineCoreState->Obj.magic)
  }, _)
}
