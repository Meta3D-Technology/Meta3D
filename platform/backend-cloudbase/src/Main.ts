import * as Abstract from "backend-abstract";
import { curry2 } from "../../../defaults/meta3d-fp/src/Curry";

import {
    init as initCloud, handleLogin as handleLoginCloud, getShopProtocolCollection, getDataFromShopProtocolCollection, getShopImplementCollection,
    mapShopImplementCollection,
    getAccountFromShopImplementCollectionData,
    getFileDataFromShopImplementCollectionData,
    downloadFile,
    addData,
    hasData,
    getFileID,
    uploadFile,
    updateData,
    getDataByKey,
    getShopImplementAccountData,
    updateShopImplementData,
    getDataFromShopImplementAccountData,
    isContain,
    buildShopImplementAccountData, addShopImplementDataToDataFromShopImplementCollectionData, getDataByKeyContain, getShopImplement,
    // getPackageShopEntryExtensionProtocolCollection,
    // getDataFromPackageShopEntryExtensionProtocolCollection,
    getData
} from "./application_layer/BackendService";

// export let error = ErrorService.error

export let init = (env) => Abstract.init(initCloud, env)

export let handleLogin = (account) => Abstract.handleLogin(handleLoginCloud, account)

export let getAllPublishExtensionProtocols = () => Abstract.getAllPublishProtocolData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedextensionprotocols")

export let getAllPublishContributeProtocols = () => Abstract.getAllPublishProtocolData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedcontributeprotocols")

export let getAllPublishExtensionProtocolConfigs = () => Abstract.getAllPublishProtocolConfigData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedextensionprotocolconfigs")

export let getAllPublishContributeProtocolConfigs = () => Abstract.getAllPublishProtocolConfigData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedcontributeprotocolconfigs")

let _onDownloadProgressFuncForSingleExtensionOrContribute = console.log

export let getAllPublishExtensionInfos = (protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    getShopImplementCollection,
    mapShopImplementCollection,
    getAccountFromShopImplementCollectionData,
    getFileDataFromShopImplementCollectionData,
], "publishedextensions", protocolName, protocolVersion)

export let getAllPublishContributeInfos = (protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    getShopImplementCollection,
    mapShopImplementCollection,
    getAccountFromShopImplementCollectionData,
    getFileDataFromShopImplementCollectionData,
], "publishedcontributes", protocolName, protocolVersion)

export let findPublishExtension = (onDownloadProgressFunc,
    account,
    name,
    version
) => Abstract.findPublishImplement([
    getShopImplement,
    curry2(downloadFile)(onDownloadProgressFunc)
],
    "publishedextensions",
    account,
    name,
    version
)

export let findPublishContribute = (onDownloadProgressFunc,
    account,
    name,
    version
) => Abstract.findPublishImplement([
    getShopImplement,
    curry2(downloadFile)(onDownloadProgressFunc)
],
    "publishedcontributes",
    account,
    name,
    version
)

export let publishApp = (onUploadProgressFunc, appBinaryFile, appName, account) => Abstract.publishApp([
    onUploadProgressFunc,
    uploadFile,
    hasData,
    addData,
    updateData,
    getFileID,
],
    appBinaryFile, appName, account
)

export let findPublishApp = (onDownloadProgressFunc, account, appName) => Abstract.findPublishApp([
    getDataByKey,
    curry2(downloadFile)(onDownloadProgressFunc)
],
    account, appName
)

export let findAllPublishApps = (account) => Abstract.findAllPublishApps(
    getDataByKeyContain,
    account
)

function _throwError(msg: string): never {
    throw new Error(msg)
}

export let publishElementContribute = (
    onUploadProgressFunc,
    account,
    packageData,
    contributeBinaryFile,
) => Abstract.publishElementContribute([
    onUploadProgressFunc,
    _throwError, uploadFile, getShopImplementAccountData, updateShopImplementData,
    getDataFromShopImplementAccountData, isContain, buildShopImplementAccountData, addShopImplementDataToDataFromShopImplementCollectionData,
    getFileID
],
    account,
    packageData,
    contributeBinaryFile,
)

export let publishElementAssembleData = (
    account,
    elementName,
    elementVersion,
    inspectorData
) => Abstract.publishElementAssembleData([
    _throwError,
    getShopImplementAccountData, updateShopImplementData, getDataFromShopImplementAccountData, isContain, buildShopImplementAccountData, addShopImplementDataToDataFromShopImplementCollectionData,
],
    account,
    elementName,
    elementVersion,
    inspectorData
)

export let getAllPublishNewestExtensions = (protocolName) => Abstract.getAllPublishNewestData([
    getShopImplementCollection,
    mapShopImplementCollection,
    getAccountFromShopImplementCollectionData,
    getFileDataFromShopImplementCollectionData,
    curry2(downloadFile)(_onDownloadProgressFuncForSingleExtensionOrContribute)
],
    "publishedextensions",
    protocolName
)

export let getElementAssembleData = (
    account,
    elementName,
    elementVersion,
) => Abstract.getElementAssembleData(
    [getShopImplementAccountData, getDataFromShopImplementAccountData],
    account,
    elementName,
    elementVersion,
)




export let publishPackage = (onUploadProgressFunc,
    packageBinaryFile,
    entryExtensionData,
    packageData,
    account
) => Abstract.publishPackage([
    onUploadProgressFunc,
    uploadFile,
    hasData,
    addData,
    updateData,
    getFileID,
],
    packageBinaryFile,
    entryExtensionData,
    packageData,
    account
)

export let getAllPublishPackageEntryExtensionProtocols = () => Abstract.getAllPublishPackageEntryExtensionProtocols(
    // [
    //     getPackageShopEntryExtensionProtocolCollection,
    //     getDataFromPackageShopEntryExtensionProtocolCollection
    // ]
    getData
)

export let getAllPublishPackageInfos = (
    entryExtensionProtocolName,
    entryExtensionProtocolVersion,
) => Abstract.getAllPublishPackageInfos(
    getDataByKeyContain,
    entryExtensionProtocolName,
    entryExtensionProtocolVersion,
)

export let findPublishPackage = (onDownloadProgressFunc, account, packageName, packageVersion) => Abstract.findPublishPackage([
    getDataByKeyContain,
    curry2(downloadFile)(onDownloadProgressFunc)
],
    account, packageName, packageVersion
)
