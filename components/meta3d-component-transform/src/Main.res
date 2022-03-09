let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentTransformProtocol.Index.config,
  Meta3dComponentTransformProtocol.Index.dataNameType,
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
  getComponentsFunc: (. state, gameObjects) => {
    GetTransformsUtils.get(state, gameObjects)
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
    DisposeTransformUtils.deferDisposeComponentFunc(state, component)
  },
  batchDisposeComponentsFunc: (. state, components) => {
    DisposeTransformUtils.batchDisposeComponentsFunc(state, components)
  },
}
