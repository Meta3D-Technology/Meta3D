let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.config,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.needDisposedComponents,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.batchDisposeData,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.cloneConfig,
  Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection,
> = () => {
  componentName: Meta3dComponentPerspectivecameraprojectionProtocol.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreatePerspectiveCameraProjectionUtils.create(state),
  addComponentFunc: (. state, gameObject, cameraProjection) => {
    AddPerspectiveCameraProjectionUtils.add(state, gameObject, cameraProjection)
  },
  removeComponentFunc: (. state, gameObject, cameraProjection) => {
    RemovePerspectiveCameraProjectionUtils.remove(state, gameObject, cameraProjection)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasPerspectiveCameraProjectionUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetPerspectiveCameraProjectionUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedPerspectiveCameraProjectionsUtils.get(state)
  },
  getGameObjectsFunc: (. state, cameraProjection) => {
    GetGameObjectsUtils.get(state, cameraProjection)
  },
  getComponentDataFunc: (. state, cameraProjection, dataName) => {
    GetPerspectiveCameraProjectionDataUtils.getData(. state, cameraProjection, dataName)
  },
  setComponentDataFunc: (. state, cameraProjection, dataName, dataValue) => {
    SetPerspectiveCameraProjectionDataUtils.setData(. state, cameraProjection, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllPerspectiveCameraProjectionsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, cameraProjectionData) => {
    DisposePerspectiveCameraProjectionUtils.deferDisposeComponent(state, cameraProjectionData)
  },
  disposeComponentsFunc: (. state, cameraProjections) => {
    DisposePerspectiveCameraProjectionUtils.disposeComponents(state, cameraProjections)
  },
  cloneComponentFunc: (. state, countRange, _, sourcePerspectiveCameraProjection) => {
    ClonePerspectiveCameraProjectionUtils.clone(
      state,
      countRange,
      sourcePerspectiveCameraProjection,
    )
  },
}
