import { empty, fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { publishFinalAppInfo } from "./PublishFinalAppType"
import * as PublishAppUtils from "../../utils/PublishAppUtils"

export let publish = (
    funcs,
    sceneGLB: ArrayBuffer, appName: string, account: string, description: string, previewBase64: nullable<string>,
    isRecommend: boolean) => {
    return PublishAppUtils.publish(
        funcs,
        sceneGLB, appName, account, description, previewBase64,
        isRecommend,
        "publishedfinalapps",
        "finalapps"
    )
}

export let findPublishFinalApp = (funcs, account: string, appName: string, notUseCacheForFindFinalApp: boolean): Stream<nullable<ArrayBuffer>> => {
    return PublishAppUtils.findPublishApp(
        funcs, account, appName, notUseCacheForFindFinalApp, "publishedfinalapps",
    )
}

export let findAllPublishFinalAppsByAccount = (
    getDataWithWhereDataFunc: any,
    account: string): Stream<Array<publishFinalAppInfo>> => {
    return PublishAppUtils.findAllPublishAppsByAccount(
        getDataWithWhereDataFunc, account, "publishedfinalapps",
    )
}

export let findAllPublishFinalApps = (
    getDataFunc: any,
    limitCount: number,
    skipCount: number,
): Stream<Array<publishFinalAppInfo>> => {
    return PublishAppUtils.findAllPublishApps(
        getDataFunc, limitCount, skipCount, "publishedfinalapps",
    )
}

export let findAllRecommendPublishFinalApps = (
    getDataWithWhereDataFunc: any
): Stream<Array<publishFinalAppInfo>> => {
    return PublishAppUtils.findAllRecommendPublishApps(
        getDataWithWhereDataFunc, "publishedfinalapps",
    )
}