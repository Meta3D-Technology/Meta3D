// TODO unify .d.ts, .ts!

import { extensionProtocolName, getExtensionService, getExtensionLife, state, api, contributeProtocolName, getContribute, getContributeFuncResult, startConfigData } from "meta3d-type"
import { supportedEventName, actionName, } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { actions } from "meta3d-type/src/contribute/ActionProtocolConfigType"
import { needConfigData } from "meta3d-type/src/extension/StartExtensionProtocolConfigType"
import { extensionFileData, extensionProtocolData, contributeFileData, extensionPackageData, contributePackageData, extensionFuncData, contributeFuncData } from "./file/ExtensionFileType"
import { extensionPackageData as extensionPackageDataApp, contributePackageData as contributePackageDataApp } from "./app_and_package/AppAndPackageFileType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export function prepare(): state

export function registerExtension<extensionService, extensionState>(state: state, extensionProtocolName: extensionProtocolName, getExtensionService: getExtensionService<extensionService>,
    getExtensionLife: getExtensionLife<extensionService>,
    extensionState: extensionState
): state

type extensionLifeHandlerData = any

export function initExtension(
    state: state,
    extensionProtocolName: extensionProtocolName,
    extensionLifeHandlerData: extensionLifeHandlerData
): Promise<state>

export function updateExtension(
    state: state,
    extensionProtocolName: extensionProtocolName,
    extensionLifeHandlerData: extensionLifeHandlerData
): Promise<state>

export function getExtensionService<extensionService>(
    state: state,
    extensionProtocolName: extensionProtocolName
): extensionService

export function setExtensionState<extensionState>(
    state: state,
    extensionProtocolName: extensionProtocolName,
    extensionState: extensionState
): state

export function getExtensionState<extensionState>(
    state: state,
    extensionProtocolName: extensionProtocolName,
): extensionState

export function registerContribute<contribute>(state: state, contributeProtocolName: contributeProtocolName, getContributeFunc: getContribute<contribute>
): state

export function getContribute<contribute>(
    state: state,
    contributeProtocolName: contributeProtocolName
): contribute

export function startExtension(
    state: state,
    extensionProtocolName: extensionProtocolName
): void

export function generateExtension(
    extensionPackageData: extensionPackageData,
    extensionFileStr: string
): ArrayBuffer

export function loadExtension<
    extensionService,
    extensionState
>(
    extensionBinaryFile: ArrayBuffer
): extensionFileData

export function generateContribute(
    contributePackageData: contributePackageData,
    contributeFileStr: string
): ArrayBuffer

export function loadContribute(
    contributeBinaryFile: ArrayBuffer
): contributeFileData

type allPackageBinaryFiles = Array<ArrayBuffer>


export function generateApp(
    [
        allExtensionFileData,
        allContributeFileData
    ]: [
            Array<[extensionPackageDataApp, extensionFuncData]>,
            Array<[contributePackageDataApp, contributeFuncData]>
        ],
    allPackageBinaryFiles: allPackageBinaryFiles,
    configData: nullable<startConfigData>
): ArrayBuffer

export function generatePackage(
    [
        allExtensionFileData,
        allContributeFileData
    ]: [
            Array<[extensionPackageDataApp, extensionFuncData]>,
            Array<[contributePackageDataApp, contributeFuncData]>
        ],
    allPackageBinaryFiles: allPackageBinaryFiles
): ArrayBuffer


export function loadApp(
    appBinaryFile: ArrayBuffer
): [state, Array<extensionFileData>]


export function loadPackage(
    packageBinaryFile: ArrayBuffer
): [state, Array<extensionFileData>, extensionProtocolName]



export function startApp(
    [
        state,
        allExtensionDataArr
    ]: [state, Array<extensionFileData>]
): void

export function getExtensionStr(
    extensionFuncData: Uint8Array
): string

export function getContributeStr(
    contributeFuncData: Uint8Array
): string

export function execGetContributeFunc(
    contributeFuncData: Uint8Array
): getContributeFuncResult

type protocolConfigStr = string

type protocolConfigLib = any

type versionRange = string

export type serializeUIControlProtocolConfigLib = (protocolConfigStr: protocolConfigStr) => protocolConfigLib

export type generateUIControlDataStr = (configLib: protocolConfigLib, rect: string) => string

export type hasChildren = (configLib: protocolConfigLib) => boolean

export type getUIControlSupportedEventNames = (configLib: protocolConfigLib) => Array<supportedEventName>

export type generateHandleUIControlEventStr = (configLib: protocolConfigLib, actionNames: Array<actionName>) => string


export type serializeActionProtocolConfigLib = (protocolConfigStr: protocolConfigStr) => protocolConfigLib

export type getActions = (configLib: protocolConfigLib) => actions




export type serializeStartExtensionProtocolConfigLib = (protocolConfigStr: protocolConfigStr) => protocolConfigLib

export type getNeedConfigData = (configLib: protocolConfigLib) => needConfigData



export function buildAPI(): api