"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports._register = exports.checkUserName = exports._checkUserName = void 0;
const most_1 = require("most");
const CloundbaseService_1 = require("../cloudbase/CloundbaseService");
exports._checkUserName = (notHasDataFunc, username) => {
    return notHasDataFunc("user", { username: username });
};
exports.checkUserName = (username) => {
    return exports._checkUserName(CloundbaseService_1.notHasData, username);
};
exports._register = (addDataFunc, username, password) => {
    return most_1.fromPromise(addDataFunc("user", {
        username,
        password
    })).concat(most_1.fromPromise(addDataFunc("publishedExtensions", {
        username,
        fileData: []
    }))).concat(most_1.fromPromise(addDataFunc("publishedContributes", {
        username,
        fileData: []
    }))).concat(most_1.fromPromise(addDataFunc("publishedExtensionProtocols", {
        username,
        protocols: []
    }))).concat(most_1.fromPromise(addDataFunc("publishedContributeProtocols", {
        username,
        protocols: []
    })));
};
exports.register = (username, password) => {
    return exports._register(CloundbaseService_1.addData, username, password);
};
