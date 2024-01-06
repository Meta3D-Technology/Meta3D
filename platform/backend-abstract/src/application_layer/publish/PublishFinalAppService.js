"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllRecommendPublishFinalApps = exports.findAllPublishFinalApps = exports.findAllPublishFinalAppsByAccount = exports.findPublishFinalApp = exports.publish = exports._buildKey = void 0;
const most_1 = require("most");
const Main_1 = require("meta3d-backend-cloudbase/src/Main");
let _buildFileName = (finalAppName, account, type) => account + "_" + finalAppName + "_" + type;
let _buildKey = (finalAppName, account) => (0, Main_1.handleKeyToLowercase)(finalAppName + "_" + account);
exports._buildKey = _buildKey;
let publish = ([onUploadProgressFunc, uploadFileFunc, deleteFileFunc, getDataByKeyFunc, addDataFunc, updateDataFunc, getFileIDFunc], contentBinaryFile, singleEventBinaryFile, finalAppName, account, description, previewBase64, 
// useCount: number,
isRecommend) => {
    let key = (0, exports._buildKey)(finalAppName, account);
    return (0, most_1.fromPromise)(getDataByKeyFunc("publishedfinalapps", key)).concatMap((data) => {
        let contentFileName = _buildFileName(finalAppName, account, "content");
        let contentFilePath = "finalapps/" + contentFileName + ".arrayBuffer";
        let singleEventFileName = _buildFileName(finalAppName, account, "singleEvent");
        let singleEventFilePath = "finalapps/" + singleEventFileName + ".arrayBuffer";
        let isExist = false;
        let stream1 = null;
        let stream2 = null;
        if (data.length > 1) {
            throw new Error("count shouldn't > 1");
        }
        if (data.length == 1) {
            isExist = true;
            stream1 = deleteFileFunc(data[0].contentFileID);
            stream2 = deleteFileFunc(data[0].singleEventFileID);
        }
        else {
            isExist = false;
            stream1 = (0, most_1.just)(null);
            stream2 = (0, most_1.just)(null);
        }
        return stream1.concatMap(_ => {
            return uploadFileFunc(onUploadProgressFunc, contentFilePath, contentBinaryFile, contentFileName);
        }).concatMap((uploadData) => {
            let contentFileID = getFileIDFunc(uploadData, contentFilePath);
            return stream2.concatMap(_ => {
                return uploadFileFunc(onUploadProgressFunc, singleEventFilePath, singleEventBinaryFile, singleEventFileName);
            }).concatMap((uploadData) => {
                return (0, most_1.just)([
                    contentFileID,
                    getFileIDFunc(uploadData, singleEventFilePath)
                ]);
            });
        }).concatMap(([contentFileID, singleEventFileID]) => {
            if (isExist) {
                return (0, most_1.fromPromise)(updateDataFunc("publishedfinalapps", key, {
                    account,
                    finalAppName,
                    description,
                    previewBase64,
                    // useCount,
                    isRecommend,
                    contentFileID, singleEventFileID
                }));
            }
            return (0, most_1.fromPromise)(addDataFunc("publishedfinalapps", key, {
                account,
                finalAppName,
                description,
                previewBase64,
                // useCount,
                isRecommend,
                contentFileID, singleEventFileID
            }));
        });
    });
};
exports.publish = publish;
// export let enterFinalApp = (contentBinaryFile: ArrayBuffer) => {
// 	// TODO open new url with ?account, finalAppName
// 	// let _meta3DState = loadFinalApp(_findFinalAppBinaryFile(account, finalAppName))
// 	let _meta3DState = loadFinalApp(contentBinaryFile)
// }
let findPublishFinalApp = ([getDataByKeyFunc, downloadFileFunc], account, finalAppName, fileType, notUseCacheForFindFinalApp) => {
    return (0, most_1.fromPromise)(getDataByKeyFunc("publishedfinalapps", (0, exports._buildKey)(finalAppName, account))).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)(null);
        }
        let fileID = null;
        switch (fileType) {
            case "content":
                fileID = data[0].contentFileID;
                break;
            case "singleEvent":
                fileID = data[0].singleEventFileID;
                break;
        }
        return downloadFileFunc(fileID, notUseCacheForFindFinalApp);
    });
};
exports.findPublishFinalApp = findPublishFinalApp;
let findAllPublishFinalAppsByAccount = (getDataWithWhereDataFunc, account) => {
    return (0, most_1.fromPromise)(getDataWithWhereDataFunc("publishedfinalapps", { account: account })).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)([]);
        }
        // return just(data.map(({ account, finalAppName, description }) => {
        //     return {
        //         account,
        //         finalAppName,
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
        // return just(data.map(({ account, finalAppName, description }) => {
        //     return {
        //         account,
        //         finalAppName,
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