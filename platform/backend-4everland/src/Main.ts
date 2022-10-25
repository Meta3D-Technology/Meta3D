// import { S3 } from "@aws-sdk/client-s3";
// import { Upload } from "@aws-sdk/lib-storage";

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
    buildShopImplementAccountData, addShopImplementDataToDataFromShopImplementCollectionData, getDataByKeyContain,
} from "./application_layer/BackendService";


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
    getDataByKeyContain,
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
    [getShopImplementAccountData, getDataFromShopImplementAccountData],
    account,
    elementName,
    elementVersion,
)