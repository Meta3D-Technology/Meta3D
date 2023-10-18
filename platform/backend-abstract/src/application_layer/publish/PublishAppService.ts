import { fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { publishAppInfo } from "./PublishAppType"
import { handleKeyToLowercase } from "meta3d-backend-cloudbase/src/Main"

let _buildFileName = (appName: string, account: string) => account + "_" + appName

export let _buildKey = (appName: string, account: string) => handleKeyToLowercase(_buildFileName(appName, account))

export let publish = (
    [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc]: [any, any, any, any, any, any],
    appBinaryFile: ArrayBuffer, appName: string, account: string, description: string) => {
    let key = _buildKey(appName, account)

    return hasDataFunc("publishedapps", key).concatMap((isExist) => {
        let fileName = _buildFileName(appName, account)
        let filePath = "apps/" + fileName + ".arrayBuffer"

        return uploadFileFunc(onUploadProgressFunc, filePath, appBinaryFile, fileName).concatMap((uploadData) => {
            let fileID = getFileIDFunc(uploadData, filePath)

            if (isExist) {
                return fromPromise(updateDataFunc(
                    "publishedapps",
                    key,
                    {
                        account,
                        appName,
                        description,
                        fileID
                    }
                ))
            }

            return fromPromise(addDataFunc("publishedapps",
                key,
                {
                    account,
                    appName,
                    description,
                    fileID
                }))
        })
    })
}

// export let enterApp = (appBinaryFile: ArrayBuffer) => {
// 	// TODO open new url with ?account, appName

// 	// let _meta3DState = loadApp(_findAppBinaryFile(account, appName))
// 	let _meta3DState = loadApp(appBinaryFile)
// }


export let findPublishApp = ([getDataByKeyFunc, downloadFileFunc]: [any, any], account: string, appName: string): Stream<nullable<ArrayBuffer>> => {
    return fromPromise(getDataByKeyFunc("publishedapps", _buildKey(appName, account))).flatMap((data: any) => {
        if (data.length === 0) {
            return just(null)
        }

        return downloadFileFunc(data[0].fileID)
    })
}

// export let findAllPublishAppsByAccount = (
//     getDataByKeyContainFunc: any,
//     account: string): Stream<Array<publishAppInfo>> => {
//     return getDataByKeyContainFunc("publishedapps", [account]).flatMap((data: any) => {
//         if (data.length === 0) {
//             return just([])
//         }

//         return just(data.map(({ account, appName, description }) => {
//             return {
//                 account,
//                 appName,
//                 description
//             }
//         }))
//     })
// }

export let findAllPublishApps = (
    getDataFunc: any,
    limitCount: number,
    skipCount: number,
): Stream<Array<publishAppInfo>> => {
    return fromPromise(getDataFunc("publishedapps", limitCount, skipCount)).flatMap((data: any) => {
        if (data.length === 0) {
            return just([])
        }

        return just(data.map(({ account, appName, description }) => {
            return {
                account,
                appName,
                description
            }
        }))
    })
}