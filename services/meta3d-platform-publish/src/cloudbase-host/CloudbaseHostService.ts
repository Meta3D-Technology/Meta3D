import CloudBase from "@cloudbase/manager-node"
import { getLocalEnvData, getProductionEnvData } from "meta3d-tool-utils/src/publish/CloudbaseService"

export let initLocal = () => {
    let {
        secretId,
        secretKey,
        env
    } = getLocalEnvData()

    return new CloudBase({
        secretId: secretId,
        secretKey: secretKey,
        envId: env
    }).hosting
}

export let initProduction = () => {
    let {
        secretId,
        secretKey,
        env
        // } = getProductionEnvData()
    } = getLocalEnvData()

    return new CloudBase({
        secretId: secretId,
        secretKey: secretKey,
        envId: env
    }).hosting
}

export let updateHostFiles = (hosting: any) => {
    return hosting.deleteFiles({
        cloudPath: '/',
        isDir: true
    }).then(() => {
        return hosting.uploadFiles({
            localPath: '../../platform/frontend/dist/',
            cloudPath: '/',
            ignore: ['**/ignore.*'],
            onFileFinish: (err, data) => {
                if (!!err) {
                    throw err
                }
            }
        })
    })
}