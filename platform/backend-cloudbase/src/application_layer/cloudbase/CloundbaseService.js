"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addData = exports.getData = exports.getFile = exports.uploadFile = exports.notHasData = exports.hasData = exports.getDatabase = exports.init = void 0;
const js_sdk_1 = require("@cloudbase/js-sdk");
const most_1 = require("most");
const CloundbaseRepo_1 = require("../../domain_layer/repo/CloundbaseRepo");
// TODO invoke domain service instead of repo
exports.init = () => {
    let app = js_sdk_1.default.init({
        env: "meta3d-4g18u7z10c8427f9" // 此处填入您的环境ID
    });
    CloundbaseRepo_1.setEditor(app);
    return most_1.fromPromise(app.auth()
        .anonymousAuthProvider()
        .signIn());
};
exports.getDatabase = () => {
    return CloundbaseRepo_1.getEditor().database();
};
exports.hasData = (collectionName, data) => {
    return most_1.fromPromise(exports.getDatabase().collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length > 0));
};
exports.notHasData = (collectionName, data) => {
    return most_1.fromPromise(exports.getDatabase().collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0));
};
let _blobToFile = (theBlob, fileName) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
};
let _arrayBufferToBlob = (arrayBuffer) => {
    return new Blob([arrayBuffer]);
};
exports.uploadFile = (onUploadProgressFunc, cloudPath, arrayBuffer, fileName) => {
    return most_1.fromPromise(CloundbaseRepo_1.getEditor().uploadFile({
        cloudPath,
        filePath: _blobToFile(_arrayBufferToBlob(arrayBuffer), fileName),
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgressFunc(percentCompleted);
        }
    }).then(({ fileID }) => fileID));
};
exports.getFile = (fileID) => {
    return most_1.fromPromise(CloundbaseRepo_1.getEditor().getTempFileURL({
        fileList: [fileID]
    })).flatMap(({ fileList }) => {
        return most_1.fromPromise(fetch(fileList[0].tempFileURL).then(response => response.arrayBuffer()));
    });
};
exports.getData = (collectionName, data) => {
    return exports.getDatabase().collection(collectionName)
        .where(data)
        .get();
};
exports.addData = (collectionName, data) => {
    return exports.getDatabase().collection(collectionName)
        .add(data);
};
