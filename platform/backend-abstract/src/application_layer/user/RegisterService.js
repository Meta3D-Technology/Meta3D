"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const most_1 = require("most");
// export let checkUserName = (notHasData: any, username: string) => {
// 	return notHasData("user", { username: username })
// }
let register = (addData, username, password) => {
    return (0, most_1.fromPromise)(addData("user", username, {
        password
    })).concat((0, most_1.fromPromise)(addData("publishedextensions", username, {
        fileData: []
    }))).concat((0, most_1.fromPromise)(addData("publishedcontributes", username, {
        fileData: []
    }))).concat((0, most_1.fromPromise)(addData("publishedelementassembledata", username, {
        fileData: []
    }))).concat((0, most_1.fromPromise)(addData("publishedskinassembledata", username, {
        fileData: []
    })));
};
exports.register = register;
