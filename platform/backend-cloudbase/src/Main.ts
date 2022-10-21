// import * as ErrorService from "./application_layer/common/ErrorService";
// import * as LoginService from "./application_layer/user/LoginService";
// import * as RegisterService from "./application_layer/user/RegisterService";
// import * as ShopService from "./application_layer/shop/ShopService";
// import * as PublishAppService from "./application_layer/publish/PublishAppService";
// import * as PublishElementContributeService from "./application_layer/assemble_space/element_assemble/PublishElementContributeService"
// import * as GetElementDataService from "./application_layer/assemble_space/element_assemble/GetElementDataService"


import { curry3 } from "meta3d-fp/src/Curry"
import * as Abtstract from "backend-abstract";

// import { init as initCloud, addData, getCollection, getData, getFile, hasData, notHasData, updateData, uploadFile } from "./application_layer/BackendService";
import { init as initCloud, addData } from "./application_layer/BackendService";

// export let error = ErrorService.error

export let init = () => Abtstract.init(initCloud)

// export let checkUserName = (username: string) => {
//     return RegisterService.checkUserName(notHasData, username)
// }

export let registerUser = curry3(Abtstract.registerUser)(addData)

// export let isLoginSuccess = (username: string, password: string) => {
//     return LoginService.isLoginSuccess(notHasData, username, password)
// }

// export let getAllPublishExtensionProtocols = () => {
//     return ShopService.getAllPublishProtocolData(
//         getCollection,
//         "publishedextensionprotocols")
// }

// export let getAllPublishContributeProtocols = () => {
//     return ShopService.getAllPublishProtocolData(getCollection, "publishedcontributeprotocols")
// }

// export let getAllPublishContributeProtocolConfigs = () => {
//     return ShopService.getAllPublishProtocolConfigData(getCollection, "publishedcontributeprotocolconfigs")
// }


// export let getAllPublishExtensionProtocolConfigs = () => {
//     return ShopService.getAllPublishProtocolConfigData(getCollection, "publishedextensionprotocolconfigs")
// }


// export let getAllPublishExtensions = (protocolName: string, protocolVersion: string) => {
//     return ShopService.getAllPublishData([getCollection, getFile],
//         "publishedextensions",
//         protocolName, protocolVersion
//     )
// }

// export let getAllPublishContributes = (protocolName: string, protocolVersion: string) => {
//     return ShopService.getAllPublishData([getCollection, getFile],
//         "publishedcontributes",
//         protocolName, protocolVersion
//     )
// }

// export let publishApp =
//     (appBinaryFile: ArrayBuffer, appName: string, username: string) => {
//         return PublishAppService.publish(
//             [
//                 console.log,
//                 uploadFile,
//                 hasData,
//                 addData,
//                 updateData
//             ],
//             appBinaryFile, appName, username
//         )
//     }

// export let findPublishApp = (username: string, appName: string) => {
//     return PublishAppService.findPublishApp(
//         [getData, getFile],
//         username, appName
//     )
// }

// export let findAllPublishApps = (username: string) => {
//     return PublishAppService.findAllPublishApps(
//         [getData, getFile],
//         username
//     )
// }

// function _throwError(msg: string): never {
//     throw new Error(msg)
// }

// export function publishElementContribute(
//     username: string,
//     packageData: any,
//     contributeBinaryFile: ArrayBuffer
// ) {
//     return PublishElementContributeService.publishElementContribute([
//         console.log,
//         _throwError, uploadFile, getData, updateData],
//         username, packageData, contributeBinaryFile)
// }

// export function publishedelementassembledata(
//     username: string,
//     elementName: string,
//     elementVersion: string,
//     inspectorData: any
// ) {
//     return PublishElementContributeService.publishElementAssembleData([
//         _throwError, getData, updateData],
//         username,
//         elementName,
//         elementVersion,
//         inspectorData
//     )
// }

// export let getAllPublishNewestExtensions = (protocolName: string) => {
//     return GetElementDataService.getAllPublishNewestData([getCollection, getFile],
//         "publishedextensions",
//         protocolName
//     )
// }

// export let getElementAssembleData = (
//     username: string,
//     elementName: string,
//     elementVersion: string,
// ) => {
//     return GetElementDataService.getElementAssembleData(getData,
//         username,
//         elementName,
//         elementVersion,
//     )
// }
