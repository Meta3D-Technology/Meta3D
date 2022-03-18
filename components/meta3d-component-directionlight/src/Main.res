let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentDirectionlightProtocol.Index.config,
  Meta3dComponentDirectionlightProtocol.Index.dataNameType,
  Meta3dComponentDirectionlightProtocol.Index.needDisposedComponents,
  Meta3dComponentDirectionlightProtocol.Index.batchDisposeData,
  Meta3dComponentDirectionlightProtocol.Index.cloneConfig,
  Meta3dComponentDirectionlightProtocol.Index.directionLight,
> = () => {
  componentName: Meta3dComponentDirectionlightProtocol.Index.componentName,
  createStateFunc: (. {isDebug, directionLightCount}) =>
    CreateStateUtils.createState(isDebug, directionLightCount),
  createComponentFunc: (. state) => CreateDirectionLightUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddDirectionLightUtils.add(state, gameObject, component)
  },
  removeComponentFunc: (. state, gameObject, transform) => {
    state
  },
  hasComponentFunc: (. state, gameObject) => {
    HasDirectionLightUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetDirectionLightUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    []
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetDirectionLightDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetDirectionLightDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllDirectionLightsUtils.getAll(state)
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
