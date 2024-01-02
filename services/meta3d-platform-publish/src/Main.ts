import { env } from "meta3d-tool-utils/src/publish/PublishType"
import * as CloudbaseService from "meta3d-tool-utils/src/publish/CloudbaseService";
import * as  CloudbaseHostService from "./cloudbase-host/CloudbaseHostService"
import * as Host from "./cloudbase-host/Host";
import * as Compatible from "./compatible/Compatible";
import { targetVersion } from "./compatible/HistoryData"
import { mergeArray } from "most";

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

let _upgradeStorageOldData = (env: env, targetVersion: targetVersion) => {
    let funcArr = null

    switch (env) {
        case "local":
            funcArr = [
                CloudbaseService.initLocal,
                CloudbaseService.updateAllStorageData,
            ]
            break;
        case "production":
            funcArr = [
                CloudbaseService.initProduction,
                CloudbaseService.updateAllStorageData,
            ]
            break;
        default:
            throw new Error("unknown env")
    }

    return Compatible.upgradeStorageOldData(funcArr, targetVersion)
}

export let upgradeBackend = (env: env, targetVersion: targetVersion): Promise<void> => {
    return mergeArray([
        _upgradeDatabaseOldData(env, targetVersion),
        _upgradeStorageOldData(env, targetVersion),
    ]).drain()
}


export let updateHostFiles = (env: env): Promise<void> => {
    let funcArr = null

    switch (env) {
        case "local":
            funcArr = [
                CloudbaseHostService.initLocal,
                CloudbaseHostService.updateHostFiles,
            ]
            break;
        case "production":
            funcArr = [
                CloudbaseHostService.initProduction,
                CloudbaseHostService.updateHostFiles,
            ]
            break;
        default:
            throw new Error("unknown env")
    }

    return Host.updateHostFiles(funcArr).drain()
}