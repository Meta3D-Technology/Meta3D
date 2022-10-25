"use strict";
// import { S3 } from "@aws-sdk/client-s3";
// import { Upload } from "@aws-sdk/lib-storage";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementAssembleData = exports.getAllPublishNewestExtensions = exports.publishElementAssembleData = exports.publishElementContribute = exports.findAllPublishApps = exports.findPublishApp = exports.publishApp = exports.getAllPublishContributes = exports.getAllPublishExtensions = exports.getAllPublishContributeProtocolConfigs = exports.getAllPublishExtensionProtocolConfigs = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports.handleLogin = exports.init = void 0;
// export let test = async () => {
//     // const { endpoint, accessKey, secretKey, sessionToken } = s3Params;
//     console.log("aaa")
//     const s3 = new S3({
//         endpoint: "https://endpoint.4everland.co",
//         signatureVersion: "v4",
//         credentials: {
//             accessKeyId: "P7SHR2MYU5CHLXKXCOG7",
//             secretAccessKey: "5yhjyVdcpNNKjZ9X5sBe3738Lh9KftfDHQ6zkZKL",
//             // sessionToken,
//         },
//         region: "us-west-2",
//     } as any);
//     console.log("a2")
//     // console.log(await s3.deleteBucket({
//     //     Bucket: "bb1",
//     // }))
//     // const createBucketOutput = await s3.createBucket({
//     //     Bucket: "bb1",
//     // });
//     // const createBucketOutput = await s3.createBucket({
//     //     Bucket: "meta3d-platform-backend",
//     // });
//     // const putObjectOutput = await s3.putObject({
//     //     Bucket: "meta3d-platform-backend",
//     //     Key: "k1",
//     //     Body: "b1hahaha",
//     // });
//     // console.log("a3")
//     // // console.log(createBucketOutput, putObjectOutput)
//     // // console.log(putObjectOutput)
//     // let { Body } = await s3.getObject({
//     //     Bucket: "meta3d-platform-backend",
//     //     Key: "k1"
//     // })
//     // // console.log(Body.toString(), typeof Body, Body)
//     // try {
//     //     const task = new Upload({
//     //         client: s3,
//     //         queueSize: 3, // 3 MiB
//     //         params: {
//     //             Bucket: "meta3d-platform-backend"
//     //             , Key: "k2", Body: new Uint8Array([1, 2, 3])
//     //         },
//     //     });
//     //     task.on("httpUploadProgress", (e) => {
//     //         const progress = ((e.loaded / e.total) * 100) | 0;
//     //         console.log(progress, e);
//     //     });
//     //     await task.done();
//     // } catch (error) {
//     //     if (error) {
//     //         console.log("task", error.message);
//     //     }
//     // }
//     // console.log(await s3.getObject({
//     //     Bucket: "meta3d-platform-backend",
//     //     Key: "k1"
//     // }))
//     // s3.listBuckets((err, data) => {
//     //     if (!err) {
//     //         console.log(data)
//     //     }
//     // });
//     // s3.listObjectsV2({ Bucket: "meta3d-platform-backend", MaxKeys: 10 }, (err, data) => {
//     //     if (!err) {
//     //         console.log(data.KeyCount)
//     //         data.Contents.forEach((o) => {
//     //             console.log(o.Key)
//     //         })
//     //     }
//     // });
//     // s3.headObject({
//     //     Bucket: "meta3d-platform-backend",
//     //     Key: "k1",
//     // }, (err, data) => {
//     //     if (!err) {
//     //         console.log(data)
//     //         console.log("ipfs cid:    ", data.Metadata['ipfs-hash'])
//     //         // if synced to arweave
//     //         console.log("arweave hash:", data.Metadata['arweave-hash'])
//     //     }
//     // })
// }
// test().then((value) => {
//     console.log(value)
//     console.log("finish")
// }).catch(err => {
//     console.error(err)
//     console.log("error")
// })
const Abtstract = require("backend-abstract");
const BackendService_1 = require("./application_layer/BackendService");
let init = () => Abtstract.init(BackendService_1.init);
exports.init = init;
let handleLogin = (account) => Abtstract.handleLogin(BackendService_1.handleLogin, account);
exports.handleLogin = handleLogin;
let getAllPublishExtensionProtocols = () => Abtstract.getAllPublishProtocolData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedextensionprotocols");
exports.getAllPublishExtensionProtocols = getAllPublishExtensionProtocols;
let getAllPublishContributeProtocols = () => Abtstract.getAllPublishProtocolData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedcontributeprotocols");
exports.getAllPublishContributeProtocols = getAllPublishContributeProtocols;
let getAllPublishExtensionProtocolConfigs = () => Abtstract.getAllPublishProtocolConfigData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedextensionprotocolconfigs");
exports.getAllPublishExtensionProtocolConfigs = getAllPublishExtensionProtocolConfigs;
let getAllPublishContributeProtocolConfigs = () => Abtstract.getAllPublishProtocolConfigData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedcontributeprotocolconfigs");
exports.getAllPublishContributeProtocolConfigs = getAllPublishContributeProtocolConfigs;
let getAllPublishExtensions = (protocolName, protocolVersion) => Abtstract.getAllPublishData([
    BackendService_1.getShopImplementCollection,
    BackendService_1.mapShopImplementCollection,
    BackendService_1.getAccountFromShopImplementCollectionData,
    BackendService_1.getFileDataFromShopImplementCollectionData,
    BackendService_1.getFile
], "publishedextensions", protocolName, protocolVersion);
exports.getAllPublishExtensions = getAllPublishExtensions;
let getAllPublishContributes = (protocolName, protocolVersion) => Abtstract.getAllPublishData([
    BackendService_1.getShopImplementCollection,
    BackendService_1.mapShopImplementCollection,
    BackendService_1.getAccountFromShopImplementCollectionData,
    BackendService_1.getFileDataFromShopImplementCollectionData,
    BackendService_1.getFile
], "publishedcontributes", protocolName, protocolVersion);
exports.getAllPublishContributes = getAllPublishContributes;
let publishApp = (appBinaryFile, appName, account) => Abtstract.publishApp([
    console.log,
    BackendService_1.uploadFile,
    BackendService_1.hasData,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], appBinaryFile, appName, account);
