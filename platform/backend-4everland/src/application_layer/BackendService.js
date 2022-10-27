"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addShopImplementDataToDataFromShopImplementCollectionData = exports.buildShopImplementAccountData = exports.isContain = exports.getDataFromShopImplementAccountData = exports.updateShopImplementData = exports.getShopImplementAccountData = exports.getFileID = exports.hasData = exports.getDataByKeyContain = exports.getDataByKey = exports.addData = exports.updateData = exports.uploadFile = exports.downloadFile = exports.getFileDataFromShopImplementCollectionData = exports.getAccountFromShopImplementCollectionData = exports.mapShopImplementCollection = exports.getDataFromShopProtocolCollection = exports.getShopImplement = exports.getShopImplementCollection = exports.getShopProtocolCollection = exports.hasAccount = exports.handleLogin = exports.init = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const most_1 = require("most");
const Repo_1 = require("../domain_layer/repo/Repo");
const BackendService = require("meta3d-backend-4everland");
const Curry_1 = require("meta3d-fp/src/Curry");
let init = () => {
    let s3 = new client_s3_1.S3({
        endpoint: "https://endpoint.4everland.co",
        signatureVersion: "v4",
        credentials: {
            accessKeyId: "P7SHR2MYU5CHLXKXCOG7",
            secretAccessKey: "5yhjyVdcpNNKjZ9X5sBe3738Lh9KftfDHQ6zkZKL",
            // sessionToken,
        },
        // region: "us-west-2",
        region: "cn-north-1"
        // region: "cn-northwest-1"
        // region: "ap-east-1"
    });
    (0, Repo_1.setBackend)(s3);
    return (0, most_1.empty)();
};
exports.init = init;
let handleLogin = (account) => BackendService.handleLogin((0, Repo_1.getBackend)(), account);
exports.handleLogin = handleLogin;
let hasAccount = (collectionName, account) => BackendService.hasAccount((0, Repo_1.getBackend)(), collectionName, account);
exports.hasAccount = hasAccount;
let _onDownloadProgressFuncForJson = console.log;
let _parseShopCollectionDataBody = (onDownloadProgressFunc, returnDataType, allCollectionData) => {
    return new Promise((resolve, reject) => {
        resolve(allCollectionData.Body);
    }).then((body) => {
        let reader = body.getReader();
        let contentLength = allCollectionData.ContentLength !== undefined ? allCollectionData.ContentLength : 0;
        let receivedLength = 0;
        return new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        receivedLength += value.length;
                        onDownloadProgressFunc(contentLength === 0 ? 0 : Math.floor(receivedLength / contentLength * 100));
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
let getShopProtocolCollection = (collectionName) => BackendService.getShopProtocolCollection((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseShopCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName);
exports.getShopProtocolCollection = getShopProtocolCollection;
let getShopImplementCollection = (collectionName) => BackendService.getShopImplementCollection((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseShopCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName);
exports.getShopImplementCollection = getShopImplementCollection;
let getShopImplement = (collectionName, account, name, version) => {
    return _getObjectWithJsonBody(collectionName, collectionName).then((body) => {
        account = BackendService.handleKeyToLowercase(account);
        let result = body.find(data => data.key === account);
        if (result === undefined) {
            return null;
        }
        result = result.fileData.find(data => data.name === name && data.version === version);
        if (result === undefined) {
            return null;
        }
        return result;
    });
};
exports.getShopImplement = getShopImplement;
exports.getDataFromShopProtocolCollection = BackendService.getDataFromShopProtocolCollection;
exports.mapShopImplementCollection = BackendService.mapShopImplementCollection;
exports.getAccountFromShopImplementCollectionData = BackendService.getAccountFromShopImplementCollectionData;
exports.getFileDataFromShopImplementCollectionData = BackendService.getFileDataFromShopImplementCollectionData;
let downloadFile = (onDownloadProgressFunc, fileID) => BackendService.downloadFile((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseShopCollectionDataBody)(onDownloadProgressFunc), fileID);
exports.downloadFile = downloadFile;
let _arrayBufferToUint8Array = (arrayBuffer) => {
    return new Uint8Array(arrayBuffer);
};
let uploadFile = (onUploadProgressFunc, filePath, fileContent, fileName) => {
    console.log("uploadFile:", filePath, fileContent);
    // return fromPromise(getBackend().putObject({
    //     Bucket: BackendService.getFileBucketName(),
    //     Key: BackendService.handleKeyToLowercase(filePath),
    //     Body: _arrayBufferToUint8Array(fileContent)
    //     ,
    // }))
    let task = new lib_storage_1.Upload({
        client: (0, Repo_1.getBackend)(),
        queueSize: 3,
        params: {
            Bucket: BackendService.getFileBucketName(),
            Key: BackendService.handleKeyToLowercase(filePath),
            Body: _arrayBufferToUint8Array(fileContent)
        },
    });
    task.on("httpUploadProgress", (e) => {
        let percentCompleted = ((e.loaded / e.total) * 100) | 0;
        onUploadProgressFunc(percentCompleted);
    });
    return (0, most_1.fromPromise)(task.done());
};
exports.uploadFile = uploadFile;
let updateData = (collectionName, key, updateData) => {
    return BackendService.getShopProtocolCollection((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseShopCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName).then(oldCollectionData => {
        return BackendService.updateShopImplementData((0, Repo_1.getBackend)(), collectionName, key, updateData, oldCollectionData);
    });
};
exports.updateData = updateData;
let addData = (collectionName, key, data) => {
    return BackendService.getShopProtocolCollection((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseShopCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName).then(allCollectionData => {
        return BackendService.addDataToShopProtocolCollection((0, Repo_1.getBackend)(), BackendService.addShopProtocolDataToDataFromShopProtocolCollectionData, collectionName, key, allCollectionData, data);
    });
};
exports.addData = addData;
let _getObjectWithJsonBody = (collectionName, key) => {
    return (0, Repo_1.getBackend)().getObject({
        Bucket: collectionName,
        Key: key
    })
        .then(data => _parseShopCollectionDataBody(_onDownloadProgressFuncForJson, "json", data));
};
let getDataByKey = (collectionName, key) => {
    return _getObjectWithJsonBody(collectionName, key)
        .then((body) => {
        console.log("getDataByKey:", key, body);
        return body;
    });
};
exports.getDataByKey = getDataByKey;
let getDataByKeyContain = (collectionName, value) => {
    return (0, most_1.fromPromise)((0, Repo_1.getBackend)().listObjects({
        Bucket: collectionName
    }).then(data => {
        if (data.Contents === undefined) {
            return [];
        }
        return data.Contents.filter(({ Key }) => {
            return Key.includes(value);
        });
    })).flatMap(data => {
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(data.map(({ Key }) => {
            return (0, most_1.fromPromise)(_getObjectWithJsonBody(collectionName, Key)).map(d => d[0]);
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
};
exports.getDataByKeyContain = getDataByKeyContain;
let hasData = (collectionName, key) => BackendService.hasData((0, Repo_1.getBackend)(), collectionName, key);
exports.hasData = hasData;
exports.getFileID = BackendService.getFileID;
let getShopImplementAccountData = (collectionName, account) => BackendService.getShopImplementAccountData((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseShopCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName, account);
exports.getShopImplementAccountData = getShopImplementAccountData;
let updateShopImplementData = (collectionName, account, updateData, oldShopImplementCollectionData) => BackendService.updateShopImplementData((0, Repo_1.getBackend)(), collectionName, account, updateData, oldShopImplementCollectionData);
exports.updateShopImplementData = updateShopImplementData;
exports.getDataFromShopImplementAccountData = BackendService.getDataFromShopImplementAccountData;
exports.isContain = BackendService.isContain;
exports.buildShopImplementAccountData = BackendService.buildShopImplementAccountData;
exports.addShopImplementDataToDataFromShopImplementCollectionData = BackendService.addShopImplementDataToDataFromShopImplementCollectionData;
