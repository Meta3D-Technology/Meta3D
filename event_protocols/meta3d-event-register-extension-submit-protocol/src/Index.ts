export const eventName = "RegisterExtensionSubmit"

export type eventData = {
    extensionName: string,
    dependentExtensionNameMap: null,
    getExtensionServiceFunc: any,
    createExtensionStateFunc: any
}