"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = exports.addData = exports.getData = exports.getCollection = exports.getFile = exports.uploadFile = exports.notHasData = exports.hasData = exports.getDatabase = exports.init = void 0;
const js_sdk_1 = require("@cloudbase/js-sdk");
const most_1 = require("most");
const CloundbaseRepo_1 = require("../../domain_layer/repo/CloundbaseRepo");
// TODO invoke domain service instead of repo
let init = () => {
    let app = js_sdk_1.default.init({
        env: "meta3d-4g18u7z10c8427f9" // 此处填入您的环境ID
    });
    (0, CloundbaseRepo_1.setEditor)(app);
    return (0, most_1.fromPromise)(app.auth()
        .anonymousAuthProvider()
        .signIn());
};
exports.init = init;
let getDatabase = () => {
    return (0, CloundbaseRepo_1.getEditor)().database();
};
exports.getDatabase = getDatabase;
let hasData = (collectionName, data) => {
    return (0, most_1.fromPromise)((0, exports.getDatabase)().collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length > 0));
};
exports.hasData = hasData;
let notHasData = (collectionName, data) => {
    return (0, most_1.fromPromise)((0, exports.getDatabase)().collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0));
};
exports.notHasData = notHasData;
let _blobToFile = (theBlob, fileName) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
};
let _arrayBufferToBlob = (arrayBuffer) => {
    return new Blob([arrayBuffer]);
};
let uploadFile = (onUploadProgressFunc, cloudPath, arrayBuffer, fileName) => {
    return (0, most_1.fromPromise)((0, CloundbaseRepo_1.getEditor)().uploadFile({
        cloudPath,
        filePath: _blobToFile(_arrayBufferToBlob(arrayBuffer), fileName),
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgressFunc(percentCompleted);
        }
    }).then(({ fileID }) => fileID));
};
exports.uploadFile = uploadFile;
let getFile = (fileID) => {
    return (0, most_1.fromPromise)((0, CloundbaseRepo_1.getEditor)().getTempFileURL({
        fileList: [fileID]
    })).flatMap(({ fileList }) => {
        return (0, most_1.fromPromise)(fetch(fileList[0].tempFileURL).then(response => response.arrayBuffer()));
    });
};
exports.getFile = getFile;
let getCollection = (collectionName) => {
    return (0, exports.getDatabase)().collection(collectionName).get();
};
exports.getCollection = getCollection;
let getData = (collectionName, data) => {
    return (0, exports.getDatabase)().collection(collectionName)
        .where(data)
        .get();
};
exports.getData = getData;
let addData = (collectionName, data) => {
    return (0, exports.getDatabase)().collection(collectionName)
        .add(data);
};
exports.addData = addData;
let updateData = (collectionName, whereData, updateData) => {
    return (0, exports.getDatabase)().collection(collectionName)
        .where(whereData)
        .update(updateData);
};
exports.updateData = updateData;
