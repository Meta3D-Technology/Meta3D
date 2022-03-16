let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentTransformProtocol.Index.config,
  Meta3dComponentTransformProtocol.Index.dataNameType,
  Meta3dComponentTransformProtocol.Index.needDisposedComponents,
  Meta3dComponentTransformProtocol.Index.batchDisposeData,
  Meta3dComponentTransformProtocol.Index.cloneConfig,
  Meta3dComponentTransformProtocol.Index.transform,
> = () => {
  componentName: Meta3dComponentTransformProtocol.Index.componentName,
  createStateFunc: (. {isDebug, transformCount, float9Array1, float32Array1}) =>
    CreateStateUtils.createState(isDebug, transformCount, float9Array1, float32Array1),
  createComponentFunc: (. state) => CreateTransformUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddTransformUtils.add(state, gameObject, component)
  },
  removeComponentFunc: (. state, gameObject, component) => {
    RemoveTransformUtils.remove(state, gameObject, component)
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
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetTransformDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetTransformDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllTransformsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, component) => {
    DisposeTransformUtils.deferDisposeComponent(state, component)
  },
  disposeComponentsFunc: (. state, components) => {
    DisposeTransformUtils.disposeComponents(state, components)
  },
  cloneComponentFunc: (. state, countRange, _, sourceTransform) => {
    CloneTransformUtils.clone(state, countRange, sourceTransform)
  },
}
