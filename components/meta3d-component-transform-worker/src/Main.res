let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentTransformWorkerProtocol.Index.config,
  Meta3dComponentTransformWorkerProtocol.Index.needDisposedComponents,
  Meta3dComponentTransformWorkerProtocol.Index.batchDisposeData,
  Meta3dComponentTransformWorkerProtocol.Index.cloneConfig,
  Meta3dComponentTransformWorkerProtocol.Index.transform,
> = () => {
  componentName: Meta3dComponentTransformWorkerProtocol.Index.componentName,
  createStateFunc: (. {isDebug, transformCount, buffer}) =>
    CreateStateUtils.createState(isDebug, transformCount, buffer),
  createComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.createComponentFunc,
  addComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.addComponentFunc,
  removeComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.removeComponentFunc,
  hasComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.hasComponentFunc,
  getComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getComponentFunc,
  getNeedDisposedComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getNeedDisposedComponentsFunc,
  getGameObjectsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getGameObjectsFunc,
  getComponentDataFunc: (. state, component, dataName) => {
    GetTransformDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.setComponentDataFunc,
  getAllComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getAllComponentsFunc,
  deferDisposeComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.deferDisposeComponentFunc,
  disposeComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.disposeComponentsFunc,
  cloneComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.cloneComponentFunc,
}
