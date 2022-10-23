"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = exports.hasAccount = exports.addData = exports.handleLogin = exports.init = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const most_1 = require("most");
const Repo_1 = require("../domain_layer/repo/Repo");
const BackendService = require("meta3d-backend-4everland");
let init = () => {
    const s3 = new client_s3_1.S3({
        endpoint: "https://endpoint.4everland.co",
        signatureVersion: "v4",
        credentials: {
            accessKeyId: "P7SHR2MYU5CHLXKXCOG7",
            secretAccessKey: "5yhjyVdcpNNKjZ9X5sBe3738Lh9KftfDHQ6zkZKL",
            // sessionToken,
        },
        region: "us-west-2",
    });
    (0, Repo_1.setBackend)(s3);
    return (0, most_1.empty)();
};
exports.init = init;
// let _buildEmptyBody = () => ""
// export let handleLogin = (account: string) => {
//     return fromPromise(addData("user", "meta3d_" + account, _buildEmptyBody()))
// }
// export let handleLogin = curry2(BackendService.handleLogin)(getBackend())
// export let addData = curry4_1(BackendService.addData)(getBackend())
// export let hasAccount = curry3_1(BackendService.hasAccount)(getBackend())
// export let getCollection = curry2(BackendService.getCollection)(getBackend())
let handleLogin = (account) => BackendService.handleLogin((0, Repo_1.getBackend)(), account);
exports.handleLogin = handleLogin;
let addData = (addDataToBody, collectionName, key, collectionData, data) => BackendService.addData((0, Repo_1.getBackend)(), addDataToBody, collectionName, key, collectionData, data);
exports.addData = addData;
let hasAccount = (collectionName, account) => BackendService.hasAccount((0, Repo_1.getBackend)(), collectionName, account);
exports.hasAccount = hasAccount;
let getCollection = (collectionName) => BackendService.getCollection((0, Repo_1.getBackend)(), collectionName);
exports.getCollection = getCollection;
