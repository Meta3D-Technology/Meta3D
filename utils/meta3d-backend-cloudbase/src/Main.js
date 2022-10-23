"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = exports.updateCollection = exports.getData = exports.getCollection = exports.uploadFile = exports.notHasData = exports.isContain = exports.hasAccount = exports.addData = exports.handleLogin = exports.addDataToBody = void 0;
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
let addDataToBody = (collectionData, data) => {
    return new Promise((resolve, reject) => {
        resolve(null);
    });
};
exports.addDataToBody = addDataToBody;
let handleLogin = (app, account) => {
    return _checkUserName(app, account).flatMap((isNotHasData) => {
        if (isNotHasData) {
            return (0, most_1.fromPromise)((0, exports.addData)(app, _buildFirstAddDataToBodyFunc(), "user", account, _buildEmptyCollectionData(), {})).concat((0, most_1.fromPromise)((0, exports.addData)(app, _buildFirstAddDataToBodyFunc(), "publishedextensions", account, _buildEmptyCollectionData(), {
                fileData: []
            }))).concat((0, most_1.fromPromise)((0, exports.addData)(app, _buildFirstAddDataToBodyFunc(), "publishedcontributes", account, _buildEmptyCollectionData(), {
                fileData: []
            }))).concat((0, most_1.fromPromise)((0, exports.addData)(app, _buildFirstAddDataToBodyFunc(), "publishedelementassembledata", account, _buildEmptyCollectionData(), {
                fileData: []
            }))).concat((0, most_1.fromPromise)((0, exports.addData)(app, _buildFirstAddDataToBodyFunc(), "publishedskinassembledata", account, _buildEmptyCollectionData(), {
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
let addData = (app, addDataToBody, collectionName, key, collectionData, data) => {
    return _getDatabase(app).collection(collectionName)
        .add(Object.assign(Object.assign({}, data), { 
        // key: _handleKeyToLowercase(key)
        key: key }));
};
exports.addData = addData;
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
let isContain = (find, collectionData) => {
    return new Promise((resolve, reject) => {
        resolve(collectionData.data.findIndex((data) => {
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
let uploadFile = (app, cloudPath, fileContent) => {
    return (0, most_1.fromPromise)(app.uploadFile({
        cloudPath,
        fileContent
    }));
};
exports.uploadFile = uploadFile;
let getCollection = (app, collectionName) => {
    return _getDatabase(app).collection(collectionName).get();
};
exports.getCollection = getCollection;
let getData = (app, collectionName, data) => {
    return _getDatabase(app).collection(collectionName)
        .where(data)
        .get();
};
exports.getData = getData;
let updateCollection = (app, collectionName, updateData) => {
    return _getDatabase(app).collection(collectionName)
        .update(updateData);
};
exports.updateCollection = updateCollection;
let updateData = (app, collectionName, whereData, updateData) => {
    return _getDatabase(app).collection(collectionName)
        .where(whereData)
        .update(updateData);
};
exports.updateData = updateData;
//# sourceMappingURL=Main.js.map