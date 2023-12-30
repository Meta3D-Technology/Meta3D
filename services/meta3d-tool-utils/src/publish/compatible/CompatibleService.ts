import { fromPromise, mergeArray, Stream } from "most"

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
