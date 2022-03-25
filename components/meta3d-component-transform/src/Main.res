let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentTransformProtocol.Index.config,
  Meta3dComponentTransformProtocol.Index.needDisposedComponents,
  Meta3dComponentTransformProtocol.Index.batchDisposeData,
  Meta3dComponentTransformProtocol.Index.cloneConfig,
  Meta3dComponentTransformProtocol.Index.transform,
> = () => {
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
}
