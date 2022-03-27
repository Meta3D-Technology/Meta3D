let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentGeometryWorkerProtocol.Index.config,
  Meta3dComponentGeometryWorkerProtocol.Index.needDisposedComponents,
  Meta3dComponentGeometryWorkerProtocol.Index.batchDisposeData,
  Meta3dComponentGeometryWorkerProtocol.Index.cloneConfig,
  Meta3dComponentGeometryWorkerProtocol.Index.geometry,
> = () => {
  componentName: Meta3dComponentGeometryWorkerProtocol.Index.componentName,
  createStateFunc: (. {isDebug, geometryCount, geometryPointCount, buffer}) =>
    CreateStateUtils.createState(isDebug, geometryPointCount, geometryCount, buffer),
  createComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.createComponentFunc,
  addComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.addComponentFunc,
  removeComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.removeComponentFunc,
  hasComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.hasComponentFunc,
  getComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getComponentFunc,
  getNeedDisposedComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getNeedDisposedComponentsFunc,
  getGameObjectsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getGameObjectsFunc,
  getComponentDataFunc: (. state, component, dataName) => {
    GetGeometryDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.setComponentDataFunc,
  getAllComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getAllComponentsFunc,
  deferDisposeComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.deferDisposeComponentFunc,
  disposeComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.disposeComponentsFunc,
  cloneComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.cloneComponentFunc,
}
