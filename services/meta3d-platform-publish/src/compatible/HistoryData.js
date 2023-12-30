"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyData = void 0;
let _removeIdAndKey = (data) => {
    let newData = Object.assign({}, data);
    delete newData._id;
    delete newData._openid;
    delete newData.key;
    return newData;
};
exports.historyData = {
    "newest": [{
            mapFunc: (data) => {
                return Object.assign(Object.assign({}, _removeIdAndKey(data)), { Mbi: 0, score: null });
            },
            collectionName: "user"
        }]
};
//# sourceMappingURL=HistoryData.js.map