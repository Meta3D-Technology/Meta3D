"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addShopImplementDataToDataFromShopImplementCollectionData = exports.buildShopImplementAccountData = exports.isContain = exports.getDataFromShopImplementAccountData = exports.updateShopImplementData = exports.getShopImplementAccountData = exports.getFileID = exports.hasData = exports.getDataByKey = exports.addData = exports.updateData = exports.uploadFile = exports.getFile = exports.getFileDataFromShopImplementCollectionData = exports.getAccountFromShopImplementCollectionData = exports.mapShopImplementCollection = exports.getDataFromShopProtocolCollection = exports.getShopImplementCollection = exports.getShopProtocolCollection = exports.hasAccount = exports.handleLogin = exports.getDatabase = exports.init = void 0;
const js_sdk_1 = require("@cloudbase/js-sdk");
const most_1 = require("most");
const Repo_1 = require("../domain_layer/repo/Repo");
const BackendService = require("meta3d-backend-cloudbase");
let init = () => {
    let app = js_sdk_1.default.init({
        env: "meta3d-4g18u7z10c8427f9" // 此处填入您的环境ID
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
// let _checkUserName = (account: string) => {
// 	return notHasData("user", { key: account })
// }
// export let handleLogin = (account: string) => {
// 	return _checkUserName(account).flatMap((isNotHasData: boolean) => {
// 		if (isNotHasData) {
// 			return fromPromise(
// 				addData("user", account, {})
// 			).concat(fromPromise(
// 				addData("publishedextensions", account, {
// 					fileData: []
// 				})
// 			)).concat(fromPromise(
// 				addData("publishedcontributes", account, {
// 					fileData: []
// 				})
// 			)).concat(fromPromise(
// 				addData("publishedelementassembledata", account, {
// 					fileData: []
// 				})
// 			)).concat(fromPromise(
// 				addData("publishedskinassembledata", account, {
// 					fileData: []
// 				})
// 			))
// 		}
// 		return just(account)
// 	})
// }
// export let notHasData = (collectionName: string, data: object) => {
// 	return fromPromise(getDatabase().collection(collectionName)
// 		.where(data)
// 		.get()
// 		.then(res => res.data.length === 0))
// }
// export let handleLogin = curry2(BackendService.handleLogin)(getBackend())
// export let getFile = (fileID: string) => {
// 	return fromPromise(getBackend().getTempFileURL({
// 		fileList: [fileID]
// 	})).flatMap(({ fileList }) => {
// 		return fromPromise(fetch(fileList[0].tempFileURL).then(response => response.arrayBuffer()))
// 	})
// }
// export let getShopData = (collectionName: string, data: any) => {
// 	return getDatabase().collection(collectionName)
// 		.where(data)
// 		.get()
// }
// export let getShopProtocolCollection = curry2(BackendService.getShopProtocolCollection)(getBackend())
// export let addData = curry4_1(BackendService.addData)(getBackend())
// export let hasAccount = curry3_1(BackendService.hasAccount)(getBackend())
// export let updateData = (collectionName: string, whereData: any, updateData: any) => {
// 	return getDatabase().collection(collectionName)
// 		.where(whereData)
// 		.update(updateData)
// }
let handleLogin = (account) => BackendService.handleLogin((0, Repo_1.getBackend)(), account);
exports.handleLogin = handleLogin;
// export let addData = (addDataToBody, collectionName, key, collectionData, data) => BackendService.addData(getBackend(), addDataToBody, collectionName, key, collectionData, data)
let hasAccount = (collectionName, account) => BackendService.hasAccount((0, Repo_1.getBackend)(), collectionName, account);
exports.hasAccount = hasAccount;
let getShopProtocolCollection = (collectionName) => BackendService.getShopProtocolCollection((0, Repo_1.getBackend)(), null, collectionName);
exports.getShopProtocolCollection = getShopProtocolCollection;
let getShopImplementCollection = (collectionName) => BackendService.getShopImplementCollection((0, Repo_1.getBackend)(), null, collectionName);
exports.getShopImplementCollection = getShopImplementCollection;
exports.getDataFromShopProtocolCollection = BackendService.getDataFromShopProtocolCollection;
exports.mapShopImplementCollection = BackendService.mapShopImplementCollection;
exports.getAccountFromShopImplementCollectionData = BackendService.getAccountFromShopImplementCollectionData;
exports.getFileDataFromShopImplementCollectionData = BackendService.getFileDataFromShopImplementCollectionData;
let getFile = (fileID) => BackendService.getFile((0, Repo_1.getBackend)(), null, fileID);
exports.getFile = getFile;
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
