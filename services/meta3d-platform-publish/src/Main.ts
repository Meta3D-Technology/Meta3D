import { env } from "meta3d-tool-utils/src/publish/PublishType"
import * as CloudbaseService from "meta3d-tool-utils/src/publish/CloudbaseService";
import * as Compatible from "./compatible/Compatible";
import { targetVersion } from "./compatible/HistoryData"

let _upgradeDatabaseOldData = (env: env, targetVersion: targetVersion) => {
    let funcArr = null

    switch (env) {
        case "local":
            funcArr = [
                CloudbaseService.initLocal,
                CloudbaseService.updateAllDatabaseData,
            ]
            break;
        case "production":
            funcArr = [
                CloudbaseService.initProduction,
                CloudbaseService.updateAllDatabaseData,
            ]
            break;
        default:
            throw new Error("unknown env")
    }

    return Compatible.upgradeDatabaseOldData(funcArr, targetVersion)
}

export let publish = (env: env, targetVersion: targetVersion): Promise<void> => {
    return _upgradeDatabaseOldData(env, targetVersion).drain()
}