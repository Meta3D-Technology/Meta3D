"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishMod = exports.findNewestPublishContribute = exports.findNewestPublishExtension = exports.findNewestPublishPackage = exports.findPublishPackage = exports.getAllPublishPackageInfos = exports.getAllPublishPackageEntryExtensionProtocols = exports.publishPackage = exports.findAllRecommendPublishFinalApps = exports.findAllPublishFinalApps = exports.findAllPublishFinalAppsByAccount = exports.findPublishFinalApp = exports.publishFinalApp = exports.findAllRecommendPublishApps = exports.findAllPublishApps = exports.findAllPublishAppsByAccount = exports.findPublishApp = exports.publishApp = exports.findPublishContribute = exports.findPublishExtension = exports.getAllPublishContributeInfos = exports.getAllPublishExtensionInfos = exports.batchFindPublishContributeProtocolConfigs = exports.batchFindPublishExtensionProtocolConfigs = exports.getAllPublishContributeProtocolConfigs = exports.getAllPublishExtensionProtocolConfigs = exports.batchFindPublishContributeProtocols = exports.batchFindPublishExtensionProtocols = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports.getAllPublishExtensionProtocolsCount = exports.isLoginSuccess = exports.registerUser = exports.handleLoginForWeb3 = exports.checkUserName = exports.init = void 0;
const Abstract = require("backend-abstract");
const Curry_1 = require("meta3d-fp/src/Curry");
const most_1 = require("most");
const meta3d_backend_cloudbase_1 = require("meta3d-backend-cloudbase");
const moment = require("moment");
const NullableUtils_1 = require("meta3d-commonlib-ts/src/NullableUtils");
// import { nullable } from "meta3d-commonlib-ts/src/nullable";
const meta3d_1 = require("meta3d");
// import * as CloudbaseService from "meta3d-tool-utils/src/publish/Ba";
const BackendService = require("meta3d-backend-cloudbase");
const js_sdk_1 = require("@cloudbase/js-sdk");
const BackendService_1 = require("./application_layer/BackendService");
const FindNewestService_1 = require("./application_layer/FindNewestService");
const meta3d_backend_cloudbase_2 = require("meta3d-backend-cloudbase");
const Repo_1 = require("./domain_layer/repo/Repo");
// export let error = ErrorService.error
let init = (env) => Abstract.init(BackendService_1.init, env);
exports.init = init;
let checkUserName = (account) => Abstract.checkUserName(BackendService_1.checkUserName, account);
exports.checkUserName = checkUserName;
let handleLoginForWeb3 = (account) => Abstract.handleLoginForWeb3(BackendService_1.handleLoginForWeb3, account);
exports.handleLoginForWeb3 = handleLoginForWeb3;
let registerUser = (account) => Abstract.registerUser(BackendService_1.registerUser, account);
exports.registerUser = registerUser;
let isLoginSuccess = (account) => Abstract.isLoginSuccess(BackendService_1.hasData, account);
exports.isLoginSuccess = isLoginSuccess;
let getAllPublishExtensionProtocolsCount = () => Abstract.getAllPublishProtocolDataCount(BackendService_1.getMarketProtocolCollectionCount, "publishedextensionprotocols");
exports.getAllPublishExtensionProtocolsCount = getAllPublishExtensionProtocolsCount;
let getAllPublishExtensionProtocols = (limitCount, skipCount) => Abstract.getAllPublishProtocolData([BackendService_1.getMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedextensionprotocols", limitCount, skipCount);
exports.getAllPublishExtensionProtocols = getAllPublishExtensionProtocols;
let getAllPublishContributeProtocols = (limitCount, skipCount) => Abstract.getAllPublishProtocolData([BackendService_1.getMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedcontributeprotocols", limitCount, skipCount);
exports.getAllPublishContributeProtocols = getAllPublishContributeProtocols;
let batchFindPublishExtensionProtocols = (protocolName) => Abstract.batchFindPublishProtocolData([BackendService_1.batchFindMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedextensionprotocols", protocolName);
exports.batchFindPublishExtensionProtocols = batchFindPublishExtensionProtocols;
let batchFindPublishContributeProtocols = (protocolName) => Abstract.batchFindPublishProtocolData([BackendService_1.batchFindMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedcontributeprotocols", protocolName);
exports.batchFindPublishContributeProtocols = batchFindPublishContributeProtocols;
let getAllPublishExtensionProtocolConfigs = (limitCount, skipCount) => Abstract.getAllPublishProtocolConfigData([BackendService_1.getMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedextensionprotocolconfigs", limitCount, skipCount);
exports.getAllPublishExtensionProtocolConfigs = getAllPublishExtensionProtocolConfigs;
let getAllPublishContributeProtocolConfigs = (limitCount, skipCount) => Abstract.getAllPublishProtocolConfigData([BackendService_1.getMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedcontributeprotocolconfigs", limitCount, skipCount);
exports.getAllPublishContributeProtocolConfigs = getAllPublishContributeProtocolConfigs;
let batchFindPublishExtensionProtocolConfigs = (protocolName) => Abstract.batchFindPublishProtocolConfigData([BackendService_1.batchFindMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedextensionprotocolconfigs", protocolName);
exports.batchFindPublishExtensionProtocolConfigs = batchFindPublishExtensionProtocolConfigs;
let batchFindPublishContributeProtocolConfigs = (protocolName) => Abstract.batchFindPublishProtocolConfigData([BackendService_1.batchFindMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedcontributeprotocolconfigs", protocolName);
exports.batchFindPublishContributeProtocolConfigs = batchFindPublishContributeProtocolConfigs;
let _onDownloadProgressFuncForSingleExtensionOrContribute = console.log;
let getAllPublishExtensionInfos = (limitCount, skipCount, protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    BackendService_1.getMarketImplementCollection,
    BackendService_1.mapMarketImplementCollection,
    meta3d_backend_cloudbase_2.filterMarketImplementCollection,
    BackendService_1.getAccountFromMarketImplementCollectionData,
], "publishedextensions", limitCount, skipCount, protocolName, protocolVersion);
exports.getAllPublishExtensionInfos = getAllPublishExtensionInfos;
let getAllPublishContributeInfos = (limitCount, skipCount, protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    BackendService_1.getMarketImplementCollection,
    BackendService_1.mapMarketImplementCollection,
    meta3d_backend_cloudbase_2.filterMarketImplementCollection,
    BackendService_1.getAccountFromMarketImplementCollectionData,
], "publishedcontributes", limitCount, skipCount, protocolName, protocolVersion);
exports.getAllPublishContributeInfos = getAllPublishContributeInfos;
let findPublishExtension = (onDownloadProgressFunc, limitCount, skipCount, account, name, version) => Abstract.findPublishImplement([
    BackendService_1.getMarketImplement,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], "publishedextensions", limitCount, skipCount, account, name, version);
exports.findPublishExtension = findPublishExtension;
let findPublishContribute = (onDownloadProgressFunc, limitCount, skipCount, account, name, version) => Abstract.findPublishImplement([
    BackendService_1.getMarketImplement,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], "publishedcontributes", limitCount, skipCount, account, name, version);
exports.findPublishContribute = findPublishContribute;
let publishApp = (onUploadProgressFunc, appBinaryFile, appName, account, description, previewBase64, isRecommend) => Abstract.publishApp([
    onUploadProgressFunc,
    BackendService_1.uploadFile,
    BackendService_1.deleteFile,
    BackendService_1.getDataByKey,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], appBinaryFile, appName, account, description, previewBase64, isRecommend);
exports.publishApp = publishApp;
let findPublishApp = (onDownloadProgressFunc, account, appName, notUseCacheForFindApp) => Abstract.findPublishApp([
    BackendService_1.getDataByKey,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], account, appName, notUseCacheForFindApp);
exports.findPublishApp = findPublishApp;
let findAllPublishAppsByAccount = (account) => Abstract.findAllPublishAppsByAccount(BackendService_1.getDataWithWhereData, account);
exports.findAllPublishAppsByAccount = findAllPublishAppsByAccount;
let findAllPublishApps = (limitCount, skipCount) => Abstract.findAllPublishApps(BackendService_1.getData, limitCount, skipCount);
exports.findAllPublishApps = findAllPublishApps;
let findAllRecommendPublishApps = () => Abstract.findAllRecommendPublishApps(BackendService_1.getDataWithWhereData);
exports.findAllRecommendPublishApps = findAllRecommendPublishApps;
let publishFinalApp = (onUploadProgressFunc, sceneGLB, appName, account, description, previewBase64, isRecommend) => Abstract.publishFinalApp([
    onUploadProgressFunc,
    BackendService_1.uploadFile,
    BackendService_1.deleteFile,
    BackendService_1.getDataByKey,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], sceneGLB, appName, account, description, previewBase64, isRecommend);
exports.publishFinalApp = publishFinalApp;
let findPublishFinalApp = (onDownloadProgressFunc, account, appName, notUseCacheForFindFinalApp) => Abstract.findPublishFinalApp([
    BackendService_1.getDataByKey,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], account, appName, notUseCacheForFindFinalApp);
exports.findPublishFinalApp = findPublishFinalApp;
let findAllPublishFinalAppsByAccount = (account) => Abstract.findAllPublishFinalAppsByAccount(BackendService_1.getDataWithWhereData, account);
exports.findAllPublishFinalAppsByAccount = findAllPublishFinalAppsByAccount;
let findAllPublishFinalApps = (limitCount, skipCount) => Abstract.findAllPublishFinalApps(BackendService_1.getData, limitCount, skipCount);
exports.findAllPublishFinalApps = findAllPublishFinalApps;
let findAllRecommendPublishFinalApps = () => Abstract.findAllRecommendPublishFinalApps(BackendService_1.getDataWithWhereData);
exports.findAllRecommendPublishFinalApps = findAllRecommendPublishFinalApps;
// let _throwError = (msg: string): never => {
//     throw new Error(msg)
// }
// export let publishElementContribute = (
//     onUploadProgressFunc,
//     account,
//     packageData,
//     contributeBinaryFile,
// ) => Abstract.publishElementContribute([
//     onUploadProgressFunc,
//     _throwError, uploadFile, getMarketImplementAccountData,
//     addMarketImplementData,
//     // updateMarketImplementData,
//     // getDataFromMarketImplementAccountData,
//     // buildMarketImplementAccountData, addMarketImplementDataToDataFromMarketImplementCollectionData,
//     getFileID
// ],
//     account,
//     packageData,
//     contributeBinaryFile,
// )
// export let publishElementAssembleData = (
//     account,
//     elementName,
//     elementVersion,
//     inspectorData,
//     customInputs,
//     customActions,
// ) => Abstract.publishElementAssembleData([
//     _throwError,
//     getMarketImplementAccountData,
//     addMarketImplementData,
//     // updateMarketImplementData, getDataFromMarketImplementAccountData, isContain, buildMarketImplementAccountData, 
//     // addMarketImplementDataToDataFromMarketImplementCollectionData,
// ],
//     account,
//     elementName,
//     elementVersion,
//     inspectorData,
//     customInputs,
//     customActions,
// )
// export let getAllPublishNewestExtensions = (limitCount, skipCount, protocolName) => Abstract.getAllPublishNewestData([
//     getMarketImplementCollection,
//     mapMarketImplementCollection,
//     getAccountFromMarketImplementCollectionData,
//     curry3_1(downloadFile)(_onDownloadProgressFuncForSingleExtensionOrContribute)
// ],
//     "publishedextensions",
//     limitCount,
//     skipCount,
//     protocolName
// )
// export let getElementAssembleData = (
//     account,
//     elementName,
//     elementVersion,
// ) => Abstract.getElementAssembleData(
//     getMarketImplementAccountDataWithWhereData,
//     account,
//     elementName,
//     elementVersion,
// )
// export let findAllElementAssembleData = (
//     limitCount,
//     skipCount,
// ) => Abstract.findAllElementAssembleData(
//     getData,
//     limitCount,
//     skipCount,
// )
let publishPackage = (onUploadProgressFunc, packageBinaryFile, entryExtensionData, packageData, account) => Abstract.publishPackage([
    onUploadProgressFunc,
    BackendService_1.uploadFile,
    BackendService_1.hasData,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], packageBinaryFile, entryExtensionData, packageData, account);
exports.publishPackage = publishPackage;
let getAllPublishPackageEntryExtensionProtocols = (limitCount, skipCount) => Abstract.getAllPublishPackageEntryExtensionProtocols(
// [
//     getPackageMarketEntryExtensionProtocolCollection,
//     getDataFromPackageMarketEntryExtensionProtocolCollection
// ]
BackendService_1.getData, limitCount, skipCount);
exports.getAllPublishPackageEntryExtensionProtocols = getAllPublishPackageEntryExtensionProtocols;
let getAllPublishPackageInfos = (limitCount, skipCount, entryExtensionProtocolName, entryExtensionProtocolVersion) => Abstract.getAllPublishPackageInfos(BackendService_1.getDataByKeyContain, limitCount, skipCount, entryExtensionProtocolName, entryExtensionProtocolVersion);
exports.getAllPublishPackageInfos = getAllPublishPackageInfos;
let findPublishPackage = (onDownloadProgressFunc, limitCount, skipCount, account, packageName, packageVersion) => Abstract.findPublishPackage([
    BackendService_1.getDataByKeyContain,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], limitCount, skipCount, account, packageName, packageVersion);
exports.findPublishPackage = findPublishPackage;
let findNewestPublishPackage = (onDownloadProgressFunc, entryExtensionProtocolName, packageName) => Abstract.findNewestPublishPackage([
    FindNewestService_1.findNewestPublishPackage,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], entryExtensionProtocolName, packageName);
exports.findNewestPublishPackage = findNewestPublishPackage;
let findNewestPublishExtension = (onDownloadProgressFunc, extensionName, extensionProtocolName) => {
    return (0, FindNewestService_1.findNewestPublishExtension)((0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc), extensionName, extensionProtocolName);
};
exports.findNewestPublishExtension = findNewestPublishExtension;
let findNewestPublishContribute = (onDownloadProgressFunc, contributeName, contributeProtocolName) => {
    return (0, FindNewestService_1.findNewestPublishContribute)((0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc), contributeName, contributeProtocolName);
};
exports.findNewestPublishContribute = findNewestPublishContribute;
// export let findNewestPublishElementAssembleData = findNewestPublishElementAssembleDataFind
// function _defineWindow() {
//     (global as any).window = {}
// }
// let _getFileDirname = (fileType: "extension" | "contribute") => {
//     switch (fileType) {
//         case "extension":
//             return "extensions"
//         case "contribute":
//             return "contributes"
//     }
// }
let _getFileDirname = () => {
    return "mods";
};
// let _getPublishedCollectionName = (fileType: "extension" | "contribute") => {
//     switch (fileType) {
//         case "extension":
//             return "publishedextensions"
//         case "contribute":
//             return "publishedcontributes"
//     }
// }
// let _getFiles = (dir, filelist = []) => {
//     if (!fs.existsSync(dir)) {
//         return filelist;
//     }
//     const files = fs.readdirSync(dir);
//     filelist = filelist || [];
//     files.forEach((file) => {
//         const filepath = path.join(dir, file);
//         const stats = fs.statSync(filepath);
//         if (stats.isDirectory()) {
//             filelist = _getFiles(filepath, filelist); // 递归调用
//         } else {
//             filelist.push(filepath);
//         }
//     });
//     return filelist;
// }
// let _readAllAssets = (assetFileDir: string, protocolName, blockName): [fileJson, Array<Uint8Array>, Array<Uint8Array>, Array<Uint8Array>] => {
//     return _getFiles(assetFileDir).reduce(([fileJson, imageFiles, soundFiles, glbFiles], filePath) => {
//         switch (path.extname(filePath)) {
//             case ".png":
//             case ".jpg":
//                 imageFiles.push(new Uint8Array(fs.readFileSync(filePath)))
//                 fileJson.imagePaths.push(filePath)
//                 break
//             case ".mp3":
//                 soundFiles.push(new Uint8Array(fs.readFileSync(filePath)))
//                 fileJson.soundPaths.push(filePath)
//                 break
//             case ".glb":
//                 glbFiles.push(new Uint8Array(fs.readFileSync(filePath)))
//                 fileJson.glbPaths.push(filePath)
//                 break
//             default:
//                 throw new Error("err")
//         }
//         return [fileJson, imageFiles, soundFiles, glbFiles]
//     }, [{
//         protocolName, blockName,
//         imagePaths: [], soundPaths: [], glbPaths: [],
//     }, [], [], []])
// }
let _extname = (path) => {
    // 1. 类型检查
    if (typeof path !== 'string') {
        return '';
    }
    // 2. 查找最后一个斜杠（处理目录路径）
    const lastSlash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
    // 3. 从最后一个斜杠之后开始查找（文件名部分）
    const start = lastSlash + 1;
    const fileName = path.substring(start);
    // 4. 查找文件名中的第一个点（从开头查找）
    const firstDotInName = fileName.indexOf('.');
    // 5. 特殊处理：隐藏文件（以点开头的文件）
    if (firstDotInName === 0) {
        // 如果是隐藏文件，需要在第一个点之后继续查找
        const secondDot = fileName.indexOf('.', 1);
        if (secondDot !== -1) {
            // 有第二个点，返回从第二个点开始到结尾的部分
            return fileName.substring(secondDot);
        }
        return ''; // 只有一个点或多个连续点但没有其他扩展名
    }
    // 6. 查找文件名中的最后一个点（从末尾查找）
    const lastDotInName = fileName.lastIndexOf('.');
    // 7. 根据规则判断
    if (lastDotInName === -1) {
        // 没有点，返回空字符串
        return '';
    }
    // 8. 检查点是否在字符串末尾（例如 "index."）
    if (lastDotInName === fileName.length - 1) {
        return ''; // 点在末尾，没有扩展名
    }
    // 9. 返回扩展名（包括点）
    return fileName.substring(lastDotInName);
};
let _readAllAssets = (assetFileData, protocolName, blockName) => {
    return assetFileData.reduce(([fileJson, imageFiles, soundFiles, glbFiles], [filePath, fileContent]) => {
        switch (_extname(filePath)) {
            case ".png":
            case ".jpg":
                imageFiles.push(fileContent);
                fileJson.imagePaths.push(filePath);
                break;
            case ".mp3":
                soundFiles.push(fileContent);
                fileJson.soundPaths.push(filePath);
                break;
            case ".glb":
                glbFiles.push(fileContent);
                fileJson.glbPaths.push(filePath);
                break;
            default:
                throw new Error("err");
        }
        return [fileJson, imageFiles, soundFiles, glbFiles];
    }, [{
            protocolName, blockName,
            imagePaths: [], soundPaths: [], glbPaths: [],
        }, [], [], []]);
};
let _getLocalEnvData = () => {
    return {
        secretId: "AKIDdL16e8c2KOWccglputqiU8cO5fMYlhcM",
        secretKey: "a1GJHNZntyxojls2Galt8FHSp5A1g8Ul",
        env: "meta3d-local-9gacdhjl439cff76" // 此处填入您的环境ID 
    };
};
let publishMod = (
// [logFunc, errorFunc, generateFunc, initFunc, uploadFileFunc,
//     getModDataFunc,
//     setModDataFunc,
//     getFileIDFunc]: any,
packageJson, readmeContent, distFileContent, assetFileData, iconBase64) => {
    let [logFunc, errorFunc, generateFunc, initFunc, uploadFileFunc, getModDataFunc, setModDataFunc, getFileIDFunc] = [
        console.log,
        console.error,
        meta3d_1.generateMod,
        () => {
            let app = js_sdk_1.default.init(_getLocalEnvData());
            (0, Repo_1.setBackend)(app);
            return (0, most_1.just)(app);
        },
        // BackendService.uploadFile,
        BackendService_1.uploadFile,
        BackendService.getData,
        BackendService.setData,
        BackendService.getFileID,
    ];
    // return readJsonFunc(packageFilePath)
    //     .flatMap(packageJson => {
    //         let readmeContent = readFileSyncFunc(path.join(path.dirname(packageFilePath), "README.md"), "utf-8")
    //         return initFunc().map(backendInstance => [backendInstance, packageJson, readmeContent])
    //     })
    return initFunc().map(backendInstance => [backendInstance, JSON.parse(packageJson), readmeContent])
        .flatMap(([backendInstance, packageJson, readmeContent]) => {
        // _defineWindow()
        let modJson = packageJson.mod;
        let fileName = packageJson.name + "_" + packageJson.version;
        let filePath = _getFileDirname() + "/" + fileName + ".arrayBuffer";
        let [assetFileJson, imageFiles, soundFiles, glbFiles] = _readAllAssets(assetFileData, modJson.protocolName, packageJson.name);
        return uploadFileFunc(_ => { }, 
        // backendInstance,
        filePath, generateFunc(distFileContent, assetFileJson, imageFiles.concat(soundFiles).concat(glbFiles)), fileName).flatMap((uploadData) => {
            let fileID = getFileIDFunc(uploadData, filePath);
            // let packageData = _convertToExtensionOrContributePackageData(packageJson, account)
            let key = (0, meta3d_backend_cloudbase_1.handleKeyToLowercase)(packageJson.name);
            let data = {
                // protocolName: packageData.protocol.name,
                // protocolVersion: packageData.protocol.version,
                name: packageJson.name,
                version: packageJson.version,
                protocolName: modJson.protocolName,
                // protocolVersion: modJson.protocolVersion,
                author: modJson.author,
                // category: modJson.category,
                displayName_cn: (0, NullableUtils_1.getWithDefault)(modJson.displayName_cn, modJson.displayName_en),
                displayName_en: (0, NullableUtils_1.getWithDefault)(modJson.displayName_en, modJson.displayName_cn),
                repoLink: modJson.repoLink,
                // description_cn: getWithDefault(modJson.description_cn, modJson.description_en),
                // description_en: getWithDefault(modJson.description_en, modJson.description_cn),
                description: readmeContent,
                // icon: map(icon => {
                //     return _readBase64(icon)
                // }, modJson.icon),
                icon: iconBase64,
                lastPublishTime: moment.now(),
                isPublic: modJson.isPublic,
                dependentMods: (0, NullableUtils_1.getWithDefault)(modJson.dependentMods, []),
                fileID,
                // key: handleKeyToLowercase(account)
                key,
            };
            // return fromPromise(
            //     addModDataFunc(
            //         backendInstance,
            //         // _getPublishedCollectionName(fileType),
            //         "publishedmods",
            //         data
            //     )
            // )
            let collectionName = "publishedmods";
            return (0, most_1.fromPromise)(getModDataFunc(backendInstance, collectionName, key).then(currentData => {
                if ((0, NullableUtils_1.isNullable)(currentData)) {
                    data = Object.assign(Object.assign({}, data), { subscribe: 0, visit: 0 });
                }
                else {
                    data = Object.assign(Object.assign({}, currentData), data);
                    delete data._id;
                    delete data._openid;
                }
                return setModDataFunc(backendInstance, collectionName, key, data);
            }));
        });
    });
    // .drain()
    // .then(_ => {
    //     logFunc("publish success")
    // })
    // .catch(e => {
    //     errorFunc("error message: ", e)
    // })
};
exports.publishMod = publishMod;
