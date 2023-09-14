let _restoreTypeArrays = (currentState: StateType.state, targetState: StateType.state) =>
  currentState.localPositions === targetState.localPositions &&
  currentState.localRotations === targetState.localRotations &&
  currentState.localScales === targetState.localScales &&
  currentState.localToWorldMatrices === targetState.localToWorldMatrices
    ? (currentState, targetState)
    : {
        let (localToWorldMatrices, localPositions, localRotations, localScales) =
          (
            currentState.localToWorldMatrices,
            currentState.localPositions,
            currentState.localRotations,
            currentState.localScales,
          )->CreateStateUtils.setAllTypeArrDataToDefault(
            currentState.maxIndex,
            (
              currentState.defaultLocalToWorldMatrix,
              currentState.defaultLocalPosition,
              currentState.defaultLocalRotation,
              currentState.defaultLocalScale,
            ),
          )
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.localPositions, 0),
          (targetState.localPositions, 0),
          Js.Typed_array.Float32Array.length(targetState.localPositions),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.localRotations, 0),
          (targetState.localRotations, 0),
          Js.Typed_array.Float32Array.length(targetState.localRotations),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.localScales, 0),
          (targetState.localScales, 0),
          Js.Typed_array.Float32Array.length(targetState.localScales),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.localToWorldMatrices, 0),
          (targetState.localToWorldMatrices, 0),
          Js.Typed_array.Float32Array.length(targetState.localToWorldMatrices),
        )->ignore

        (currentState, targetState)
      }

let getContribute: Meta3dType.Index.getContribute<
  Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentTransformProtocol.Index.config,
    Meta3dComponentTransformProtocol.Index.needDisposedComponents,
    Meta3dComponentTransformProtocol.Index.batchDisposeData,
    Meta3dComponentTransformProtocol.Index.cloneConfig,
    Meta3dComponentTransformProtocol.Index.transform,
  >,
> = _ => {
  componentName: Meta3dComponentTransformProtocol.Index.componentName,
  createStateFunc: (. {isDebug, transformCount, float9Array1, float32Array1}) =>
    CreateStateUtils.createState(isDebug, transformCount, float9Array1, float32Array1),
  createComponentFunc: (. state) => CreateTransformUtils.create(state),
  addComponentFunc: (. state, gameObject, transform) => {
    AddTransformUtils.add(state, gameObject, transform)
  },
  removeComponentFunc: (. state, gameObject, transform) => {
    RemoveTransformUtils.remove(state, gameObject, transform)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasTransformUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetTransformUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedTransformsUtils.get(state)
  },
  getGameObjectsFunc: (. state, transform) => {
    GetGameObjectsUtils.get(state, transform)
  },
  getComponentDataFunc: (. state, transform, dataName) => {
    GetTransformDataUtils.getData(. state, transform, dataName)
  },
  setComponentDataFunc: (. state, transform, dataName, dataValue) => {
    SetTransformDataUtils.setData(. state, transform, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllTransformsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, transformData) => {
    DisposeTransformUtils.deferDisposeComponent(state, transformData)
  },
  disposeComponentsFunc: (. state, transforms) => {
    DisposeTransformUtils.disposeComponents(state, transforms)
  },
  cloneComponentFunc: (. state, countRange, _, sourceTransform) => {
    CloneTransformUtils.clone(state, countRange, sourceTransform)
  },
  restore: (. currentState, targetState) => {
    let (currentState, targetState) = _restoreTypeArrays(currentState, targetState)

    {
      ...targetState,
      buffer: currentState.buffer,
      localPositions: currentState.localPositions,
      localRotations: currentState.localRotations,
      localScales: currentState.localScales,
      localToWorldMatrices: currentState.localToWorldMatrices,
    }
  },
  deepCopy: (. state) => {
    open Meta3dComponentWorkerUtils.BufferTransformUtils

    let {
      maxIndex,
      localToWorldMatrices,
      localPositions,
      localRotations,
      localScales,
      parentMap,
      childrenMap,
      gameObjectMap,
      gameObjectTransformMap,
      dirtyMap,
      needDisposedTransforms,
      disposedTransforms,
    } = state

    {
      ...state,
      localPositions: localPositions->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getLocalPositionsSize(),
      ),
      localRotations: localRotations->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getLocalRotationsSize(),
      ),
      localScales: localScales->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getLocalScalesSize(),
      ),
      localToWorldMatrices: localToWorldMatrices->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getLocalToWorldMatricesSize(),
      ),
      parentMap: parentMap->Meta3dCommonlib.MutableSparseMap.copy,
      childrenMap: childrenMap->Meta3dCommonlib.MutableSparseMap.copy,
      gameObjectMap: gameObjectMap->Meta3dCommonlib.MutableSparseMap.copy,
      gameObjectTransformMap: gameObjectTransformMap->Meta3dCommonlib.MutableSparseMap.copy,
      dirtyMap: dirtyMap->Meta3dCommonlib.MutableSparseMap.copy,
      needDisposedTransforms: needDisposedTransforms->Meta3dCommonlib.ArraySt.copy,
      disposedTransforms: disposedTransforms->Meta3dCommonlib.ArraySt.copy,
    }
  },
}
