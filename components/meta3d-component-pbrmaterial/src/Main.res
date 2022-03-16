let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentPbrmaterialProtocol.Index.config,
  Meta3dComponentPbrmaterialProtocol.Index.dataNameType,
  Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
  Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
  Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
  Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial,
> = () => {
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
}
