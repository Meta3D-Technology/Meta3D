import { historyData, targetVersion } from "./HistoryData"
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { mergeArray, Stream } from "most";

export let upgradeDatabaseOldData = (
    [initFunc, updateAllDatabaseDataFunc]: [any, any],
    targetVersion: targetVersion): Stream<void> => {
    return initFunc().flatMap(backendInstance => {
        let data = historyData.database[targetVersion]

        if (isNullable(data)) {
            throw new Error(`targetVersion: ${targetVersion} not exist in historyData`)
        }

        return mergeArray(
            data.map(data => {
                return updateAllDatabaseDataFunc(data.mapFunc,
                    backendInstance,
                    data.collectionName)
            })
        )
    })
}

export let upgradeStorageOldData = (
    [initFunc, updateAllStorageDataFunc]: [any, any],
    targetVersion: targetVersion): Stream<void> => {
    return initFunc().flatMap(backendInstance => {
        let data = historyData.storage[targetVersion]

        if (isNullable(data)) {
            throw new Error(`targetVersion: ${targetVersion} not exist in historyData`)
        }

        return mergeArray(
            data.map(data => {
                return updateAllStorageDataFunc([data.mapFunc, data.buildFilePathFunc],
                    backendInstance,
                    data.collectionName)
            })
        )
    })
}