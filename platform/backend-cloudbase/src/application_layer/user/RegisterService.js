"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.checkUserName = void 0;
const most_1 = require("most");
const CloundbaseService_1 = require("../cloudbase/CloundbaseService");
exports.checkUserName = (username) => {
    return CloundbaseService_1.notHasData("user", { username: username });
};
exports.register = (username, password) => {
    return most_1.fromPromise(CloundbaseService_1.getDatabase().collection("user")
        .add({
        username,
        password
    })).concat(most_1.fromPromise(CloundbaseService_1.getDatabase().collection("publishedExtensions")
        .add({
        username,
        fileData: []
    }))).concat(most_1.fromPromise(CloundbaseService_1.getDatabase().collection("publishedContributes")
        .add({
        username,
        fileData: []
    }))).concat(most_1.fromPromise(CloundbaseService_1.getDatabase().collection("publishedExtensionProtocols")
        .add({
        username,
        protocols: []
    }))).concat(most_1.fromPromise(CloundbaseService_1.getDatabase().collection("publishedContributeProtocols")
        .add({
        username,
        protocols: []
    })));
};
