import * as Abstract from "backend-abstract";
import { curry2 } from "../../../defaults/meta3d-fp/src/Curry";

import {
    init as initCloud, handleLogin as handleLoginCloud, getMarketProtocolCollection, getDataFromMarketProtocolCollection, getMarketImplementCollection,
    mapMarketImplementCollection,
    getAccountFromMarketImplementCollectionData,
    getFileDataFromMarketImplementCollectionData,
    downloadFile,
    addData,
    hasData,
    getFileID,
    uploadFile,
    updateData,
    getDataByKey,
    getMarketImplementAccountData,
    updateMarketImplementData,
    getDataFromMarketImplementAccountData,
    isContain,
    buildMarketImplementAccountData, addMarketImplementDataToDataFromMarketImplementCollectionData, getDataByKeyContain, getMarketImplement,
    getData,
} from "./application_layer/BackendService";


export let init = (_env) => Abstract.init(initCloud, null)

export let handleLogin = (account) => Abstract.handleLogin(handleLoginCloud, account)

export let getAllPublishExtensionProtocols = () => Abstract.getAllPublishProtocolData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedextensionprotocols")

export let getAllPublishContributeProtocols = () => Abstract.getAllPublishProtocolData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedcontributeprotocols")

export let getAllPublishExtensionProtocolConfigs = () => Abstract.getAllPublishProtocolConfigData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedextensionprotocolconfigs")

export let getAllPublishContributeProtocolConfigs = () => Abstract.getAllPublishProtocolConfigData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedcontributeprotocolconfigs")

export let getAllPublishExtensionInfos = (protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    getMarketImplementCollection,
    mapMarketImplementCollection,
    getAccountFromMarketImplementCollectionData,
    getFileDataFromMarketImplementCollectionData,
], "publishedextensions", protocolName, protocolVersion)

export let getAllPublishContributeInfos = (protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    getMarketImplementCollection,
    mapMarketImplementCollection,
    getAccountFromMarketImplementCollectionData,
    getFileDataFromMarketImplementCollectionData,
], "publishedcontributes", protocolName, protocolVersion)

export let findPublishExtension = (onDownloadProgressFunc,
    account,
    name,
    version
) => Abstract.findPublishImplement([
    getMarketImplement,
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
    getMarketImplement,
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

export let findAllPublishAppsByAccount = (account) => Abstract.findAllPublishAppsByAccount(
    getDataByKeyContain,
    account
)

export let findAllPublishApps = () => Abstract.findAllPublishApps(
    getData
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
    _throwError, uploadFile, getMarketImplementAccountData, updateMarketImplementData,
    getDataFromMarketImplementAccountData, isContain, buildMarketImplementAccountData, addMarketImplementDataToDataFromMarketImplementCollectionData,
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
    getMarketImplementAccountData, updateMarketImplementData, getDataFromMarketImplementAccountData, isContain, buildMarketImplementAccountData, addMarketImplementDataToDataFromMarketImplementCollectionData,
],
    account,
    elementName,
    elementVersion,
    inspectorData
)

let _onDownloadProgressFuncForSingleExtensionOrContribute = console.log

export let getAllPublishNewestExtensions = (protocolName) => Abstract.getAllPublishNewestData([
    getMarketImplementCollection,
    mapMarketImplementCollection,
    getAccountFromMarketImplementCollectionData,
    getFileDataFromMarketImplementCollectionData,
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
    [getMarketImplementAccountData, getDataFromMarketImplementAccountData],
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
