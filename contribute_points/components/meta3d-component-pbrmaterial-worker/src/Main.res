let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentPbrmaterialWorkerProtocol.Index.config,
  Meta3dComponentPbrmaterialWorkerProtocol.Index.needDisposedComponents,
  Meta3dComponentPbrmaterialWorkerProtocol.Index.batchDisposeData,
  Meta3dComponentPbrmaterialWorkerProtocol.Index.cloneConfig,
  Meta3dComponentPbrmaterialWorkerProtocol.Index.pbrMaterial,
> = () => {
  componentName: Meta3dComponentPbrmaterialWorkerProtocol.Index.componentName,
  createStateFunc: (. {isDebug, pbrMaterialCount, buffer}) =>
    CreateStateUtils.createState(isDebug, pbrMaterialCount, buffer),
  createComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.createComponentFunc,
  addComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.addComponentFunc,
  removeComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.removeComponentFunc,
  hasComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.hasComponentFunc,
  getComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getComponentFunc,
  getNeedDisposedComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getNeedDisposedComponentsFunc,
  getGameObjectsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getGameObjectsFunc,
  getComponentDataFunc: (. state, component, dataName) => {
    GetPBRMaterialDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.setComponentDataFunc,
  getAllComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.getAllComponentsFunc,
  deferDisposeComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.deferDisposeComponentFunc,
  disposeComponentsFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.disposeComponentsFunc,
  cloneComponentFunc: Meta3dComponentWorkerUtils.DefaultGetDataUtils.cloneComponentFunc,
}
