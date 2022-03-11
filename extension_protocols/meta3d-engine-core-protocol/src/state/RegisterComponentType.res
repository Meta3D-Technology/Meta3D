open ComponentType

type componentContribute = ComponentContributeType.componentContribute<state, config, dataName, needDisposedComponents,deferDisposeData, batchDisposeData, component>

// @genType
type usedComponentContribute = {
  componentName: ComponentContributeType.componentName,
  mutable state: state,
  createComponentFunc: ComponentContributeType.createComponentFunc<state, component>,
  getGameObjectsFunc: ComponentContributeType.getGameObjectsFunc<state, component>,
  addComponentFunc: ComponentContributeType.addComponentFunc<state, component>,
  removeComponentFunc: ComponentContributeType.removeComponentFunc<state, component>,
  hasComponentFunc: ComponentContributeType.hasComponentFunc<state>,
  getComponentFunc: ComponentContributeType.getComponentFunc<state, component>,
  getComponentsFunc: ComponentContributeType.getComponentsFunc<state, component>,
  getNeedDisposedComponentsFunc: ComponentContributeType.getNeedDisposedComponentsFunc<state, component>,
  deferDisposeComponentFunc: ComponentContributeType.deferDisposeComponentFunc<state, component>,
  disposeComponentsFunc: ComponentContributeType.disposeComponentsFunc<state, component>,
  getAllComponentsFunc: ComponentContributeType.getAllComponentsFunc<state, component>,
  getComponentDataFunc: ComponentContributeType.getComponentDataFunc<state, dataName, component>,
  setComponentDataFunc: ComponentContributeType.setComponentDataFunc<state, dataName, component>,
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
