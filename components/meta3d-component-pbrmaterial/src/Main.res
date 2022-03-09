let getData: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  Meta3dComponentPbrmaterialProtocol.Index.state,
  Meta3dComponentPbrmaterialProtocol.Index.config,
  Meta3dComponentPbrmaterialProtocol.Index.dataNameType,
  Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial,
> = () => {
  componentName: Meta3dComponentPbrmaterialProtocol.Index.componentName,
  createStateFunc: (. {isDebug, pbrMaterialCount}) =>
    CreateStateUtils.createState(isDebug, pbrMaterialCount),
  createComponentFunc: (. state) => CreatePBRMaterialUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddPBRMaterialUtils.add(state, gameObject, component)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasPBRMaterialUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetPBRMaterialUtils.get(state, gameObject)
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetPBRMaterialDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetPBRMaterialDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllPBRMaterialsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, component) => {
    state
  },
  batchDisposeComponentsFunc: (. state, components) => {
    state
  },
}
