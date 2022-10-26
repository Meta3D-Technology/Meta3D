"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseShopCollectionDataBodyForNodejs = exports.downloadFile = exports.getFileDataFromShopImplementCollectionData = exports.getAccountFromShopImplementCollectionData = exports.mapShopImplementCollection = exports.getShopImplementCollection = exports.updateShopImplementData = exports.getShopImplementAccountData = exports.getShopProtocolCollection = exports.uploadFile = exports.getFileID = exports.notHasData = exports.isContain = exports.buildShopImplementAccountData = exports.getDataFromShopImplementAccountData = exports.getDataFromShopProtocolCollection = exports.hasData = exports.hasAccount = exports.addDataToUserCollection = exports.addDataToShopImplementCollection = exports.addDataToShopProtocolCollection = exports.handleKeyToLowercase = exports.handleLogin = exports.addShopImplementDataToDataFromShopImplementCollectionData = exports.addShopProtocolDataToDataFromShopProtocolCollectionData = void 0;
const most_1 = require("most");
let _getDatabase = (app) => {
    return app.database();
};
let _notHasData = (app, collectionName, data) => {
    return (0, most_1.fromPromise)(_getDatabase(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0));
};
let _checkUserName = (app, account) => {
    return _notHasData(app, "user", { key: account });
};
let _buildEmptyCollectionData = () => null;
let _buildFirstAddDataToBodyFunc = () => (allCollectionData, data) => null;
let addShopProtocolDataToDataFromShopProtocolCollectionData = (allCollectionData, data) => {
    return new Promise((resolve, reject) => {
        resolve(null);
    });
};
exports.addShopProtocolDataToDataFromShopProtocolCollectionData = addShopProtocolDataToDataFromShopProtocolCollectionData;
let addShopImplementDataToDataFromShopImplementCollectionData = (allCollectionData, data) => {
    return new Promise((resolve, reject) => {
        resolve(allCollectionData.concat([data]));
    });
};
exports.addShopImplementDataToDataFromShopImplementCollectionData = addShopImplementDataToDataFromShopImplementCollectionData;
let handleLogin = (app, account) => {
    return _checkUserName(app, account).flatMap((isNotHasData) => {
        if (isNotHasData) {
            return (0, most_1.fromPromise)((0, exports.addDataToUserCollection)(app, _buildFirstAddDataToBodyFunc(), "user", account, _buildEmptyCollectionData(), {})).concat((0, most_1.fromPromise)((0, exports.addDataToShopImplementCollection)(app, _buildFirstAddDataToBodyFunc(), "publishedextensions", account, _buildEmptyCollectionData(), {
                fileData: []
            }))).concat((0, most_1.fromPromise)((0, exports.addDataToShopImplementCollection)(app, _buildFirstAddDataToBodyFunc(), "publishedcontributes", account, _buildEmptyCollectionData(), {
                fileData: []
            }))).concat((0, most_1.fromPromise)((0, exports.addDataToShopImplementCollection)(app, _buildFirstAddDataToBodyFunc(), "publishedelementassembledata", account, _buildEmptyCollectionData(), {
                fileData: []
            }))).concat((0, most_1.fromPromise)((0, exports.addDataToShopImplementCollection)(app, _buildFirstAddDataToBodyFunc(), "publishedskinassembledata", account, _buildEmptyCollectionData(), {
                fileData: []
            })));
        }
        return (0, most_1.just)(account);
    });
};
exports.handleLogin = handleLogin;
let handleKeyToLowercase = (key) => {
    return key.toLowerCase();
};
exports.handleKeyToLowercase = handleKeyToLowercase;
let addDataToShopProtocolCollection = (app, addShopProtocolDataToDataFromShopProtocolCollectionData, collectionName, key, allCollectionData, data) => {
    return _getDatabase(app).collection(collectionName)
        .add(Object.assign(Object.assign({}, data), { 
        // key: handleKeyToLowercase(key)
        key: key }));
};
exports.addDataToShopProtocolCollection = addDataToShopProtocolCollection;
exports.addDataToShopImplementCollection = exports.addDataToShopProtocolCollection;
exports.addDataToUserCollection = exports.addDataToShopProtocolCollection;
let _hasData = (app, collectionName, key) => {
    return (0, most_1.fromPromise)(_getDatabase(app).collection(collectionName)
        .where({ key: key })
        .get()
        .then(res => res.data.length > 0));
};
let hasAccount = (app, collectionName, account) => {
    return _hasData(app, collectionName, (0, exports.handleKeyToLowercase)(account));
};
exports.hasAccount = hasAccount;
let hasData = (app, collectionName, key) => {
    return _hasData(app, collectionName, (0, exports.handleKeyToLowercase)(key));
};
exports.hasData = hasData;
let getDataFromShopProtocolCollection = (allCollectionData) => {
    return allCollectionData.data;
};
exports.getDataFromShopProtocolCollection = getDataFromShopProtocolCollection;
let getDataFromShopImplementAccountData = (data) => {
    return data.fileData;
};
exports.getDataFromShopImplementAccountData = getDataFromShopImplementAccountData;
let buildShopImplementAccountData = (data, account) => {
    return {
        key: (0, exports.handleKeyToLowercase)(account),
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
let notHasData = (app, collectionName, data) => {
    return (0, most_1.fromPromise)(_getDatabase(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0));
};
exports.notHasData = notHasData;
let getFileID = ({ fileID }, filePath) => {
    return fileID;
};
exports.getFileID = getFileID;
let _arrayBufferToBuffer = (arrayBuffer) => {
    return Buffer.from(arrayBuffer);
};
let uploadFile = (app, filePath, fileContent) => {
    return (0, most_1.fromPromise)(app.uploadFile({
        cloudPath: filePath,
        fileContent: _arrayBufferToBuffer(fileContent)
    }));
};
exports.uploadFile = uploadFile;
let getShopProtocolCollection = (app, parseShopCollectionDataBody, collectionName) => {
    return _getDatabase(app).collection(collectionName).get();
};
exports.getShopProtocolCollection = getShopProtocolCollection;
let getShopImplementAccountData = (app, parseShopCollectionDataBody, collectionName, account) => {
    return _getDatabase(app).collection(collectionName)
        .where({ key: (0, exports.handleKeyToLowercase)(account) })
        .get()
        .then(res => [res.data[0], []]);
};
exports.getShopImplementAccountData = getShopImplementAccountData;
// export let updateCollection = (app: any, collectionName: string, updateData: any) => {
//     return _getDatabase(app).collection(collectionName)
//         .update(updateData)
// }
let updateShopImplementData = (app, collectionName, account, updateData, _oldShopImplementCollectionData) => {
    return _getDatabase(app).collection(collectionName)
        .where({ key: (0, exports.handleKeyToLowercase)(account) })
        .update(updateData);
};
exports.updateShopImplementData = updateShopImplementData;
// export let getShopImplementCollectionFunc = (app: any, collectionName: string): Promise<allCollectionData> => {
//     return _getDatabase(app).collection(collectionName).get()
// }
exports.getShopImplementCollection = exports.getShopProtocolCollection;
let mapShopImplementCollection = (allCollectionData, func) => {
    return allCollectionData.data.map(func);
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
let downloadFile = (app, parseShopCollectionDataBody, fileID) => {
    return (0, most_1.fromPromise)(app.getTempFileURL({
        fileList: [fileID]
    })).flatMap(({ fileList }) => {
        return (0, most_1.fromPromise)(fetch(fileList[0].tempFileURL).then(response => response.arrayBuffer()));
    });
};
exports.downloadFile = downloadFile;
exports.parseShopCollectionDataBodyForNodejs = null;
//# sourceMappingURL=Main.js.map