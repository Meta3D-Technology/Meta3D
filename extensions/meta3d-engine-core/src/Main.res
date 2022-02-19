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

let getComponentData = DirectorForJs.getComponentData

let getComponentGameObjects = DirectorForJs.getComponentGameObjects

let setGameObjectData = DirectorForJs.setGameObjectData

let createAndSetGameObjectState = DirectorForJs.createAndSetGameObjectState

let createGameObject = DirectorForJs.createGameObject

let getAllGameObjects = DirectorForJs.getAllGameObjects

let getState = DirectorForJs.getState

// let buildDependentExtensionData = map => {
//   {
//     meta3dBsMostExtensionName: map->Meta3dCommonlib.ImmutableHashMap.getExn(
//       "meta3dBsMostExtensionName",
//     ),
//   }
// }

let getService: Meta3dType.ExtensionManagerType.getService<
  Meta3dEngineCoreType.ServiceType.dependentExtensionNameMap,
  Meta3dEngineCoreType.ServiceType.service,
> = (api, {meta3dBsMostExtensionName}) => {
  func1: state => {
    let {just}: Meta3dBsMostType.ServiceType.service = api.getServiceExn(
      state,
      meta3dBsMostExtensionName,
    )

    1->just
  },
}

let createState: Meta3dType.ExtensionManagerType.createState<StateType.state> = () => {
  CreateState.createState()
}
