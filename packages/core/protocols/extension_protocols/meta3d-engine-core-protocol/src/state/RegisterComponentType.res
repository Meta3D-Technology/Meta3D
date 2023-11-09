open ComponentType

type componentContribute = ComponentContributeType.componentContribute<
  state,
  config,
  needDisposedComponents,
  batchDisposeData,
  cloneConfig,
  component,
>

// @genType
type usedComponentContribute = {
  componentName: ComponentContributeType.componentName,
  state: state,
  createComponentFunc: ComponentContributeType.createComponentFunc<state, component>,
  getGameObjectsFunc: ComponentContributeType.getGameObjectsFunc<state, component>,
  addComponentFunc: ComponentContributeType.addComponentFunc<state, component>,
  removeComponentFunc: ComponentContributeType.removeComponentFunc<state, component>,
  hasComponentFunc: ComponentContributeType.hasComponentFunc<state>,
  getComponentFunc: ComponentContributeType.getComponentFunc<state, component>,
  getNeedDisposedComponentsFunc: ComponentContributeType.getNeedDisposedComponentsFunc<
    state,
    needDisposedComponents,
  >,
  deferDisposeComponentFunc: ComponentContributeType.deferDisposeComponentFunc<state, component>,
  disposeComponentsFunc: ComponentContributeType.disposeComponentsFunc<state, batchDisposeData, component>,
  cloneComponentFunc: ComponentContributeType.cloneComponentFunc<state, cloneConfig, component>,
  getAllComponentsFunc: ComponentContributeType.getAllComponentsFunc<state, component>,
  getComponentDataFunc: ComponentContributeType.getComponentDataFunc<state,  component>,
  setComponentDataFunc: ComponentContributeType.setComponentDataFunc<state,  component>,
  restore: ComponentContributeType.restore<state>,
  deepCopy: ComponentContributeType.deepCopy<state>,
}

type componentContributeData = {
  allComponentContributes: Meta3dCommonlibType.ImmutableHashMapType.t<
    ComponentContributeType.componentName,
    componentContribute,
  >,
  allUsedComponentContributes: Meta3dCommonlibType.MutableHashMapType.t<
    ComponentContributeType.componentName,
    usedComponentContribute,
  >,
}
