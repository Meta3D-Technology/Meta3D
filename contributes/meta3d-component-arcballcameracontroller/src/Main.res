let getContribute: Meta3dType.Index.getContribute<
  Meta3dComponentArcballcameracontrollerProtocol.DependentMapType.dependentExtensionProtocolNameMap,
  Meta3dComponentArcballcameracontrollerProtocol.DependentMapType.dependentContributeProtocolNameMap,
  Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
    StateType.state,
    Meta3dComponentArcballcameracontrollerProtocol.Index.config,
    Meta3dComponentArcballcameracontrollerProtocol.Index.needDisposedComponents,
    Meta3dComponentArcballcameracontrollerProtocol.Index.batchDisposeData,
    Meta3dComponentArcballcameracontrollerProtocol.Index.cloneConfig,
    Meta3dComponentArcballcameracontrollerProtocol.Index.arcballCameraController,
  >,
> = (_, _) => {

  componentName: Meta3dComponentArcballcameracontrollerProtocol.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreateArcballCameraControllerUtils.create(state),
  addComponentFunc: (. state, gameObject, cameraController) => {
    AddArcballCameraControllerUtils.add(state, gameObject, cameraController)
  },
  removeComponentFunc: (. state, gameObject, cameraController) => {
    RemoveArcballCameraControllerUtils.remove(state, gameObject, cameraController)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasArcballCameraControllerUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetArcballCameraControllerUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedArcballCameraControllersUtils.get(state)
  },
  getGameObjectsFunc: (. state, cameraController) => {
    GetGameObjectsUtils.get(state, cameraController)
  },
  getComponentDataFunc: (. state, cameraController, dataName) => {
    GetArcballCameraControllerDataUtils.getData(. state, cameraController, dataName)
  },
  setComponentDataFunc: (. state, cameraController, dataName, dataValue) => {
    SetArcballCameraControllerDataUtils.setData(. state, cameraController, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllArcballCameraControllersUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, cameraControllerData) => {
    DisposeArcballCameraControllerUtils.deferDisposeComponent(state, cameraControllerData)
  },
  disposeComponentsFunc: (. state, cameraControllers) => {
    DisposeArcballCameraControllerUtils.disposeComponents(state, cameraControllers)
  },
  cloneComponentFunc: (. state, countRange, _, sourceArcballCameraController) => {
    CloneArcballCameraControllerUtils.clone(state, countRange, sourceArcballCameraController)
  },
}
