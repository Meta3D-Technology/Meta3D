// TODO unify .d.ts, .ts!

import { extensionName, getExtensionService, getExtensionLife, state, api, contributeName, getContribute, dependentExtensionNameMap } from "meta3d-type"
import { extensionFileData, contributeFileData, extensionPackageData, contributePackageData } from "./file/ExtensionFileType"

export function prepare(): state

export function registerExtension<extensionService, dependentExtensionNameMap, dependentContributeNameMap, extensionState>(state: state, extensionName: extensionName, getExtensionService: getExtensionService<dependentExtensionNameMap, dependentContributeNameMap, extensionService>,
    getExtensionLife: getExtensionLife<extensionService>,
    [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap],
    extensionState: extensionState
): state

export function getExtensionService<extensionService>(
    state: state,
    extensionName: extensionName
): extensionService

export function setExtensionState<extensionState>(
    state: state,
    extensionName: extensionName,
    extensionState: extensionState
): state

export function getExtensionState<extensionState>(
    state: state,
    extensionName: extensionName,
): extensionState

export function registerContribute<contribute, dependentExtensionNameMap, dependentContributeNameMap>(state: state, contributeName: contributeName, getContributeFunc: getContribute<dependentExtensionNameMap, dependentContributeNameMap, contribute>,
    [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap],
): state

export function getContribute<contribute>(
    state: state,
    contributeName: contributeName
): contribute

export function startExtensions(
    state: state,
    extensionNames: Array<extensionName>
): state

export function generateExtension(
    extensionPackageData: extensionPackageData,
    extensionFileStr: string
): ArrayBuffer

export function loadExtension<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    extensionService,
    extensionState
>(
    extensionBinaryFile: ArrayBuffer
): extensionFileData<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    extensionService,
    extensionState
>

export function generateContribute(
    contributePackageData: contributePackageData,
    contributeFileStr: string
): ArrayBuffer

export function loadContribute<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    contributeService,
    >(
        contributeBinaryFile: ArrayBuffer
    ): contributeFileData<
        dependentExtensionNameMap,
        dependentContributeNameMap,
        contributeService
    >

export function buildAPI(): api