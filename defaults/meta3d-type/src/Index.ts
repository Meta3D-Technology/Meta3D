import { contributeType } from "./ContributeType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

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

type extensionLife<extensionService> = {
  onRegister?: extensionLifeEventHandler<extensionService>,
  onStart?: (state: state, extensionService: extensionService) => void,
  onInit?: extensionLifeAsyncEventHandler<extensionService>,
  onUpdate?: extensionLifeAsyncEventHandler<extensionService>,
}

export type getExtensionLife<extensionService> = (_1: api, extensionName: extensionName) => extensionLife<extensionService>



/* ! ui control config */

export type rect = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export type uiControlName = string

export type supportedEventName = "click"

export type actionName = nullable<string>

export type versionRange = string

export type skinProtocolData = {
  protocolName: string,
  protocolVersion: versionRange,
}

export type getSkinProtocolData = () => skinProtocolData

export type generateUIControlDataStr = (rect: string, skin: string) => string

export type generateUIControlName = () => uiControlName

export type getUIControlSupportedEventNames = () => Array<supportedEventName>

export type generateHandleUIControlEventStr = (actionNames: Array<actionName>) => string






export type action = {
  name: string,
  role: string,
}


export type actionNameForAction = string

export type actions = Array<action>

export type getActionName = () => actionNameForAction

export type getActions = () => actions

