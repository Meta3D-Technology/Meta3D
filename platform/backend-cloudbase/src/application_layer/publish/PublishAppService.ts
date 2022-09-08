// import { loadApp } from "meta3d"
import { getFile, uploadFile, getDatabase } from "../cloudbase/CloudbaseService"
import { mergeArray, fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { publishApp } from "./PublishAppType"

let _buildFileName = (appName: string, username: string) => username + "_" + appName

export let publish = (appBinaryFile: ArrayBuffer, appName: string, username: string) => {
    // TODO use message instead of log?
    return uploadFile(console.log, "apps/" + _buildFileName(appName, username) + ".arrayBuffer", appBinaryFile, _buildFileName(appName, username)).concatMap((fileID) => {
        return fromPromise(getDatabase().collection("publishedApps").where({ username, appName }).get().then(res => {
            if (res.data.length == 0) {
                return getDatabase().collection("publishedApps")
                    .add({
                        username,
                        appName,
                        fileID
                    })
            }
        }))
    })
}

// export let enterApp = (appBinaryFile: ArrayBuffer) => {
// 	// TODO open new url with ?username, appName

// 	// let _meta3DState = loadApp(_findAppBinaryFile(username, appName))
// 	let _meta3DState = loadApp(appBinaryFile)
// }


export let findPublishApp = (username: string, appName: string): Stream<nullable<ArrayBuffer>> => {
    return fromPromise(getDatabase().collection("publishedApps").where({ username, appName }).get()).flatMap((res: any) => {
        if (res.data.length === 0) {
            return just(null)
        }

        return getFile(res.data[0].fileID)
    })
}

export let findAllPublishApps = (username: string): Stream<Array<publishApp>> => {
    // let result = null

    return fromPromise(getDatabase().collection("publishedApps").where({ username }).get()).flatMap((res: any) => {
        if (res.data.length === 0) {
            return just([])
        }

        return fromPromise(mergeArray(
            res.data.map(({ username, appName, fileID }) => {
                return getFile(fileID).map(appBinaryFile => {
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
    // .observe(allPublishApps => {
    // 	result = allPublishApps
    // }).then(() => result)
}