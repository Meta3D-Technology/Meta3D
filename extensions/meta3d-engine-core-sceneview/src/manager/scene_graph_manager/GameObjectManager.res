let unsafeGetGameObjectData = (
  state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
): Meta3dEngineCoreSceneviewProtocol.GameObjectType.gameObjectContribute => {
  state.gameObjectContribute->Meta3dCommonlib.OptionSt.unsafeGet
}

let setGameObjectContribute = (
  state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  gameObjectContribute: Meta3dEngineCoreSceneviewProtocol.GameObjectType.gameObjectContribute,
) => {
  ...state,
  gameObjectContribute: Some(gameObjectContribute),
}

let createAndSetState = (
  {gameObjectContribute} as state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  config,
): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
  let {
    createStateFunc,
    createGameObjectFunc,
    getNeedDisposedGameObjectsFunc,
    deferDisposeGameObjectFunc,
    disposeGameObjectsFunc,
    cloneGameObjectFunc,
    getAllGameObjectsFunc,
    restore,
    deepCopy,
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
      restore,
      deepCopy,
    }->Some,
  }
}

let createGameObject = (state: Meta3dEngineCoreSceneviewProtocol.StateType.state): (
  Meta3dEngineCoreSceneviewProtocol.StateType.state,
  Meta3dGameobjectProtocol.Index.gameObject,
) => {
  let usedGameObjectContribute = state->StateUtils.unsafeGetUsedGameObjectContribute

  let (gameObjectState, gameObject) = usedGameObjectContribute.createGameObjectFunc(.
    usedGameObjectContribute.state,
  )

  (
    StateUtils.setGameObjectStateToState(state, usedGameObjectContribute, gameObjectState),
    gameObject,
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

  StateUtils.setGameObjectStateAndAllUsedComponentContributesToState(
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
    gameObjectState,
  )
}

let getNeedDisposedGameObjects = (state: Meta3dEngineCoreSceneviewProtocol.StateType.state) => {
  let usedGameObjectContribute = state->StateUtils.unsafeGetUsedGameObjectContribute

  usedGameObjectContribute.getNeedDisposedGameObjectsFunc(. usedGameObjectContribute.state)
}

let deferDisposeGameObject = (
  state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  gameObject,
) => {
  let (
    usedGameObjectContribute,
    usedTransformContribute,
    usedPBRMaterialContribute,
    usedGeometryContribute,
    usedDirectionLightContribute,
    usedArcballCameraControllerContribute,
    usedBasicCameraViewContribute,
    usedPerspectiveCameraProjectionContribute,
  ) = StateUtils.getAllUsedContributes(state)

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
  ) = StateUtils.getAllUsedContributes(state)

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
    (
      disposedGameObjects,
      disposedTransforms,
      disposedPBRMaterials,
      disposedGeometrys,
      disposedDirectionLights,
      disposedArcballCameraControllers,
      disposedBasicCameraViews,
      disposedPerspectiveCameraProjections,
    ),
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

  (
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
    ),
    (
      disposedGameObjects,
      disposedTransforms,
      disposedPBRMaterials,
      disposedGeometrys,
      disposedDirectionLights,
      disposedArcballCameraControllers,
      disposedBasicCameraViews,
      disposedPerspectiveCameraProjections,
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
  ) = StateUtils.getAllUsedContributes(state)

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

let getAllGameObjects = (state: Meta3dEngineCoreSceneviewProtocol.StateType.state): array<
  Meta3dGameobjectProtocol.Index.gameObject,
> => {
  let usedGameObjectContribute = state->StateUtils.unsafeGetUsedGameObjectContribute

  usedGameObjectContribute.getAllGameObjectsFunc(. usedGameObjectContribute.state)
}
