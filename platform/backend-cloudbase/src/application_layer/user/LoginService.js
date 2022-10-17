"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoginSuccess = void 0;
const most_1 = require("most");
// TODO use domain service
let isLoginSuccess = (notHasDataFunc, username, password) => {
    return notHasDataFunc("user", { username }).flatMap(not => {
        if (not) {
            return (0, most_1.just)([false, "用户名未注册"]);
        }
        return notHasDataFunc("user", { username, password }).map(not => {
            if (not) {
                return [false, "密码不正确"];
            }
            return [true, null];
        });
    });
};
exports.isLoginSuccess = isLoginSuccess;
