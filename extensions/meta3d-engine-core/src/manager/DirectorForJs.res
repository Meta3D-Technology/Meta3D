let _convertJobOrders = (
  jobOrders: Meta3dEngineCoreProtocol.RegisterPipelineVOType.jobOrders,
): Meta3dEngineCoreProtocol.RegisterPipelineType.jobOrders => {
  jobOrders->Meta3dCommonlib.ArraySt.map((
    {pipelineName, insertElementName, insertAction} as jobOrder,
  ): Meta3dEngineCoreProtocol.RegisterPipelineType.jobOrder => {
    pipelineName,
    insertElementName,
    insertAction: switch insertAction {
    | #before => Meta3dEngineCoreProtocol.RegisterPipelineType.Before
    | #after => Meta3dEngineCoreProtocol.RegisterPipelineType.After
    },
  })
}

let registerPipeline = (
  ~state,
  ~contribute,
  ~config: Js.Nullable.t<Meta3dEngineCoreProtocol.RegisterPipelineType.config>=Js.Nullable.null,
  ~jobOrders: Meta3dEngineCoreProtocol.RegisterPipelineVOType.jobOrders=[],
  (),
) => {
  state->PipelineManager.registerPipeline(contribute, config, jobOrders->_convertJobOrders)
}

let unregisterPipeline = PipelineManager.unregisterPipeline

let prepare = () => {
  ()
}

let init = (state, meta3dState) => {
  PipelineManager.init(state, meta3dState)
}

let runPipeline = (
  api: Meta3dType.Index.api,
  (unsafeGetMeta3dState, setMeta3dState),
  meta3dState,
  meta3dEngineCoreExtensionProtocolName,
  pipelineName: Meta3dEngineCoreProtocol.PipelineType.pipelineName,
) => {
  let mostService: Meta3dBsMostProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    "meta3d-bs-most-protocol"
  )

  meta3dState
  ->PipelineManager.runPipeline(
    (api, mostService, unsafeGetMeta3dState, setMeta3dState, meta3dEngineCoreExtensionProtocolName),
    pipelineName,
  )
  // ->Meta3dCommonlib.Result.mapSuccess(mostService.map(StateContainer.setState, _))
  ->Meta3dCommonlib.Result.handleFail(Meta3dCommonlib.Exception.throwErr)
}

// let getStates = PipelineManager.getStates

// let setStates = PipelineManager.setStates

let getIsDebug = ContributeDataManager.getIsDebug

let setIsDebug = ContributeDataManager.setIsDebug

let registerComponent = (state, componentContribute) => {
  state
  ->ComponentManager.registerComponent(componentContribute)
  // ->Meta3dCommonlib.Result.mapSuccess(StateContainer.setState)
  ->Meta3dCommonlib.Result.handleFail(Meta3dCommonlib.Exception.throwErr)
}

let unregisterComponent = ComponentManager.unregisterComponent

let createAndSetComponentState = ComponentManager.createAndSetComponentState

let unsafeGetUsedComponentContribute = ComponentManager.unsafeGetUsedComponentContribute

let setUsedComponentContribute = ComponentManager.setUsedComponentContribute

let createComponent = ComponentManager.createComponent

let setComponentData = ComponentManager.setComponentData

let addComponent = ComponentManager.addComponent

let removeComponent = ComponentManager.removeComponent

let hasComponent = ComponentManager.hasComponent

let getComponent = ComponentManager.getComponent

let getNeedDisposedComponents = ComponentManager.getNeedDisposedComponents

let deferDisposeComponent = ComponentManager.deferDisposeComponent

let disposeComponents = ComponentManager.disposeComponents

let getAllComponents = ComponentManager.getAllComponents

let getComponentData = ComponentManager.getComponentData

let getComponentGameObjects = ComponentManager.getComponentGameObjects

let setGameObjectContribute = GameObjectManager.setGameObjectContribute

let createAndSetGameObjectState = GameObjectManager.createAndSetState

let createGameObject = GameObjectManager.createGameObject

let getNeedDisposedGameObjects = GameObjectManager.getNeedDisposedGameObjects

let deferDisposeGameObject = GameObjectManager.deferDisposeGameObject

let disposeGameObjects = GameObjectManager.disposeGameObjects

let cloneGameObject = GameObjectManager.cloneGameObject

let getAllGameObjects = GameObjectManager.getAllGameObjects

let getComponentState = (
  state,
  componentName: Meta3dEngineCoreProtocol.ComponentContributeType.componentName,
) => {
  state->ComponentManager.getComponentState(componentName)->Meta3dCommonlib.OptionSt.toNullable
}

let restore = RedoUndoManager.restore

let deepCopy = RedoUndoManager.deepCopy