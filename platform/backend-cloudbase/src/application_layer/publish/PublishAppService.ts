import { mergeArray, fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { publishApp } from "./PublishAppType"

let _buildFileName = (appName: string, username: string) => username + "_" + appName

export let publish = (
    [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc]: [any, any, any, any, any],
    appBinaryFile: ArrayBuffer, appName: string, username: string) => {
    return hasDataFunc("publishedApps", { username, appName }).concatMap((isExist) => {
        return uploadFileFunc(onUploadProgressFunc, "apps/" + _buildFileName(appName, username) + ".arrayBuffer", appBinaryFile, _buildFileName(appName, username)).concatMap((fileID) => {
            if (isExist) {
                return fromPromise(updateDataFunc(
                    "publishedApps",
                    { username, appName },
                    {
                        username,
                        appName,
                        fileID
                    }
                ))
            }

            return fromPromise(addDataFunc("publishedApps", {
                username,
                appName,
                fileID
            }))
        })
    })
}

// export let enterApp = (appBinaryFile: ArrayBuffer) => {
// 	// TODO open new url with ?username, appName

// 	// let _meta3DState = loadApp(_findAppBinaryFile(username, appName))
// 	let _meta3DState = loadApp(appBinaryFile)
// }


export let findPublishApp = ([getDataFunc, getFileFunc]: [any, any], username: string, appName: string): Stream<nullable<ArrayBuffer>> => {
    return fromPromise(getDataFunc("publishedApps", { username, appName })).flatMap((res: any) => {
        if (res.data.length === 0) {
            return just(null)
        }

        return getFileFunc(res.data[0].fileID)
    })
}

export let findAllPublishApps = (
    [getDataFunc, getFileFunc]: [any, any],
    username: string): Stream<Array<publishApp>> => {
    return fromPromise(getDataFunc("publishedApps", { username })).flatMap((res: any) => {
        if (res.data.length === 0) {
            return just([])
        }

        return fromPromise(mergeArray(
            res.data.map(({ username, appName, fileID }) => {
                return getFileFunc(fileID).map(appBinaryFile => {
                    return {
                        username,
                        appName,
                        appBinaryFile
                    }
                })
            })
        ).reduce(
            (result, data) => {
                result.push(data)

                return result
            }, []
        ))
    })
}