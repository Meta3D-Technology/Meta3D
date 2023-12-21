import * as Abstract from "backend-abstract";
import { curry3_1 } from "meta3d-fp/src/Curry";

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
    // getFileDataFromMarketImplementCollectionData,
    downloadFile,
    addData,
    hasData,
    getFileID,
    uploadFile,
    updateData,
    getDataByKey,
    getMarketImplementAccountData,
    addMarketImplementData,
    // getDataFromMarketImplementAccountData,
    // isContain,
    // buildMarketImplementAccountData,

    // addMarketImplementDataToDataFromMarketImplementCollectionData,
    getDataByKeyContain, getMarketImplement,
    // getPackageMarketEntryExtensionProtocolCollection,
    // getDataFromPackageMarketEntryExtensionProtocolCollection,
    getData,
    batchFindMarketProtocolCollection,
    getMarketImplementAccountDataWithWhereData,
    deleteFile,
    getDataWithWhereData
} from "./application_layer/BackendService";
import {
    findNewestPublishPackage as findNewestPublishPackageFind,
    findNewestPublishExtension as findNewestPublishExtensionFind,
    findNewestPublishContribute as findNewestPublishContributeFind,
    // findNewestPublishElementAssembleData as findNewestPublishElementAssembleDataFind,
} from "./application_layer/FindNewestService";
import { filterMarketImplementCollection } from "meta3d-backend-cloudbase";


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
        filterMarketImplementCollection,
        getAccountFromMarketImplementCollectionData,
    ], "publishedextensions",
        limitCount, skipCount,
        protocolName, protocolVersion)

export let getAllPublishContributeInfos = (
    limitCount, skipCount,
    protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
        getMarketImplementCollection,
        mapMarketImplementCollection,
        filterMarketImplementCollection,
        getAccountFromMarketImplementCollectionData,
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
    curry3_1(downloadFile)(onDownloadProgressFunc)
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
    curry3_1(downloadFile)(onDownloadProgressFunc)
],
    "publishedcontributes",
    limitCount,
    skipCount,
    account,
    name,
    version
)

export let publishApp = (onUploadProgressFunc, appBinaryFile, appName, account, description,
    previewBase64, isRecommend
) => Abstract.publishApp([
    onUploadProgressFunc,
    uploadFile,
    deleteFile,
    getDataByKey,
    addData,
    updateData,
    getFileID,
],
    appBinaryFile, appName, account,
    description,
    previewBase64, isRecommend
)

export let findPublishApp = (onDownloadProgressFunc, account, appName, notUseCacheForFindApp) => Abstract.findPublishApp([
    getDataByKey,
    curry3_1(downloadFile)(onDownloadProgressFunc)
],
    account, appName, notUseCacheForFindApp
)

export let findAllPublishAppsByAccount = (account) => Abstract.findAllPublishAppsByAccount(
    getDataWithWhereData,
    account
)

export let findAllPublishApps = (
    limitCount,
    skipCount,
) => Abstract.findAllPublishApps(
    getData,
    limitCount,
    skipCount,
)

export let findAllRecommendPublishApps = (
) => Abstract.findAllRecommendPublishApps(
    getDataWithWhereData
)

let _throwError = (msg: string): never => {
    throw new Error(msg)
}

// export let publishElementContribute = (
//     onUploadProgressFunc,
//     account,
//     packageData,
//     contributeBinaryFile,
// ) => Abstract.publishElementContribute([
//     onUploadProgressFunc,
//     _throwError, uploadFile, getMarketImplementAccountData,
//     addMarketImplementData,
//     // updateMarketImplementData,
//     // getDataFromMarketImplementAccountData,
//     // buildMarketImplementAccountData, addMarketImplementDataToDataFromMarketImplementCollectionData,
//     getFileID
// ],
//     account,
//     packageData,
//     contributeBinaryFile,
// )

// export let publishElementAssembleData = (
//     account,
//     elementName,
//     elementVersion,
//     inspectorData,
//     customInputs,
//     customActions,
// ) => Abstract.publishElementAssembleData([
//     _throwError,
//     getMarketImplementAccountData,
//     addMarketImplementData,
//     // updateMarketImplementData, getDataFromMarketImplementAccountData, isContain, buildMarketImplementAccountData, 
//     // addMarketImplementDataToDataFromMarketImplementCollectionData,
// ],
//     account,
//     elementName,
//     elementVersion,
//     inspectorData,
//     customInputs,
//     customActions,
// )

// export let getAllPublishNewestExtensions = (limitCount, skipCount, protocolName) => Abstract.getAllPublishNewestData([
//     getMarketImplementCollection,
//     mapMarketImplementCollection,
//     getAccountFromMarketImplementCollectionData,
//     curry3_1(downloadFile)(_onDownloadProgressFuncForSingleExtensionOrContribute)
// ],
//     "publishedextensions",
//     limitCount,
//     skipCount,
//     protocolName
// )

// export let getElementAssembleData = (
//     account,
//     elementName,
//     elementVersion,
// ) => Abstract.getElementAssembleData(
//     getMarketImplementAccountDataWithWhereData,
//     account,
//     elementName,
//     elementVersion,
// )

// export let findAllElementAssembleData = (
//     limitCount,
//     skipCount,
// ) => Abstract.findAllElementAssembleData(
//     getData,
//     limitCount,
//     skipCount,
// )


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
    curry3_1(downloadFile)(onDownloadProgressFunc)
],
    limitCount, skipCount,
    account, packageName, packageVersion
)

export let findNewestPublishPackage = (onDownloadProgressFunc, entryExtensionProtocolName, packageName) => Abstract.findNewestPublishPackage([
    findNewestPublishPackageFind,
    curry3_1(downloadFile)(onDownloadProgressFunc)
],
    entryExtensionProtocolName, packageName
)

export let findNewestPublishExtension = (onDownloadProgressFunc, extensionName, extensionProtocolName) => {
    return findNewestPublishExtensionFind(
        curry3_1(downloadFile)(onDownloadProgressFunc), extensionName, extensionProtocolName
    )
}

export let findNewestPublishContribute = (onDownloadProgressFunc, contributeName, contributeProtocolName) => {
    return findNewestPublishContributeFind(
        curry3_1(downloadFile)(onDownloadProgressFunc), contributeName, contributeProtocolName
    )
}

// export let findNewestPublishElementAssembleData = findNewestPublishElementAssembleDataFind
