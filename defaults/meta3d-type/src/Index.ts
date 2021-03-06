export type extensionName = string

export type contributeName = string

export type extensionService = any

export type extensionState = any

export type dependentExtensionNameMap = any

export type dependentContributeNameMap = any

export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type api = {
  registerExtension<getExtensionServiceFunc, getLifeFunc, dependentExtensionNameMap, extensionState>(state: state, extensionName: extensionName, getExtensionServiceFunc: getExtensionServiceFunc, getLifeFunc: getLifeFunc, dependentExtensionNameMap: dependentExtensionNameMap, extensionState: extensionState): state,
  getExtensionService<extensionService>(state: state, extensionName: extensionName): extensionService,
  getExtensionState<extensionState>(state: state, extensionName: extensionName): extensionState,
  setExtensionState<extensionState>(state: state, extensionName: extensionName, extensionState: extensionState): state
  registerContribute<getContributeFunc, dependentExtensionNameMap, dependentContributeNameMap>(state: state, contributeName: contributeName, getContributeFunc: getContributeFunc, [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap]): state,
  getContribute<contribute>(state: state, contributeName: contributeName): contribute,
};

// tslint:disable-next-line:interface-over-type-literal
export type getExtensionService<dependentExtensionNameMap, dependentContributeNameMap, extensionService> = (_1: api, [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap]) => extensionService;

// tslint:disable-next-line:interface-over-type-literal
export type createExtensionState<extensionState> = () => extensionState;

export type getContribute<dependentExtensionNameMap, dependentContributeNameMap, contribute> = (_1: api, [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap]) => contribute;


export type extensionLifeEventHandler<extensionService> = (state: state, extensionService: extensionService) => state;

type extensionLife<extensionService> = {
  onRegister?: extensionLifeEventHandler<extensionService>,
  onStart?: extensionLifeEventHandler<extensionService>,
}

export type getExtensionLife<extensionService> = (_1: api, extensionName: extensionName) => extensionLife<extensionService>