import { fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { publishAppInfo } from "./PublishAppType"

let _buildFileName = (appName: string, account: string) => account + "_" + appName

export let _buildKey = _buildFileName

export let publish = (
    [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc]: [any, any, any, any, any, any],
    appBinaryFile: ArrayBuffer, appName: string, account: string) => {
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
                        fileID
                    }
                ))
            }

            return fromPromise(addDataFunc("publishedapps",
                key,
                {
                    account,
                    appName,
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
    getDataByKeyContainFunc: any,
    account: string): Stream<Array<publishAppInfo>> => {
    return getDataByKeyContainFunc("publishedapps", [account]).flatMap((data: any) => {
        if (data.length === 0) {
            return just([])
        }

        return just(data.map(({ account, appName }) => {
            return {
                account,
                appName,
            }
        }))
    })
}