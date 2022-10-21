"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addData = exports.getDatabase = exports.init = void 0;
const js_sdk_1 = require("@cloudbase/js-sdk");
const most_1 = require("most");
const Repo_1 = require("../domain_layer/repo/Repo");
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
// export let hasData = (collectionName: string, data: object) => {
// 	return fromPromise(getDatabase().collection(collectionName)
// 		.where(data)
// 		.get()
// 		.then(res => res.data.length > 0))
// }
// export let notHasData = (collectionName: string, data: object) => {
// 	return fromPromise(getDatabase().collection(collectionName)
// 		.where(data)
// 		.get()
// 		.then(res => res.data.length === 0))
// }
// let _blobToFile = (theBlob, fileName) => {
// 	theBlob.lastModifiedDate = new Date();
// 	theBlob.name = fileName;
// 	return theBlob;
// }
// let _arrayBufferToBlob = (arrayBuffer) => {
// 	return new Blob([arrayBuffer]);
// }
// export let uploadFile = (onUploadProgressFunc, cloudPath: string, arrayBuffer: ArrayBuffer, fileName: string): Stream<string> => {
// 	return fromPromise(getBackend().uploadFile({
// 		cloudPath,
// 		filePath: _blobToFile(_arrayBufferToBlob(arrayBuffer), fileName),
// 		onUploadProgress: function (progressEvent) {
// 			var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
// 			onUploadProgressFunc(percentCompleted)
// 		}
// 	}).then(({ fileID }) => fileID))
// }
// export let getFile = (fileID: string) => {
// 	return fromPromise(getBackend().getTempFileURL({
// 		fileList: [fileID]
// 	})).flatMap(({ fileList }) => {
// 		return fromPromise(fetch(fileList[0].tempFileURL).then(response => response.arrayBuffer()))
// 	})
// }
// export let getCollection = (collectionName: string) => {
// 	return getDatabase().collection(collectionName).get()
// }
// export let getData = (collectionName: string, data: any) => {
// 	return getDatabase().collection(collectionName)
// 		.where(data)
// 		.get()
// }
let addData = (collectionName, key, data) => {
    return (0, exports.getDatabase)().collection(collectionName)
        .add(Object.assign(Object.assign({}, data), { key: key }));
};
exports.addData = addData;
// export let updateData = (collectionName: string, whereData: any, updateData: any) => {
// 	return getDatabase().collection(collectionName)
// 		.where(whereData)
// 		.update(updateData)
// }