exports.publishApp = publishApp;
let findPublishApp = (account, appName) => Abtstract.findPublishApp([
    BackendService_1.getDataByKey,
    BackendService_1.getFile
], account, appName);
exports.findPublishApp = findPublishApp;
let findAllPublishApps = (account) => Abtstract.findAllPublishApps([
    BackendService_1.getDataByKeyContain,
    BackendService_1.getFile
], account);
exports.findAllPublishApps = findAllPublishApps;
function _throwError(msg) {
    throw new Error(msg);
}
let publishElementContribute = (account, packageData, contributeBinaryFile) => Abtstract.publishElementContribute([
    console.log,
    _throwError, BackendService_1.uploadFile, BackendService_1.getShopImplementAccountData, BackendService_1.updateShopImplementData,
    BackendService_1.getDataFromShopImplementAccountData, BackendService_1.isContain, BackendService_1.buildShopImplementAccountData, BackendService_1.addShopImplementDataToDataFromShopImplementCollectionData,
    BackendService_1.getFileID
], account, packageData, contributeBinaryFile);
exports.publishElementContribute = publishElementContribute;
let publishElementAssembleData = (account, elementName, elementVersion, inspectorData) => Abtstract.publishElementAssembleData([
    _throwError,
    BackendService_1.getShopImplementAccountData, BackendService_1.updateShopImplementData, BackendService_1.getDataFromShopImplementAccountData, BackendService_1.isContain, BackendService_1.buildShopImplementAccountData, BackendService_1.addShopImplementDataToDataFromShopImplementCollectionData,
], account, elementName, elementVersion, inspectorData);
exports.publishElementAssembleData = publishElementAssembleData;
let getAllPublishNewestExtensions = (protocolName) => Abtstract.getAllPublishNewestData([
    BackendService_1.getShopImplementCollection,
    BackendService_1.mapShopImplementCollection,
    BackendService_1.getAccountFromShopImplementCollectionData,
    BackendService_1.getFileDataFromShopImplementCollectionData,
    BackendService_1.getFile
], "publishedextensions", protocolName);
exports.getAllPublishNewestExtensions = getAllPublishNewestExtensions;
let getElementAssembleData = (account, elementName, elementVersion) => Abtstract.getElementAssembleData([BackendService_1.getShopImplementAccountData, BackendService_1.getDataFromShopImplementAccountData], account, elementName, elementVersion);
exports.getElementAssembleData = getElementAssembleData;
