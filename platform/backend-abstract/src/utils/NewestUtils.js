"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descSort = void 0;
let descSort = (data, gtFunc, orderByFieldName) => {
    return data.sort((a, b) => {
        if (gtFunc(a[orderByFieldName], b[orderByFieldName])) {
            return -1;
        }
        return 1;
    });
};
exports.descSort = descSort;
//# sourceMappingURL=NewestUtils.js.map