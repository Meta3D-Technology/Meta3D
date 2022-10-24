"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShopImplementData = exports.uploadFile = exports.getFileID = exports.getShopImplementAccountData = exports.getShopProtocolCollection = exports.isContain = exports.buildShopImplementAccountData = exports.getDataFromShopImplementAccountData = exports.getDataFromShopProtocolCollection = exports.hasAccount = exports.handleLogin = exports.addDataToUserCollection = exports.addDataToShopProtocolCollection = exports.addShopImplementDataToDataFromShopImplementCollectionData = exports.addShopProtocolDataToDataFromShopProtocolCollectionData = void 0;
const most_1 = require("most");
let _parseShopCollectionDataBody = (collectionData) => {
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
let addShopProtocolDataToDataFromShopProtocolCollectionData = (collectionData, data) => {
    return new Promise((resolve, reject) => {
        collectionData.push(data);
        resolve(JSON.stringify(collectionData));
    });
};
exports.addShopProtocolDataToDataFromShopProtocolCollectionData = addShopProtocolDataToDataFromShopProtocolCollectionData;
let addShopImplementDataToDataFromShopImplementCollectionData = (collectionData, data) => {
    return new Promise((resolve, reject) => {
        console.log("addShopImplementDataToDataFromShopImplementCollectionData:", collectionData, data);
        collectionData.push(data);
        resolve(collectionData);
    });
};
exports.addShopImplementDataToDataFromShopImplementCollectionData = addShopImplementDataToDataFromShopImplementCollectionData;
let addDataToShopProtocolCollection = (s3, addShopProtocolDataToDataFromShopProtocolCollectionData, collectionName, key, collectionData, data) => {
    return addShopProtocolDataToDataFromShopProtocolCollectionData(collectionData, data).then(body => {
        console.log("add data", key, body);
        return s3.putObject({
            Bucket: collectionName,
            Key: key,
            Body: body,
        });
    });
};
exports.addDataToShopProtocolCollection = addDataToShopProtocolCollection;
let _addDataToShopImplementCollection = exports.addDataToShopProtocolCollection;
exports.addDataToUserCollection = exports.addDataToShopProtocolCollection;
let _buildEmptyBody = () => "";
let _buildAccountAsKey = (account) => "meta3d_" + account;
let _buildEmptyCollectionData = () => null;
let _buildFirstAddDataToBodyFunc = () => (collectionData, data) => {
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify(data));
    });
};
let handleLogin = (s3, account) => {
    return (0, most_1.fromPromise)((0, exports.addDataToUserCollection)(s3, _buildFirstAddDataToBodyFunc(), "user", _buildAccountAsKey(account), _buildEmptyCollectionData(), _buildEmptyBody()));
};
exports.handleLogin = handleLogin;
let _hasData = (s3, collectionName, key) => {
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
let getDataFromShopProtocolCollection = (collectionData) => {
    return collectionData;
};
exports.getDataFromShopProtocolCollection = getDataFromShopProtocolCollection;
let getDataFromShopImplementAccountData = (data) => {
    console.log("getDataFromShopImplementAccountData->data: ", data);
    return data.fileData;
};
exports.getDataFromShopImplementAccountData = getDataFromShopImplementAccountData;
let buildShopImplementAccountData = (data, account) => {
    return {
        key: _handleKeyToLowercase(account),
        fileData: data
    };
};
exports.buildShopImplementAccountData = buildShopImplementAccountData;
let isContain = (find, dataFromShopCollectionData) => {
    return new Promise((resolve, reject) => {
        resolve(dataFromShopCollectionData.findIndex((data) => {
            return find(data);
        }) !== -1);
    });
};
exports.isContain = isContain;
let _buildEmptyArrBody = () => [];
let getShopProtocolCollection = (s3, collectionName) => {
    console.log("get collection");
    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(_parseShopCollectionDataBody)
        .catch(err => {
        if (err.name === 'NoSuchKey') {
            console.log("add");
            return (0, exports.addDataToShopProtocolCollection)(s3, _buildFirstAddDataToBodyFunc(), collectionName, collectionName, _buildEmptyCollectionData(), _buildEmptyArrBody()).then(_ => {
                console.log("after add");
                return (0, exports.getShopProtocolCollection)(s3, collectionName);
            });
        }
        throw err;
    });
};
exports.getShopProtocolCollection = getShopProtocolCollection;
let getShopImplementAccountData = (s3, collectionName, account) => {
    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    }).then(_parseShopCollectionDataBody)
        .then((body) => {
        console.log("getShopImplementAccountData->body:", body);
        account = _handleKeyToLowercase(account);
        let result = body.find((data) => {
            return data.key === account;
        });
        if (result === undefined) {
            result = {
                key: account,
                fileData: []
            };
        }
        console.log("getShopImplementAccountData->return:", [result, JSON.stringify(body)]);
        return [result, body];
    })
        .catch(err => {
        if (err.name === 'NoSuchKey') {
            console.log("add");
            return _addDataToShopImplementCollection(s3, _buildFirstAddDataToBodyFunc(), collectionName, collectionName, _buildEmptyCollectionData(), _buildEmptyArrBody()).then(_ => {
                console.log("after add");
                return (0, exports.getShopImplementAccountData)(s3, collectionName, account);
            });
        }
        throw err;
    });
};
exports.getShopImplementAccountData = getShopImplementAccountData;
let _getFileBucketName = () => "meta3d-files";
let _arrayBufferToBuffer = (arrayBuffer) => {
    return Buffer.from(arrayBuffer);
};
let getFileID = (_, filePath) => {
    return _handleKeyToLowercase(filePath);
};
exports.getFileID = getFileID;
let uploadFile = (s3, filePath, fileContent) => {
    console.log("uploadFile:", filePath, fileContent);
    return (0, most_1.fromPromise)(s3.putObject({
        Bucket: _getFileBucketName(),
        Key: _handleKeyToLowercase(filePath),
        Body: _arrayBufferToBuffer(fileContent),
    }));
};
exports.uploadFile = uploadFile;
let updateShopImplementData = (s3, collectionName, account, updateData, oldShopImplementCollectionData) => {
    account = _handleKeyToLowercase(account);
    let newShopImplementCollectionData = [];
    let index = oldShopImplementCollectionData.findIndex((data) => {
        data.key === account;
    });
    if (index === -1) {
        newShopImplementCollectionData.push(updateData);
    }
    else {
        newShopImplementCollectionData = oldShopImplementCollectionData.slice();
        newShopImplementCollectionData[index] = updateData;
    }
    console.log("updateShopImplementData->putObject Body:", newShopImplementCollectionData, newShopImplementCollectionData[0].fileData, JSON.stringify(newShopImplementCollectionData));
    return s3.putObject({
        Bucket: collectionName,
        Key: collectionName,
        Body: JSON.stringify(newShopImplementCollectionData),
    });
};
exports.updateShopImplementData = updateShopImplementData;
//# sourceMappingURL=Main.js.map