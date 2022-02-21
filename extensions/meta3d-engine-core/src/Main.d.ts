// import type { Stream } from "most";
// import { workPluginContribute } from "./abstract/work/Meta3dEngineCoreProtocol.IWorkForJs.gen"
// import { jobOrders } from "./data/vo/Meta3dEngineCoreProtocol.RegisterWorkPluginVOType.gen";
// import { componentName, componentContribute } from "./abstract/scene_graph/Meta3dEngineCoreProtocol.IComponentForJs.gen"
// import { usedComponentData } from "./data/Meta3dEngineCoreProtocol.RegisterComponentType.gen"
// import { gameObjectContribute } from "./abstract/scene_graph/Meta3dEngineCoreProtocol.IGameObjectForJs.gen"
// import { nullable } from "meta3d-commonlib-ts/src/nullable"

// export function prepare(): void

// export function init(): void

// type pipelineName = string

// export function runPipeline(pipelineName: pipelineName): Stream<void>

// type state = any

// // type pluginName = string

// // type states = Record<pluginName, state>
// type states = any


// export function registerWorkPlugin(data: workPluginContribute<state, states>, jobOrders?: jobOrders): void

// export function unregisterWorkPlugin(targetPluginName: string): void

// export function getIsDebug(): boolean

// export function setIsDebug(isDebug: boolean): void



// type gameObjectState = any

// type gameObject = any

// export function setGameObjectData(data: gameObjectContribute<gameObjectState, gameObject>): void

// export function createAndSetGameObjectState(): void

// export function createGameObject(): gameObject

// export function getAllGameObjects(): Array<gameObject>


// type componentState = any

// type component = any

// type config = any

// type dataName = any

// export function registerComponent(data: componentContribute<componentState, config, dataName, component>): void

// export function unregisterComponent(componentName: componentName): void

// export function createAndSetComponentState(componentName: componentName, config: config): void

// export function createComponent(data: usedComponentData): [usedComponentData, component]

// export function unsafeGetRelatedComponentData(componentName: componentName): usedComponentData

// export function setRelatedComponentData(data: usedComponentData, componentName: componentName): void

// export function setComponentData<DataValue>(
//     data: usedComponentData,
//     component: component,
//     dataName: dataName,
//     dataValue: DataValue
// ): usedComponentData

// export function addComponent(data: usedComponentData,
//     gameObject: gameObject,
//     component: component,
// ): usedComponentData

// export function hasComponent(data: usedComponentData,
//     gameObject: gameObject,
// ): boolean

// export function getComponent(data: usedComponentData,
//     gameObject: gameObject,
// ): nullable<component>

// export function getAllComponents(data: usedComponentData
// ): Array<component>

// export function getComponentContribute<DataValue>(data: usedComponentData,
//     component: component,
//     dataName: dataName,
// ): nullable<DataValue>

// export function getComponentGameObjects(data: usedComponentData,
//     component: component,
// ): Array<gameObject>

// export function getState<componentState>(component: component): nullable<componentState>

// export type api = {
//     getServiceFunc<b>: (a: b) => number
// }
// export type api = {
//     getServiceFunc<b>(a: b): number,
//     getServiceFunc2<b>(a: b): number,
// }

// let api:api = {} as any 
// // api.getServiceFunc<number>()