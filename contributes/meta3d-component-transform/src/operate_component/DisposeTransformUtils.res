open StateType

let deferDisposeComponent = (
  {gameObjectTransformMap, needDisposedTransforms} as state,
  (transform, gameObject),
) => {
  {
    ...state,
    gameObjectTransformMap: gameObjectTransformMap->Meta3dCommonlib.MutableSparseMap.remove(
      gameObject,
    ),
    needDisposedTransforms: needDisposedTransforms->Meta3dCommonlib.ArraySt.push(transform),
  }
}

let _disposeFromParentAndChildMap = (state, isDebug, transform) => {
  let parentMap =
    state.childrenMap
    ->HierachyTransformUtils.unsafeGetChildren(transform)
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. parentMap, child) => HierachyTransformUtils.removeParentMap(parentMap, child),
      state.parentMap,
    )

  switch HierachyTransformUtils.getParent(parentMap, transform) {
  | None => state
  | Some(parent) =>
    let childrenMap =
      state.childrenMap->HierachyTransformUtils.removeFromChildMap(isDebug, parent, transform)

    state
  }
}

let _disposeSparseMapData = (map, transform) =>
  map->Meta3dCommonlib.MutableSparseMap.remove(transform)

let _disposeData = (
  {
    localToWorldMatrices,
    localPositions,
    localRotations,
    localScales,
    defaultLocalToWorldMatrix,
    defaultLocalPosition,
    defaultLocalRotation,
    defaultLocalScale,
    parentMap,
    childrenMap,
    dirtyMap,
    gameObjectMap,
  } as state,
  isDebug,
  transform,
) => {
  let state = state->_disposeFromParentAndChildMap(isDebug, transform)

  state.localToWorldMatrices = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    localToWorldMatrices,
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalToWorldMatrixIndex(transform),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalToWorldMatricesSize(),
    // TODO change tuple to array
    defaultLocalToWorldMatrix->Obj.magic,
  )
  state.localPositions = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    localPositions,
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalPositionIndex(transform),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalPositionsSize(),
    // TODO change tuple to array
    defaultLocalPosition->Obj.magic,
  )
  state.localRotations = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    localRotations,
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalRotationIndex(transform),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalRotationsSize(),
    // TODO change tuple to array
    defaultLocalRotation->Obj.magic,
  )
  state.localScales = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    localScales,
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalScaleIndex(transform),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalScalesSize(),
    // TODO change tuple to array
    defaultLocalScale->Obj.magic,
  )

  state.parentMap = parentMap->_disposeSparseMapData(transform)
  state.childrenMap = childrenMap->_disposeSparseMapData(transform)
  state.dirtyMap = dirtyMap->_disposeSparseMapData(transform)
  state.gameObjectMap = gameObjectMap->_disposeSparseMapData(transform)
  state
}

let disposeComponents = ({disposedTransforms} as state, transforms) => {
  let isDebug = ConfigUtils.getIsDebug(state)

  let needDisposedComponents = GetNeedDisposedTransformsUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "transform",
    transforms,
    needDisposedComponents,
  )

  state.disposedTransforms = disposedTransforms->Js.Array.concat(transforms, _)
  state.needDisposedTransforms =
    needDisposedComponents->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(transforms)

  transforms->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. state, transform) => state->_disposeData(isDebug, transform),
    state,
  )
}
