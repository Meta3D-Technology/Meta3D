"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addData = exports.handleLogin = exports.init = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const most_1 = require("most");
const Repo_1 = require("../domain_layer/repo/Repo");
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
let _buildEmptyBody = () => "";
let handleLogin = (account) => {
    return (0, most_1.fromPromise)((0, exports.addData)("user", account, _buildEmptyBody()));
};
exports.handleLogin = handleLogin;
let addData = (collectionName, key, data) => {
    // console.log(
    //     data,
    //     JSON.stringify(data)
    // )
    return (0, Repo_1.getBackend)().putObject({
        Bucket: collectionName,
        Key: key,
        Body: JSON.stringify(data),
    });
};
exports.addData = addData;
