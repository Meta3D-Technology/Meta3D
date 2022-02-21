@genType
type state

@genType
type component

@genType
type config

@genType
type dataName

type componentContribute = IComponentForJs.componentContribute<state, config, dataName, component>

@genType
type usedComponentContribute = {
  componentName: IComponentForJs.componentName,
  mutable state: state,
  createComponentFunc: IComponentForJs.createComponentFunc<state, component>,
  getGameObjectsFunc: IComponentForJs.getGameObjectsFunc<state, component>,
  addComponentFunc: IComponentForJs.addComponentFunc<state, component>,
  hasComponentFunc: IComponentForJs.hasComponentFunc<state>,
  getComponentFunc: IComponentForJs.getComponentFunc<state, component>,
  getAllComponentsFunc: IComponentForJs.getAllComponentsFunc<state, component>,
  getComponentDataFunc: IComponentForJs.getComponentDataFunc<state, dataName, component>,
  setComponentDataFunc: IComponentForJs.setComponentDataFunc<state, dataName, component>,
}

type componentContributeData = {
  allComponentContributes: Meta3dCommonlibType.ImmutableHashMapType.t<
    IComponentForJs.componentName,
    componentContribute,
  >,
  allUsedComponentContributes: Meta3dCommonlibType.MutableHashMapType.t<
    IComponentForJs.componentName,
    usedComponentContribute,
  >,
}
