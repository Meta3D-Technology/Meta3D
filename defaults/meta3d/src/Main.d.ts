import { extensionProtocolName, getExtensionService, getExtensionLife, state, api, contributeProtocolName, getContribute, getContributeFuncResult, startConfigData, packageProtocolName } from "meta3d-type"
import { actionName, supportedEventName, } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { needConfigData } from "meta3d-type/src/package/StartPackageProtocolConfigType"
import { extensionFileData, contributeFileData, extensionPackageData, contributePackageData, extensionFuncData, contributeFuncData } from "./file/ExtensionFileType"
import { extensionPackageData as extensionPackageDataApp, contributePackageData as contributePackageDataApp, packageData, selectedElements } from "./app_and_package/AppAndPackageFileType"
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

export function getPackageService<packageService>(
    state: state,
    packageProtocolName: packageProtocolName
): nullable<packageService>

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
    allContributeFileData: Array<[contributePackageDataApp, contributeFuncData]>,
    allPackageBinaryFiles: allPackageBinaryFiles,
    allPackageBinaryFileDataStoredInApp: Array<[packageProtocolName, ArrayBuffer]>,
    selectedElements: selectedElements,
    configData: nullable<startConfigData>,
    startPackageProtocolName: string
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
): [state, string, startConfigData]


export function loadPackage(
    packageBinaryFile: ArrayBuffer
): [state, Array<extensionFileData>, extensionProtocolName]

export function getAllDataOfPackage(
    packageBinaryFile: ArrayBuffer
): [
        Array<[packageData, ArrayBuffer]>,
        [
            Array<[extensionPackageDataApp, extensionFuncData]>,
            Array<[contributePackageDataApp, contributeFuncData]>
        ]
    ]

export function getAllDataOfApp(
    appBinaryFile: ArrayBuffer
): [
        Array<[extensionPackageDataApp, extensionFuncData]>,
        Array<[contributePackageDataApp, contributeFuncData]>,
        Array<ArrayBuffer>,
        selectedElements
    ]

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

// export type getActions = (configLib: protocolConfigLib) => actions




export type serializeStartPackageProtocolConfigLib = (protocolConfigStr: protocolConfigStr) => protocolConfigLib

export type getNeedConfigData = (configLib: protocolConfigLib) => needConfigData



export function buildAPI(): api




export type fileJson = {
    protocolName: string,
    blockName: string,

    imagePaths: Array<string>,
    soundPaths: Array<string>,
    glbPaths: Array<string>,
}


export function generateMod(
    // extensionPackageData: extensionPackageData,
    fileStr: string,
    assetFileJson: fileJson,
    assetFiles: Array<Uint8Array>,
): ArrayBuffer

export function loadMod(
    modBinaryFile: ArrayBuffer
): [Uint8Array, Uint8Array, Array<Uint8Array>]

type stateData = any

export function parseMod(
    [setImageBase64ResourceFunc, setAudioBlobResourceFunc, setArrayBufferResourceFunc],
    stateData: stateData,
    modFuncData: Uint8Array,
    assetFileJsonData: Uint8Array,
    assetFilesData: Array<Uint8Array>,
): Promise<[
    stateData,
    any,
    [
        any,
        any,
        any,
    ]]>
