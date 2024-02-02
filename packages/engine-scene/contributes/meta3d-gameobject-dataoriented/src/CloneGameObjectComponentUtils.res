let _cloneComponent = (
  componentState,
  (getComponentFunc, cloneComponentFunc, addComponentFunc),
  isDebug,
  countRange,
  cloneConfig,
  (sourceGameObject, clonedGameObjects),
) => {
  getComponentFunc(. componentState, sourceGameObject)
  ->Meta3dCommonlib.NullableSt.map((. component) => {
    let (componentState, clonedComponents) = cloneComponentFunc(.
      componentState,
      countRange,
      cloneConfig,
      component,
    )

    let componentState = Meta3dCommonlib.BatchAddComponentUtils.batchAdd(
      componentState,
      addComponentFunc,
      isDebug,
      clonedGameObjects,
      clonedComponents,
    )

    (componentState, clonedComponents)
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault((componentState, []))
}

let clone = (
  (
    transformState: Meta3dEngineCoreProtocol.ComponentType.transformState,
    pbrMaterialState: Meta3dEngineCoreProtocol.ComponentType.pbrMaterialState,
    geometryState: Meta3dEngineCoreProtocol.ComponentType.geometryState,
    directionLightState: Meta3dEngineCoreProtocol.ComponentType.directionLightState,
    arcballCameraControllerState: Meta3dEngineCoreProtocol.ComponentType.arcballCameraControllerState,
    basicCameraViewState: Meta3dEngineCoreProtocol.ComponentType.basicCameraViewState,
    perspectiveCameraProjectionState: Meta3dEngineCoreProtocol.ComponentType.perspectiveCameraProjectionState,
    scriptState: Meta3dEngineCoreProtocol.ComponentType.scriptState,
  ),
  (
    (cloneTransformFunc, addTransformFunc),
    pbrMaterialFuncs,
    geometryFuncs,
    directionLightFuncs,
    arcballCameraControllerFuncs,
    basicCameraViewFuncs,
    perspectiveCameraProjectionFuncs,
    scriptFuncs,
  ),
  isDebug,
  countRange,
  {isShareMaterial}: Meta3dGameobjectProtocol.Index.cloneConfig,
  sourceTransform,
  (sourceGameObject, clonedGameObjects),
) => {
  let (transformState, clonedTransforms) = cloneTransformFunc(.
    transformState,
    countRange,
    (),
    sourceTransform,
  )
  let transformState = Meta3dCommonlib.BatchAddComponentUtils.batchAdd(
    transformState,
    addTransformFunc,
    isDebug,
    clonedGameObjects,
    clonedTransforms,
  )

  let (pbrMaterialState, _) = _cloneComponent(
    pbrMaterialState,
    pbrMaterialFuncs,
    isDebug,
    countRange,
    ({isShare: isShareMaterial}: Meta3dComponentPbrmaterialProtocol.Index.cloneConfig),
    (sourceGameObject, clonedGameObjects),
  )

  let (geometryState, _) = _cloneComponent(
    geometryState,
    geometryFuncs,
    isDebug,
    countRange,
    (),
    (sourceGameObject, clonedGameObjects),
  )

  let (directionLightState, _) = _cloneComponent(
    directionLightState,
    directionLightFuncs,
    isDebug,
    countRange,
    (),
    (sourceGameObject, clonedGameObjects),
  )

  let (arcballCameraControllerState, _) = _cloneComponent(
    arcballCameraControllerState,
    arcballCameraControllerFuncs,
    isDebug,
    countRange,
    (),
    (sourceGameObject, clonedGameObjects),
  )

  let (basicCameraViewState, _) = _cloneComponent(
    basicCameraViewState,
    basicCameraViewFuncs,
    isDebug,
    countRange,
    (),
    (sourceGameObject, clonedGameObjects),
  )

  let (perspectiveCameraProjectionState, _) = _cloneComponent(
    perspectiveCameraProjectionState,
    perspectiveCameraProjectionFuncs,
    isDebug,
    countRange,
    (),
    (sourceGameObject, clonedGameObjects),
  )

  let (scriptState, _) = _cloneComponent(
    scriptState,
    scriptFuncs,
    isDebug,
    countRange,
    (),
    (sourceGameObject, clonedGameObjects),
  )


  (
    (
      transformState,
      pbrMaterialState,
      geometryState,
      directionLightState,
      arcballCameraControllerState,
      basicCameraViewState,
      perspectiveCameraProjectionState,
      scriptState,
    ),
    clonedTransforms,
  )
}
