import { empty, fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { publishAppInfo } from "./PublishAppType"
import { handleKeyToLowercase } from "meta3d-backend-cloudbase/src/Main"

let _buildFileName = (appName: string, account: string) => account + "_" + appName

export let _buildKey = (appName: string, account: string) => handleKeyToLowercase(_buildFileName(appName, account))

export let publish = (
    [onUploadProgressFunc, uploadFileFunc, deleteFileFunc, getDataByKeyFunc, addDataFunc, updateDataFunc, getFileIDFunc]: [any, any, any, any, any, any, any],
    appBinaryFile: ArrayBuffer, appName: string, account: string, description: string, previewBase64: nullable<string>,
    // useCount: number,
    isRecommend: boolean) => {
    let key = _buildKey(appName, account)

    return fromPromise(getDataByKeyFunc("publishedapps", key)).concatMap((data: Array<publishAppInfo>) => {
        let fileName = _buildFileName(appName, account)
        let filePath = "apps/" + fileName + ".arrayBuffer"
        let isExist = false
        let stream = null

        if (data.length > 1) {
            throw new Error("count shouldn't > 1")
        }

        if (data.length == 1) {
            isExist = true
            stream = deleteFileFunc(data[0].fileID)
        }
        else {
            isExist = false
            stream = just(null)
        }

        return stream.concatMap(_ => {
            return uploadFileFunc(onUploadProgressFunc, filePath, appBinaryFile, fileName)
        }).concatMap((uploadData) => {
            let fileID = getFileIDFunc(uploadData, filePath)

            if (isExist) {
                return fromPromise(updateDataFunc(
                    "publishedapps",
                    key,
                    {
                        account,
                        appName,
                        description,
                        previewBase64,
                        // useCount,
                        isRecommend,
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
                    previewBase64,
                    // useCount,
                    isRecommend,
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

export let findAllPublishAppsByAccount = (
    getDataWithWhereDataFunc: any,
    account: string): Stream<Array<publishAppInfo>> => {
    return fromPromise(getDataWithWhereDataFunc("publishedapps", { account: account })).flatMap((data: any) => {
        if (data.length === 0) {
            return just([])
        }

        // return just(data.map(({ account, appName, description }) => {
        //     return {
        //         account,
        //         appName,
        //         description
        //     }
        // }))
        return just(data)
    })
}

export let findAllPublishApps = (
    getDataFunc: any,
    limitCount: number,
    skipCount: number,
): Stream<Array<publishAppInfo>> => {
    return fromPromise(getDataFunc("publishedapps", limitCount, skipCount)).flatMap((data: any) => {
        if (data.length === 0) {
            return just([])
        }

        // return just(data.map(({ account, appName, description }) => {
        //     return {
        //         account,
        //         appName,
        //         description
        //     }
        // }))
        return just(data)
    })
}

export let findAllRecommendPublishApps = (
    getDataWithWhereDataFunc: any
): Stream<Array<publishAppInfo>> => {
    return fromPromise(
        getDataWithWhereDataFunc("publishedapps", { isRecommend: true })).flatMap((data: any) => {
            if (data.length === 0) {
                return just([])
            }

            return just(data)
        })
}