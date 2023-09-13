let _restoreTypeArrays = (currentState: StateType.state, targetState: StateType.state) =>
     {
        let (

    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    tangentsInfos,
    indicesInfos,

) =
          (
    currentState.verticesInfos,
    currentState.texCoordsInfos,
    currentState.normalsInfos,
    currentState.tangentsInfos,
    currentState.indicesInfos,
          )->CreateStateUtils.setAllInfosDataToDefault(
            currentState.maxIndex
          )
        Meta3dCommonlib.TypeArrayUtils.fillUint32ArrayWithUint32Array(
          (currentState.verticesInfos, 0),
          (targetState.verticesInfos, 0),
          Js.Typed_array.Uint32Array.length(targetState.verticesInfos),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillUint32ArrayWithUint32Array(
          (currentState.texCoordsInfos, 0),
          (targetState.texCoordsInfos, 0),
          Js.Typed_array.Uint32Array.length(targetState.texCoordsInfos),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillUint32ArrayWithUint32Array(
          (currentState.normalsInfos, 0),
          (targetState.normalsInfos, 0),
          Js.Typed_array.Uint32Array.length(targetState.normalsInfos),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillUint32ArrayWithUint32Array(
          (currentState.tangentsInfos, 0),
          (targetState.tangentsInfos, 0),
          Js.Typed_array.Uint32Array.length(targetState.tangentsInfos),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillUint32ArrayWithUint32Array(
          (currentState.indicesInfos, 0),
          (targetState.indicesInfos, 0),
          Js.Typed_array.Uint32Array.length(targetState.indicesInfos),
        )->ignore

        (currentState, targetState)
      }


let getContribute: Meta3dType.Index.getContribute<
  Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentGeometryProtocol.Index.config,
    Meta3dComponentGeometryProtocol.Index.needDisposedComponents,
    Meta3dComponentGeometryProtocol.Index.batchDisposeData,
    Meta3dComponentGeometryProtocol.Index.cloneConfig,
    Meta3dComponentGeometryProtocol.Index.geometry,
  >,
> = (_) => {
  componentName: Meta3dComponentGeometryProtocol.Index.componentName,
  createStateFunc: (. {isDebug, geometryPointCount, geometryCount}) =>
    CreateStateUtils.createState(isDebug, geometryPointCount, geometryCount),
  createComponentFunc: (. state) => CreateGeometryUtils.create(state),
  addComponentFunc: (. state, gameObject, geometry) => {
    AddGeometryUtils.add(state, gameObject, geometry)
  },
  removeComponentFunc: (. state, gameObject, geometry) => {
    RemoveGeometryUtils.remove(state, gameObject, geometry)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasGeometryUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetGeometryUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedGeometrysUtils.get(state)
  },
  getGameObjectsFunc: (. state, geometry) => {
    GetGameObjectsUtils.get(state, geometry)
  },
  getComponentDataFunc: (. state, geometry, dataName) => {
    GetGeometryDataUtils.getData(. state, geometry, dataName)
  },
  setComponentDataFunc: (. state, geometry, dataName, dataValue) => {
    SetGeometryDataUtils.setData(. state, geometry, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllGeometrysUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, (geometry, gameObject)) => {
    DisposeGeometryUtils.deferDisposeComponent(state, (geometry, gameObject))
  },
  disposeComponentsFunc: (. state, geometryDataMap) => {
    DisposeGeometryUtils.disposeComponents(state, geometryDataMap)
  },
  cloneComponentFunc: (. state, countRange, cloneConfig, sourceGeometry) => {
    CloneGeometryUtils.clone(state, countRange, sourceGeometry)
  },
  restore: (. currentState, targetState) => {
    let (currentState, targetState) = _restoreTypeArrays(currentState, targetState)

    {
      ...targetState,
      buffer: currentState.buffer,
    verticesInfos: currentState.verticesInfos,
    texCoordsInfos: currentState.texCoordsInfos,
    normalsInfos: currentState.normalsInfos,
    tangentsInfos: currentState.tangentsInfos,
    indicesInfos: currentState.indicesInfos
    }


  },
  deepCopy: (. state) => {
    open Meta3dComponentCommonlib
    open Meta3dComponentWorkerUtils.BufferGeometryUtils

    let {
    maxIndex,
    buffer,
    vertices,
    texCoords,
    normals,
    tangents,
    indices,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    tangentsInfos,
    indicesInfos,
    verticesOffset,
    texCoordsOffset,
    normalsOffset,
    tangentsOffset,
    indicesOffset,
    gameObjectsMap,
    gameObjectGeometryMap,
    needDisposedGeometrys,
    disposedGeometrys
    } = state

  let infosEndIndex = maxIndex * getInfoSize();

    {
      ...state,
      verticesInfos: verticesInfos->CopyTypeArrayService.copyUint32ArrayWithEndIndex(
infosEndIndex
      ),
      texCoordsInfos: texCoordsInfos->CopyTypeArrayService.copyUint32ArrayWithEndIndex(
infosEndIndex
      ),
      normalsInfos: normalsInfos->CopyTypeArrayService.copyUint32ArrayWithEndIndex(
infosEndIndex
      ),
      tangentsInfos: tangentsInfos->CopyTypeArrayService.copyUint32ArrayWithEndIndex(
infosEndIndex
      ),
      indicesInfos: indicesInfos->CopyTypeArrayService.copyUint32ArrayWithEndIndex(
infosEndIndex
      ),
      gameObjectsMap:           gameObjectsMap -> CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
      gameObjectGeometryMap: gameObjectGeometryMap->Meta3dCommonlib.MutableSparseMap.copy,
      needDisposedGeometrys: needDisposedGeometrys->Meta3dCommonlib.ArraySt.copy,
      disposedGeometrys: disposedGeometrys->Meta3dCommonlib.ArraySt.copy,
    }
  }
}
