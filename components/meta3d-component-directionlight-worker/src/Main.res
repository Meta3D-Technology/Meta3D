let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentDirectionlightWorkerProtocol.Index.config,
  Meta3dComponentDirectionlightWorkerProtocol.Index.needDisposedComponents,
  Meta3dComponentDirectionlightWorkerProtocol.Index.batchDisposeData,
  Meta3dComponentDirectionlightWorkerProtocol.Index.cloneConfig,
  Meta3dComponentDirectionlightWorkerProtocol.Index.directionLight,
> = () => {
  componentName: Meta3dComponentDirectionlightWorkerProtocol.Index.componentName,
  createStateFunc: (. {isDebug, directionLightCount, buffer}) =>
    CreateStateUtils.createState(isDebug, directionLightCount, buffer),
  createComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.createComponentFunc,
  addComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.addComponentFunc,
  removeComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.removeComponentFunc,
  hasComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.hasComponentFunc,
  getComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getComponentFunc,
  getNeedDisposedComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getNeedDisposedComponentsFunc,
  getGameObjectsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getGameObjectsFunc,
  getComponentDataFunc: (. state, component, dataName) => {
    GetDirectionLightDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.setComponentDataFunc,
  getAllComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getAllComponentsFunc,
  deferDisposeComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.deferDisposeComponentFunc,
  disposeComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.disposeComponentsFunc,
  cloneComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.cloneComponentFunc,
}
