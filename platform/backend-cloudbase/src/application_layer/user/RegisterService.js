"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.checkUserName = void 0;
const most_1 = require("most");
let checkUserName = (notHasDataFunc, username) => {
    return notHasDataFunc("user", { username: username });
};
exports.checkUserName = checkUserName;
let register = (addDataFunc, username, password) => {
    return (0, most_1.fromPromise)(addDataFunc("user", {
        username,
        password
    })).concat((0, most_1.fromPromise)(addDataFunc("publishedExtensions", {
        username,
        fileData: []
    }))).concat((0, most_1.fromPromise)(addDataFunc("publishedContributes", {
        username,
        fileData: []
    }))).concat((0, most_1.fromPromise)(addDataFunc("publishedElementAssembleData", {
        username,
        fileData: []
    }))).concat((0, most_1.fromPromise)(addDataFunc("publishedSkinAssembleData", {
        username,
        fileData: []
    })));
    // .concat(fromPromise(
    // 	addDataFunc("publishedExtensionProtocols", {
    // 		username,
    // 		protocols: []
    // 	})
    // )).concat(fromPromise(
    // 	addDataFunc("publishedContributeProtocols", {
    // 		username,
    // 		protocols: []
    // 	})
    // ))
};
exports.register = register;
