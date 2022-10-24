"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShopImplementData = exports.getShopImplementAccountData = exports.getShopProtocolCollection = exports.uploadFile = exports.getFileID = exports.notHasData = exports.isContain = exports.buildShopImplementAccountData = exports.getDataFromShopImplementAccountData = exports.getDataFromShopProtocolCollection = exports.hasAccount = exports.addDataToUserCollection = exports.addDataToShopImplementCollection = exports.addDataToShopProtocolCollection = exports.handleLogin = exports.addShopImplementDataToDataFromShopImplementCollectionData = exports.addShopProtocolDataToDataFromShopProtocolCollectionData = void 0;
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
let _buildFirstAddDataToBodyFunc = () => (collectionData, data) => null;
let addShopProtocolDataToDataFromShopProtocolCollectionData = (collectionData, data) => {
    return new Promise((resolve, reject) => {
        resolve(null);
    });
};
exports.addShopProtocolDataToDataFromShopProtocolCollectionData = addShopProtocolDataToDataFromShopProtocolCollectionData;
let addShopImplementDataToDataFromShopImplementCollectionData = (collectionData, data) => {
    return new Promise((resolve, reject) => {
        resolve(collectionData.concat([data]));
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
let _handleKeyToLowercase = (key) => {
    return key.toLowerCase();
};
let addDataToShopProtocolCollection = (app, addShopProtocolDataToDataFromShopProtocolCollectionData, collectionName, key, collectionData, data) => {
    return _getDatabase(app).collection(collectionName)
        .add(Object.assign(Object.assign({}, data), { 
        // key: _handleKeyToLowercase(key)
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
    return _hasData(app, collectionName, _handleKeyToLowercase(account));
};
exports.hasAccount = hasAccount;
let getDataFromShopProtocolCollection = (collectionData) => {
    return collectionData.data;
};
exports.getDataFromShopProtocolCollection = getDataFromShopProtocolCollection;
let getDataFromShopImplementAccountData = (data) => {
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
let getShopProtocolCollection = (app, collectionName) => {
    return _getDatabase(app).collection(collectionName).get();
};
exports.getShopProtocolCollection = getShopProtocolCollection;
let getShopImplementAccountData = (app, collectionName, account) => {
    return _getDatabase(app).collection(collectionName)
        .where({ key: _handleKeyToLowercase(account) })
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
        .where({ key: _handleKeyToLowercase(account) })
        .update(updateData);
};
exports.updateShopImplementData = updateShopImplementData;
//# sourceMappingURL=Main.js.map