import * as Abtstract from "backend-abstract";

import {
    init as initCloud, handleLogin as handleLoginCloud, getShopProtocolCollection, getDataFromShopProtocolCollection, getShopImplementCollection,
    mapShopImplementCollection,
    getAccountFromShopImplementCollectionData,
    getFileDataFromShopImplementCollectionData,
    getFile
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