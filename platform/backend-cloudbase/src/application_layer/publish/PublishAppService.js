"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPublishApps = exports.findPublishApp = exports.publish = void 0;
// import { loadApp } from "meta3d"
const CloudbaseService_1 = require("../cloudbase/CloudbaseService");
const most_1 = require("most");
let _buildFileName = (appName, username) => username + "_" + appName;
let publish = (appBinaryFile, appName, username) => {
    // TODO use message instead of log?
    return (0, CloudbaseService_1.uploadFile)(console.log, "apps/" + _buildFileName(appName, username) + ".arrayBuffer", appBinaryFile, _buildFileName(appName, username)).concatMap((fileID) => {
        return (0, most_1.fromPromise)((0, CloudbaseService_1.getDatabase)().collection("publishedApps").where({ username, appName }).get().then(res => {
            if (res.data.length == 0) {
                return (0, CloudbaseService_1.getDatabase)().collection("publishedApps")
                    .add({
                    username,
                    appName,
                    fileID
                });
            }
        }));
    });
};
exports.publish = publish;
// export let enterApp = (appBinaryFile: ArrayBuffer) => {
// 	// TODO open new url with ?username, appName
// 	// let _meta3DState = loadApp(_findAppBinaryFile(username, appName))
// 	let _meta3DState = loadApp(appBinaryFile)
// }
let findPublishApp = (username, appName) => {
    return (0, most_1.fromPromise)((0, CloudbaseService_1.getDatabase)().collection("publishedApps").where({ username, appName }).get()).flatMap((res) => {
        if (res.data.length === 0) {
            return (0, most_1.just)(null);
        }
        return (0, CloudbaseService_1.getFile)(res.data[0].fileID);
    });
};
exports.findPublishApp = findPublishApp;
let findAllPublishApps = (username) => {
    // let result = null
    return (0, most_1.fromPromise)((0, CloudbaseService_1.getDatabase)().collection("publishedApps").where({ username }).get()).flatMap((res) => {
        if (res.data.length === 0) {
            return (0, most_1.just)([]);
        }
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(res.data.map(({ username, appName, fileID }) => {
            return (0, CloudbaseService_1.getFile)(fileID).map(appBinaryFile => {
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
    // .observe(allPublishApps => {
    // 	result = allPublishApps
    // }).then(() => result)
};
exports.findAllPublishApps = findAllPublishApps;
