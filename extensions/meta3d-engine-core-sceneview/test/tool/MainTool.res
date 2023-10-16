open Sinon

let registerPipelineWithState = (
  ~contribute,
  ~state,
  ~config: Js.Nullable.t<
    Meta3dEngineCoreSceneviewProtocol.RegisterPipelineType.config,
  >=Js.Nullable.null,
  ~jobOrders: Meta3dEngineCoreSceneviewProtocol.RegisterPipelineVOType.jobOrders=[],
  (),
) => {
  state->DirectorForJs.registerPipeline(~state=_, ~contribute, ~config, ~jobOrders, ())
}

let registerPipeline = (
  ~contribute,
  ~config: Js.Nullable.t<
    Meta3dEngineCoreSceneviewProtocol.RegisterPipelineType.config,
  >=Js.Nullable.null,
  ~jobOrders: Meta3dEngineCoreSceneviewProtocol.RegisterPipelineVOType.jobOrders=[],
  (),
) => {
  registerPipelineWithState(
    ~contribute,
    ~state=StateContainer.unsafeGetState(),
    ~config,
    ~jobOrders,
    (),
  )->StateContainer.setState
}

let unregisterPipeline = targetPipelineName => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.unregisterPipeline(targetPipelineName)
  ->StateContainer.setState
}

let prepare = () => {
  DirectorForJs.prepare
}

let init = meta3dState => {
  StateContainer.unsafeGetState()->DirectorForJs.init(meta3dState)->StateContainer.setState
}

let _buildMeta3dEngineCoreExtensionProtocolName = () => "meta3dEngineCoreExtensionProtocolName"

let getStates = () => {
  // let api = Meta3d.ExtensionManager.buildAPI()

  // (
  // api.getExtensionState(.
  //   StateContainer.unsafeGetMeta3dState(),
  //   _buildMeta3dEngineCoreExtensionProtocolName(),
  // ): Meta3dEngineCoreSceneviewProtocol.StateType.state

  // )

  StateContainer.unsafeGetState().states
}

let runPipeline = (
  ~sandbox,
  ~data,
  ~meta3dState,
  ~pipelineName,
  ~unsafeGetMeta3dState=createEmptyStubWithJsObjSandbox(sandbox),
  ~setMeta3dState=createEmptyStubWithJsObjSandbox(sandbox),
  (),
) => {
  let api: Meta3dType.Index.api = data

  let mostService: Meta3dBsMostProtocol.ServiceType.service = Meta3dBsMost.Main.getExtensionService(
    Obj.magic(1),
  )

  let meta3dEngineCoreExtensionProtocolName = _buildMeta3dEngineCoreExtensionProtocolName()

  api.getExtensionService->Obj.magic->returns(mostService, _)->Obj.magic

  StateContainer.unsafeGetMeta3dState()
  ->DirectorForJs.runPipeline(
    data,
    (unsafeGetMeta3dState, setMeta3dState),
    _,
    meta3dEngineCoreExtensionProtocolName,
    pipelineName,
  )
  ->mostService.map(StateContainer.setMeta3dState, _)
}

// let getStates = DirectorForJs.getStates

// let setStates = DirectorForJs.setStates

let getIsDebug = () => {
  StateContainer.unsafeGetState()->ContributeDataManager.getIsDebug
}

let setIsDebug = isDebug => {
  StateContainer.unsafeGetState()
  ->ContributeDataManager.setIsDebug(isDebug)
  ->StateContainer.setState
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

// TODO remove magic
let unsafeGetUsedComponentContribute = componentName => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.unsafeGetUsedComponentContribute(componentName)
  ->Obj.magic
}

// TODO remove magic
let createComponent = contribute => {
  contribute->DirectorForJs.createComponent->Obj.magic
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

let getNeedDisposedComponents = DirectorForJs.getNeedDisposedComponents

let deferDisposeComponent = DirectorForJs.deferDisposeComponent

let disposeComponents = (usedComponentContribute, batchDisposeData) => {
  DirectorForJs.disposeComponents(
    usedComponentContribute,
    batchDisposeData,
  )->Meta3dCommonlib.Tuple2.getFirst
}

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

let getNeedDisposedGameObjects = () => {
  StateContainer.unsafeGetState()->DirectorForJs.getNeedDisposedGameObjects
}

let disposeGameObjects = gameObjects => {
  let (state, _) = StateContainer.unsafeGetState()->DirectorForJs.disposeGameObjects(gameObjects)

  state->StateContainer.setState
}

let cloneGameObject = (count, cloneConfig, gameObject) => {
  let (state, clonedGameObjects) =
    StateContainer.unsafeGetState()->DirectorForJs.cloneGameObject(count, cloneConfig, gameObject)

  state->StateContainer.setState

  clonedGameObjects
}

let getAllGameObjects = () => {
  StateContainer.unsafeGetState()->DirectorForJs.getAllGameObjects
}

let getComponentState = componentName => {
  StateContainer.unsafeGetState()->DirectorForJs.getComponentState(componentName)
}

let getGameObjectState = () => {
  (StateContainer.unsafeGetState()->StateUtils.unsafeGetUsedGameObjectContribute).state
}
