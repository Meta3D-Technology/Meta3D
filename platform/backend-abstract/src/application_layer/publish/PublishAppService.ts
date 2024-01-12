import { empty, fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { publishAppInfo } from "./PublishAppType"
import * as PublishAppUtils from "../../utils/PublishAppUtils"

export let publish = (
    funcs,
    sceneGLB: ArrayBuffer, appName: string, account: string, description: string, previewBase64: nullable<string>,
    isRecommend: boolean) => {
    return PublishAppUtils.publish(
        funcs,
        sceneGLB, appName, account, description, previewBase64,
        isRecommend,
        "publishedapps",
        "apps"
    )
}

export let findPublishApp = (funcs, account: string, appName: string, notUseCacheForFindApp: boolean): Stream<nullable<ArrayBuffer>> => {
    return PublishAppUtils.findPublishApp(
        funcs, account, appName, notUseCacheForFindApp, "publishedapps",
    )
}

export let findAllPublishAppsByAccount = (
    getDataWithWhereDataFunc: any,
    account: string): Stream<Array<publishAppInfo>> => {
    return PublishAppUtils.findAllPublishAppsByAccount(
        getDataWithWhereDataFunc, account, "publishedapps",
    )
}

export let findAllPublishApps = (
    getDataFunc: any,
    limitCount: number,
    skipCount: number,
): Stream<Array<publishAppInfo>> => {
    return PublishAppUtils.findAllPublishApps(
        getDataFunc, limitCount, skipCount, "publishedapps",
    )
}

export let findAllRecommendPublishApps = (
    getDataWithWhereDataFunc: any
): Stream<Array<publishAppInfo>> => {
    return PublishAppUtils.findAllRecommendPublishApps(
        getDataWithWhereDataFunc, "publishedapps",
    )
}