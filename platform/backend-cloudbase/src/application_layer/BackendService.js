"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.getDataByKeyContain = exports.addShopImplementDataToDataFromShopImplementCollectionData = exports.buildShopImplementAccountData = exports.isContain = exports.getDataFromShopImplementAccountData = exports.updateShopImplementData = exports.getShopImplementAccountData = exports.getFileID = exports.hasData = exports.getDataByKey = exports.addData = exports.updateData = exports.uploadFile = exports.downloadFile = exports.getFileDataFromShopImplementCollectionData = exports.getAccountFromShopImplementCollectionData = exports.mapShopImplementCollection = exports.getDataFromShopProtocolCollection = exports.getShopImplement = exports.getShopImplementCollection = exports.getShopProtocolCollection = exports.hasAccount = exports.handleLogin = exports.getDatabase = exports.init = void 0;
const js_sdk_1 = require("@cloudbase/js-sdk");
const most_1 = require("most");
const Repo_1 = require("../domain_layer/repo/Repo");
const BackendService = require("meta3d-backend-cloudbase");
let init = (env) => {
    let app = js_sdk_1.default.init({
        env: env // 此处填入您的环境ID
    });
    (0, Repo_1.setBackend)(app);
    return (0, most_1.fromPromise)(app.auth()
        .anonymousAuthProvider()
        .signIn());
};
exports.init = init;
let getDatabase = () => {
    return (0, Repo_1.getBackend)().database();
};
exports.getDatabase = getDatabase;
let handleLogin = (account) => BackendService.handleLogin((0, Repo_1.getBackend)(), account);
exports.handleLogin = handleLogin;
let hasAccount = (collectionName, account) => BackendService.hasAccount((0, Repo_1.getBackend)(), collectionName, account);
exports.hasAccount = hasAccount;
let getShopProtocolCollection = (collectionName) => BackendService.getShopProtocolCollection((0, Repo_1.getBackend)(), null, collectionName);
exports.getShopProtocolCollection = getShopProtocolCollection;
let getShopImplementCollection = (collectionName) => BackendService.getShopImplementCollection((0, Repo_1.getBackend)(), null, collectionName);
exports.getShopImplementCollection = getShopImplementCollection;
let getShopImplement = (collectionName, account, name, version) => {
    return (0, exports.getDatabase)()
        .collection(collectionName)
        .where({ key: BackendService.handleKeyToLowercase(account) })
        .get()
        .then(res => {
        if (res.data.length === 0) {
            return null;
        }
        let { fileData } = res.data[0];
        let result = fileData.find((data) => data.name === name && data.version === version);
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
let downloadFile = (onDownloadProgressFunc, fileID) => {
    // TODO support onDownloadProgressFunc
    onDownloadProgressFunc(0);
    return BackendService.downloadFile((0, Repo_1.getBackend)(), null, fileID);
};
exports.downloadFile = downloadFile;
let _blobToFile = (theBlob, fileName) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
};
let _arrayBufferToBlob = (arrayBuffer) => {
    return new Blob([arrayBuffer]);
};
let uploadFile = (onUploadProgressFunc, filePath, fileContent, fileName) => {
    return (0, most_1.fromPromise)((0, Repo_1.getBackend)().uploadFile({
        cloudPath: filePath,
        filePath: _blobToFile(_arrayBufferToBlob(fileContent), fileName),
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgressFunc(percentCompleted);
        }
    }));
    // .then(({ fileID }) => fileID))
};
exports.uploadFile = uploadFile;
let updateData = (collectionName, key, updateData) => BackendService.updateShopImplementData((0, Repo_1.getBackend)(), collectionName, key, updateData, null);
exports.updateData = updateData;
let addData = (collectionName, key, data) => BackendService.addDataToShopProtocolCollection((0, Repo_1.getBackend)(), null, collectionName, key, null, data);
exports.addData = addData;
let getDataByKey = (collectionName, key) => {
    return (0, exports.getDatabase)().collection(collectionName)
        .where({ key: BackendService.handleKeyToLowercase(key) })
        .get()
        .then(res => res.data);
};
exports.getDataByKey = getDataByKey;
let hasData = (collectionName, key) => BackendService.hasData((0, Repo_1.getBackend)(), collectionName, key);
exports.hasData = hasData;
exports.getFileID = BackendService.getFileID;
let getShopImplementAccountData = (collectionName, account) => BackendService.getShopImplementAccountData((0, Repo_1.getBackend)(), null, collectionName, account);
exports.getShopImplementAccountData = getShopImplementAccountData;
let updateShopImplementData = (collectionName, account, updateData, oldShopImplementCollectionData) => BackendService.updateShopImplementData((0, Repo_1.getBackend)(), collectionName, account, updateData, oldShopImplementCollectionData);
exports.updateShopImplementData = updateShopImplementData;
exports.getDataFromShopImplementAccountData = BackendService.getDataFromShopImplementAccountData;
exports.isContain = BackendService.isContain;
exports.buildShopImplementAccountData = BackendService.buildShopImplementAccountData;
exports.addShopImplementDataToDataFromShopImplementCollectionData = BackendService.addShopImplementDataToDataFromShopImplementCollectionData;
let getDataByKeyContain = (collectionName, values) => {
    return (0, most_1.fromPromise)((0, exports.getDatabase)().collection(collectionName)
        .get()
        .then(res => res.data.filter(({ key }) => {
        return values.reduce((result, value) => {
            if (!result) {
                return result;
            }
            return key.includes(value);
        }, true);
    })));
};
exports.getDataByKeyContain = getDataByKeyContain;
let getData = (collectionName) => {
    return (0, exports.getDatabase)().collection(collectionName)
        .get()
        .then(res => res.data);
};
exports.getData = getData;
// export let getPackageShopEntryExtensionProtocolCollection = () => getShopProtocolCollection("publishedpackages")
// export let getPackageShopEntryExtensionProtocolCollection = () => getData("publishedpackages")
// export let getDataFromPackageShopEntryExtensionProtocolCollection = getDataFromShopProtocolCollection
