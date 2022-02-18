@genType
type state

@genType
type component

@genType
type config

@genType
type dataName

type registeredComponent = Meta3dEngineCoreType.IComponentForJs.registeredComponent<
  state,
  config,
  dataName,
  component,
>

@genType
type usedComponentData = {
  componentName: Meta3dEngineCoreType.IComponentForJs.componentName,
  mutable state: state,
  createComponentFunc: Meta3dEngineCoreType.IComponentForJs.createComponentFunc<state, component>,
  getGameObjectsFunc: Meta3dEngineCoreType.IComponentForJs.getGameObjectsFunc<state, component>,
  addComponentFunc: Meta3dEngineCoreType.IComponentForJs.addComponentFunc<state, component>,
  hasComponentFunc: Meta3dEngineCoreType.IComponentForJs.hasComponentFunc<state>,
  getComponentFunc: Meta3dEngineCoreType.IComponentForJs.getComponentFunc<state, component>,
  getAllComponentsFunc: Meta3dEngineCoreType.IComponentForJs.getAllComponentsFunc<state, component>,
  getComponentDataFunc: Meta3dEngineCoreType.IComponentForJs.getComponentDataFunc<
    state,
    dataName,
    component,
  >,
  setComponentDataFunc: Meta3dEngineCoreType.IComponentForJs.setComponentDataFunc<
    state,
    dataName,
    component,
  >,
}

type componentData = {
  allRegisteredComponentData: Meta3dCommonlib.ImmutableHashMap.t<
    Meta3dEngineCoreType.IComponentForJs.componentName,
    registeredComponent,
  >,
  allUsedComponentData: Meta3dCommonlib.MutableHashMap.t<
    Meta3dEngineCoreType.IComponentForJs.componentName,
    usedComponentData,
  >,
}
