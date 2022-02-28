export type extensionName = string

export type extensionService = any

export type extensionState = any

export type dependentExtensionNameMap = any

export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type api = {
  registerExtension<getExtensionServiceFunc, dependentExtensionNameMap, extensionState>(state: state, extensionName: extensionName, getExtensionServiceFunc: getExtensionServiceFunc, dependentExtensionNameMap: dependentExtensionNameMap, extensionState: extensionState): state,
  getServiceExn<extensionService>(state: state, extensionName: extensionName): extensionService,
  getExtensionStateExn<extensionState>(state: state, extensionName: extensionName): extensionState,
  setExtensionState<extensionState>(state: state, extensionName: extensionName, extensionState: extensionState): state
};

// tslint:disable-next-line:interface-over-type-literal
export type getExtensionService<dependentExtensionNameMap, extensionService> = (_1: api, _2: dependentExtensionNameMap) => extensionService;

// tslint:disable-next-line:interface-over-type-literal
export type createExtensionState<extensionState> = () => extensionState;
