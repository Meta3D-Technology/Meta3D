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

let unsafeGetRelatedComponentData = DirectorForJs.unsafeGetRelatedComponentData

let setRelatedComponentData = DirectorForJs.setRelatedComponentData

let setComponentData = DirectorForJs.setComponentData

let addComponent = DirectorForJs.addComponent

let hasComponent = DirectorForJs.hasComponent

let getComponent = DirectorForJs.getComponent

let getAllComponents = DirectorForJs.getAllComponents

let getComponentContribute = DirectorForJs.getComponentContribute

let getComponentGameObjects = DirectorForJs.getComponentGameObjects

let setGameObjectData = DirectorForJs.setGameObjectData

let createAndSetGameObjectState = DirectorForJs.createAndSetGameObjectState

let createGameObject = DirectorForJs.createGameObject

let getAllGameObjects = DirectorForJs.getAllGameObjects

let getState = DirectorForJs.getState

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
  runPipeline: DirectorForJs.runPipeline((api, dependentExtensionNameMap)),
}

let createState: Meta3dType.Index.createExtensionState<
  Meta3dEngineCoreProtocol.StateType.state,
> = () => {
  CreateState.createState()
}
