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
  (gameObjectState, transformState, pbrMaterialState, geometryState),
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
    (transformState, pbrMaterialState, geometryState),
    clonedTransforms,
  ) = CloneGameObjectComponentUtils.clone(
    (transformState, pbrMaterialState, geometryState),
    (
      (cloneTransformFunc, addTransformFunc),
      (getPBRMaterialFunc, clonePBRMaterialFunc, addPBRMaterialFunc),
      (getGeometryFunc, cloneGeometryFunc, addGeometryFunc),
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
      ((gameObjectState, transformState, pbrMaterialState, geometryState), totalClonedGameObjects),
    )
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault((
    (gameObjectState, transformState, pbrMaterialState, geometryState),
    totalClonedGameObjects,
  ))
}

let clone = (
  (gameObjectState, transformState, pbrMaterialState, geometryState) as states,
  ((getTransformFunc, _, _, _, _, _), pbrMaterialFuncs, geometryFuncs) as funcs,
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
