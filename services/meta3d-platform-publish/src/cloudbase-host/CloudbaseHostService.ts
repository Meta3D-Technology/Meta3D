import CloudBase from "@cloudbase/manager-node"
import { getLocalEnvData } from "meta3d-tool-utils/src/publish/CloudbaseService"

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
    // return hosting.deleteFiles({
    //     // cloudPath: '/',
    //     cloudPath: '/meta3d/dist/',
    //     isDir: true
    // }).then(() => {
    //     return hosting.uploadFiles({
    //         localPath: '../../platform/frontend/dist/',
    //         cloudPath: '/meta3d/',
    //         ignore: ['**/ignore.*'],
    //         onFileFinish: (err, data) => {
    //             if (!!err) {
    //                 throw err
    //             }
    //         }
    //     })
    // })
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
}