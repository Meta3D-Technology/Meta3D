"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = exports.isContain = exports.hasAccount = exports.handleLogin = exports.addData = exports.addDataToBody = void 0;
const most_1 = require("most");
let _parseBody = (collectionData) => {
    let stream = collectionData.Body;
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    }).then(v => {
        return JSON.parse(v);
    });
};
let addDataToBody = (collectionData, data) => {
    return new Promise((resolve, reject) => {
        collectionData.push(data);
        resolve(JSON.stringify(collectionData));
    });
};
exports.addDataToBody = addDataToBody;
let addData = (s3, addDataToBody, collectionName, key, collectionData, data) => {
    return addDataToBody(collectionData, data).then(body => {
        console.log("add data", key, body);
        return s3.putObject({
            Bucket: collectionName,
            Key: key,
            Body: body,
        });
    });
};
exports.addData = addData;
let _buildEmptyBody = () => "";
let _buildAccountAsKey = (account) => "meta3d_" + account;
let _buildEmptyCollectionData = () => null;
let _buildFirstAddDataToBodyFunc = () => (collectionData, data) => {
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify(data));
    });
};
let handleLogin = (s3, account) => {
    return (0, most_1.fromPromise)((0, exports.addData)(s3, _buildFirstAddDataToBodyFunc(), "user", _buildAccountAsKey(account), _buildEmptyCollectionData(), _buildEmptyBody()));
};
exports.handleLogin = handleLogin;
let _hasData = (s3, collectionName, key) => {
    console.log(collectionName, key);
    return (0, most_1.fromPromise)(s3.headObject({
        Bucket: collectionName,
        Key: key,
    }).then(() => {
        console.log("find");
        return true;
    }, err => {
        if (err.name === 'NotFound') {
            return false;
        }
        throw err;
    }));
};
let _handleKeyToLowercase = (key) => {
    return key.toLowerCase();
};
let hasAccount = (s3, collectionName, account) => {
    return _hasData(s3, collectionName, _handleKeyToLowercase(_buildAccountAsKey(account)));
};
exports.hasAccount = hasAccount;
let isContain = (find, collectionData) => {
    console.log("isContain");
    return new Promise((resolve, reject) => {
        resolve(collectionData.findIndex((data) => {
            return find(data);
        }) !== -1);
    });
};
exports.isContain = isContain;
let _buildEmptyArrBody = () => [];
let getCollection = (s3, collectionName) => {
    console.log("get collection");
    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(_parseBody)
        .catch(err => {
        if (err.name === 'NoSuchKey') {
            console.log("add");
            return (0, exports.addData)(s3, _buildFirstAddDataToBodyFunc(), collectionName, collectionName, _buildEmptyCollectionData(), _buildEmptyArrBody()).then(_ => {
                console.log("after add");
                return (0, exports.getCollection)(s3, collectionName);
            });
        }
        throw err;
    });
};
exports.getCollection = getCollection;
//# sourceMappingURL=Main.js.map