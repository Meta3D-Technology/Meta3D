import * as Abstract from "backend-abstract";
import { curry3_1 } from "meta3d-fp/src/Curry";
import { fileJson } from "meta3d";
import { fromPromise, just } from "most";
import { handleKeyToLowercase } from "meta3d-backend-cloudbase";
import * as moment from "moment";
import { getWithDefault, isNullable, map } from "meta3d-commonlib-ts/src/NullableUtils";
// import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { generateMod } from "meta3d";
// import * as CloudbaseService from "meta3d-tool-utils/src/publish/Ba";
import * as BackendService from "meta3d-backend-cloudbase";
import tcb from "@cloudbase/js-sdk"


import {
    init as initCloud,
    checkUserName as checkUserNameCloud,
    handleLoginForWeb3 as handleLoginForWeb3Cloud, getMarketProtocolCollection,
    getMarketProtocolCollectionCount,
    getDataFromMarketProtocolCollection,
    getMarketImplementCollection,
    registerUser as registerUserCloud,
    mapMarketImplementCollection,
    getAccountFromMarketImplementCollectionData,
    // getFileDataFromMarketImplementCollectionData,
    downloadFile,
    addData,
    hasData,
    getFileID,
    uploadFile,
    updateData,
    getDataByKey,
    getMarketImplementAccountData,
    addMarketImplementData,
    // getDataFromMarketImplementAccountData,
    // isContain,
    // buildMarketImplementAccountData,

    // addMarketImplementDataToDataFromMarketImplementCollectionData,
    getDataByKeyContain, getMarketImplement,
    // getPackageMarketEntryExtensionProtocolCollection,
    // getDataFromPackageMarketEntryExtensionProtocolCollection,
    getData,
    batchFindMarketProtocolCollection,
    getMarketImplementAccountDataWithWhereData,
    deleteFile,
    getDataWithWhereData
} from "./application_layer/BackendService";
import {
    findNewestPublishPackage as findNewestPublishPackageFind,
    findNewestPublishExtension as findNewestPublishExtensionFind,
    findNewestPublishContribute as findNewestPublishContributeFind,
    // findNewestPublishElementAssembleData as findNewestPublishElementAssembleDataFind,
} from "./application_layer/FindNewestService";
import { filterMarketImplementCollection, getKey } from "meta3d-backend-cloudbase";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { setBackend } from "./domain_layer/repo/Repo";


// export let error = ErrorService.error

export let init = (env) => Abstract.init(initCloud, env)

export let checkUserName = (account) => Abstract.checkUserName(checkUserNameCloud, account)

export let handleLoginForWeb3 = (account) => Abstract.handleLoginForWeb3(handleLoginForWeb3Cloud, account)

export let registerUser = (account) => Abstract.registerUser(registerUserCloud, account)


export let isLoginSuccess = (account) => Abstract.isLoginSuccess(hasData, account)


export let getAllPublishExtensionProtocolsCount = () => Abstract.getAllPublishProtocolDataCount(getMarketProtocolCollectionCount, "publishedextensionprotocols")

export let getAllPublishExtensionProtocols = (limitCount, skipCount) => Abstract.getAllPublishProtocolData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedextensionprotocols", limitCount, skipCount)

export let getAllPublishContributeProtocols = (limitCount, skipCount) => Abstract.getAllPublishProtocolData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedcontributeprotocols", limitCount, skipCount)

