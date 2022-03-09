open StateType

let _removeComponent = (gameObjectMap, component) =>
  gameObjectMap->Meta3dCommonlib.MutableSparseMap.remove(component)

let deferDisposeComponent = (
  {gameObjectTransformMap, needDisposedTransformArray} as state,
  component,
) => {
  let gameObjectTransformMap = gameObjectTransformMap->_removeComponent(component)

  {
    ...state,
    gameObjectTransformMap: gameObjectTransformMap->_removeComponent(component),
    needDisposedTransformArray: needDisposedTransformArray->Meta3dCommonlib.ArraySt.push(component),
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

  state.localToWorldMatrices = DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalToWorldMatrixIndex(component),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalToWorldMatricesSize(),
    // TODO change tuple to array
    defaultLocalToWorldMatrix->Obj.magic,
    localToWorldMatrices,
  )
  state.localPositions = DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalPositionIndex(component),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalPositionsSize(),
    // TODO change tuple to array
    defaultLocalPosition->Obj.magic,
    localPositions,
  )
  state.localRotations = DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalRotationIndex(component),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalRotationsSize(),
    // TODO change tuple to array
    defaultLocalRotation->Obj.magic,
    localRotations,
  )
  state.localScales = DisposeTypeArrayUtils.deleteAndResetFloat32TypeArr(.
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalScaleIndex(component),
    Meta3dComponentWorkerUtils.BufferTransformUtils.getLocalScalesSize(),
    // TODO change tuple to array
    defaultLocalScale->Obj.magic,
    localScales,
  )

  state.parentMap = parentMap->_disposeSparseMapData(component)
  state.childrenMap = childrenMap->_disposeSparseMapData(component)
  state.dirtyMap = dirtyMap->_disposeSparseMapData(component)
  state.gameObjectMap = gameObjectMap->_disposeSparseMapData(component)
  state
}

let disposeComponents = (
  {gameObjectMap, disposedTransformArray} as state,
  components,
) => {
  let isDebug = ConfigUtils.getIsDebug(state)

let needDisposedTransformArray = GetNeedDisposedTransformsUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "component",
    components,
    needDisposedTransformArray,
  )

  state.disposedTransformArray = disposedTransformArray->Js.Array.concat(components, _)
  state.needDisposedTransformArray =
    needDisposedTransformArray->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(
      components,
    )

  components->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. state, component) => state->_disposeData(isDebug, component),
    state,
  )
}
