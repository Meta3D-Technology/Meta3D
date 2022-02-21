let prepare = DirectorForJs.prepare

let init = DirectorForJs.init

let runPipeline = DirectorForJs.runPipeline

let registerWorkPlugin = DirectorForJs.registerWorkPlugin

let unregisterWorkPlugin = DirectorForJs.unregisterWorkPlugin

let getIsDebug = DirectorForJs.getIsDebug

let setIsDebug = DirectorForJs.setIsDebug

let registerComponent = DirectorForJs.registerComponent

let unregisterComponent = DirectorForJs.unregisterComponent

let createAndSetComponentState = DirectorForJs.createAndSetComponentState

let createComponent = DirectorForJs.createComponent

let unsafeGetUsedComponentContribute = DirectorForJs.unsafeGetUsedComponentContribute

let setUsedComponentContribute = DirectorForJs.setUsedComponentContribute

let setComponentData = DirectorForJs.setComponentData

let addComponent = DirectorForJs.addComponent

let hasComponent = DirectorForJs.hasComponent

let getComponent = DirectorForJs.getComponent

let getAllComponents = DirectorForJs.getAllComponents

let getComponentData = DirectorForJs.getComponentData

let getComponentGameObjects = DirectorForJs.getComponentGameObjects

let setGameObjectContribute = DirectorForJs.setGameObjectContribute

let createAndSetGameObjectState = DirectorForJs.createAndSetGameObjectState

let createGameObject = DirectorForJs.createGameObject

let getAllGameObjects = DirectorForJs.getAllGameObjects

let getComponentState = DirectorForJs.getComponentState

// let buildDependentExtensionDataMap = (
//   meta3dBsMostExtensionName
// ): Meta3dEngineCoreProtocol.ServiceType.dependentExtensionDataMap => {
//   {
//     meta3dBsMostExtensionData: {
//       name: meta3dBsMostExtensionName,
//       protocolName: [#"meta3d-bs-most-protocol"],
//       protocolVersion: [#"^0.1.0"],
//     },
//   }
// }

let getService: Meta3dType.Index.getExtensionService<
  Meta3dEngineCoreProtocol.DependentExtensionType.dependentExtensionNameMap,
  Meta3dEngineCoreProtocol.ServiceType.service,
> = (api, dependentExtensionNameMap) => {
  prepare: DirectorForJs.prepare,
  init: DirectorForJs.init,
  registerWorkPlugin: DirectorForJs.registerWorkPlugin,
  unregisterWorkPlugin: DirectorForJs.unregisterWorkPlugin,
  registerComponent: DirectorForJs.registerComponent,
  unregisterComponent: DirectorForJs.unregisterComponent,
  createAndSetComponentState: DirectorForJs.createAndSetComponentState,
  unsafeGetUsedComponentContribute: DirectorForJs.unsafeGetUsedComponentContribute,
  setUsedComponentContribute: DirectorForJs.setUsedComponentContribute,
  createComponent: DirectorForJs.createComponent,
  setComponentData: DirectorForJs.setComponentData,
  addComponent: DirectorForJs.addComponent,
  hasComponent: DirectorForJs.hasComponent,
  getComponent: DirectorForJs.getComponent,
  getAllComponents: DirectorForJs.getAllComponents,
  getComponentData: DirectorForJs.getComponentData,
  getComponentGameObjects: DirectorForJs.getComponentGameObjects,
  getComponentState: DirectorForJs.getComponentState,
  setGameObjectContribute: DirectorForJs.setGameObjectContribute,
  createAndSetGameObjectState: DirectorForJs.createAndSetGameObjectState,
  createGameObject: DirectorForJs.createGameObject,
  getAllGameObjects: DirectorForJs.getAllGameObjects,
  runPipeline: DirectorForJs.runPipeline((api, dependentExtensionNameMap)),
}

let createState: Meta3dType.Index.createExtensionState<
  Meta3dEngineCoreProtocol.StateType.state,
> = () => {
  CreateState.createState()
}
