let unsafeGetGameObjectData = (
  state: Meta3dEngineCoreProtocol.StateType.state,
): Meta3dEngineCoreProtocol.GameObjectType.gameObjectContribute => {
  state.gameObjectContribute->Meta3dCommonlib.OptionSt.unsafeGet
}

let setGameObjectContribute = (
  state: Meta3dEngineCoreProtocol.StateType.state,
  gameObjectContribute: Meta3dEngineCoreProtocol.GameObjectType.gameObjectContribute,
) => {
  ...state,
  gameObjectContribute: Some(gameObjectContribute),
}

let createAndSetState = (
  {gameObjectContribute} as state: Meta3dEngineCoreProtocol.StateType.state,
  config,
): Meta3dEngineCoreProtocol.StateType.state => {
  let {
    createStateFunc,
    createGameObjectFunc,
    getNeedDisposedGameObjectsFunc,
    deferDisposeGameObjectFunc,
    disposeGameObjectsFunc,
    cloneGameObjectFunc,
    getAllGameObjectsFunc,
  } = unsafeGetGameObjectData(state)

  {
    ...state,
    usedGameObjectContribute: {
      state: createStateFunc(. config),
      createGameObjectFunc: createGameObjectFunc,
      getAllGameObjectsFunc: getAllGameObjectsFunc,
      getNeedDisposedGameObjectsFunc: getNeedDisposedGameObjectsFunc,
      deferDisposeGameObjectFunc: deferDisposeGameObjectFunc,
      disposeGameObjectsFunc: disposeGameObjectsFunc,
      cloneGameObjectFunc: cloneGameObjectFunc,
    }->Some,
  }
}

let _unsafeGetUsedGameObjectContribute = (
  {usedGameObjectContribute}: Meta3dEngineCoreProtocol.StateType.state,
): Meta3dEngineCoreProtocol.GameObjectType.usedGameObjectContribute => {
  usedGameObjectContribute->Meta3dCommonlib.OptionSt.unsafeGet
}

let _setGameObjectStateToState = (
  state: Meta3dEngineCoreProtocol.StateType.state,
  usedGameObjectContribute: Meta3dEngineCoreProtocol.GameObjectType.usedGameObjectContribute,
  gameObjectState: Meta3dEngineCoreProtocol.GameObjectType.state,
): Meta3dEngineCoreProtocol.StateType.state => {
  usedGameObjectContribute.state = gameObjectState

  state.usedGameObjectContribute = usedGameObjectContribute->Some

  state
}

let createGameObject = (state: Meta3dEngineCoreProtocol.StateType.state): (
  Meta3dEngineCoreProtocol.StateType.state,
  Meta3dGameobjectProtocol.Index.gameObject,
) => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute

  let (gameObjectState, gameObject) = usedGameObjectContribute.createGameObjectFunc(.
    usedGameObjectContribute.state,
  )

  (_setGameObjectStateToState(state, usedGameObjectContribute, gameObjectState), gameObject)
}

let deferDisposeGameObject = (state: Meta3dEngineCoreProtocol.StateType.state, gameObject) => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute
  let usedTransformContribute =
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentTransformProtocol.Index.componentName,
    )
  let usedPBRMaterialContribute =
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentPbrmaterialProtocol.Index.componentName,
    )
  let usedGeometryContribute =
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentGeometryProtocol.Index.componentName,
    )

  let (
    gameObjectState,
    transformState,
    pbrMaterialState,
    geometryState,
  ) = usedGameObjectContribute.deferDisposeGameObjectFunc(.
    (
      usedGameObjectContribute.state,
      usedTransformContribute.state,
      usedPBRMaterialContribute.state,
      usedGeometryContribute.state,
    ),
    // TODO remove magic
    (
      (
        usedTransformContribute.getComponentFunc->Obj.magic,
        usedTransformContribute.deferDisposeComponentFunc->Obj.magic,
      ),
      (
        usedPBRMaterialContribute.getComponentFunc->Obj.magic,
        usedPBRMaterialContribute.deferDisposeComponentFunc->Obj.magic,
      ),
      (
        usedGeometryContribute.getComponentFunc->Obj.magic,
        usedGeometryContribute.deferDisposeComponentFunc->Obj.magic,
      ),
    ),
    gameObject,
  )

  let usedTransformContribute =
    transformState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedTransformContribute,
    )
  let usedPBRMaterialContribute =
    pbrMaterialState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedPBRMaterialContribute,
    )
  let usedGeometryContribute =
    geometryState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedGeometryContribute,
    )

  state
  ->_setGameObjectStateToState(usedGameObjectContribute, gameObjectState)
  ->ComponentManager.setUsedComponentContribute(
    usedTransformContribute,
    Meta3dComponentTransformProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedPBRMaterialContribute,
    Meta3dComponentPbrmaterialProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedGeometryContribute,
    Meta3dComponentGeometryProtocol.Index.componentName,
  )
}

