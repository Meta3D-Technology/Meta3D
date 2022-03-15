let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentGeometryProtocol.Index.config,
  Meta3dComponentGeometryProtocol.Index.dataNameType,
  Meta3dComponentGeometryProtocol.Index.needDisposedComponents,
  Meta3dComponentGeometryProtocol.Index.batchDisposeData,
  Meta3dComponentGeometryProtocol.Index.geometry,
> = () => {
  componentName: Meta3dComponentGeometryProtocol.Index.componentName,
  createStateFunc: (. {isDebug, geometryPointCount, geometryCount}) =>
    CreateStateUtils.createState(isDebug, geometryPointCount, geometryCount),
  createComponentFunc: (. state) => CreateGeometryUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddGeometryUtils.add(state, gameObject, component)
  },
  removeComponentFunc: (. state, gameObject, component) => {
    RemoveGeometryUtils.remove(state, gameObject, component)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasGeometryUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetGeometryUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedGeometrysUtils.get(state)
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetGeometryDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetGeometryDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllGeometrysUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, (component, gameObject)) => {
    DisposeGeometryUtils.deferDisposeComponent(state, (component, gameObject))
  },
  disposeComponentsFunc: (. state, componentDataMap) => {
    DisposeGeometryUtils.disposeComponents(state, componentDataMap)
  },
}
