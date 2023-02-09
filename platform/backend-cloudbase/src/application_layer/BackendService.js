"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.getDataByKeyContain = exports.addMarketImplementDataToDataFromMarketImplementCollectionData = exports.buildMarketImplementAccountData = exports.isContain = exports.getDataFromMarketImplementAccountData = exports.updateMarketImplementData = exports.getMarketImplementAccountData = exports.getFileID = exports.hasData = exports.getDataByKey = exports.addData = exports.updateData = exports.uploadFile = exports.downloadFile = exports.getFileDataFromMarketImplementCollectionData = exports.getAccountFromMarketImplementCollectionData = exports.mapMarketImplementCollection = exports.getDataFromMarketProtocolCollection = exports.getMarketImplement = exports.getMarketImplementCollection = exports.getMarketProtocolCollection = exports.hasAccount = exports.registerUser = exports.handleLoginForWeb3 = exports.checkUserName = exports.getDatabase = exports.init = void 0;
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
let checkUserName = (account) => BackendService.checkUserName((0, Repo_1.getBackend)(), account);
exports.checkUserName = checkUserName;
let handleLoginForWeb3 = (account) => BackendService.handleLoginForWeb3((0, Repo_1.getBackend)(), account);
exports.handleLoginForWeb3 = handleLoginForWeb3;
let registerUser = (account) => BackendService.registerUser((0, Repo_1.getBackend)(), account);
exports.registerUser = registerUser;
let hasAccount = (collectionName, account) => BackendService.hasAccount((0, Repo_1.getBackend)(), collectionName, account);
exports.hasAccount = hasAccount;
let getMarketProtocolCollection = (collectionName) => BackendService.getMarketProtocolCollection((0, Repo_1.getBackend)(), null, collectionName);
exports.getMarketProtocolCollection = getMarketProtocolCollection;
let getMarketImplementCollection = (collectionName) => BackendService.getMarketImplementCollection((0, Repo_1.getBackend)(), null, collectionName);
exports.getMarketImplementCollection = getMarketImplementCollection;
let getMarketImplement = (collectionName, account, name, version) => {
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
exports.getMarketImplement = getMarketImplement;
exports.getDataFromMarketProtocolCollection = BackendService.getDataFromMarketProtocolCollection;
exports.mapMarketImplementCollection = BackendService.mapMarketImplementCollection;
exports.getAccountFromMarketImplementCollectionData = BackendService.getAccountFromMarketImplementCollectionData;
exports.getFileDataFromMarketImplementCollectionData = BackendService.getFileDataFromMarketImplementCollectionData;
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
let updateData = (collectionName, key, updateData) => BackendService.updateMarketImplementData((0, Repo_1.getBackend)(), collectionName, key, updateData, null);
exports.updateData = updateData;
let addData = (collectionName, key, data) => BackendService.addDataToMarketProtocolCollection((0, Repo_1.getBackend)(), null, collectionName, key, null, data);
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
let getMarketImplementAccountData = (collectionName, account) => BackendService.getMarketImplementAccountData((0, Repo_1.getBackend)(), null, collectionName, account);
exports.getMarketImplementAccountData = getMarketImplementAccountData;
let updateMarketImplementData = (collectionName, account, updateData, oldMarketImplementCollectionData) => BackendService.updateMarketImplementData((0, Repo_1.getBackend)(), collectionName, account, updateData, oldMarketImplementCollectionData);
exports.updateMarketImplementData = updateMarketImplementData;
exports.getDataFromMarketImplementAccountData = BackendService.getDataFromMarketImplementAccountData;
exports.isContain = BackendService.isContain;
exports.buildMarketImplementAccountData = BackendService.buildMarketImplementAccountData;
exports.addMarketImplementDataToDataFromMarketImplementCollectionData = BackendService.addMarketImplementDataToDataFromMarketImplementCollectionData;
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
// export let getPackageMarketEntryExtensionProtocolCollection = () => getMarketProtocolCollection("publishedpackages")
// export let getPackageMarketEntryExtensionProtocolCollection = () => getData("publishedpackages")
// export let getDataFromPackageMarketEntryExtensionProtocolCollection = getDataFromMarketProtocolCollection
