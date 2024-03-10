import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"
// import { contributeType } from "./contribute/ContributeType"
import type { List, Map } from "immutable"

type contributeType = any

export type extensionName = string

export type contributeName = string

export type extensionProtocolName = string

export type contributeProtocolName = string

export type extensionService = any

export type extensionState = any

export type packageProtocolName = string

export type getContributeFuncResult = any

// export abstract class state { protected opaque: any } /* simulate opaque types */
export type state = any

// tslint:disable-next-line:interface-over-type-literal
export type nullableAPI = {
  getExn: <data>(data: nullable<data>) => data;
  isNullable: <data>(data: nullable<data>) => boolean;
  return: <data>(data: data) => nullable<data>;
  getWithDefault: <data>(data: nullable<data>, defaultValue: data) => data;
  map: <data1, data2>(func: (data: data1) => data2, data: nullable<data1>) => nullable<data2>;
  bind: <data1, data2>(func: (data: data1) => nullable<data2>, data: nullable<data1>) => nullable<data2>;
  getEmpty: <data>() => nullable<data>;
};

type env = "local" | "production"

type onUploadProgressFunc = (progress: number) => void

type appName = string

type account = string

type description = string

type previewBase64 = string

type isRecommend = boolean

type publishFinalApp = (
  onUploadProgressFunc: onUploadProgressFunc,
  sceneGLB: ArrayBuffer,
  // singleEventBinaryFile: ArrayBuffer,
  appName: appName,
  account: account,
  description: description,
  previewBase64: strictNullable<previewBase64>,
  isRecommend: isRecommend,
) => Promise<void>

export type backendAPI = {
  init: (env: string) => Promise<void>,
  publishFinalApp: publishFinalApp,
}

export type messageAPI = {
  success: (message: string) => void,
  warn: (message: string) => void,
  error: (error: Error) => void,
}


// tslint:disable-next-line:interface-over-type-literal
export type immutableAPI = {
  createList: <T>() => List<T>;
  createListOfData: <T>(data: Array<T>) => List<T>;
  createMap: <K, V>() => Map<K, V>
  createMapOfData: <K extends string, V>(data: Record<K, V>) => Map<K, V>
};

// tslint:disable-next-line:interface-over-type-literal
export type actionAPI = { getActionState: <actionState> (state: state, actionName: string) => nullable<actionState>; setActionState: <actionState> (state: state, actionName: string, actionState: actionState) => state };

// tslint:disable-next-line:interface-over-type-literal
export type uiControlAPI = { getUIControlState: <uiControlState> (state: state, uiControlName: string) => uiControlState; setUIControlState: <uiControlState> (state: state, uiControlName: string, uiControlState: uiControlState) => state };

// tslint:disable-next-line:interface-over-type-literal
export type api = {
  registerExtension<getExtensionServiceFunc, getLifeFunc, extensionState>(state: state, extensionProtocolName: extensionProtocolName, getExtensionServiceFunc: getExtensionServiceFunc, getLifeFunc: getLifeFunc, extensionState: extensionState): state,
  getExtensionService<extensionService>(state: state, extensionProtocolName: extensionProtocolName): extensionService,
  getExtensionState<extensionState>(state: state, extensionProtocolName: extensionProtocolName): extensionState,
  setExtensionState<extensionState>(state: state, extensionProtocolName: extensionProtocolName, extensionState: extensionState): state
  getPackageService<packageService>(state: state, packageProtocolName: packageProtocolName): nullable<packageService>,
  registerContribute<getContributeFunc>(state: state, contributeProtocolName: contributeProtocolName, getContributeFunc: getContributeFunc): state,
  getContribute<contribute>(state: state, contributeProtocolName: contributeProtocolName): contribute,
  getAllContributesByType<contribute>(state: state, contributeType: contributeType): Array<contribute>,
  getPackage(state: state, packageProtocolName: packageProtocolName): nullable<ArrayBuffer>
  restore(currentState: state, targetState: state): state,
  deepCopy(state: state): state,
  nullable: nullableAPI;
  immutable: immutableAPI;
  action: actionAPI;
  uiControl: uiControlAPI,
  backend: backendAPI,
  message: messageAPI
};

// tslint:disable-next-line:interface-over-type-literal
export type getExtensionService<extensionService> = (_1: api) => extensionService;

// tslint:disable-next-line:interface-over-type-literal
export type createExtensionState<extensionState> = (_1: state, _2: api) => extensionState;

export type getContribute<contribute> = (_1: api) => contribute;


export type extensionLifeEventHandler<extensionService> = (state: state, extensionService: extensionService) => state;

type extensionLifeHandlerData = any

export type extensionLifeAsyncEventHandler<extensionService> = (state: state, extensionService: extensionService, extensionLifeHandlerData: extensionLifeHandlerData) => Promise<state>;

export type canvasData = {
  width: number,
  height: number
}

export type configData = any

export type startConfigData = [canvasData, configData]

export type extensionLife<extensionService> = {
  onRegister?: extensionLifeEventHandler<extensionService>,
  onRestore?: (currentState: state, targetState: state) => state,
  onDeepCopy?: (state: state) => state,
  onStart?: (state: state, extensionService: extensionService, configData: startConfigData) => void,
  onInit?: extensionLifeAsyncEventHandler<extensionService>,
  onUpdate?: extensionLifeAsyncEventHandler<extensionService>,
}

export type getExtensionLife<extensionService> = (_1: api, extensionProtocolName: extensionProtocolName) => extensionLife<extensionService>
