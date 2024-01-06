import { empty, fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { fileType, publishFinalAppInfo } from "./PublishFinalAppType"
import { handleKeyToLowercase } from "meta3d-backend-cloudbase/src/Main"

let _buildFileName = (finalAppName: string, account: string, type: fileType) => account + "_" + finalAppName + "_" + type

export let _buildKey = (finalAppName: string, account: string) => handleKeyToLowercase(
    finalAppName + "_" + account
)

export let publish = (
    [onUploadProgressFunc, uploadFileFunc, deleteFileFunc, getDataByKeyFunc, addDataFunc, updateDataFunc, getFileIDFunc]: [any, any, any, any, any, any, any],
    contentBinaryFile: ArrayBuffer,
    singleEventBinaryFile: ArrayBuffer,
    finalAppName: string, account: string, description: string, previewBase64: nullable<string>,
    // useCount: number,
    isRecommend: boolean) => {
    let key = _buildKey(finalAppName, account)

    return fromPromise(getDataByKeyFunc("publishedfinalapps", key)).concatMap((data: Array<publishFinalAppInfo>) => {
        let contentFileName = _buildFileName(finalAppName, account, "content")
        let contentFilePath = "finalapps/" + contentFileName + ".arrayBuffer"
        let singleEventFileName = _buildFileName(finalAppName, account, "singleEvent")
        let singleEventFilePath = "finalapps/" + singleEventFileName + ".arrayBuffer"
        let isExist = false
        let stream1 = null
        let stream2 = null

        if (data.length > 1) {
            throw new Error("count shouldn't > 1")
        }

        if (data.length == 1) {
            isExist = true
            stream1 = deleteFileFunc(data[0].contentFileID)
            stream2 = deleteFileFunc(data[0].singleEventFileID)
        }
        else {
            isExist = false
            stream1 = just(null)
            stream2 = just(null)
        }

        return stream1.concatMap(_ => {
            return uploadFileFunc(onUploadProgressFunc, contentFilePath, contentBinaryFile, contentFileName)
        }).concatMap((uploadData) => {
            let contentFileID = getFileIDFunc(uploadData, contentFilePath)

            return stream2.concatMap(_ => {
                return uploadFileFunc(onUploadProgressFunc, singleEventFilePath, singleEventBinaryFile, singleEventFileName)
            }).concatMap((uploadData) => {
                return just([
                    contentFileID,
                    getFileIDFunc(uploadData, singleEventFilePath)
                ])
            })
        }).concatMap(([contentFileID, singleEventFileID]) => {
            if (isExist) {
                return fromPromise(updateDataFunc(
                    "publishedfinalapps",
                    key,
                    {
                        account,
                        finalAppName,
                        description,
                        previewBase64,
                        // useCount,
                        isRecommend,
                        contentFileID, singleEventFileID
                    }
                ))
            }

            return fromPromise(addDataFunc("publishedfinalapps",
                key,
                {
                    account,
                    finalAppName,
                    description,
                    previewBase64,
                    // useCount,
                    isRecommend,
                    contentFileID, singleEventFileID
                }))
        })
    })
}

// export let enterFinalApp = (contentBinaryFile: ArrayBuffer) => {
// 	// TODO open new url with ?account, finalAppName

// 	// let _meta3DState = loadFinalApp(_findFinalAppBinaryFile(account, finalAppName))
// 	let _meta3DState = loadFinalApp(contentBinaryFile)
// }


export let findPublishFinalApp = ([getDataByKeyFunc, downloadFileFunc]: [any, any], account: string, finalAppName: string,
    fileType: fileType,
    notUseCacheForFindFinalApp: boolean): Stream<nullable<ArrayBuffer>> => {
    return fromPromise(getDataByKeyFunc("publishedfinalapps", _buildKey(finalAppName, account))).flatMap((data: Array<publishFinalAppInfo>) => {
        if (data.length === 0) {
            return just(null)
        }

        let fileID = null

        switch (fileType) {
            case "content":
                fileID = data[0].contentFileID
                break;
            case "singleEvent":
                fileID = data[0].singleEventFileID
                break;
        }

        return downloadFileFunc(fileID, notUseCacheForFindFinalApp)
    })
}

export let findAllPublishFinalAppsByAccount = (
    getDataWithWhereDataFunc: any,
    account: string): Stream<Array<publishFinalAppInfo>> => {
    return fromPromise(getDataWithWhereDataFunc("publishedfinalapps", { account: account })).flatMap((data: any) => {
        if (data.length === 0) {
            return just([])
        }

        // return just(data.map(({ account, finalAppName, description }) => {
        //     return {
        //         account,
        //         finalAppName,
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

        // return just(data.map(({ account, finalAppName, description }) => {
        //     return {
        //         account,
        //         finalAppName,
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