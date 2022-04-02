let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentDirectionlightProtocol.Index.config,
  
  Meta3dComponentDirectionlightProtocol.Index.needDisposedComponents,
  Meta3dComponentDirectionlightProtocol.Index.batchDisposeData,
  Meta3dComponentDirectionlightProtocol.Index.cloneConfig,
  Meta3dComponentDirectionlightProtocol.Index.directionLight,
> = () => {
  componentName: Meta3dComponentDirectionlightProtocol.Index.componentName,
  createStateFunc: (. {isDebug, directionLightCount}) =>
    CreateStateUtils.createState(isDebug, directionLightCount),
  createComponentFunc: (. state) => CreateDirectionLightUtils.create(state),
  addComponentFunc: (. state, gameObject, light) => {
    AddDirectionLightUtils.add(state, gameObject, light)
  },
  removeComponentFunc: (. state, gameObject, light) => {
    RemoveDirectionLightUtils.remove(state, gameObject, light)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasDirectionLightUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetDirectionLightUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedDirectionLightsUtils.get(state)
  },
  getGameObjectsFunc: (. state, light) => {
    GetGameObjectsUtils.get(state, light)
  },
  getComponentDataFunc: (. state, light, dataName) => {
    GetDirectionLightDataUtils.getData(. state, light, dataName)
  },
  setComponentDataFunc: (. state, light, dataName, dataValue) => {
    SetDirectionLightDataUtils.setData(. state, light, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllDirectionLightsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, lightData) => {
    DisposeDirectionLightUtils.deferDisposeComponent(state, lightData)
  },
  disposeComponentsFunc: (. state, lights) => {
    DisposeDirectionLightUtils.disposeComponents(state, lights)
  },
  cloneComponentFunc: (. state, countRange, _, sourceDirectionLight) => {
    CloneDirectionLightUtils.clone(state, countRange, sourceDirectionLight)
  },
}
