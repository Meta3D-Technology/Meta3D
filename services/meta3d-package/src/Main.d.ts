import { extensionName, getExtensionService, getExtensionLife, state, api, contributeName, getContribute, getContributeFuncResult, startConfigData } from "meta3d-type"
import { supportedEventName, actionName, } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { actions } from "meta3d-type/src/contribute/ActionProtocolConfigType"
import { needConfigData } from "meta3d-type/src/extension/StartExtensionProtocolConfigType"
import { extensionFileData, extensionProtocolData, contributeFileData, extensionPackageData, contributePackageData, extensionFuncData, contributeFuncData } from "meta3d/src/file/ExtensionFileType"
import { extensionPackageData as extensionPackageDataApp, contributePackageData as contributePackageDataApp } from "meta3d/src/app_and_package/AppAndPackageFileType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

// import type { loadPackage as loadPackageMeta3d, getExtensionService } from "meta3d"

export function loadPackage(
    packageBinaryFile: ArrayBuffer
): [state, Array<extensionFileData>, extensionName]

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


// // loadPack

// export type loadPackage = loadPackageMeta3d

// export type loadPackage = loadPackageMeta3d

// export { loadPackage, getExtensionService }