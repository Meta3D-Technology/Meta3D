"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarketCollectionDataBodyForNodejs = exports.downloadFile = exports.getFileDataFromMarketImplementCollectionData = exports.getAccountFromMarketImplementCollectionData = exports.mapMarketImplementCollection = exports.getMarketImplementCollection = exports.updateMarketImplementData = exports.uploadFile = exports.getFileID = exports.getFileBucketName = exports.getMarketImplementAccountData = exports.getMarketProtocolCollection = exports.isContain = exports.buildMarketImplementAccountData = exports.getDataFromMarketImplementAccountData = exports.getDataFromMarketProtocolCollection = exports.hasData = exports.hasAccount = exports.handleKeyToLowercase = exports.handleLoginForWeb3 = exports.addDataToUserCollection = exports.addDataToMarketProtocolCollection = exports.addMarketImplementDataToDataFromMarketImplementCollectionData = exports.addMarketProtocolDataToDataFromMarketProtocolCollectionData = void 0;
const most_1 = require("most");
let addMarketProtocolDataToDataFromMarketProtocolCollectionData = (allCollectionData, data) => {
    return new Promise((resolve, reject) => {
        allCollectionData = allCollectionData.slice();
        allCollectionData.push(data);
        resolve(JSON.stringify(allCollectionData));
    });
};
exports.addMarketProtocolDataToDataFromMarketProtocolCollectionData = addMarketProtocolDataToDataFromMarketProtocolCollectionData;
let addMarketImplementDataToDataFromMarketImplementCollectionData = (allCollectionData, data) => {
    return new Promise((resolve, reject) => {
        console.log("addMarketImplementDataToDataFromMarketImplementCollectionData:", allCollectionData, data);
        allCollectionData = allCollectionData.slice();
        allCollectionData.push(data);
        resolve(allCollectionData);
    });
};
exports.addMarketImplementDataToDataFromMarketImplementCollectionData = addMarketImplementDataToDataFromMarketImplementCollectionData;
let addDataToMarketProtocolCollection = (s3, addMarketProtocolDataToDataFromMarketProtocolCollectionData, collectionName, key, allCollectionData, data) => {
    return addMarketProtocolDataToDataFromMarketProtocolCollectionData(allCollectionData, data).then(body => {
        console.log("add data", key, body);
        return s3.putObject({
            Bucket: collectionName,
            Key: key,
            Body: body,
        });
    });
};
exports.addDataToMarketProtocolCollection = addDataToMarketProtocolCollection;
let _addDataToMarketImplementCollection = exports.addDataToMarketProtocolCollection;
exports.addDataToUserCollection = exports.addDataToMarketProtocolCollection;
let _buildEmptyBody = () => "";
let _buildAccountAsKey = (account) => "meta3d_" + account;
let _buildEmptyCollectionData = () => null;
let _buildFirstAddDataToBodyFunc = () => (allCollectionData, data) => {
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify(data));
    });
};
let handleLoginForWeb3 = (s3, account) => {
    return (0, most_1.fromPromise)((0, exports.addDataToUserCollection)(s3, _buildFirstAddDataToBodyFunc(), "user", _buildAccountAsKey(account), _buildEmptyCollectionData(), _buildEmptyBody()));
};
exports.handleLoginForWeb3 = handleLoginForWeb3;
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
let handleKeyToLowercase = (key) => {
    return key.toLowerCase();
};
exports.handleKeyToLowercase = handleKeyToLowercase;
let hasAccount = (s3, collectionName, account) => {
    return _hasData(s3, collectionName, (0, exports.handleKeyToLowercase)(_buildAccountAsKey(account)));
};
exports.hasAccount = hasAccount;
let hasData = (s3, collectionName, key) => {
    return _hasData(s3, collectionName, (0, exports.handleKeyToLowercase)(key));
};
exports.hasData = hasData;
let getDataFromMarketProtocolCollection = (allCollectionData) => {
    return allCollectionData;
};
exports.getDataFromMarketProtocolCollection = getDataFromMarketProtocolCollection;
let getDataFromMarketImplementAccountData = (data) => {
    console.log("getDataFromMarketImplementAccountData->data: ", data);
    return data.fileData;
};
exports.getDataFromMarketImplementAccountData = getDataFromMarketImplementAccountData;
let buildMarketImplementAccountData = (data, account) => {
    return {
        key: (0, exports.handleKeyToLowercase)(account),
        fileData: data
    };
};
exports.buildMarketImplementAccountData = buildMarketImplementAccountData;
let isContain = (find, dataFromMarketCollectionData) => {
    return new Promise((resolve, reject) => {
        resolve(dataFromMarketCollectionData.findIndex((data) => {
            return find(data);
        }) !== -1);
    });
};
exports.isContain = isContain;
let _buildEmptyArrBody = () => [];
let getMarketProtocolCollection = (s3, parseMarketCollectionDataBody, collectionName) => {
    console.log("get collection: ", collectionName);
    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(data => parseMarketCollectionDataBody("json", data))
        .catch(err => {
        if (err.name === 'NoSuchKey') {
            console.log("add");
            return (0, exports.addDataToMarketProtocolCollection)(s3, _buildFirstAddDataToBodyFunc(), collectionName, collectionName, _buildEmptyCollectionData(), _buildEmptyArrBody()).then(_ => {
                console.log("after add");
                return (0, exports.getMarketProtocolCollection)(s3, parseMarketCollectionDataBody, collectionName);
            });
        }
        throw err;
    });
};
exports.getMarketProtocolCollection = getMarketProtocolCollection;
let getMarketImplementAccountData = (s3, parseMarketCollectionDataBody, collectionName, account) => {
    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(data => parseMarketCollectionDataBody("json", data))
        .then((body) => {
        console.log("getMarketImplementAccountData->body:", body);
        account = (0, exports.handleKeyToLowercase)(account);
        let result = body.find((data) => {
            return data.key === account;
        });
        if (result === undefined) {
            result = {
                key: account,
                fileData: []
            };
        }
        console.log("getMarketImplementAccountData->return:", [result, JSON.stringify(body)]);
        return [result, body];
    })
        .catch(err => {
        if (err.name === 'NoSuchKey') {
            console.log("add");
            return _addDataToMarketImplementCollection(s3, _buildFirstAddDataToBodyFunc(), collectionName, collectionName, _buildEmptyCollectionData(), _buildEmptyArrBody()).then(_ => {
                console.log("after add");
                return (0, exports.getMarketImplementAccountData)(s3, parseMarketCollectionDataBody, collectionName, account);
            });
        }
        throw err;
    });
};
exports.getMarketImplementAccountData = getMarketImplementAccountData;
let getFileBucketName = () => "meta3d-files";
exports.getFileBucketName = getFileBucketName;
let _arrayBufferToBuffer = (arrayBuffer) => {
    return Buffer.from(arrayBuffer);
};
let getFileID = (_, filePath) => {
    return (0, exports.handleKeyToLowercase)(filePath);
};
exports.getFileID = getFileID;
let uploadFile = (s3, filePath, fileContent) => {
    console.log("uploadFile:", filePath, fileContent);
    return (0, most_1.fromPromise)(s3.putObject({
        Bucket: (0, exports.getFileBucketName)(),
        Key: (0, exports.handleKeyToLowercase)(filePath),
        Body: _arrayBufferToBuffer(fileContent),
    }));
};
exports.uploadFile = uploadFile;
let updateMarketImplementData = (s3, collectionName, account, updateData, oldMarketImplementCollectionData) => {
    account = (0, exports.handleKeyToLowercase)(account);
    let newMarketImplementCollectionData = [];
    let index = oldMarketImplementCollectionData.findIndex((data) => {
        data.key === account;
    });
    if (index === -1) {
        newMarketImplementCollectionData.push(updateData);
    }
    else {
        newMarketImplementCollectionData = oldMarketImplementCollectionData.slice();
        newMarketImplementCollectionData[index] = updateData;
    }
    console.log("updateMarketImplementData->putObject Body:", newMarketImplementCollectionData, newMarketImplementCollectionData[0].fileData, JSON.stringify(newMarketImplementCollectionData));
    return s3.putObject({
        Bucket: collectionName,
        Key: collectionName,
        Body: JSON.stringify(newMarketImplementCollectionData),
    });
};
exports.updateMarketImplementData = updateMarketImplementData;
exports.getMarketImplementCollection = exports.getMarketProtocolCollection;
let mapMarketImplementCollection = (allCollectionData, func) => {
    return allCollectionData.map(func);
};
exports.mapMarketImplementCollection = mapMarketImplementCollection;
let getAccountFromMarketImplementCollectionData = (data) => {
    return data.key;
};
exports.getAccountFromMarketImplementCollectionData = getAccountFromMarketImplementCollectionData;
let getFileDataFromMarketImplementCollectionData = (data) => {
    return data.fileData;
};
exports.getFileDataFromMarketImplementCollectionData = getFileDataFromMarketImplementCollectionData;
let downloadFile = (s3, parseMarketCollectionDataBody, fileID) => {
    return (0, most_1.fromPromise)(s3.getObject({
        Bucket: (0, exports.getFileBucketName)(),
        Key: (0, exports.handleKeyToLowercase)(fileID)
    })
        .then(data => parseMarketCollectionDataBody("arrayBuffer", data)));
};
exports.downloadFile = downloadFile;
let parseMarketCollectionDataBodyForNodejs = (returnDataType, allCollectionData) => {
    let stream = allCollectionData.Body;
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
    })
        .then((buffer) => {
        switch (returnDataType) {
            // case "arrayBuffer":
            // return buffer.buffer
            case "json":
                return JSON.parse(buffer.toString("utf8"));
            default:
                throw new Error("unkndown returnDataType:" + returnDataType);
        }
    });
};
exports.parseMarketCollectionDataBodyForNodejs = parseMarketCollectionDataBodyForNodejs;
//# sourceMappingURL=Main.js.map