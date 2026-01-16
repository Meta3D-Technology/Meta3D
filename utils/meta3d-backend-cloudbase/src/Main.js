"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKey = exports.parseMarketCollectionDataBodyForNodejs = exports.deleteFile = exports.downloadFile = exports.getAccountFromMarketImplementCollectionData = exports.filterMarketImplementCollection = exports.mapMarketImplementCollection = exports.getMarketImplementCollection = exports.addMarketImplementData = exports.updateMarketImplementData = exports.getMarketImplementAccountData = exports.getMarketImplementAccountDataWithWhereData = exports.getMarketProtocolCollectionCount = exports.batchFindMarketProtocolCollection = exports.getMarketProtocolCollection = exports.uploadFile = exports.getFileID = exports.notHasData = exports.getDataFromMarketProtocolCollection = exports.hasData = exports.hasAccount = exports.addDataToUserCollection = exports.addDataToMarketImplementCollection = exports.addDataToMarketProtocolCollection = exports.handleKeyToLowercase = exports.updateData = exports.findProtocolDataOrderBy = exports.findDataOrderBy = exports.setData = exports.getData = exports.registerUser = exports.handleLoginForWeb3 = exports.checkPassword = exports.checkUserName = exports.addMarketProtocolDataToDataFromMarketProtocolCollectionData = void 0;
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
let _buildEmptyCollectionData = () => null;
let _buildFirstAddDataToBodyFunc = () => (allCollectionData, data) => null;
let addMarketProtocolDataToDataFromMarketProtocolCollectionData = (allCollectionData, data) => {
    return new Promise((resolve, reject) => {
        resolve(null);
    });
};
exports.addMarketProtocolDataToDataFromMarketProtocolCollectionData = addMarketProtocolDataToDataFromMarketProtocolCollectionData;
// export let addMarketImplementDataToDataFromMarketImplementCollectionData = (allCollectionData: dataFromMarketImplementCollectionData, data: marketImplementData): Promise<any> => {
//     return new Promise((resolve, reject) => {
//         resolve(allCollectionData.concat([data]))
//     })
// }
let checkUserName = (app, account) => {
    return _notHasData(app, "user", { key: account });
};
exports.checkUserName = checkUserName;
let checkPassword = (app, account, password) => {
    return _notHasData(app, "user", { key: account, password: password });
};
exports.checkPassword = checkPassword;
let handleLoginForWeb3 = (app, account) => {
    return (0, exports.checkUserName)(app, account).flatMap((isNotHasData) => {
        if (isNotHasData) {
            return (0, most_1.fromPromise)((0, exports.addDataToUserCollection)(app, _buildFirstAddDataToBodyFunc(), "user", account, _buildEmptyCollectionData(), {}));
            // .concat(fromPromise(
            //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedextensions", account, _buildEmptyCollectionData(), {
            //         fileData: []
            //     })
            // )).concat(fromPromise(
            //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedcontributes", account, _buildEmptyCollectionData(), {
            //         fileData: []
            //     })
            // )).concat(fromPromise(
            //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedelementassembledata", account, _buildEmptyCollectionData(), {
            //         fileData: []
            //     })
            // ))
        }
        return (0, most_1.just)(account);
    });
};
exports.handleLoginForWeb3 = handleLoginForWeb3;
let registerUser = (app, account, password) => {
    return (0, most_1.fromPromise)((0, exports.addDataToUserCollection)(app, _buildFirstAddDataToBodyFunc(), "user", account, _buildEmptyCollectionData(), {
        password: password
    }));
    // .concat(fromPromise(
    //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "talent", account, _buildEmptyCollectionData(), {
    //         data: []
    //     })
    // ))
    // .concat(fromPromise(
    //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedextensions", account, _buildEmptyCollectionData(), {
    //         fileData: []
    //     })
    // )).concat(fromPromise(
    //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedcontributes", account, _buildEmptyCollectionData(), {
    //         fileData: []
    //     })
    // )).concat(fromPromise(
    //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedelementassembledata", account, _buildEmptyCollectionData(), {
    //         fileData: []
    //     })
    // ))
};
exports.registerUser = registerUser;
let _getFirstData = (res, key) => {
    /*! fix "may has two data with same key but diff _id(caused by setData)"
    *
    */
    let result = res.data.filter(d => d._id == key);
    if (result.length > 0) {
        return result[0];
    }
    return res.data[0];
};
let getData = (app, collectionName, key) => {
    return _getDatabase(app).collection(collectionName)
        // .where({ key: handleKeyToLowercase(key) })
        .where({ key: key })
        .get()
        // .then(res => res.data[0])
        .then(res => {
        console.log(collectionName, key);
        return _getFirstData(res, key);
    });
};
exports.getData = getData;
let setData = (app, collectionName, key, data) => {
    // return _getDatabase(app).collection(collectionName)
    //     // .where({ key: handleKeyToLowercase(key) })
    //     .where({ key: key })
    //     .remove()
    //     .then(res => {
    //         return _getDatabase(app).collection(collectionName)
    //             .add(
    //                 {
    //                     ...data,
    //                     // key: handleKeyToLowercase(key)
    //                     key: key
    //                 }
    //             )
    //     })
    // // .doc(handleKeyToLowercase(key))
    // // .update(data)
    // // .set(data)
    return _getDatabase(app).collection(collectionName)
        .doc(key)
        .set(Object.assign(Object.assign({}, data), { key: key }));
};
exports.setData = setData;
let findDataOrderBy = (app, collectionName, orderFieldName) => {
    return _getDatabase(app).collection(collectionName)
        // .where({ key: key })
        .orderBy(orderFieldName, "desc")
        .get()
        .then(res => {
        // console.log(collectionName, key)
        return res.data;
    });
};
exports.findDataOrderBy = findDataOrderBy;
let findProtocolDataOrderBy = (app, collectionName, protocolName, orderFieldName) => {
    return _getDatabase(app).collection(collectionName)
        .where({
        // key: key,
        protocolName: protocolName,
    })
        .orderBy(orderFieldName, "desc")
        .get()
        .then(res => {
        // console.log(collectionName, key)
        return res.data;
    });
};
exports.findProtocolDataOrderBy = findProtocolDataOrderBy;
let updateData = (app, updateFunc, collectionName, key) => {
    return _getDatabase(app).collection(collectionName)
        .doc(key)
        .update(updateFunc(_getDatabase(app).command));
};
exports.updateData = updateData;
let handleKeyToLowercase = (key) => {
    return key.toLowerCase();
};
exports.handleKeyToLowercase = handleKeyToLowercase;
let addDataToMarketProtocolCollection = (app, addMarketProtocolDataToDataFromMarketProtocolCollectionData, collectionName, key, allCollectionData, data) => {
    return _getDatabase(app).collection(collectionName)
        .add(Object.assign(Object.assign({}, data), { 
        // key: handleKeyToLowercase(key)
        key: key }));
};
exports.addDataToMarketProtocolCollection = addDataToMarketProtocolCollection;
exports.addDataToMarketImplementCollection = exports.addDataToMarketProtocolCollection;
exports.addDataToUserCollection = exports.addDataToMarketProtocolCollection;
let _hasData = (app, collectionName, key) => {
    return (0, most_1.fromPromise)(_getDatabase(app).collection(collectionName)
        .where({ key: key })
        .get()
        .then(res => res.data.length > 0));
};
let hasAccount = (app, collectionName, account) => {
    // return _hasData(app, collectionName, handleKeyToLowercase(account))
    return _hasData(app, collectionName, account);
};
exports.hasAccount = hasAccount;
let hasData = (app, collectionName, key) => {
    // return _hasData(app, collectionName, handleKeyToLowercase(key))
    return _hasData(app, collectionName, key);
};
exports.hasData = hasData;
let getDataFromMarketProtocolCollection = (allCollectionData) => {
    return allCollectionData.data;
};
exports.getDataFromMarketProtocolCollection = getDataFromMarketProtocolCollection;
// export let getDataFromMarketImplementAccountData = (data: marketImplementAccountData): dataFromMarketImplementCollectionData => {
//     return data.fileData
// }
// export let buildMarketImplementAccountData = (data: dataFromMarketImplementCollectionData, account: account): marketImplementAccountData => {
//     return {
//         key: handleKeyToLowercase(account),
//         fileData: data
//     }
// }
// export let isContain = (find: (dataFromMarketCollectionData: dataFromMarketProtocolCollectionData | dataFromMarketImplementCollectionData) => boolean, dataFromMarketCollectionData: dataFromMarketProtocolCollectionData | dataFromMarketImplementCollectionData) => {
//     return new Promise((resolve, reject) => {
//         resolve(
//             dataFromMarketCollectionData.findIndex((data) => {
//                 return find(data)
//             }) !== -1
//         )
//     })
// }
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
let getMarketProtocolCollection = (app, parseMarketCollectionDataBody, collectionName, limitCount, skipCount, whereData = {}) => {
    return _getDatabase(app).collection(collectionName)
        .where(whereData)
        // .skip(skipCount + 1)
        // .limit(limitCount + 1)
        .skip(skipCount)
        .limit(limitCount)
        .get();
};
exports.getMarketProtocolCollection = getMarketProtocolCollection;
let batchFindMarketProtocolCollection = (app, parseMarketCollectionDataBody, collectionName, protocolNames) => {
    return _getDatabase(app).collection(collectionName)
        .where({
        name: _getDatabase(app).command.in(protocolNames)
    })
        .orderBy("version", "desc")
        .skip(0)
        .limit(1000)
        .get();
};
exports.batchFindMarketProtocolCollection = batchFindMarketProtocolCollection;
let getMarketProtocolCollectionCount = (app, collectionName) => {
    return _getDatabase(app).collection(collectionName)
        .count()
        .then(res => res.total);
};
exports.getMarketProtocolCollectionCount = getMarketProtocolCollectionCount;
let getMarketImplementAccountDataWithWhereData = (app, _parseMarketCollectionDataBody, collectionName, whereData) => {
    return _getDatabase(app).collection(collectionName)
        .where(whereData)
        .skip(0)
        .limit(1000)
        .get()
        .then(res => res.data);
};
exports.getMarketImplementAccountDataWithWhereData = getMarketImplementAccountDataWithWhereData;
let getMarketImplementAccountData = (app, _parseMarketCollectionDataBody, collectionName, account, name, version, protocolName = null) => {
    let whereData = null;
    if (protocolName !== null) {
        whereData = {
            key: (0, exports.handleKeyToLowercase)(account),
            name: name,
            version: version,
            protocolName: protocolName
        };
    }
    else {
        whereData = {
            key: (0, exports.handleKeyToLowercase)(account),
            name: name,
            version: version,
        };
    }
    return (0, exports.getMarketImplementAccountDataWithWhereData)(app, _parseMarketCollectionDataBody, collectionName, whereData);
};
exports.getMarketImplementAccountData = getMarketImplementAccountData;
// export let updateCollection = (app: any, collectionName: string, updateData: any) => {
//     return _getDatabase(app).collection(collectionName)
//         .update(updateData)
// }
let updateMarketImplementData = (app, collectionName, key, updateData, _oldMarketImplementCollectionData) => {
    return _getDatabase(app).collection(collectionName)
        // .where({ key: handleKeyToLowercase(key) })
        .where({ key: key })
        .update(updateData);
};
exports.updateMarketImplementData = updateMarketImplementData;
let addMarketImplementData = (app, collectionName, data) => {
    return _getDatabase(app).collection(collectionName)
        .add(data);
};
exports.addMarketImplementData = addMarketImplementData;
// export let getMarketImplementCollectionFunc = (app: any, collectionName: string): Promise<allCollectionData> => {
//     return _getDatabase(app).collection(collectionName).get()
// }
exports.getMarketImplementCollection = exports.getMarketProtocolCollection;
let mapMarketImplementCollection = (allCollectionData, func) => {
    return allCollectionData.data.map(func);
};
exports.mapMarketImplementCollection = mapMarketImplementCollection;
let filterMarketImplementCollection = (allCollectionData, func) => {
    return Object.assign(Object.assign({}, allCollectionData), { data: allCollectionData.data.filter(func) });
};
exports.filterMarketImplementCollection = filterMarketImplementCollection;
let getAccountFromMarketImplementCollectionData = (data) => {
    return data.key;
};
exports.getAccountFromMarketImplementCollectionData = getAccountFromMarketImplementCollectionData;
// export let getFileDataFromMarketImplementCollectionData = (data: collectionData) => {
//     return data.fileData
// }
let downloadFile = (app, parseMarketCollectionDataBody, fileID, notUseCache) => {
    return (0, most_1.fromPromise)(app.getTempFileURL({
        fileList: [fileID]
    })).flatMap(({ fileList }) => {
        // return fromPromise(fetch(fileList[0].tempFileURL).then(response => response.arrayBuffer()))
        let tempFileURL = notUseCache ? fileList[0].tempFileURL + "?cachebust=" + Math.floor(Math.random() * 1000000) : fileList[0].tempFileURL;
        return (0, most_1.fromPromise)(fetch(tempFileURL).then(response => response.arrayBuffer()));
    });
};
exports.downloadFile = downloadFile;
// export let downloadFile = (app: any, parseMarketCollectionDataBody, fileID: string, notUseCache: boolean) => {
//     return app.getTempFileURL({
//         fileList: [fileID]
//     }).then(({ fileList }: any) => {
//         // return fromPromise(fetch(fileList[0].tempFileURL).then(response => response.arrayBuffer()))
//         let tempFileURL = notUseCache ? fileList[0].tempFileURL + "?cachebust=" + Math.floor(Math.random() * 1000000) : fileList[0].tempFileURL
//         return fetch(tempFileURL).then(response => response.arrayBuffer())
//     })
// }
let deleteFile = (app, fileID) => {
    return (0, most_1.fromPromise)(app.deleteFile({
        fileList: [fileID]
    }));
};
exports.deleteFile = deleteFile;
exports.parseMarketCollectionDataBodyForNodejs = null;
let getKey = (data) => {
    return data.key;
};
exports.getKey = getKey;
//# sourceMappingURL=Main.js.map