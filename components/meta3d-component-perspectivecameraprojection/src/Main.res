let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.config,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataNameType,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.needDisposedComponents,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.batchDisposeData,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.cloneConfig,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection,
> = () => {
  componentName: Meta3dComponentPerspectivecameraprojectionProtocol.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreatePerspectiveCameraProjectionUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddPerspectiveCameraProjectionUtils.add(state, gameObject, component)
  },
  removeComponentFunc: (. state, gameObject, transform) => {
    state
  },
  hasComponentFunc: (. state, gameObject) => {
    HasPerspectiveCameraProjectionUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetPerspectiveCameraProjectionUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    []
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetPerspectiveCameraProjectionDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetPerspectiveCameraProjectionDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllPerspectiveCameraProjectionsUtils.getAll(state)
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


