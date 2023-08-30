"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoginSuccess = void 0;
const most_1 = require("most");
let isLoginSuccess = (hasDataFunc, account) => {
    return hasDataFunc("user", account).flatMap(has => {
        if (!has) {
            return (0, most_1.just)([false, "用户名未注册"]);
        }
        return (0, most_1.just)([true, null]);
    });
};
exports.isLoginSuccess = isLoginSuccess;
