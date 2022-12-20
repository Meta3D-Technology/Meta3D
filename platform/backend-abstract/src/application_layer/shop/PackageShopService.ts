import { fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { removeDuplicateItemsWithBuildKeyFunc } from "../../utils/ArrayUtils"
import { buildPartialKeyByEntryProcoltolData, buildPartialKeyByPackageData } from "../publish/PublishPackageService"
import { protocols } from "./ShopType"
import { packageImplementInfos } from "./PackageShopType"

export let getAllPublishPackageEntryExtensionProtocols = (
    // [getPackageShopEntryExtensionProtocolCollectionFunc, getDataFromPackageShopEntryExtensionProtocolCollection]: [any, any]
    getDataFunc: any
): Stream<protocols> => {
    // return fromPromise(getPackageShopEntryExtensionProtocolCollectionFunc()).map((res: any) => {
    //     let resData = getDataFromPackageShopEntryExtensionProtocolCollection(res)

    //     return resData.map(({
    //         account,
    //         entryProtocolName,
    //         entryProtocolVersion,
    //         entryProtocolIconBase64,
    //     }) => {
    //         return { name: entryProtocolName, version: entryProtocolVersion, account, iconBase64: entryProtocolIconBase64 }
    //     })
    // })

    return fromPromise(getDataFunc("publishedpackages")).map((data: any) => {
        // let resData = getDataFromPackageShopEntryExtensionProtocolCollection(res)

        return removeDuplicateItemsWithBuildKeyFunc(data.map(({
            account,
            entryProtocolName,
            entryProtocolVersion,
            entryProtocolIconBase64,
        }) => {
            return { name: entryProtocolName, version: entryProtocolVersion, account, iconBase64: entryProtocolIconBase64 }
        }),
            // (({
            //     name, version, account
            // }) => {
            //     return name + "_" + version + "_" + account
            // })
            (({
                name, version
            }) => {
                return name + "_" + version
            })
        )
    })
}


// export let getAllPublishPackageEntryExtensionProtocols = (
//     [getPackageShopEntryExtensionProtocolCollectionFunc, getDataFromPackageShopEntryExtensionProtocolCollection]: [any, any]
// ): Stream<protocols> => {
//     return getAllPublishProtocolData([getPackageShopEntryExtensionProtocolCollectionFunc, getDataFromPackageShopEntryExtensionProtocolCollection],
//         "publishedpackages"
//     )
// }

export let getAllPublishPackageInfos = (
    getDataByKeyContainFunc: any,
    entryProtocolName: string,
    entryProtocolVersion: string,
): Stream<packageImplementInfos> => {
    return fromPromise(getDataByKeyContainFunc(
        "publishedpackages",
        buildPartialKeyByEntryProcoltolData(entryProtocolName, entryProtocolVersion)
    )).map((data: any) => {
        return data.map(({
            account,
            entryProtocolName,
            entryProtocolVersion,
            entryProtocolIconBase64,
            entryExtensionName,
            packageName,
            packageVersion,
            fileID

        }) => {
            return {
                id: fileID,
                account,
                entryProtocolName,
                entryProtocolVersion,
                entryProtocolIconBase64,
                entryExtensionName,
                name: packageName,
                version: packageVersion,
            }
        })
    })
}

export let findPublishPackage = ([getDataByKeyContainFunc, downloadFileFunc]: [any, any],
    account: string,
    packageName: string,
    packageVersion: string
): Stream<nullable<ArrayBuffer>> => {
    return fromPromise(
        getDataByKeyContainFunc(
            "publishedpackages",
            buildPartialKeyByPackageData(
                packageName,
                packageVersion,
                account
            )
        )).flatMap((data: any) => {
            if (data.length === 0) {
                return just(null)
            }

            return downloadFileFunc(data[0].fileID)
        })
}
