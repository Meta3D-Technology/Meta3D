"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.addMarketImplementDataToDataFromMarketImplementCollectionData = exports.buildMarketImplementAccountData = exports.isContain = exports.getDataFromMarketImplementAccountData = exports.updateMarketImplementData = exports.getMarketImplementAccountData = exports.getFileID = exports.hasData = exports.getDataByKeyContain = exports.getDataByKey = exports.addData = exports.updateData = exports.uploadFile = exports.downloadFile = exports.getFileDataFromMarketImplementCollectionData = exports.getAccountFromMarketImplementCollectionData = exports.mapMarketImplementCollection = exports.getDataFromMarketProtocolCollection = exports.getMarketImplement = exports.getMarketImplementCollection = exports.getMarketProtocolCollection = exports.hasAccount = exports.handleLogin = exports.init = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const most_1 = require("most");
const Repo_1 = require("../domain_layer/repo/Repo");
const BackendService = require("meta3d-backend-4everland");
const Curry_1 = require("meta3d-fp/src/Curry");
let init = (_env) => {
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
let _parseMarketCollectionDataBody = (onDownloadProgressFunc, returnDataType, allCollectionData) => {
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
let getMarketProtocolCollection = (collectionName) => BackendService.getMarketProtocolCollection((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseMarketCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName);
exports.getMarketProtocolCollection = getMarketProtocolCollection;
let getMarketImplementCollection = (collectionName) => BackendService.getMarketImplementCollection((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseMarketCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName);
exports.getMarketImplementCollection = getMarketImplementCollection;
let getMarketImplement = (collectionName, account, name, version) => {
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
exports.getMarketImplement = getMarketImplement;
exports.getDataFromMarketProtocolCollection = BackendService.getDataFromMarketProtocolCollection;
exports.mapMarketImplementCollection = BackendService.mapMarketImplementCollection;
exports.getAccountFromMarketImplementCollectionData = BackendService.getAccountFromMarketImplementCollectionData;
exports.getFileDataFromMarketImplementCollectionData = BackendService.getFileDataFromMarketImplementCollectionData;
let downloadFile = (onDownloadProgressFunc, fileID) => BackendService.downloadFile((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseMarketCollectionDataBody)(onDownloadProgressFunc), fileID);
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
    return BackendService.getMarketProtocolCollection((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseMarketCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName).then(oldCollectionData => {
        return BackendService.updateMarketImplementData((0, Repo_1.getBackend)(), collectionName, key, updateData, oldCollectionData);
    });
};
exports.updateData = updateData;
let addData = (collectionName, key, data) => {
    return BackendService.getMarketProtocolCollection((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseMarketCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName).then(allCollectionData => {
        return BackendService.addDataToMarketProtocolCollection((0, Repo_1.getBackend)(), BackendService.addMarketProtocolDataToDataFromMarketProtocolCollectionData, collectionName, key, allCollectionData, data);
    });
};
exports.addData = addData;
let _getObjectWithJsonBody = (collectionName, key) => {
    return (0, Repo_1.getBackend)().getObject({
        Bucket: collectionName,
        Key: key
    })
        .then(data => _parseMarketCollectionDataBody(_onDownloadProgressFuncForJson, "json", data));
};
let getDataByKey = (collectionName, key) => {
    return _getObjectWithJsonBody(collectionName, key)
        .then((body) => {
        console.log("getDataByKey:", key, body);
        return body;
    });
};
exports.getDataByKey = getDataByKey;
let getDataByKeyContain = (collectionName, values) => {
    return (0, most_1.fromPromise)((0, Repo_1.getBackend)().listObjects({
        Bucket: collectionName
    }).then(data => {
        if (data.Contents === undefined) {
            return [];
        }
        return data.Contents.filter(({ Key }) => {
            return values.reduce((result, value) => {
                if (!result) {
                    return result;
                }
                return Key.includes(value);
            }, true);
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
let getMarketImplementAccountData = (collectionName, account) => BackendService.getMarketImplementAccountData((0, Repo_1.getBackend)(), (0, Curry_1.curry3_1)(_parseMarketCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName, account);
exports.getMarketImplementAccountData = getMarketImplementAccountData;
let updateMarketImplementData = (collectionName, account, updateData, oldMarketImplementCollectionData) => BackendService.updateMarketImplementData((0, Repo_1.getBackend)(), collectionName, account, updateData, oldMarketImplementCollectionData);
exports.updateMarketImplementData = updateMarketImplementData;
exports.getDataFromMarketImplementAccountData = BackendService.getDataFromMarketImplementAccountData;
exports.isContain = BackendService.isContain;
exports.buildMarketImplementAccountData = BackendService.buildMarketImplementAccountData;
exports.addMarketImplementDataToDataFromMarketImplementCollectionData = BackendService.addMarketImplementDataToDataFromMarketImplementCollectionData;
let getData = (collectionName) => {
    return (0, most_1.fromPromise)((0, Repo_1.getBackend)().listObjects({
        Bucket: collectionName
    }).then(data => {
        if (data.Contents === undefined) {
            return [];
        }
        // return data.Contents.filter(({ Key }) => {
        //     return Key.includes(value)
        // })
        return data.Contents;
    })).flatMap(data => {
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(data.map(({ Key }) => {
            return (0, most_1.fromPromise)(_getObjectWithJsonBody(collectionName, Key)).map(d => d[0]);
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
};
exports.getData = getData;