export let batchFindPublishExtensionProtocols = (protocolName) => Abstract.batchFindPublishProtocolData([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedextensionprotocols", protocolName)

export let batchFindPublishContributeProtocols = (protocolName) => Abstract.batchFindPublishProtocolData([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedcontributeprotocols", protocolName)

export let getAllPublishExtensionProtocolConfigs = (limitCount, skipCount) => Abstract.getAllPublishProtocolConfigData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedextensionprotocolconfigs", limitCount, skipCount)

export let getAllPublishContributeProtocolConfigs = (limitCount, skipCount) => Abstract.getAllPublishProtocolConfigData([getMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedcontributeprotocolconfigs", limitCount, skipCount)

export let batchFindPublishExtensionProtocolConfigs = (protocolName) => Abstract.batchFindPublishProtocolConfigData([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedextensionprotocolconfigs", protocolName)

export let batchFindPublishContributeProtocolConfigs = (protocolName) => Abstract.batchFindPublishProtocolConfigData([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollection], "publishedcontributeprotocolconfigs", protocolName)

let _onDownloadProgressFuncForSingleExtensionOrContribute = console.log

export let getAllPublishExtensionInfos = (
    limitCount, skipCount,
    protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
        getMarketImplementCollection,
        mapMarketImplementCollection,
        filterMarketImplementCollection,
        getAccountFromMarketImplementCollectionData,
    ], "publishedextensions",
        limitCount, skipCount,
        protocolName, protocolVersion)

export let getAllPublishContributeInfos = (
    limitCount, skipCount,
    protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
        getMarketImplementCollection,
        mapMarketImplementCollection,
        filterMarketImplementCollection,
        getAccountFromMarketImplementCollectionData,
    ], "publishedcontributes",
        limitCount, skipCount,
        protocolName, protocolVersion)

export let findPublishExtension = (onDownloadProgressFunc,
    limitCount,
    skipCount,
    account,
    name,
    version
) => Abstract.findPublishImplement([
    getMarketImplement,
    curry3_1(downloadFile)(onDownloadProgressFunc)
],
    "publishedextensions",
    limitCount,
    skipCount,
    account,
    name,
    version
)

export let findPublishContribute = (onDownloadProgressFunc,
    limitCount,
    skipCount,
    account,
    name,
    version
) => Abstract.findPublishImplement([
    getMarketImplement,
    curry3_1(downloadFile)(onDownloadProgressFunc)
],
    "publishedcontributes",
    limitCount,
    skipCount,
    account,
    name,
    version
)

export let publishApp = (onUploadProgressFunc, appBinaryFile, appName, account, description,
    previewBase64, isRecommend
) => Abstract.publishApp([
    onUploadProgressFunc,
    uploadFile,
    deleteFile,
    getDataByKey,
    addData,
    updateData,
    getFileID,
],
    appBinaryFile, appName, account,
    description,
    previewBase64, isRecommend
)

export let findPublishApp = (onDownloadProgressFunc, account, appName, notUseCacheForFindApp) => Abstract.findPublishApp([
    getDataByKey,
    curry3_1(downloadFile)(onDownloadProgressFunc)
],
    account, appName, notUseCacheForFindApp
)

export let findAllPublishAppsByAccount = (account) => Abstract.findAllPublishAppsByAccount(
    getDataWithWhereData,
    account
)

export let findAllPublishApps = (
    limitCount,
    skipCount,
) => Abstract.findAllPublishApps(
    getData,
    limitCount,
    skipCount,
)

export let findAllRecommendPublishApps = (
) => Abstract.findAllRecommendPublishApps(
    getDataWithWhereData
)


export let publishFinalApp = (onUploadProgressFunc, sceneGLB, appName, account, description,
    previewBase64, isRecommend
) => Abstract.publishFinalApp([
    onUploadProgressFunc,
    uploadFile,
    deleteFile,
    getDataByKey,
    addData,
    updateData,
    getFileID,
],
    sceneGLB, appName, account,
    description,
    previewBase64, isRecommend
)

export let findPublishFinalApp = (onDownloadProgressFunc, account, appName, notUseCacheForFindFinalApp) => Abstract.findPublishFinalApp([
    getDataByKey,
    curry3_1(downloadFile)(onDownloadProgressFunc)
],
    account, appName, notUseCacheForFindFinalApp
)

export let findAllPublishFinalAppsByAccount = (account) => Abstract.findAllPublishFinalAppsByAccount(
    getDataWithWhereData,
    account
)

export let findAllPublishFinalApps = (
    limitCount,
    skipCount,
) => Abstract.findAllPublishFinalApps(
    getData,
    limitCount,
    skipCount,
)

export let findAllRecommendPublishFinalApps = (
) => Abstract.findAllRecommendPublishFinalApps(
    getDataWithWhereData
)

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


export let publishPackage = (onUploadProgressFunc,
    packageBinaryFile,
    entryExtensionData,
    packageData,
    account,
) => Abstract.publishPackage([
    onUploadProgressFunc,
    uploadFile,
    hasData,
    addData,
    updateData,
    getFileID,
],
    packageBinaryFile,
    entryExtensionData,
    packageData,
    account,
)

export let getAllPublishPackageEntryExtensionProtocols = (
    limitCount,
    skipCount,
) => Abstract.getAllPublishPackageEntryExtensionProtocols(
    // [
    //     getPackageMarketEntryExtensionProtocolCollection,
    //     getDataFromPackageMarketEntryExtensionProtocolCollection
    // ]
    getData,
    limitCount,
    skipCount,
)

export let getAllPublishPackageInfos = (
    limitCount,
    skipCount,
    entryExtensionProtocolName,
    entryExtensionProtocolVersion,
) => Abstract.getAllPublishPackageInfos(
    getDataByKeyContain,
    limitCount,
    skipCount,
    entryExtensionProtocolName,
    entryExtensionProtocolVersion,
)

export let findPublishPackage = (onDownloadProgressFunc, limitCount, skipCount, account, packageName, packageVersion) => Abstract.findPublishPackage([
    getDataByKeyContain,
    curry3_1(downloadFile)(onDownloadProgressFunc)
],
    limitCount, skipCount,
    account, packageName, packageVersion
)

export let findNewestPublishPackage = (onDownloadProgressFunc, entryExtensionProtocolName, packageName) => Abstract.findNewestPublishPackage([
    findNewestPublishPackageFind,
    curry3_1(downloadFile)(onDownloadProgressFunc)
],
    entryExtensionProtocolName, packageName
)

export let findNewestPublishExtension = (onDownloadProgressFunc, extensionName, extensionProtocolName) => {
    return findNewestPublishExtensionFind(
        curry3_1(downloadFile)(onDownloadProgressFunc), extensionName, extensionProtocolName
    )
}

export let findNewestPublishContribute = (onDownloadProgressFunc, contributeName, contributeProtocolName) => {
    return findNewestPublishContributeFind(
        curry3_1(downloadFile)(onDownloadProgressFunc), contributeName, contributeProtocolName
    )
}

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
    return "mods"
}


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
    const lastSlash = Math.max(
        path.lastIndexOf('/'),
        path.lastIndexOf('\\')
    );

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
}

let _readAllAssets = (
    assetFileData: Array<[string, Uint8Array]>,
    protocolName, blockName): [fileJson, Array<Uint8Array>, Array<Uint8Array>, Array<Uint8Array>] => {
    return assetFileData.reduce(([fileJson, imageFiles, soundFiles, glbFiles], [filePath, fileContent]) => {
        switch (_extname(filePath)) {
            case ".png":
            case ".jpg":
                imageFiles.push(fileContent)

                fileJson.imagePaths.push(filePath)
                break
            case ".mp3":
                soundFiles.push(fileContent)

                fileJson.soundPaths.push(filePath)
                break
            case ".glb":
                glbFiles.push(fileContent)

                fileJson.glbPaths.push(filePath)
                break
            default:
                throw new Error("err")
        }

        return [fileJson, imageFiles, soundFiles, glbFiles]
    }, [{
        protocolName, blockName,
        imagePaths: [], soundPaths: [], glbPaths: [],
    }, [], [], []])
}


let _getLocalEnvData = () => {
    return {
        secretId: "AKIDdL16e8c2KOWccglputqiU8cO5fMYlhcM",
        secretKey: "a1GJHNZntyxojls2Galt8FHSp5A1g8Ul",
        env: "meta3d-local-9gacdhjl439cff76" // 此处填入您的环境ID 
    }
}


export let publishMod = (
    // [logFunc, errorFunc, generateFunc, initFunc, uploadFileFunc,
    //     getModDataFunc,
    //     setModDataFunc,

    //     getFileIDFunc]: any,
    packageJson: string,
    readmeContent: string,
    distFileContent: string,
    assetFileData: Array<[string, Uint8Array]>,
    iconBase64: nullable<string>,
) => {
    let [logFunc, errorFunc, generateFunc, initFunc, uploadFileFunc,
        getModDataFunc,
        setModDataFunc,

        getFileIDFunc] = [
            console.log,
            console.error,
            generateMod,
            () => {
                let app: any = tcb.init(_getLocalEnvData())

                setBackend(app)

                return just(app)
            },
            // BackendService.uploadFile,
            uploadFile,

            BackendService.getData,
            BackendService.setData,

            BackendService.getFileID,
        ]

    // return readJsonFunc(packageFilePath)
    //     .flatMap(packageJson => {
    //         let readmeContent = readFileSyncFunc(path.join(path.dirname(packageFilePath), "README.md"), "utf-8")

    //         return initFunc().map(backendInstance => [backendInstance, packageJson, readmeContent])
    //     })
    return initFunc().map(backendInstance => [backendInstance, JSON.parse(packageJson), readmeContent])
        .flatMap(([backendInstance, packageJson, readmeContent]) => {
            // _defineWindow()

            let modJson = packageJson.mod

            let fileName = packageJson.name + "_" + packageJson.version

            let filePath =
                _getFileDirname() + "/" + fileName + ".arrayBuffer"

            let [assetFileJson, imageFiles, soundFiles, glbFiles] = _readAllAssets(assetFileData, modJson.protocolName, packageJson.name)

            return uploadFileFunc(
                _ => { },
                // backendInstance,
                filePath,
                generateFunc(
                    distFileContent,
                    assetFileJson,
                    imageFiles.concat(soundFiles).concat(glbFiles),
                ),
                fileName
            ).flatMap((uploadData: any) => {
                let fileID = getFileIDFunc(uploadData, filePath)

                // let packageData = _convertToExtensionOrContributePackageData(packageJson, account)

                let key = handleKeyToLowercase(packageJson.name)

                let data = {
                    // protocolName: packageData.protocol.name,
                    // protocolVersion: packageData.protocol.version,
                    name: packageJson.name,
                    version: packageJson.version,

                    protocolName: modJson.protocolName,
                    // protocolVersion: modJson.protocolVersion,
                    author: modJson.author,
                    // category: modJson.category,
                    displayName_cn: getWithDefault(modJson.displayName_cn, modJson.displayName_en),
                    displayName_en: getWithDefault(modJson.displayName_en, modJson.displayName_cn),
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

                    dependentMods: getWithDefault(modJson.dependentMods, []),

                    fileID,
                    // key: handleKeyToLowercase(account)
                    key,
                }

                // return fromPromise(
                //     addModDataFunc(
                //         backendInstance,
                //         // _getPublishedCollectionName(fileType),
                //         "publishedmods",
                //         data
                //     )
                // )
                let collectionName = "publishedmods"

                return fromPromise(getModDataFunc(backendInstance, collectionName, key).then(currentData => {
                    if (isNullable(currentData)) {
                        data = {
                            ...data,
                            subscribe: 0,
                            visit: 0
                        } as any
                    }
                    else {
                        data = {
                            ...currentData,
                            ...data,
                        } as any

                        delete (data as any)._id
                        delete (data as any)._openid
                    }

                    return setModDataFunc(backendInstance, collectionName, key, data)
                }))
            }
            )

        })
    // .drain()
    // .then(_ => {
    //     logFunc("publish success")
    // })
    // .catch(e => {
    //     errorFunc("error message: ", e)
    // })
}