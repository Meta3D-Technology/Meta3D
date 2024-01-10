import { empty, fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { publishFinalAppInfo } from "./PublishFinalAppType"
import { handleKeyToLowercase } from "meta3d-backend-cloudbase/src/Main"

let _buildFileName = (appName: string, account: string) => account + "_" + appName

export let _buildKey = (appName: string, account: string) => handleKeyToLowercase(_buildFileName(appName, account))

export let publish = (
    [onUploadProgressFunc, uploadFileFunc, deleteFileFunc, getDataByKeyFunc, addDataFunc, updateDataFunc, getFileIDFunc]: [any, any, any, any, any, any, any],
    sceneGLB: ArrayBuffer, appName: string, account: string, description: string, previewBase64: nullable<string>,
    // useCount: number,
    isRecommend: boolean) => {
    let key = _buildKey(appName, account)

    return fromPromise(getDataByKeyFunc("publishedfinalapps", key)).concatMap((data: Array<publishFinalAppInfo>) => {
        let fileName = _buildFileName(appName, account)
        let filePath = "finalapps/" + fileName + ".arrayBuffer"
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
            return uploadFileFunc(onUploadProgressFunc, filePath, sceneGLB, fileName)
        }).concatMap((uploadData) => {
            let fileID = getFileIDFunc(uploadData, filePath)

            if (isExist) {
                return fromPromise(updateDataFunc(
                    "publishedfinalapps",
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

            return fromPromise(addDataFunc("publishedfinalapps",
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

// export let enterFinalApp = (sceneGLB: ArrayBuffer) => {
// 	// TODO open new url with ?account, appName

// 	// let _meta3DState = loadFinalApp(_findFinalAppBinaryFile(account, appName))
// 	let _meta3DState = loadFinalApp(sceneGLB)
// }


export let findPublishFinalApp = ([getDataByKeyFunc, downloadFileFunc]: [any, any], account: string, appName: string, notUseCacheForFindFinalApp: boolean): Stream<nullable<ArrayBuffer>> => {
    return fromPromise(getDataByKeyFunc("publishedfinalapps", _buildKey(appName, account))).flatMap((data: any) => {
        if (data.length === 0) {
            return just(null)
        }

        return downloadFileFunc(data[0].fileID, notUseCacheForFindFinalApp)
    })
}

export let findAllPublishFinalAppsByAccount = (
    getDataWithWhereDataFunc: any,
    account: string): Stream<Array<publishFinalAppInfo>> => {
    return fromPromise(getDataWithWhereDataFunc("publishedfinalapps", { account: account })).flatMap((data: any) => {
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

export let findAllPublishFinalApps = (
    getDataFunc: any,
    limitCount: number,
    skipCount: number,
): Stream<Array<publishFinalAppInfo>> => {
    return fromPromise(getDataFunc("publishedfinalapps", limitCount, skipCount)).flatMap((data: any) => {
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

export let findAllRecommendPublishFinalApps = (
    getDataWithWhereDataFunc: any
): Stream<Array<publishFinalAppInfo>> => {
    return fromPromise(
        getDataWithWhereDataFunc("publishedfinalapps", { isRecommend: true })).flatMap((data: any) => {
            if (data.length === 0) {
                return just([])
            }

            return just(data)
        })
}