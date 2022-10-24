"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseShopCollectionDataBodyForNodejs = exports.getFile = exports.getFileDataFromShopImplementCollectionData = exports.getAccountFromShopImplementCollectionData = exports.mapShopImplementCollection = exports.getShopImplementCollection = exports.updateShopImplementData = exports.uploadFile = exports.getFileID = exports.getShopImplementAccountData = exports.getShopProtocolCollection = exports.isContain = exports.buildShopImplementAccountData = exports.getDataFromShopImplementAccountData = exports.getDataFromShopProtocolCollection = exports.hasAccount = exports.handleLogin = exports.addDataToUserCollection = exports.addDataToShopProtocolCollection = exports.addShopImplementDataToDataFromShopImplementCollectionData = exports.addShopProtocolDataToDataFromShopProtocolCollectionData = void 0;
const most_1 = require("most");
// let _parseShopCollectionDataBody = (returnDataType: "arrayBuffer" | "json", allCollectionData: GetObjectCommandOutput): Promise<any> => {
//     // let stream = allCollectionData.Body as ReadableStream<any>
//     // let reader = stream.getReader()
//     //     return new Promise((resolve, reject) => {
//     //         const chunks = [];
//     //         // stream.on("data", (chunk) => chunks.push(chunk));
//     //         // stream.on("error", reject);
//     //         // stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
//     // })
//     //         .then(v => {
//     //             return JSON.parse(v as string)
//     //         })
//     return new Promise((resolve, reject) => {
//         resolve(allCollectionData.Body)
//     }).then((body: ReadableStream<any>) => {
//         const reader = body.getReader();
//         return new ReadableStream({
//             start(controller) {
//                 return pump();
//                 function pump() {
//                     return reader.read().then(({ done, value }) => {
//                         if (done) {
//                             controller.close();
//                             return;
//                         }
//                         controller.enqueue(value);
//                         return pump();
//                     });
//                 }
//             }
//         })
//     })
//         .then((stream) => new Response(stream))
//         .then((response) => {
//             switch (returnDataType) {
//                 case "arrayBuffer":
//                     return response.arrayBuffer()
//                 case "json":
//                     return response.json()
//             }
//         }
//         )
// }
let addShopProtocolDataToDataFromShopProtocolCollectionData = (allCollectionData, data) => {
    return new Promise((resolve, reject) => {
        allCollectionData.push(data);
        resolve(JSON.stringify(allCollectionData));
    });
};
exports.addShopProtocolDataToDataFromShopProtocolCollectionData = addShopProtocolDataToDataFromShopProtocolCollectionData;
let addShopImplementDataToDataFromShopImplementCollectionData = (allCollectionData, data) => {
    return new Promise((resolve, reject) => {
        console.log("addShopImplementDataToDataFromShopImplementCollectionData:", allCollectionData, data);
        allCollectionData.push(data);
        resolve(allCollectionData);
    });
};
exports.addShopImplementDataToDataFromShopImplementCollectionData = addShopImplementDataToDataFromShopImplementCollectionData;
let addDataToShopProtocolCollection = (s3, addShopProtocolDataToDataFromShopProtocolCollectionData, collectionName, key, allCollectionData, data) => {
    return addShopProtocolDataToDataFromShopProtocolCollectionData(allCollectionData, data).then(body => {
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
let _buildFirstAddDataToBodyFunc = () => (allCollectionData, data) => {
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
let getDataFromShopProtocolCollection = (allCollectionData) => {
    return allCollectionData;
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
let getShopProtocolCollection = (s3, parseShopCollectionDataBody, collectionName) => {
    console.log("get collection: ", collectionName);
    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(data => parseShopCollectionDataBody("json", data))
        .catch(err => {
        if (err.name === 'NoSuchKey') {
            console.log("add");
            return (0, exports.addDataToShopProtocolCollection)(s3, _buildFirstAddDataToBodyFunc(), collectionName, collectionName, _buildEmptyCollectionData(), _buildEmptyArrBody()).then(_ => {
                console.log("after add");
                return (0, exports.getShopProtocolCollection)(s3, parseShopCollectionDataBody, collectionName);
            });
        }
        throw err;
    });
};
exports.getShopProtocolCollection = getShopProtocolCollection;
let getShopImplementAccountData = (s3, parseShopCollectionDataBody, collectionName, account) => {
    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(data => parseShopCollectionDataBody("json", data))
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
                return (0, exports.getShopImplementAccountData)(s3, parseShopCollectionDataBody, collectionName, account);
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
exports.getShopImplementCollection = exports.getShopProtocolCollection;
let mapShopImplementCollection = (allCollectionData, func) => {
    return allCollectionData.map(func);
};
exports.mapShopImplementCollection = mapShopImplementCollection;
let getAccountFromShopImplementCollectionData = (data) => {
    return data.key;
};
exports.getAccountFromShopImplementCollectionData = getAccountFromShopImplementCollectionData;
let getFileDataFromShopImplementCollectionData = (data) => {
    return data.fileData;
};
exports.getFileDataFromShopImplementCollectionData = getFileDataFromShopImplementCollectionData;
// let _arrayBufferToBuffer = (arrayBuffer: ArrayBuffer): Buffer => {
//     return Buffer.from(arrayBuffer)
// }
let getFile = (s3, parseShopCollectionDataBody, fileID) => {
    return (0, most_1.fromPromise)(s3.getObject({
        Bucket: _getFileBucketName(),
        Key: _handleKeyToLowercase(fileID)
    })
        .then(data => parseShopCollectionDataBody("arrayBuffer", data)));
};
exports.getFile = getFile;
let parseShopCollectionDataBodyForNodejs = (returnDataType, allCollectionData) => {
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
exports.parseShopCollectionDataBodyForNodejs = parseShopCollectionDataBodyForNodejs;
//# sourceMappingURL=Main.js.map