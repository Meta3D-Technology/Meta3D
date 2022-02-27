// export type registerExtensionSubmitEventData<getExtensionServiceFunc, createExtensionStateFunc, dependentExtensionNameMap> = {
//     extensionName: string,
//     dependentExtensionNameMap: dependentExtensionNameMap,
//     getExtensionServiceFunc: getExtensionServiceFunc,
//     createExtensionStateFunc: createExtensionStateFunc
// }
export type registerExtensionSubmitEventData = {
    extensionName: string,
    dependentExtensionNameMap: any,
    getExtensionServiceFunc: any,
    createExtensionStateFunc: any
}

export type showExtensionEventData = {
    extensionName: string
}