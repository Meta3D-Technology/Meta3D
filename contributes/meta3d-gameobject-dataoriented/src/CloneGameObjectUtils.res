open StateType

let _createClonedGameObjects = (gameObjectState, countRange) => {
  countRange->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. (gameObjectState, clonedGameObjects), _) => {
      let (gameObjectState, gameObject) = CreateGameObjectUtils.create(gameObjectState)

      (gameObjectState, clonedGameObjects->Meta3dCommonlib.ArraySt.push(gameObject))
    },
    (gameObjectState, []),
  )
}

let _setParent = (
  transformState,
  setTransformDataFunc,
  clonedParentTransforms,
  clonedTransforms,
) => {
  clonedParentTransforms->Meta3dCommonlib.ArraySt.reduceOneParami(
    (. transformState, clonedParentTransform, i) => {
      setTransformDataFunc(.
        transformState,
        clonedTransforms[i],
        Meta3dComponentTransformProtocol.Index.dataName.parent,
        clonedParentTransform->Obj.magic,
      )
    },
    transformState,
  )
}

let rec _clone = (
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
    (
      getTransformFunc,
      cloneTransformFunc,
      addTransformFunc,
      getTransformGameObjectsFunc,
      getTransformDataFunc,
      setTransformDataFunc,
    ),
    (getPBRMaterialFunc, clonePBRMaterialFunc, addPBRMaterialFunc),
    (getGeometryFunc, cloneGeometryFunc, addGeometryFunc),
    (getDirectionLightFunc, cloneDirectionLightFunc, addDirectionLightFunc),
    (
      getArcballCameraControllerFunc,
      cloneArcballCameraControllerFunc,
      addArcballCameraControllerFunc,
    ),
    (getBasicCameraViewFunc, cloneBasicCameraViewFunc, addBasicCameraViewFunc),
    (
      getPerspectiveCameraProjectionFunc,
      clonePerspectiveCameraProjectionFunc,
      addPerspectiveCameraProjectionFunc,
    ),
  ) as funcs,
  isDebug,
  countRange,
  cloneConfig,
  (sourceTransform, clonedParentTransforms),
  (sourceGameObject, totalClonedGameObjects),
) => {
  let (gameObjectState, clonedGameObjects) = _createClonedGameObjects(gameObjectState, countRange)

  let totalClonedGameObjects =
    totalClonedGameObjects->Meta3dCommonlib.ListSt.push(clonedGameObjects)

  let (
    (
      transformState,
      pbrMaterialState,
      geometryState,
      directionLightState,
      arcballCameraControllerState,
      basicCameraViewState,
      perspectiveCameraProjectionState,
    ),
    clonedTransforms,
  ) = CloneGameObjectComponentUtils.clone(
    (
      transformState,
      pbrMaterialState,
      geometryState,
      directionLightState,
      arcballCameraControllerState,
      basicCameraViewState,
      perspectiveCameraProjectionState,
    ),
    (
      (cloneTransformFunc, addTransformFunc),
      (getPBRMaterialFunc, clonePBRMaterialFunc, addPBRMaterialFunc),
      (getGeometryFunc, cloneGeometryFunc, addGeometryFunc),
      (getDirectionLightFunc, cloneDirectionLightFunc, addDirectionLightFunc),
      (
        getArcballCameraControllerFunc,
        cloneArcballCameraControllerFunc,
        addArcballCameraControllerFunc,
      ),
      (getBasicCameraViewFunc, cloneBasicCameraViewFunc, addBasicCameraViewFunc),
      (
        getPerspectiveCameraProjectionFunc,
        clonePerspectiveCameraProjectionFunc,
        addPerspectiveCameraProjectionFunc,
      ),
    ),
    isDebug,
    countRange,
    cloneConfig,
    sourceTransform,
    (sourceGameObject, clonedGameObjects),
  )

  let transformState =
    transformState->_setParent(setTransformDataFunc, clonedParentTransforms, clonedTransforms)

  getTransformDataFunc(.
    transformState,
    sourceTransform,
    Meta3dComponentTransformProtocol.Index.dataName.children,
  )
  ->Meta3dCommonlib.NullableSt.map((. children) => {
    children
    ->Obj.magic
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. (states, totalClonedGameObjects), childTransform) => {
        _clone(
          states,
          funcs,
          isDebug,
          countRange,
          cloneConfig,
          (childTransform, clonedTransforms),
          (
            getTransformGameObjectsFunc(.
              transformState,
              childTransform,
            )->Meta3dCommonlib.ArraySt.unsafeGetFirst,
            totalClonedGameObjects,
          ),
        )
      },
      (
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
        totalClonedGameObjects,
      ),
    )
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault((
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
    totalClonedGameObjects,
  ))
}

// TODO clone name
let clone = (
  (
    gameObjectState,
    transformState,
    pbrMaterialState,
    geometryState,
    directionLightState,
    arcballCameraControllerState,
    basicCameraViewState,
    perspectiveCameraProjectionState,
  ) as states,
  ((getTransformFunc, _, _, _, _, _), _, _, _, _, _, _) as funcs,
  isDebug,
  count,
  cloneConfig,
  sourceGameObject,
) => {
  let countRange = Meta3dCommonlib.ArraySt.range(0, count - 1)

  getTransformFunc(. transformState, sourceGameObject)
  ->Meta3dCommonlib.NullableSt.map((. sourceTransform) => {
    let (states, clonedGameObjects) = _clone(
      states,
      funcs,
      isDebug,
      countRange,
      cloneConfig,
      (sourceTransform, []),
      (sourceGameObject, list{}),
    )

    (states, clonedGameObjects->Meta3dCommonlib.ListSt.toArray)
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault((states, []))
}
