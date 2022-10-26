import * as Abtstract from "backend-abstract";
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
    buildShopImplementAccountData, addShopImplementDataToDataFromShopImplementCollectionData, getDataByKeyContain,
} from "./application_layer/BackendService";

// export let error = ErrorService.error

export let init = () => Abtstract.init(initCloud)

export let handleLogin = (account) => Abtstract.handleLogin(handleLoginCloud, account)

export let getAllPublishExtensionProtocols = () => Abtstract.getAllPublishProtocolData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedextensionprotocols")

export let getAllPublishContributeProtocols = () => Abtstract.getAllPublishProtocolData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedcontributeprotocols")

export let getAllPublishExtensionProtocolConfigs = () => Abtstract.getAllPublishProtocolConfigData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedextensionprotocolconfigs")

export let getAllPublishContributeProtocolConfigs = () => Abtstract.getAllPublishProtocolConfigData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedcontributeprotocolconfigs")

let _onDownloadProgressFuncForSingleExtensionOrContribute = console.log

export let getAllPublishExtensions = (protocolName, protocolVersion) => Abtstract.getAllPublishData([
    getShopImplementCollection,
    mapShopImplementCollection,
    getAccountFromShopImplementCollectionData,
    getFileDataFromShopImplementCollectionData,
    curry2(downloadFile)(_onDownloadProgressFuncForSingleExtensionOrContribute)
], "publishedextensions", protocolName, protocolVersion)

export let getAllPublishContributes = (protocolName, protocolVersion) => Abtstract.getAllPublishData([
    getShopImplementCollection,
    mapShopImplementCollection,
    getAccountFromShopImplementCollectionData,
    getFileDataFromShopImplementCollectionData,
    curry2(downloadFile)(_onDownloadProgressFuncForSingleExtensionOrContribute)
], "publishedcontributes", protocolName, protocolVersion)

export let publishApp = (onUploadProgressFunc, appBinaryFile, appName, account) => Abtstract.publishApp([
    onUploadProgressFunc,
    uploadFile,
    hasData,
    addData,
    updateData,
    getFileID,
],
    appBinaryFile, appName, account
)

export let findPublishApp = (onDownloadProgressFunc, account, appName) => Abtstract.findPublishApp([
    getDataByKey,
    curry2(downloadFile)(onDownloadProgressFunc)
],
    account, appName
)

export let findAllPublishApps = (account) => Abtstract.findAllPublishApps(
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
) => Abtstract.publishElementContribute([
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
) => Abtstract.publishElementAssembleData([
    _throwError,
    getShopImplementAccountData, updateShopImplementData, getDataFromShopImplementAccountData, isContain, buildShopImplementAccountData, addShopImplementDataToDataFromShopImplementCollectionData,
],
    account,
    elementName,
    elementVersion,
    inspectorData
)

export let getAllPublishNewestExtensions = (protocolName) => Abtstract.getAllPublishNewestData([
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
) => Abtstract.getElementAssembleData(
    [getShopImplementAccountData, getDataFromShopImplementAccountData],
    account,
    elementName,
    elementVersion,
)