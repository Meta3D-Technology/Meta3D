"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyData = void 0;
// export type typeData = Record<targetVersion, Array<data>>
let _removeIdAndKey = (data) => {
    let newData = Object.assign({}, data);
    delete newData._id;
    delete newData._openid;
    delete newData.key;
    return newData;
};
// export const historyData: Record<dataType, typeData> = {
exports.historyData = {
    "database": {
        "newest": [
        //     {
        //     mapFunc: (oldData) => {
        //         return {
        //             ..._removeIdAndKey(oldData),
        //             Mbi: 2,
        //             score: null
        //         }
        //     },
        //     collectionName: "user"
        // }
        ]
    },
    "storage": {
        "newest": [
        //     {
        //     mapFunc: (oldFile) => {
        //         // return new ArrayBuffer(10)
        //         console.log("use old File: ", oldFile)
        //         return oldFile
        //     },
        //     buildFilePathFunc: (oldData) => {
        //         let fileName = oldData.account + "_" + oldData.appName
        //         return "apps/" + fileName + ".arraybuffer"
        //     },
        //     collectionName: "publishedapps"
        // }
        ]
    }
};
//# sourceMappingURL=HistoryData.js.map