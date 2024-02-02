let deferDisposeGameObject = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    StateType.state,
  >,
  ~gameObjectState,
  ~gameObject,
  ~transformState=Obj.magic(1),
  ~pbrMaterialState=Obj.magic(1),
  ~geometryState=Obj.magic(1),
  ~directionLightState=Obj.magic(1),
  ~arcballCameraControllerState=Obj.magic(1),
  ~basicCameraViewState=Obj.magic(1),
  ~perspectiveCameraProjectionState=Obj.magic(1),
  ~scriptState=Obj.magic(1),
  ~transformFuncs=((. componentState, _) => Obj.magic(1), (. componentState, _) => componentState),
  ~pbrMaterialFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => componentState,
  ),
  ~geometryFuncs=((. componentState, _) => Obj.magic(1), (. componentState, _) => componentState),
  ~directionLightFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => componentState,
  ),
  ~arcballCameraControllerFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => componentState,
  ),
  ~basicCameraViewFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => componentState,
  ),
  ~perspectiveCameraProjectionFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => componentState,
  ),
  ~scriptFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => componentState,
  ),
  (),
) => {
  contribute.deferDisposeGameObjectFunc(.
    (
      gameObjectState,
      transformState->Obj.magic,
      pbrMaterialState->Obj.magic,
      geometryState->Obj.magic,
      directionLightState->Obj.magic,
      arcballCameraControllerState->Obj.magic,
      basicCameraViewState->Obj.magic,
      perspectiveCameraProjectionState->Obj.magic,
      scriptState->Obj.magic,
    ),
    (
      transformFuncs,
      pbrMaterialFuncs,
      geometryFuncs,
      directionLightFuncs,
      arcballCameraControllerFuncs,
      basicCameraViewFuncs,
      perspectiveCameraProjectionFuncs,
      scriptFuncs,
    ),
    gameObject,
  )
}

let disposeGameObjects = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    Meta3dGameobjectDataoriented.StateType.state,
  >,
  ~gameObjectState,
  ~gameObjects,
  ~transformState=Obj.magic(1),
  ~pbrMaterialState=Obj.magic(1),
  ~geometryState=Obj.magic(1),
  ~directionLightState=Obj.magic(1),
  ~arcballCameraControllerState=Obj.magic(1),
  ~basicCameraViewState=Obj.magic(1),
  ~perspectiveCameraProjectionState=Obj.magic(1),
  ~scriptState=Obj.magic(1),
  ~transformFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => (componentState, []),
  ),
  ~pbrMaterialFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => (componentState, []),
  ),
  ~geometryFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => (componentState, []),
  ),
  ~directionLightFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => (componentState, []),
  ),
  ~arcballCameraControllerFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => (componentState, []),
  ),
  ~basicCameraViewFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => (componentState, []),
  ),
  ~perspectiveCameraProjectionFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => (componentState, []),
  ),
  ~scriptFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => (componentState, []),
  ),
  (),
) => {
  contribute.disposeGameObjectsFunc(.
    (
      gameObjectState,
      transformState->Obj.magic,
      pbrMaterialState->Obj.magic,
      geometryState->Obj.magic,
      directionLightState->Obj.magic,
      arcballCameraControllerState->Obj.magic,
      basicCameraViewState->Obj.magic,
      perspectiveCameraProjectionState->Obj.magic,
      scriptState->Obj.magic,
    ),
    (
      transformFuncs,
      pbrMaterialFuncs,
      geometryFuncs,
      directionLightFuncs,
      arcballCameraControllerFuncs,
      basicCameraViewFuncs,
      perspectiveCameraProjectionFuncs,
      scriptFuncs,
    ),
    gameObjects,
  )
}
