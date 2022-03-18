let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentBasiccameraviewProtocol.Index.config,
  Meta3dComponentBasiccameraviewProtocol.Index.dataNameType,
  Meta3dComponentBasiccameraviewProtocol.Index.needDisposedComponents,
  Meta3dComponentBasiccameraviewProtocol.Index.batchDisposeData,
  Meta3dComponentBasiccameraviewProtocol.Index.cloneConfig,
  Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView,
> = () => {
  componentName: Meta3dComponentBasiccameraviewProtocol.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreateBasicCameraViewUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddBasicCameraViewUtils.add(state, gameObject, component)
  },
  removeComponentFunc: (. state, gameObject, transform) => {
    state
  },
  hasComponentFunc: (. state, gameObject) => {
    HasBasicCameraViewUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetBasicCameraViewUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    []
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetBasicCameraViewDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetBasicCameraViewDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllBasicCameraViewsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, transform) => {
    state
  },
  disposeComponentsFunc: (. state, transforms) => {
    state
  },
  cloneComponentFunc: (. state, countRange, _, sourceTransform) => {
    ( state, [] )
  },
}

