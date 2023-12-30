"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAllDatabaseData = void 0;
const most_1 = require("most");
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
//# sourceMappingURL=CompatibleService.js.map