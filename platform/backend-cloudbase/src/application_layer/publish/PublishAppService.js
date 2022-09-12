"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPublishApps = exports.findPublishApp = exports.publish = void 0;
const most_1 = require("most");
let _buildFileName = (appName, username) => username + "_" + appName;
let publish = ([onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc], appBinaryFile, appName, username) => {
    return hasDataFunc("publishedApps", { username, appName }).concatMap((isExist) => {
        return uploadFileFunc(onUploadProgressFunc, "apps/" + _buildFileName(appName, username) + ".arrayBuffer", appBinaryFile, _buildFileName(appName, username)).concatMap((fileID) => {
            if (isExist) {
                return (0, most_1.fromPromise)(updateDataFunc("publishedApps", { username, appName }, {
                    username,
                    appName,
                    fileID
                }));
            }
            return (0, most_1.fromPromise)(addDataFunc("publishedApps", {
                username,
                appName,
                fileID
            }));
        });
    });
};
exports.publish = publish;
// export let enterApp = (appBinaryFile: ArrayBuffer) => {
// 	// TODO open new url with ?username, appName
// 	// let _meta3DState = loadApp(_findAppBinaryFile(username, appName))
// 	let _meta3DState = loadApp(appBinaryFile)
// }
let findPublishApp = ([getDataFunc, getFileFunc], username, appName) => {
    return (0, most_1.fromPromise)(getDataFunc("publishedApps", { username, appName })).flatMap((res) => {
        if (res.data.length === 0) {
            return (0, most_1.just)(null);
        }
        return getFileFunc(res.data[0].fileID);
    });
};
exports.findPublishApp = findPublishApp;
let findAllPublishApps = ([getDataFunc, getFileFunc], username) => {
    return (0, most_1.fromPromise)(getDataFunc("publishedApps", { username })).flatMap((res) => {
        if (res.data.length === 0) {
            return (0, most_1.just)([]);
        }
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(res.data.map(({ username, appName, fileID }) => {
            return getFileFunc(fileID).map(appBinaryFile => {
                return {
                    username,
                    appName,
                    appBinaryFile
                };
            });
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
};
exports.findAllPublishApps = findAllPublishApps;
