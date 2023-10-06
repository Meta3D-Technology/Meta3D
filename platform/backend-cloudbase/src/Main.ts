import * as Abstract from "backend-abstract";
import { curry2 } from "../../../defaults/meta3d-fp/src/Curry";

import {
    init as initCloud,
    checkUserName as checkUserNameCloud,
    handleLoginForWeb3 as handleLoginForWeb3Cloud, getMarketProtocolCollection,
    getMarketProtocolCollectionCount,
    getDataFromMarketProtocolCollection,
    getMarketImplementCollection,
    registerUser as registerUserCloud,
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
    // getPackageMarketEntryExtensionProtocolCollection,
    // getDataFromPackageMarketEntryExtensionProtocolCollection,
    getData,
    batchFindMarketProtocolCollection,
} from "./application_layer/BackendService";
import {
    findNewestPublishPackage as findNewestPublishPackageFind,
    findNewestPublishExtension as findNewestPublishExtensionFind
} from "./application_layer/FindNewestService";


// export let error = ErrorService.error

export let init = (env) => Abstract.init(initCloud, env)

export let checkUserName = (account) => Abstract.checkUserName(checkUserNameCloud, account)

export let handleLoginForWeb3 = (account) => Abstract.handleLoginForWeb3(handleLoginForWeb3Cloud, account)

export let registerUser = (account) => Abstract.registerUser(registerUserCloud, account)


export let isLoginSuccess = (account) => Abstract.isLoginSuccess(hasData, account)


export let getAllPublishExtensionProtocolsCount = () => Abstract.getAllPublishProtocolDataCount(getMarketProtocolCollectionCount, "publishedextensionprotocols")

export let getAllPublishExtensionProtocols = (limitCount, skipCount) => Abstract.getAllPublishProtocolData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedextensionprotocols", limitCount, skipCount)

export let getAllPublishContributeProtocols = (limitCount, skipCount) => Abstract.getAllPublishProtocolData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedcontributeprotocols", limitCount, skipCount)

export let batchFindPublishExtensionProtocols = (protocolName) => Abstract.batchFindPublishProtocolData([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedextensionprotocols", protocolName)

export let batchFindPublishContributeProtocols = (protocolName) => Abstract.batchFindPublishProtocolData([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedcontributeprotocols", protocolName)

export let getAllPublishExtensionProtocolConfigs = (limitCount, skipCount) => Abstract.getAllPublishProtocolConfigData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedextensionprotocolconfigs", limitCount, skipCount)

export let getAllPublishContributeProtocolConfigs = (limitCount, skipCount) => Abstract.getAllPublishProtocolConfigData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedcontributeprotocolconfigs", limitCount, skipCount)

export let batchFindPublishExtensionProtocolConfigs = (protocolName) => Abstract.batchFindPublishProtocolConfigData([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedextensionprotocolconfigs", protocolName)

export let batchFindPublishContributeProtocolConfigs = (protocolName) => Abstract.batchFindPublishProtocolConfigData([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedcontributeprotocolconfigs", protocolName)

let _onDownloadProgressFuncForSingleExtensionOrContribute = console.log

export let getAllPublishExtensionInfos = (
    limitCount, skipCount,
    protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
        getMarketImplementCollection,
        mapMarketImplementCollection,
        getAccountFromMarketImplementCollectionData,
        getFileDataFromMarketImplementCollectionData,
    ], "publishedextensions",
        limitCount, skipCount,
        protocolName, protocolVersion)

export let getAllPublishContributeInfos = (
    limitCount, skipCount,
    protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
        getMarketImplementCollection,
        mapMarketImplementCollection,
        getAccountFromMarketImplementCollectionData,
        getFileDataFromMarketImplementCollectionData,
    ], "publishedcontributes",
        limitCount, skipCount,
        protocolName, protocolVersion)

export let findPublishExtension = (onDownloadProgressFunc,
    limitCount,
    skipCount,
    account,
    name,
    version
) => Abstract.findPublishImplement([
    getMarketImplement,
    curry2(downloadFile)(onDownloadProgressFunc)
],
    "publishedextensions",
    limitCount,
    skipCount,
    account,
    name,
    version
)

export let findPublishContribute = (onDownloadProgressFunc,
    limitCount,
    skipCount,
    account,
    name,
    version
) => Abstract.findPublishImplement([
    getMarketImplement,
    curry2(downloadFile)(onDownloadProgressFunc)
],
    "publishedcontributes",
    limitCount,
    skipCount,
    account,
    name,
    version
)

export let publishApp = (onUploadProgressFunc, appBinaryFile, appName, account, description) => Abstract.publishApp([
    onUploadProgressFunc,
    uploadFile,
    hasData,
    addData,
    updateData,
    getFileID,
],
    appBinaryFile, appName, account,
    description
)

export let findPublishApp = (onDownloadProgressFunc, account, appName) => Abstract.findPublishApp([
    getDataByKey,
    curry2(downloadFile)(onDownloadProgressFunc)
],
    account, appName
)

// export let findAllPublishAppsByAccount = (account) => Abstract.findAllPublishAppsByAccount(
//     getDataByKeyContain,
//     account
// )

export let findAllPublishApps = (
    limitCount,
    skipCount,
) => Abstract.findAllPublishApps(
    getData,
    limitCount,
    skipCount,
)


let _throwError = (msg: string): never => {
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

export let getAllPublishNewestExtensions = (limitCount, skipCount, protocolName) => Abstract.getAllPublishNewestData([
    getMarketImplementCollection,
    mapMarketImplementCollection,
    getAccountFromMarketImplementCollectionData,
    getFileDataFromMarketImplementCollectionData,
    curry2(downloadFile)(_onDownloadProgressFuncForSingleExtensionOrContribute)
],
    "publishedextensions",
    limitCount,
    skipCount,
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
    account,
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
    account,
)

export let getAllPublishPackageEntryExtensionProtocols = (
    limitCount,
    skipCount,
) => Abstract.getAllPublishPackageEntryExtensionProtocols(
    // [
    //     getPackageMarketEntryExtensionProtocolCollection,
    //     getDataFromPackageMarketEntryExtensionProtocolCollection
    // ]
    getData,
    limitCount,
    skipCount,
)

export let getAllPublishPackageInfos = (
    limitCount,
    skipCount,
    entryExtensionProtocolName,
    entryExtensionProtocolVersion,
) => Abstract.getAllPublishPackageInfos(
    getDataByKeyContain,
    limitCount,
    skipCount,
    entryExtensionProtocolName,
    entryExtensionProtocolVersion,
)

export let findPublishPackage = (onDownloadProgressFunc, limitCount, skipCount, account, packageName, packageVersion) => Abstract.findPublishPackage([
    getDataByKeyContain,
    curry2(downloadFile)(onDownloadProgressFunc)
],
    limitCount, skipCount,
    account, packageName, packageVersion
)

export let findNewestPublishPackage = (onDownloadProgressFunc, entryExtensionProtocolName, packageName) => Abstract.findNewestPublishPackage([
    findNewestPublishPackageFind,
    curry2(downloadFile)(onDownloadProgressFunc)
],
    entryExtensionProtocolName, packageName
)

export let findNewestPublishExtension = (onDownloadProgressFunc, extensionName, extensionProtocolName) => {
    return findNewestPublishExtensionFind(
        curry2(downloadFile)(onDownloadProgressFunc), extensionName, extensionProtocolName
    )
}