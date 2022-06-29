"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPublishEditors = exports.findPublishEditor = exports.enterEditor = exports.publishEditor = void 0;
const meta3d_1 = require("meta3d");
const most_1 = require("most");
const CloundbaseService_1 = require("../cloudbase/CloundbaseService");
let _buildFileName = (editorName, username) => username + "_" + editorName;
exports.publishEditor = (editorBinaryFile, editorName, username) => {
    // TODO use message instead of log?
    return CloundbaseService_1.uploadFile(console.log, "editors/" + _buildFileName(editorName, username) + ".arrayBuffer", editorBinaryFile, _buildFileName(editorName, username)).concatMap((fileID) => {
        return most_1.fromPromise(CloundbaseService_1.getDatabase().collection("publishedEditors").where({ username, editorName }).get().then(res => {
            if (res.data.length == 0) {
                return CloundbaseService_1.getDatabase().collection("publishedEditors")
                    .add({
                    username,
                    editorName,
                    fileID
                });
            }
            // return getDatabase().collection("publishedEditors").where({ username, editorName }).update({ fileID })
        }));
    });
};
exports.enterEditor = (editorBinaryFile) => {
    // TODO open new url with ?username, editorName
    // let _meta3DState = loadApp(_findEditorBinaryFile(username, editorName))
    let _meta3DState = meta3d_1.loadApp(editorBinaryFile);
};
exports.findPublishEditor = (username, editorName) => {
    return most_1.fromPromise(CloundbaseService_1.getDatabase().collection("publishedEditors").where({ username, editorName }).get()).flatMap((res) => {
        if (res.data.length === 0) {
            return most_1.just(null);
        }
        return CloundbaseService_1.getFile(res.data[0].fileID);
    });
};
exports.findAllPublishEditors = (username) => {
    // let result = null
    return most_1.fromPromise(CloundbaseService_1.getDatabase().collection("publishedEditors").where({ username }).get()).flatMap((res) => {
        if (res.data.length === 0) {
            return most_1.just([]);
        }
        return most_1.fromPromise(most_1.mergeArray(res.data.map(({ username, editorName, fileID }) => {
            return CloundbaseService_1.getFile(fileID).map(editorBinaryFile => {
                return {
                    username,
                    editorName,
                    editorBinaryFile
                };
            });
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
    // .observe(allPublishEditors => {
    // 	result = allPublishEditors
    // }).then(() => result)
};
