"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoginSuccess = exports._isLoginSuccess = void 0;
const most_1 = require("most");
const CloundbaseService_1 = require("../cloudbase/CloundbaseService");
// TODO use domain service
exports._isLoginSuccess = (notHasDataFunc, username, password) => {
    return notHasDataFunc("user", { username }).flatMap(not => {
        if (not) {
            return most_1.just([false, "用户名未注册"]);
        }
        return notHasDataFunc("user", { username, password }).map(not => {
            if (not) {
                return [false, "密码不正确"];
            }
            return [true, null];
        });
    });
};
exports.isLoginSuccess = (username, password) => {
    return exports._isLoginSuccess(CloundbaseService_1.notHasData, username, password);
};
