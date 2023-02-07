import { fromPromise, just, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { removeDuplicateItemsWithBuildKeyFunc } from "../../utils/ArrayUtils"
// import { buildPartialKeyByEntryProcoltolData, buildPartialKeyByPackageData } from "../publish/PublishPackageService"
import { protocols } from "./MarketType"
import { packageImplementInfos } from "./PackageMarketType"

export let getAllPublishPackageEntryExtensionProtocols = (
    // [getPackageMarketEntryExtensionProtocolCollectionFunc, getDataFromPackageMarketEntryExtensionProtocolCollection]: [any, any]
    getDataFunc: any
): Stream<protocols> => {
    // return fromPromise(getPackageMarketEntryExtensionProtocolCollectionFunc()).map((res: any) => {
    //     let resData = getDataFromPackageMarketEntryExtensionProtocolCollection(res)

    //     return resData.map(({
    //         account,
    //         entryExtensionProtocolName,
    //         entryExtensionProtocolVersion,
    //         entryExtensionProtocolIconBase64,
    //     }) => {
    //         return { name: entryExtensionProtocolName, version: entryExtensionProtocolVersion, account, iconBase64: entryExtensionProtocolIconBase64 }
    //     })
    // })

    return fromPromise(getDataFunc("publishedpackages")).map((data: any) => {
        // let resData = getDataFromPackageMarketEntryExtensionProtocolCollection(res)

        return removeDuplicateItemsWithBuildKeyFunc(data.map(({
            account,
            entryExtensionProtocolName,
            entryExtensionProtocolVersion,
            entryExtensionProtocolIconBase64,
        }) => {
            return { name: entryExtensionProtocolName, version: entryExtensionProtocolVersion, account, iconBase64: entryExtensionProtocolIconBase64 }
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
//     [getPackageMarketEntryExtensionProtocolCollectionFunc, getDataFromPackageMarketEntryExtensionProtocolCollection]: [any, any]
// ): Stream<protocols> => {
//     return getAllPublishProtocolData([getPackageMarketEntryExtensionProtocolCollectionFunc, getDataFromPackageMarketEntryExtensionProtocolCollection],
//         "publishedpackages"
//     )
// }

export let getAllPublishPackageInfos = (
    getDataByKeyContainFunc: any,
    entryExtensionProtocolName: string,
    entryExtensionProtocolVersion: string,
): Stream<packageImplementInfos> => {
    return getDataByKeyContainFunc(
        "publishedpackages",
        // buildPartialKeyByEntryProcoltolData(entryExtensionProtocolName, entryExtensionProtocolVersion)
        [
            entryExtensionProtocolName, entryExtensionProtocolVersion
        ]
    ).map((data: any) => {
        return data.map(({
            account,
            entryExtensionProtocolName,
            entryExtensionProtocolVersion,
            entryExtensionProtocolVersionRange,
            entryExtensionProtocolIconBase64,
            entryExtensionName,
            packageName,
            packageVersion,
            fileID

        }) => {
            return {
                id: fileID,
                account,
                entryExtensionProtocolName,
                entryExtensionProtocolVersion,
                entryExtensionProtocolVersionRange,
                entryExtensionProtocolIconBase64,
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
    return getDataByKeyContainFunc(
        "publishedpackages",
        // buildPartialKeyByPackageData(
        //     packageName,
        //     packageVersion,
        //     account
        // )
        [

            packageName,
            packageVersion,
            account
        ]
    ).flatMap((data: any) => {
        if (data.length === 0) {
            return just(null)
        }

        return downloadFileFunc(data[0].fileID)
    })
}
