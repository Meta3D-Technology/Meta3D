"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllRecommendPublishFinalApps = exports.findAllPublishFinalApps = exports.findAllPublishFinalAppsByAccount = exports.findPublishFinalApp = exports.publish = exports._buildKey = void 0;
const most_1 = require("most");
const Main_1 = require("meta3d-backend-cloudbase/src/Main");
let _buildFileName = (appName, account) => account + "_" + appName;
let _buildKey = (appName, account) => (0, Main_1.handleKeyToLowercase)(_buildFileName(appName, account));
exports._buildKey = _buildKey;
let publish = ([onUploadProgressFunc, uploadFileFunc, deleteFileFunc, getDataByKeyFunc, addDataFunc, updateDataFunc, getFileIDFunc], sceneGLB, appName, account, description, previewBase64, 
// useCount: number,
isRecommend) => {
    let key = (0, exports._buildKey)(appName, account);
    return (0, most_1.fromPromise)(getDataByKeyFunc("publishedfinalapps", key)).concatMap((data) => {
        let fileName = _buildFileName(appName, account);
        let filePath = "finalapps/" + fileName + ".arrayBuffer";
        let isExist = false;
        let stream = null;
        if (data.length > 1) {
            throw new Error("count shouldn't > 1");
        }
        if (data.length == 1) {
            isExist = true;
            stream = deleteFileFunc(data[0].fileID);
        }
        else {
            isExist = false;
            stream = (0, most_1.just)(null);
        }
        return stream.concatMap(_ => {
            return uploadFileFunc(onUploadProgressFunc, filePath, sceneGLB, fileName);
        }).concatMap((uploadData) => {
            let fileID = getFileIDFunc(uploadData, filePath);
            if (isExist) {
                return (0, most_1.fromPromise)(updateDataFunc("publishedfinalapps", key, {
                    account,
                    appName,
                    description,
                    previewBase64,
                    // useCount,
                    isRecommend,
                    fileID
                }));
            }
            return (0, most_1.fromPromise)(addDataFunc("publishedfinalapps", key, {
                account,
                appName,
                description,
                previewBase64,
                // useCount,
                isRecommend,
                fileID
            }));
        });
    });
};
exports.publish = publish;
// export let enterFinalApp = (sceneGLB: ArrayBuffer) => {
// 	// TODO open new url with ?account, appName
// 	// let _meta3DState = loadFinalApp(_findFinalAppBinaryFile(account, appName))
// 	let _meta3DState = loadFinalApp(sceneGLB)
// }
let findPublishFinalApp = ([getDataByKeyFunc, downloadFileFunc], account, appName, notUseCacheForFindFinalApp) => {
    return (0, most_1.fromPromise)(getDataByKeyFunc("publishedfinalapps", (0, exports._buildKey)(appName, account))).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)(null);
        }
        return downloadFileFunc(data[0].fileID, notUseCacheForFindFinalApp);
    });
};
exports.findPublishFinalApp = findPublishFinalApp;
let findAllPublishFinalAppsByAccount = (getDataWithWhereDataFunc, account) => {
    return (0, most_1.fromPromise)(getDataWithWhereDataFunc("publishedfinalapps", { account: account })).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)([]);
        }
        // return just(data.map(({ account, appName, description }) => {
        //     return {
        //         account,
        //         appName,
        //         description
        //     }
        // }))
        return (0, most_1.just)(data);
    });
};
exports.findAllPublishFinalAppsByAccount = findAllPublishFinalAppsByAccount;
let findAllPublishFinalApps = (getDataFunc, limitCount, skipCount) => {
    return (0, most_1.fromPromise)(getDataFunc("publishedfinalapps", limitCount, skipCount)).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)([]);
        }
        // return just(data.map(({ account, appName, description }) => {
        //     return {
        //         account,
        //         appName,
        //         description
        //     }
        // }))
        return (0, most_1.just)(data);
    });
};
exports.findAllPublishFinalApps = findAllPublishFinalApps;
let findAllRecommendPublishFinalApps = (getDataWithWhereDataFunc) => {
    return (0, most_1.fromPromise)(getDataWithWhereDataFunc("publishedfinalapps", { isRecommend: true })).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)([]);
        }
        return (0, most_1.just)(data);
    });
};
exports.findAllRecommendPublishFinalApps = findAllRecommendPublishFinalApps;
//# sourceMappingURL=PublishFinalAppService.js.map