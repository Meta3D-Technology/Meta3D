type extensionName = string

export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type api = {
  getServiceExn<extensionService>(state: state, extensionName: extensionName): extensionService,
  getExtensionStateExn<extensionState>(state: state, extensionName: extensionName): extensionState,
  setExtensionState<extensionState>(state: state, extensionName: extensionName, extensionState: extensionState): state
};

// tslint:disable-next-line:interface-over-type-literal
export type getExtensionService<dependentExtensionNameMap, extensionService> = (_1: api, _2: dependentExtensionNameMap) => extensionService;

// tslint:disable-next-line:interface-over-type-literal
export type createExtensionState<extensionState> = () => extensionState;
