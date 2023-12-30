"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAllStorageData = exports.updateAllDatabaseData = void 0;
const most_1 = require("most");
const NullableUtils_1 = require("meta3d-commonlib-ts/src/NullableUtils");
let updateAllDatabaseData = ([getCollectionCountFunc, getCollectionFunc, parseMarketCollectionDataBodyForNodejsFunc, mapCollectionFunc, getKeyFunc, mapFunc, updateDataFunc], app, collectionName) => {
    let maxCount = 1000;
    return (0, most_1.fromPromise)(getCollectionCountFunc(app, collectionName)).flatMap((count) => {
        if (count >= maxCount) {
            throw new Error(`count should <= ${count}`);
        }
        return (0, most_1.fromPromise)(getCollectionFunc(app, parseMarketCollectionDataBodyForNodejsFunc, collectionName, maxCount, 0)).flatMap((res) => {
            // console.log(collectionName, 0, maxCount)
            // console.log("res: ",res)
            return (0, most_1.mergeArray)(mapCollectionFunc(res, (data) => {
                // console.log(
                //     collectionName,
                //     getKeyFunc(data),
                //     mapFunc(data)
                // )
                return (0, most_1.fromPromise)(updateDataFunc(app, collectionName, getKeyFunc(data), mapFunc(data)));
            }));
        });
    });
};
exports.updateAllDatabaseData = updateAllDatabaseData;
let updateAllStorageData = ([getCollectionCountFunc, getCollectionFunc, parseMarketCollectionDataBodyForNodejsFunc, mapCollectionFunc, downloadFileFunc, mapFunc, uploadFileFunc, buildFilePathFunc], app, collectionName) => {
    let maxCount = 1000;
    return (0, most_1.fromPromise)(getCollectionCountFunc(app, collectionName)).flatMap((count) => {
        if (count >= maxCount) {
            throw new Error(`count should <= ${count}`);
        }
        return (0, most_1.fromPromise)(getCollectionFunc(app, parseMarketCollectionDataBodyForNodejsFunc, collectionName, maxCount, 0)).flatMap((res) => {
            return (0, most_1.mergeArray)(mapCollectionFunc(res, (data) => {
                if ((0, NullableUtils_1.isNullable)(data.fileID)) {
                    throw new Error(`fileID not exist in collection: ${collectionName}`);
                }
                // console.log(data.fileID)
                return downloadFileFunc(app, parseMarketCollectionDataBodyForNodejsFunc, data.fileID, true).flatMap(file => {
                    let filePath = buildFilePathFunc(data);
                    // console.log(filePath, mapFunc(file), fileName)
                    console.log(`下载 filePath: ${filePath}成功，准备上传`);
                    // return uploadFileFunc(app, percentCompleted => console.log(percentCompleted), filePath, mapFunc(file), fileName)
                    return uploadFileFunc(app, filePath, mapFunc(file));
                });
            }));
        });
    });
};
exports.updateAllStorageData = updateAllStorageData;
//# sourceMappingURL=CompatibleService.js.map