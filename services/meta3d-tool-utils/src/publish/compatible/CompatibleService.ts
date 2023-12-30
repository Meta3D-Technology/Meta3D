import { fromPromise, mergeArray, Stream } from "most"
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

export let updateAllDatabaseData = <oldData, newData>(
    [getCollectionCountFunc, getCollectionFunc, parseMarketCollectionDataBodyForNodejsFunc, mapCollectionFunc, getKeyFunc, mapFunc, updateDataFunc]: [any, any, any, any, any, (data: oldData) => newData, any],
    app: any,
    collectionName: string,
): Stream<void> => {
    let maxCount = 1000

    return fromPromise(getCollectionCountFunc(app, collectionName)).flatMap((count: number) => {
        if (count >= maxCount) {
            throw new Error(`count should <= ${count}`)
        }

        return fromPromise(getCollectionFunc(app,
            parseMarketCollectionDataBodyForNodejsFunc,
            collectionName, maxCount, 0)).flatMap((res: any) => {
                // console.log(collectionName, 0, maxCount)
                // console.log("res: ",res)
                return mergeArray(mapCollectionFunc(res, (data: oldData) => {
                    // console.log(
                    //     collectionName,
                    //     getKeyFunc(data),
                    //     mapFunc(data)
                    // )
                    return fromPromise(updateDataFunc(
                        app,
                        collectionName,
                        getKeyFunc(data),
                        mapFunc(data)
                    ))
                }))
            })
    })
}

export let updateAllStorageData = <oldTableData extends { fileID: string }>(
    [getCollectionCountFunc, getCollectionFunc, parseMarketCollectionDataBodyForNodejsFunc, mapCollectionFunc, downloadFileFunc, mapFunc, uploadFileFunc, buildFilePathFunc]: [any, any, any, any, any, (data: ArrayBuffer) => ArrayBuffer, any, any],
    app: any,
    collectionName: string,
): Stream<void> => {
    let maxCount = 1000

    return fromPromise(getCollectionCountFunc(app, collectionName)).flatMap((count: number) => {
        if (count >= maxCount) {
            throw new Error(`count should <= ${count}`)
        }

        return fromPromise(getCollectionFunc(app,
            parseMarketCollectionDataBodyForNodejsFunc,
            collectionName, maxCount, 0)).flatMap((res: any) => {
                return mergeArray(mapCollectionFunc(res, (data: oldTableData) => {
                    if (isNullable(data.fileID)) {
                        throw new Error(`fileID not exist in collection: ${collectionName}`)
                    }

                    // console.log(data.fileID)

                    return downloadFileFunc(app, parseMarketCollectionDataBodyForNodejsFunc, data.fileID, true).flatMap(file => {
                        let filePath = buildFilePathFunc(data)

                        // console.log(filePath, mapFunc(file), fileName)
                        console.log(`下载 filePath: ${filePath}成功，准备上传`)
                        // return uploadFileFunc(app, percentCompleted => console.log(percentCompleted), filePath, mapFunc(file), fileName)
                        return uploadFileFunc(app, filePath, mapFunc(file))
                    })
                }))
            })
    })
}

