"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = exports.getFileDataFromShopImplementCollectionData = exports.getAccountFromShopImplementCollectionData = exports.mapShopImplementCollection = exports.getDataFromShopProtocolCollection = exports.getShopImplementCollection = exports.getShopProtocolCollection = exports.hasAccount = exports.handleLogin = exports.init = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const most_1 = require("most");
const Repo_1 = require("../domain_layer/repo/Repo");
const BackendService = require("meta3d-backend-4everland");
let init = () => {
    const s3 = new client_s3_1.S3({
        endpoint: "https://endpoint.4everland.co",
        signatureVersion: "v4",
        credentials: {
            accessKeyId: "P7SHR2MYU5CHLXKXCOG7",
            secretAccessKey: "5yhjyVdcpNNKjZ9X5sBe3738Lh9KftfDHQ6zkZKL",
            // sessionToken,
        },
        region: "us-west-2",
    });
    (0, Repo_1.setBackend)(s3);
    return (0, most_1.empty)();
};
exports.init = init;
// let _buildEmptyBody = () => ""
// export let handleLogin = (account: string) => {
//     return fromPromise(addData("user", "meta3d_" + account, _buildEmptyBody()))
// }
// export let handleLogin = curry2(BackendService.handleLogin)(getBackend())
// export let addData = curry4_1(BackendService.addData)(getBackend())
// export let hasAccount = curry3_1(BackendService.hasAccount)(getBackend())
// export let getShopCollection = curry2(BackendService.getShopCollection)(getBackend())
let handleLogin = (account) => BackendService.handleLogin((0, Repo_1.getBackend)(), account);
exports.handleLogin = handleLogin;
// export let addData = (addDataToBody, collectionName, key, collectionData, data) => BackendService.addData(getBackend(), addDataToBody, collectionName, key, collectionData, data)
let hasAccount = (collectionName, account) => BackendService.hasAccount((0, Repo_1.getBackend)(), collectionName, account);
exports.hasAccount = hasAccount;
let _parseShopCollectionDataBody = (returnDataType, allCollectionData) => {
    // let stream = allCollectionData.Body as ReadableStream<any>
    // let reader = stream.getReader()
    //     return new Promise((resolve, reject) => {
    //         const chunks = [];
    //         // stream.on("data", (chunk) => chunks.push(chunk));
    //         // stream.on("error", reject);
    //         // stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    // })
    //         .then(v => {
    //             return JSON.parse(v as string)
    //         })
    return new Promise((resolve, reject) => {
        resolve(allCollectionData.Body);
    }).then((body) => {
        const reader = body.getReader();
        return new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        return pump();
                    });
                }
            }
        });
    })
        .then((stream) => new Response(stream))
        .then((response) => {
        switch (returnDataType) {
            case "arrayBuffer":
                return response.arrayBuffer();
            case "json":
                return response.json();
        }
    });
};
let getShopProtocolCollection = (collectionName) => BackendService.getShopProtocolCollection((0, Repo_1.getBackend)(), _parseShopCollectionDataBody, collectionName);
exports.getShopProtocolCollection = getShopProtocolCollection;
let getShopImplementCollection = (collectionName) => BackendService.getShopImplementCollection((0, Repo_1.getBackend)(), _parseShopCollectionDataBody, collectionName);
exports.getShopImplementCollection = getShopImplementCollection;
exports.getDataFromShopProtocolCollection = BackendService.getDataFromShopProtocolCollection;
exports.mapShopImplementCollection = BackendService.mapShopImplementCollection;
exports.getAccountFromShopImplementCollectionData = BackendService.getAccountFromShopImplementCollectionData;
exports.getFileDataFromShopImplementCollectionData = BackendService.getFileDataFromShopImplementCollectionData;
let getFile = (fileID) => BackendService.getFile((0, Repo_1.getBackend)(), _parseShopCollectionDataBody, fileID);
exports.getFile = getFile;
