let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentArcballcameracontrollerProtocol.Index.config,
  Meta3dComponentArcballcameracontrollerProtocol.Index.dataNameType,
  Meta3dComponentArcballcameracontrollerProtocol.Index.needDisposedComponents,
  Meta3dComponentArcballcameracontrollerProtocol.Index.batchDisposeData,
  Meta3dComponentArcballcameracontrollerProtocol.Index.cloneConfig,
  Meta3dComponentArcballcameracontrollerProtocol.Index.arcballCameraController,
> = () => {
  componentName: Meta3dComponentArcballcameracontrollerProtocol.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreateArcballCameraControllerUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddArcballCameraControllerUtils.add(state, gameObject, component)
  },
  removeComponentFunc: (. state, gameObject, transform) => {
    state
  },
  hasComponentFunc: (. state, gameObject) => {
    HasArcballCameraControllerUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetArcballCameraControllerUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    []
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetArcballCameraControllerDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetArcballCameraControllerDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllArcballCameraControllersUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, transform) => {
    state
  },
  disposeComponentsFunc: (. state, transforms) => {
    state
  },
  cloneComponentFunc: (. state, countRange, _, sourceTransform) => {
    ( state, [] )
  },
}