let disposeGameObjects = (state, gameObjects) => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute
  let usedTransformContribute =
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentTransformProtocol.Index.componentName,
    )
  let usedPBRMaterialContribute =
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentPbrmaterialProtocol.Index.componentName,
    )
  let usedGeometryContribute =
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentGeometryProtocol.Index.componentName,
    )

  let (
    gameObjectState,
    transformState,
    pbrMaterialState,
    geometryState,
  ) = usedGameObjectContribute.disposeGameObjectsFunc(.
    (
      usedGameObjectContribute.state,
      usedTransformContribute.state,
      usedPBRMaterialContribute.state,
      usedGeometryContribute.state,
    ),
    (
      (
        usedTransformContribute.getComponentFunc->Obj.magic,
        usedTransformContribute.disposeComponentsFunc->Obj.magic,
      ),
      (
        usedPBRMaterialContribute.getComponentFunc->Obj.magic,
        usedPBRMaterialContribute.disposeComponentsFunc->Obj.magic,
      ),
      (
        usedGeometryContribute.getComponentFunc->Obj.magic,
        usedGeometryContribute.disposeComponentsFunc->Obj.magic,
      ),
    ),
    gameObjects,
  )

  let usedTransformContribute =
    transformState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedTransformContribute,
    )
  let usedPBRMaterialContribute =
    pbrMaterialState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedPBRMaterialContribute,
    )
  let usedGeometryContribute =
    geometryState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedGeometryContribute,
    )

  state
  ->_setGameObjectStateToState(usedGameObjectContribute, gameObjectState)
  ->ComponentManager.setUsedComponentContribute(
    usedTransformContribute,
    Meta3dComponentTransformProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedPBRMaterialContribute,
    Meta3dComponentPbrmaterialProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedGeometryContribute,
    Meta3dComponentGeometryProtocol.Index.componentName,
  )
}

let cloneGameObject = (state, count, cloneConfig, sourceGameObject) => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute
  let usedTransformContribute =
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentTransformProtocol.Index.componentName,
    )
  let usedPBRMaterialContribute =
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentPbrmaterialProtocol.Index.componentName,
    )
  let usedGeometryContribute =
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentGeometryProtocol.Index.componentName,
    )

  let (
    (gameObjectState, transformState, pbrMaterialState, geometryState),
    clonedGameObjects,
  ) = usedGameObjectContribute.cloneGameObjectFunc(.
    (
      usedGameObjectContribute.state,
      usedTransformContribute.state,
      usedPBRMaterialContribute.state,
      usedGeometryContribute.state,
    ),
    (
      (
        usedTransformContribute.getComponentFunc->Obj.magic,
        usedTransformContribute.cloneComponentFunc->Obj.magic,
        usedTransformContribute.addComponentFunc->Obj.magic,
        usedTransformContribute.getGameObjectsFunc->Obj.magic,
        usedTransformContribute.getComponentDataFunc->Obj.magic,
        usedTransformContribute.setComponentDataFunc->Obj.magic,
      ),
      (
        usedPBRMaterialContribute.getComponentFunc->Obj.magic,
        usedPBRMaterialContribute.cloneComponentFunc->Obj.magic,
        usedPBRMaterialContribute.addComponentFunc->Obj.magic,
      ),
      (
        usedGeometryContribute.getComponentFunc->Obj.magic,
        usedGeometryContribute.cloneComponentFunc->Obj.magic,
        usedGeometryContribute.addComponentFunc->Obj.magic,
      ),
    ),
    count,
    cloneConfig,
    sourceGameObject,
  )

  // TODO duplicate
  let usedTransformContribute =
    transformState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedTransformContribute,
    )
  let usedPBRMaterialContribute =
    pbrMaterialState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedPBRMaterialContribute,
    )
  let usedGeometryContribute =
    geometryState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedGeometryContribute,
    )

  let state =
    state
    ->_setGameObjectStateToState(usedGameObjectContribute, gameObjectState)
    ->ComponentManager.setUsedComponentContribute(
      usedTransformContribute,
      Meta3dComponentTransformProtocol.Index.componentName,
    )
    ->ComponentManager.setUsedComponentContribute(
      usedPBRMaterialContribute,
      Meta3dComponentPbrmaterialProtocol.Index.componentName,
    )
    ->ComponentManager.setUsedComponentContribute(
      usedGeometryContribute,
      Meta3dComponentGeometryProtocol.Index.componentName,
    )

  (state, clonedGameObjects)
}

let getAllGameObjects = (state: Meta3dEngineCoreProtocol.StateType.state): array<
  Meta3dGameobjectProtocol.Index.gameObject,
> => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute

  usedGameObjectContribute.getAllGameObjectsFunc(. usedGameObjectContribute.state)
}
