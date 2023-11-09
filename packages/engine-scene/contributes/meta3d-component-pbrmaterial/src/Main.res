let _restoreTypeArrays = (currentState: StateType.state, targetState: StateType.state) =>
  currentState.diffuseColors === targetState.diffuseColors &&
  currentState.speculars === targetState.speculars &&
  currentState.specularColors === targetState.specularColors &&
  currentState.roughnesses === targetState.roughnesses &&
  currentState.metalnesses === targetState.metalnesses &&
  currentState.transmissions === targetState.transmissions &&
  currentState.iors === targetState.iors
    ? (currentState, targetState)
    : {
        let (
          diffuseColors,
          speculars,
          specularColors,
          roughnesses,
          metalnesses,
          transmissions,
          iors,
        ) =
          (
            currentState.diffuseColors,
            currentState.speculars,
            currentState.specularColors,
            currentState.roughnesses,
            currentState.metalnesses,
            currentState.transmissions,
            currentState.iors,
          )->CreateStateUtils.setAllTypeArrDataToDefault(
            currentState.maxIndex,
            (
              currentState.defaultDiffuseColor,
              currentState.defaultSpecular,
              currentState.defaultSpecularColor,
              currentState.defaultRoughness,
              currentState.defaultMetalness,
              currentState.defaultTransmission,
              currentState.defaultIOR,
            ),
          )
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.diffuseColors, 0),
          (targetState.diffuseColors, 0),
          Js.Typed_array.Float32Array.length(targetState.diffuseColors),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.speculars, 0),
          (targetState.speculars, 0),
          Js.Typed_array.Float32Array.length(targetState.speculars),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.specularColors, 0),
          (targetState.specularColors, 0),
          Js.Typed_array.Float32Array.length(targetState.specularColors),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.roughnesses, 0),
          (targetState.roughnesses, 0),
          Js.Typed_array.Float32Array.length(targetState.roughnesses),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.metalnesses, 0),
          (targetState.metalnesses, 0),
          Js.Typed_array.Float32Array.length(targetState.metalnesses),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.transmissions, 0),
          (targetState.transmissions, 0),
          Js.Typed_array.Float32Array.length(targetState.transmissions),
        )->ignore
        Meta3dCommonlib.TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
          (currentState.iors, 0),
          (targetState.iors, 0),
          Js.Typed_array.Float32Array.length(targetState.iors),
        )->ignore

        (currentState, targetState)
      }

let getContribute: Meta3dType.Index.getContribute<
  Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentPbrmaterialProtocol.Index.config,
    Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
    Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
    Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
    Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial,
  >,
> = api => {
  componentName: Meta3dComponentPbrmaterialProtocol.Index.componentName,
  createStateFunc: (. {isDebug, pbrMaterialCount}) =>
    CreateStateUtils.createState(isDebug, pbrMaterialCount),
  createComponentFunc: (. state) => CreatePBRMaterialUtils.create(state),
  addComponentFunc: (. state, gameObject, material) => {
    AddPBRMaterialUtils.add(state, gameObject, material)
  },
  removeComponentFunc: (. state, gameObject, material) => {
    RemovePBRMaterialUtils.remove(state, gameObject, material)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasPBRMaterialUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetPBRMaterialUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedPBRMaterialsUtils.get(state)
  },
  getGameObjectsFunc: (. state, material) => {
    GetGameObjectsUtils.get(state, material)
  },
  getComponentDataFunc: (. state, material, dataName) => {
    GetPBRMaterialDataUtils.getData(. state, material, dataName)
  },
  setComponentDataFunc: (. state, material, dataName, dataValue) => {
    SetPBRMaterialDataUtils.setData(. state, material, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllPBRMaterialsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, (material, gameObject)) => {
    DisposePBRMaterialUtils.deferDisposeComponent(state, (material, gameObject))
  },
  disposeComponentsFunc: (. state, materialDataMap) => {
    DisposePBRMaterialUtils.disposeComponents(state, materialDataMap)
  },
  cloneComponentFunc: (. state, countRange, cloneConfig, sourceMaterial) => {
    ClonePBRMaterialUtils.clone(state, countRange, cloneConfig, sourceMaterial)
  },
  restore: (. currentState, targetState) => {
    let (currentState, targetState) = _restoreTypeArrays(currentState, targetState)

    {
      ...targetState,
      buffer: currentState.buffer,
      diffuseColors: currentState.diffuseColors,
      speculars: currentState.speculars,
      specularColors: currentState.specularColors,
      roughnesses: currentState.roughnesses,
      metalnesses: currentState.metalnesses,
      transmissions: currentState.transmissions,
      iors: currentState.iors,
    }
  },
  deepCopy: (. state) => {
    open Meta3dComponentWorkerUtils.BufferPBRMaterialUtils

    let {
      maxIndex,
      diffuseColors,
      speculars,
      specularColors,
      roughnesses,
      metalnesses,
      transmissions,
      iors,
      gameObjectPBRMaterialMap,
      gameObjectsMap,
      diffuseMap,
      roughnessMap,
      metalnessMap,
      normalMap,
      needDisposedPBRMaterials,
      disposedPBRMaterials,
    } = state

    {
      ...state,
      diffuseColors: diffuseColors->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getDiffuseColorsSize(),
      ),
      speculars: speculars->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getSpecularsSize(),
      ),
      specularColors: specularColors->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getSpecularColorsSize(),
      ),
      roughnesses: roughnesses->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getRoughnessesSize(),
      ),
      metalnesses: metalnesses->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getMetalnessesSize(),
      ),
      transmissions: transmissions->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getTransmissionsSize(),
      ),
      iors: iors->Meta3dCommonlib.CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
        maxIndex * getIORsSize(),
      ),
      diffuseMap: diffuseMap->Meta3dCommonlib.MutableSparseMap.copy,
      roughnessMap: roughnessMap->Meta3dCommonlib.MutableSparseMap.copy,
      metalnessMap: metalnessMap->Meta3dCommonlib.MutableSparseMap.copy,
      gameObjectsMap: gameObjectsMap->Meta3dCommonlib.CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
      gameObjectPBRMaterialMap: gameObjectPBRMaterialMap->Meta3dCommonlib.MutableSparseMap.copy,
      needDisposedPBRMaterials: needDisposedPBRMaterials->Meta3dCommonlib.ArraySt.copy,
      disposedPBRMaterials: disposedPBRMaterials->Meta3dCommonlib.ArraySt.copy,
    }
  },
}
