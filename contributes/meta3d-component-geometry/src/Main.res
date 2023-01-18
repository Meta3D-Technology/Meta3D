let getContribute: Meta3dType.Index.getContribute<
  Meta3dComponentGeometryProtocol.DependentMapType.dependentExtensionProtocolNameMap,
  Meta3dComponentGeometryProtocol.DependentMapType.dependentContributeProtocolNameMap,
  Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentGeometryProtocol.Index.config,
    Meta3dComponentGeometryProtocol.Index.needDisposedComponents,
    Meta3dComponentGeometryProtocol.Index.batchDisposeData,
    Meta3dComponentGeometryProtocol.Index.cloneConfig,
    Meta3dComponentGeometryProtocol.Index.geometry,
  >,
> = (_, _) => {
  componentName: Meta3dComponentGeometryProtocol.Index.componentName,
  createStateFunc: (. {isDebug, geometryPointCount, geometryCount}) =>
    CreateStateUtils.createState(isDebug, geometryPointCount, geometryCount),
  createComponentFunc: (. state) => CreateGeometryUtils.create(state),
  addComponentFunc: (. state, gameObject, geometry) => {
    AddGeometryUtils.add(state, gameObject, geometry)
  },
  removeComponentFunc: (. state, gameObject, geometry) => {
    RemoveGeometryUtils.remove(state, gameObject, geometry)
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
  getGameObjectsFunc: (. state, geometry) => {
    GetGameObjectsUtils.get(state, geometry)
  },
  getComponentDataFunc: (. state, geometry, dataName) => {
    GetGeometryDataUtils.getData(. state, geometry, dataName)
  },
  setComponentDataFunc: (. state, geometry, dataName, dataValue) => {
    SetGeometryDataUtils.setData(. state, geometry, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllGeometrysUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, (geometry, gameObject)) => {
    DisposeGeometryUtils.deferDisposeComponent(state, (geometry, gameObject))
  },
  disposeComponentsFunc: (. state, geometryDataMap) => {
    DisposeGeometryUtils.disposeComponents(state, geometryDataMap)
  },
  cloneComponentFunc: (. state, countRange, cloneConfig, sourceGeometry) => {
    CloneGeometryUtils.clone(state, countRange, sourceGeometry)
  },
}
