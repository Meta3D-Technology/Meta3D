import * as Abtstract from "backend-abstract";

import {
    init as initCloud, handleLogin as handleLoginCloud, getShopProtocolCollection, getDataFromShopProtocolCollection, getShopImplementCollection,
    mapShopImplementCollection,
    getAccountFromShopImplementCollectionData,
    getFileDataFromShopImplementCollectionData,
    getFile,
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
    buildShopImplementAccountData, addShopImplementDataToDataFromShopImplementCollectionData,
} from "./application_layer/BackendService";

// export let error = ErrorService.error

export let init = () => Abtstract.init(initCloud)

export let handleLogin = (account) => Abtstract.handleLogin(handleLoginCloud, account)

export let getAllPublishExtensionProtocols = () => Abtstract.getAllPublishProtocolData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedextensionprotocols")

export let getAllPublishContributeProtocols = () => Abtstract.getAllPublishProtocolData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedcontributeprotocols")

export let getAllPublishExtensionProtocolConfigs = () => Abtstract.getAllPublishProtocolConfigData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedextensionprotocolconfigs")

export let getAllPublishContributeProtocolConfigs = () => Abtstract.getAllPublishProtocolConfigData([getShopProtocolCollection, getDataFromShopProtocolCollection], "publishedcontributeprotocolconfigs")

export let getAllPublishExtensions = (protocolName, protocolVersion) => Abtstract.getAllPublishData([
    getShopImplementCollection,
    mapShopImplementCollection,
    getAccountFromShopImplementCollectionData,
    getFileDataFromShopImplementCollectionData,
    getFile
], "publishedextensions", protocolName, protocolVersion)

export let getAllPublishContributes = (protocolName, protocolVersion) => Abtstract.getAllPublishData([
    getShopImplementCollection,
    mapShopImplementCollection,
    getAccountFromShopImplementCollectionData,
    getFileDataFromShopImplementCollectionData,
    getFile
], "publishedcontributes", protocolName, protocolVersion)

export let publishApp = (appBinaryFile, appName, account) => Abtstract.publishApp([
    console.log,
    uploadFile,
    hasData,
    addData,
    updateData,
    getFileID,
],
    appBinaryFile, appName, account
)

export let findPublishApp = (account, appName) => Abtstract.findPublishApp([
    getDataByKey,
    getFile
],
    account, appName
)

export let findAllPublishApps = (account) => Abtstract.findAllPublishApps([
    getDataByKey,
    getFile
],
    account
)

function _throwError(msg: string): never {
    throw new Error(msg)
}

export let publishElementContribute = (
    account,
    packageData,
    contributeBinaryFile,
) => Abtstract.publishElementContribute([
    console.log,
    _throwError, uploadFile, getShopImplementAccountData, updateShopImplementData,
    getDataFromShopImplementAccountData, isContain, buildShopImplementAccountData, addShopImplementDataToDataFromShopImplementCollectionData,
    getFileID, null
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
    null
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
    getFile
],
    "publishedextensions",
    protocolName
)

export let getElementAssembleData = (
    account,
    elementName,
    elementVersion,
) => Abtstract.getElementAssembleData(
    [getShopImplementAccountData, null, getDataFromShopImplementAccountData],
    account,
    elementName,
    elementVersion,
)