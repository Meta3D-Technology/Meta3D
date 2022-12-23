import { contributeType } from "./contribute/ContributeType"

export type extensionProtocolName = string

export type contributeProtocolName = string

export type extensionService = any

export type extensionState = any

export type dependentExtensionNameMap = any

export type dependentContributeNameMap = any

export type getContributeFuncResult = any

export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type api = {
  registerExtension<getExtensionServiceFunc, getLifeFunc, dependentExtensionNameMap, extensionState>(state: state, extensionProtocolName: extensionProtocolName, getExtensionServiceFunc: getExtensionServiceFunc, getLifeFunc: getLifeFunc, dependentExtensionNameMap: dependentExtensionNameMap, extensionState: extensionState): state,
  getExtensionService<extensionService>(state: state, extensionProtocolName: extensionProtocolName): extensionService,
  getExtensionState<extensionState>(state: state, extensionProtocolName: extensionProtocolName): extensionState,
  setExtensionState<extensionState>(state: state, extensionProtocolName: extensionProtocolName, extensionState: extensionState): state
  registerContribute<getContributeFunc, dependentExtensionNameMap, dependentContributeNameMap>(state: state, contributeProtocolName: contributeProtocolName, getContributeFunc: getContributeFunc, [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap]): state,
  getContribute<contribute>(state: state, contributeProtocolName: contributeProtocolName): contribute,
  getAllContributesByType<contribute>(state: state, contributeType: contributeType): Array<contribute>,
};

// tslint:disable-next-line:interface-over-type-literal
export type getExtensionService<dependentExtensionNameMap, dependentContributeNameMap, extensionService> = (_1: api, [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap]) => extensionService;

// tslint:disable-next-line:interface-over-type-literal
export type createExtensionState<extensionState> = () => extensionState;

export type getContribute<dependentExtensionNameMap, dependentContributeNameMap, contribute> = (_1: api, [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap]) => contribute;


export type extensionLifeEventHandler<extensionService> = (state: state, extensionService: extensionService) => state;

type extensionLifeHandlerData = any

export type extensionLifeAsyncEventHandler<extensionService> = (state: state, extensionService: extensionService, extensionLifeHandlerData: extensionLifeHandlerData) => Promise<state>;

export type canvasData = {
  width: number,
  height: number
}

export type configData = any

export type startConfigData = [canvasData, configData]

type extensionLife<extensionService> = {
  onRegister?: extensionLifeEventHandler<extensionService>,
  onStart?: (state: state, extensionService: extensionService, configData: startConfigData) => void,
  onInit?: extensionLifeAsyncEventHandler<extensionService>,
  onUpdate?: extensionLifeAsyncEventHandler<extensionService>,
}

export type getExtensionLife<extensionService> = (_1: api, extensionProtocolName: extensionProtocolName) => extensionLife<extensionService>
