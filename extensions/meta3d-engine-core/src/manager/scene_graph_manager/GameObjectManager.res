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
      createGameObjectFunc,
      getAllGameObjectsFunc,
      getNeedDisposedGameObjectsFunc,
      deferDisposeGameObjectFunc,
      disposeGameObjectsFunc,
      cloneGameObjectFunc,
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

let _getAllUsedContributes = state => {
  (
    state->_unsafeGetUsedGameObjectContribute,
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentTransformProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentPbrmaterialProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentGeometryProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentDirectionlightProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentArcballcameracontrollerProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentBasiccameraviewProtocol.Index.componentName,
    ),
    state->ComponentManager.unsafeGetUsedComponentContribute(
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.componentName,
    ),
  )
}

let _setGameObjectStateAndAllComponentStatesToState = (
  state,
  (
    usedGameObjectContribute,
    usedTransformContribute,
    usedPBRMaterialContribute,
    usedGeometryContribute,
    usedDirectionLightContribute,
    usedArcballCameraControllerContribute,
    usedBasicCameraViewContribute,
    usedPerspectiveCameraProjectionContribute,
  ),
  (
    gameObjectState,
    transformState,
    pbrMaterialState,
    geometryState,
    directionLightState,
    arcballCameraControllerState,
    basicCameraViewState,
    perspectiveCameraProjectionState,
  ),
) => {
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
  let usedDirectionLightContribute =
    directionLightState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedDirectionLightContribute,
    )
  let usedArcballCameraControllerContribute =
    arcballCameraControllerState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedArcballCameraControllerContribute,
    )
  let usedBasicCameraViewContribute =
    basicCameraViewState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedBasicCameraViewContribute,
    )
  let usedPerspectiveCameraProjectionContribute =
    perspectiveCameraProjectionState->ComponentManager.setComponentStateToUsedComponentContribute(
      usedPerspectiveCameraProjectionContribute,
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
  ->ComponentManager.setUsedComponentContribute(
    usedDirectionLightContribute,
    Meta3dComponentDirectionlightProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedArcballCameraControllerContribute,
    Meta3dComponentArcballcameracontrollerProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedBasicCameraViewContribute,
    Meta3dComponentBasiccameraviewProtocol.Index.componentName,
  )
  ->ComponentManager.setUsedComponentContribute(
    usedPerspectiveCameraProjectionContribute,
    Meta3dComponentPerspectivecameraprojectionProtocol.Index.componentName,
  )
}

let getNeedDisposedGameObjects = (state: Meta3dEngineCoreProtocol.StateType.state) => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute

  usedGameObjectContribute.getNeedDisposedGameObjectsFunc(. usedGameObjectContribute.state)
}

let deferDisposeGameObject = (state: Meta3dEngineCoreProtocol.StateType.state, gameObject) => {
  let (
    usedGameObjectContribute,
    usedTransformContribute,
    usedPBRMaterialContribute,
    usedGeometryContribute,
    usedDirectionLightContribute,
    usedArcballCameraControllerContribute,
    usedBasicCameraViewContribute,
    usedPerspectiveCameraProjectionContribute,
  ) = _getAllUsedContributes(state)

  let (
    gameObjectState,
    transformState,
    pbrMaterialState,
    geometryState,
    directionLightState,
    arcballCameraControllerState,
    basicCameraViewState,
    perspectiveCameraProjectionState,
  ) = usedGameObjectContribute.deferDisposeGameObjectFunc(.
    (
      usedGameObjectContribute.state,
      usedTransformContribute.state,
      usedPBRMaterialContribute.state,
      usedGeometryContribute.state,
      usedDirectionLightContribute.state,
      usedArcballCameraControllerContribute.state,
      usedBasicCameraViewContribute.state,
      usedPerspectiveCameraProjectionContribute.state,
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
      (
        usedDirectionLightContribute.getComponentFunc->Obj.magic,
        usedDirectionLightContribute.deferDisposeComponentFunc->Obj.magic,
      ),
      (
        usedArcballCameraControllerContribute.getComponentFunc->Obj.magic,
        usedArcballCameraControllerContribute.deferDisposeComponentFunc->Obj.magic,
      ),
      (
        usedBasicCameraViewContribute.getComponentFunc->Obj.magic,
        usedBasicCameraViewContribute.deferDisposeComponentFunc->Obj.magic,
      ),
      (
        usedPerspectiveCameraProjectionContribute.getComponentFunc->Obj.magic,
        usedPerspectiveCameraProjectionContribute.deferDisposeComponentFunc->Obj.magic,
      ),
    ),
    gameObject,
  )

  state->_setGameObjectStateAndAllComponentStatesToState(
    (
      usedGameObjectContribute,
      usedTransformContribute,
      usedPBRMaterialContribute,
      usedGeometryContribute,
      usedDirectionLightContribute,
      usedArcballCameraControllerContribute,
      usedBasicCameraViewContribute,
      usedPerspectiveCameraProjectionContribute,
    ),
    (
      gameObjectState,
      transformState,
      pbrMaterialState,
      geometryState,
      directionLightState,
      arcballCameraControllerState,
      basicCameraViewState,
      perspectiveCameraProjectionState,
    ),
  )
}

