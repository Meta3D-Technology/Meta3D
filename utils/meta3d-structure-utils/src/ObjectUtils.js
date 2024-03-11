"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValueToObject = void 0;
let setValueToObject = (object, key, value) => {
    // object[key] = value
    // return object
    return Object.assign(Object.assign({}, object), { [key]: value });
};
exports.setValueToObject = setValueToObject;
//# sourceMappingURL=ObjectUtils.js.map