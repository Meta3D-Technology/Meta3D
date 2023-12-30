"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeDatabaseOldData = void 0;
const HistoryData_1 = require("./HistoryData");
const NullableUtils_1 = require("meta3d-commonlib-ts/src/NullableUtils");
const most_1 = require("most");
let upgradeDatabaseOldData = ([initFunc, updateAllDatabaseDataFunc], targetVersion) => {
    return initFunc().flatMap(backendInstance => {
        let data = HistoryData_1.historyData[targetVersion];
        if ((0, NullableUtils_1.isNullable)(data)) {
            throw new Error(`targetVersion: ${targetVersion} not exist in historyData`);
        }
        return (0, most_1.mergeArray)(data.map(data => {
            return updateAllDatabaseDataFunc(data.mapFunc, backendInstance, data.collectionName);
        }));
    });
};
exports.upgradeDatabaseOldData = upgradeDatabaseOldData;
//# sourceMappingURL=Compatible.js.map