open StateType

let _removeComponent = (gameObjectComponentMap, gameObject) =>
  gameObjectComponentMap->Meta3dCommonlib.MutableSparseMap.remove(gameObject)

let deferDisposeComponent = (
  {gameObjectTransformMap, needDisposedTransforms} as state,
  (component, gameObject),
) => {
  {
    ...state,
    gameObjectTransformMap: gameObjectTransformMap->_removeComponent(gameObject),
    needDisposedTransforms: needDisposedTransforms->Meta3dCommonlib.ArraySt.push(component),
  }
}

let _disposeFromParentAndChildMap = (state, isDebug, component) => {
  let parentMap =
    state.childrenMap
    ->HierachyTransformUtils.unsafeGetChildren(component)
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. parentMap, child) => HierachyTransformUtils.removeParentMap(parentMap, child),
      state.parentMap,
    )

  switch HierachyTransformUtils.getParent(parentMap, component) {
  | None => state
  | Some(parent) =>
    let childrenMap =
      state.childrenMap->HierachyTransformUtils.removeFromChildMap(isDebug, parent, component)

    state
  }
}

let _disposeSparseMapData = (map, component) =>
  map->Meta3dCommonlib.MutableSparseMap.remove(component)

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
  component,
) => {
  let state = state->_disposeFromParentAndChildMap(isDebug, component)

  state.localToWorldMatrices = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    localToWorldMatrices,
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalToWorldMatrixIndex(component),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalToWorldMatricesSize(),
    // TODO change tuple to array
    defaultLocalToWorldMatrix->Obj.magic,
  )
  state.localPositions = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    localPositions,
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalPositionIndex(component),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalPositionsSize(),
    // TODO change tuple to array
    defaultLocalPosition->Obj.magic,
  )
  state.localRotations = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    localRotations,
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalRotationIndex(component),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalRotationsSize(),
    // TODO change tuple to array
    defaultLocalRotation->Obj.magic,
  )
  state.localScales = Meta3dCommonlib.DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    localScales,
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalScaleIndex(component),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalScalesSize(),
    // TODO change tuple to array
    defaultLocalScale->Obj.magic,
  )

  state.parentMap = parentMap->_disposeSparseMapData(component)
  state.childrenMap = childrenMap->_disposeSparseMapData(component)
  state.dirtyMap = dirtyMap->_disposeSparseMapData(component)
  state.gameObjectMap = gameObjectMap->_disposeSparseMapData(component)
  state
}

let disposeComponents = (
  {gameObjectTransformMap, disposedTransforms} as state,
  components,
) => {
  let isDebug = ConfigUtils.getIsDebug(state)

let needDisposedComponents = GetNeedDisposedTransformsUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "component",
    components,
    needDisposedComponents,
  )

  state.disposedTransforms = disposedTransforms->Js.Array.concat(components, _)
  state.needDisposedTransforms =
    needDisposedComponents->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(
      components,
    )

  components->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. state, component) => state->_disposeData(isDebug, component),
    state,
  )
}
