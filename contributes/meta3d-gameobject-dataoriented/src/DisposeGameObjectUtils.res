open StateType

// open Meta3dComponentTransformProtocol.Index

let deferDisposeGameObject = (
  (
    {needDisposedGameObjectArray} as gameObjectState,
    transformState: Meta3dEngineCoreProtocol.ComponentType.transformState,
    pbrMaterialState: Meta3dEngineCoreProtocol.ComponentType.pbrMaterialState,
    geometryState: Meta3dEngineCoreProtocol.ComponentType.geometryState,
    directionLightState: Meta3dEngineCoreProtocol.ComponentType.directionLightState,
    arcballCameraControllerState: Meta3dEngineCoreProtocol.ComponentType.arcballCameraControllerState,
    basicCameraViewState: Meta3dEngineCoreProtocol.ComponentType.basicCameraViewState,
    perspectiveCameraProjectionState: Meta3dEngineCoreProtocol.ComponentType.perspectiveCameraProjectionState,
  ),
  (
    (getTransformFunc, deferDisposeTransformFunc),
    (getPBRMaterialFunc, deferDisposePBRMaterialFunc),
    (getGeometryFunc, deferDisposeGeometryFunc),
    (getDirectionLightFunc, deferDisposeDirectionLightFunc),
    (getArcballCameraControllerFunc, deferDisposeArcballCameraControllerFunc),
    (getBasicCameraViewFunc, deferDisposeBasicCameraViewFunc),
    (getPerspectiveCameraProjectionFunc, deferDisposePerspectiveCameraProjectionFunc),
  ),
  gameObject,
) => {
  let transformState =
    getTransformFunc(. transformState, gameObject)
    ->Meta3dCommonlib.NullableSt.map((. transform) => {
      deferDisposeTransformFunc(. transformState, (transform, gameObject))
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(transformState)

  let pbrMaterialState =
    getPBRMaterialFunc(. pbrMaterialState, gameObject)
    ->Meta3dCommonlib.NullableSt.map((. pbrMaterial) => {
      deferDisposePBRMaterialFunc(. pbrMaterialState, (pbrMaterial, gameObject))
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(pbrMaterialState)

  let geometryState =
    getGeometryFunc(. geometryState, gameObject)
    ->Meta3dCommonlib.NullableSt.map((. geometry) => {
      deferDisposeGeometryFunc(. geometryState, (geometry, gameObject))
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(geometryState)

  let directionLightState =
    getDirectionLightFunc(. directionLightState, gameObject)
    ->Meta3dCommonlib.NullableSt.map((. directionLight) => {
      deferDisposeDirectionLightFunc(. directionLightState, (directionLight, gameObject))
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(directionLightState)

  let arcballCameraControllerState =
    getArcballCameraControllerFunc(. arcballCameraControllerState, gameObject)
    ->Meta3dCommonlib.NullableSt.map((. arcballCameraController) => {
      deferDisposeArcballCameraControllerFunc(.
        arcballCameraControllerState,
        (arcballCameraController, gameObject),
      )
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(arcballCameraControllerState)

  let basicCameraViewState =
    getBasicCameraViewFunc(. basicCameraViewState, gameObject)
    ->Meta3dCommonlib.NullableSt.map((. cameraView) => {
      deferDisposeBasicCameraViewFunc(. basicCameraViewState, (cameraView, gameObject))
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(basicCameraViewState)

  let perspectiveCameraProjectionState =
    getPerspectiveCameraProjectionFunc(. perspectiveCameraProjectionState, gameObject)
    ->Meta3dCommonlib.NullableSt.map((. cameraProjection) => {
      deferDisposePerspectiveCameraProjectionFunc(.
        perspectiveCameraProjectionState,
        (cameraProjection, gameObject),
      )
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(perspectiveCameraProjectionState)

  let gameObjectState = {
    ...gameObjectState,
    needDisposedGameObjectArray: needDisposedGameObjectArray->Meta3dCommonlib.ArraySt.push(
      gameObject,
    ),
  }

  (
    gameObjectState,
    transformState,
    pbrMaterialState,
    geometryState,
    directionLightState,
    arcballCameraControllerState,
    basicCameraViewState,
    perspectiveCameraProjectionState,
  )
}

// let _getTransforms = (state, getTransformFunc, gameObjects) =>
//   gameObjects->Meta3dCommonlib.ArraySt.reduceOneParam((. arr, gameObject) => {
//     switch getTransformFunc(. state, gameObject)->Meta3dCommonlib.OptionSt.fromNullable {
//     | None => arr
//     | Some(component) => arr->Meta3dCommonlib.ArraySt.push(component)
//     }
//   }, [])

let _getNotSharedComponents = (state, getComponentFunc, gameObjects) =>
  gameObjects->Meta3dCommonlib.ArraySt.reduceOneParam((. arr, gameObject) => {
    switch getComponentFunc(. state, gameObject)->Meta3dCommonlib.OptionSt.fromNullable {
    | None => arr
    | Some(component) => arr->Meta3dCommonlib.ArraySt.push(component)
    }
  }, [])

let _getSharableComponentDataMap = (state, getComponentFunc, gameObjects) =>
  gameObjects->Meta3dCommonlib.ArraySt.reduceOneParam((. dataMap, gameObject) =>
    getComponentFunc(. state, gameObject)
    ->Meta3dCommonlib.NullableSt.map((. component) => {
      dataMap->Meta3dCommonlib.ArrayMapUtils.addValue(component, gameObject)
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(dataMap)
  , Meta3dCommonlib.MutableSparseMap.createEmpty())

let _isNotNeedDispose = (component, needDisposedIndexArray) =>
  !Js.Array.includes(component, needDisposedIndexArray)

let disposeGameObjects = (
  (
    {needDisposedGameObjectArray} as gameObjectState,
    transformState: Meta3dEngineCoreProtocol.ComponentType.transformState,
    pbrMaterialState: Meta3dEngineCoreProtocol.ComponentType.pbrMaterialState,
    geometryState: Meta3dEngineCoreProtocol.ComponentType.geometryState,
    directionLightState: Meta3dEngineCoreProtocol.ComponentType.directionLightState,
    arcballCameraControllerState: Meta3dEngineCoreProtocol.ComponentType.arcballCameraControllerState,
    basicCameraViewState: Meta3dEngineCoreProtocol.ComponentType.basicCameraViewState,
    perspectiveCameraProjectionState: Meta3dEngineCoreProtocol.ComponentType.perspectiveCameraProjectionState,
  ),
  (
    (getTransformFunc, disposeTransformsFunc),
    (getPBRMaterialFunc, disposePBRMaterialsFunc),
    (getGeometryFunc, disposeGeometrysFunc),
    (getDirectionLightFunc, disposeDirectionLightFunc),
    (getArcballCameraControllerFunc, disposeArcballCameraControllerFunc),
    (getBasicCameraViewFunc, disposeBasicCameraViewFunc),
    (getPerspectiveCameraProjectionFunc, disposePerspectiveCameraProjectionFunc),
  ),
  gameObjects,
) => {
  let isDebug = ConfigUtils.getIsDebug(gameObjectState)

  let needDisposedGameObjectArray = GetNeedDisposedGameObjectsUtils.get(gameObjectState)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "gameObject",
    gameObjects,
    needDisposedGameObjectArray,
  )

  gameObjectState.disposedGameObjectArray =
    gameObjectState.disposedGameObjectArray
    ->Js.Array.concat(gameObjects, _)
    ->Meta3dCommonlib.ArraySt.removeDuplicateItems

  gameObjectState.needDisposedGameObjectArray =
    needDisposedGameObjectArray->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(
      gameObjects,
    )

  let transformState = disposeTransformsFunc(.
    transformState,
    _getNotSharedComponents(transformState, getTransformFunc, gameObjects),
  )

  let pbrMaterialState = disposePBRMaterialsFunc(.
    pbrMaterialState,
    _getSharableComponentDataMap(pbrMaterialState, getPBRMaterialFunc, gameObjects),
  )

  let geometryState = disposeGeometrysFunc(.
    geometryState,
    _getSharableComponentDataMap(geometryState, getGeometryFunc, gameObjects),
  )

  let directionLightState = disposeDirectionLightFunc(.
    directionLightState,
    _getNotSharedComponents(directionLightState, getDirectionLightFunc, gameObjects),
  )

  let arcballCameraControllerState = disposeArcballCameraControllerFunc(.
    arcballCameraControllerState,
    _getNotSharedComponents(
      arcballCameraControllerState,
      getArcballCameraControllerFunc,
      gameObjects,
    ),
  )

  let basicCameraViewState = disposeBasicCameraViewFunc(.
    basicCameraViewState,
    _getNotSharedComponents(basicCameraViewState, getBasicCameraViewFunc, gameObjects),
  )

  let perspectiveCameraProjectionState = disposePerspectiveCameraProjectionFunc(.
    perspectiveCameraProjectionState,
    _getNotSharedComponents(
      perspectiveCameraProjectionState,
      getPerspectiveCameraProjectionFunc,
      gameObjects,
    ),
  )

  (
    gameObjectState,
    transformState,
    pbrMaterialState,
    geometryState,
    directionLightState,
    arcballCameraControllerState,
    basicCameraViewState,
    perspectiveCameraProjectionState,
  )
}