let disposeGameObjects = (state, gameObjects) => {
  let (
    usedGameObjectContribute,
    usedTransformContribute,
    usedPBRMaterialContribute,
    usedGeometryContribute,
    usedDirectionLightContribute,
    usedArcballCameraControllerContribute,
    usedBasicCameraViewContribute,
    usedPerspectiveCameraProjectionContribute,
  ) = _getAllUsedContributes(state)

  let (
    gameObjectState,
    transformState,
    pbrMaterialState,
    geometryState,
    directionLightState,
    arcballCameraControllerState,
    basicCameraViewState,
    perspectiveCameraProjectionState,
  ) = usedGameObjectContribute.disposeGameObjectsFunc(.
    (
      usedGameObjectContribute.state,
      usedTransformContribute.state,
      usedPBRMaterialContribute.state,
      usedGeometryContribute.state,
      usedDirectionLightContribute.state,
      usedArcballCameraControllerContribute.state,
      usedBasicCameraViewContribute.state,
      usedPerspectiveCameraProjectionContribute.state,
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
      (
        usedDirectionLightContribute.getComponentFunc->Obj.magic,
        usedDirectionLightContribute.disposeComponentsFunc->Obj.magic,
      ),
      (
        usedArcballCameraControllerContribute.getComponentFunc->Obj.magic,
        usedArcballCameraControllerContribute.disposeComponentsFunc->Obj.magic,
      ),
      (
        usedBasicCameraViewContribute.getComponentFunc->Obj.magic,
        usedBasicCameraViewContribute.disposeComponentsFunc->Obj.magic,
      ),
      (
        usedPerspectiveCameraProjectionContribute.getComponentFunc->Obj.magic,
        usedPerspectiveCameraProjectionContribute.disposeComponentsFunc->Obj.magic,
      ),
    ),
    gameObjects,
  )

  state->_setGameObjectStateAndAllComponentStatesToState(
    (
      usedGameObjectContribute,
      usedTransformContribute,
      usedPBRMaterialContribute,
      usedGeometryContribute,
      usedDirectionLightContribute,
      usedArcballCameraControllerContribute,
      usedBasicCameraViewContribute,
      usedPerspectiveCameraProjectionContribute,
    ),
    (
      gameObjectState,
      transformState,
      pbrMaterialState,
      geometryState,
      directionLightState,
      arcballCameraControllerState,
      basicCameraViewState,
      perspectiveCameraProjectionState,
    ),
  )
}

let cloneGameObject = (state, count, cloneConfig, sourceGameObject) => {
  let (
    usedGameObjectContribute,
    usedTransformContribute,
    usedPBRMaterialContribute,
    usedGeometryContribute,
    usedDirectionLightContribute,
    usedArcballCameraControllerContribute,
    usedBasicCameraViewContribute,
    usedPerspectiveCameraProjectionContribute,
  ) = _getAllUsedContributes(state)

  let (
    (
      gameObjectState,
      transformState,
      pbrMaterialState,
      geometryState,
      directionLightState,
      arcballCameraControllerState,
      basicCameraViewState,
      perspectiveCameraProjectionState,
    ),
    clonedGameObjects,
  ) = usedGameObjectContribute.cloneGameObjectFunc(.
    (
      usedGameObjectContribute.state,
      usedTransformContribute.state,
      usedPBRMaterialContribute.state,
      usedGeometryContribute.state,
      usedDirectionLightContribute.state,
      usedArcballCameraControllerContribute.state,
      usedBasicCameraViewContribute.state,
      usedPerspectiveCameraProjectionContribute.state,
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
      (
        usedDirectionLightContribute.getComponentFunc->Obj.magic,
        usedDirectionLightContribute.cloneComponentFunc->Obj.magic,
        usedDirectionLightContribute.addComponentFunc->Obj.magic,
      ),
      (
        usedArcballCameraControllerContribute.getComponentFunc->Obj.magic,
        usedArcballCameraControllerContribute.cloneComponentFunc->Obj.magic,
        usedArcballCameraControllerContribute.addComponentFunc->Obj.magic,
      ),
      (
        usedBasicCameraViewContribute.getComponentFunc->Obj.magic,
        usedBasicCameraViewContribute.cloneComponentFunc->Obj.magic,
        usedBasicCameraViewContribute.addComponentFunc->Obj.magic,
      ),
      (
        usedPerspectiveCameraProjectionContribute.getComponentFunc->Obj.magic,
        usedPerspectiveCameraProjectionContribute.cloneComponentFunc->Obj.magic,
        usedPerspectiveCameraProjectionContribute.addComponentFunc->Obj.magic,
      ),
    ),
    count,
    cloneConfig,
    sourceGameObject,
  )

  let state =
    state->_setGameObjectStateAndAllComponentStatesToState(
      (
        usedGameObjectContribute,
        usedTransformContribute,
        usedPBRMaterialContribute,
        usedGeometryContribute,
        usedDirectionLightContribute,
        usedArcballCameraControllerContribute,
        usedBasicCameraViewContribute,
        usedPerspectiveCameraProjectionContribute,
      ),
      (
        gameObjectState,
        transformState,
        pbrMaterialState,
        geometryState,
        directionLightState,
        arcballCameraControllerState,
        basicCameraViewState,
        perspectiveCameraProjectionState,
      ),
    )

  (state, clonedGameObjects)
}

let getAllGameObjects = (state: Meta3dEngineCoreProtocol.StateType.state): array<
  Meta3dGameobjectProtocol.Index.gameObject,
> => {
  let usedGameObjectContribute = state->_unsafeGetUsedGameObjectContribute

  usedGameObjectContribute.getAllGameObjectsFunc(. usedGameObjectContribute.state)
}
