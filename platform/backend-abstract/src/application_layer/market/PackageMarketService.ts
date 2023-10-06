import { fromPromise, just, skip, Stream } from "most"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { removeDuplicateItemsWithBuildKeyFunc } from "../../utils/ArrayUtils"
// import { buildPartialKeyByEntryProcoltolData, buildPartialKeyByPackageData } from "../publish/PublishPackageService"
import { protocols } from "./MarketType"
import { packageImplementInfos } from "./PackageMarketType"
import { gt } from "semver";

export let getAllPublishPackageEntryExtensionProtocols = (
    // [getPackageMarketEntryExtensionProtocolCollectionFunc, getDataFromPackageMarketEntryExtensionProtocolCollection]: [any, any]
    getDataFunc: any,
    limitCount: number,
    skipCount: number
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

    return fromPromise(getDataFunc("publishedpackages", limitCount, skipCount)).map((data: any) => {
        // let resData = getDataFromPackageMarketEntryExtensionProtocolCollection(res)

        return removeDuplicateItemsWithBuildKeyFunc(data.map(({
            account,
            entryExtensionProtocolName,
            entryExtensionProtocolVersion,
            entryExtensionProtocolIconBase64,

            entryExtensionProtocolDisplayName,
            entryExtensionProtocolRepoLink,
            entryExtensionProtocolDescription,
        }) => {
            return {
                name: entryExtensionProtocolName, version: entryExtensionProtocolVersion, account, iconBase64: entryExtensionProtocolIconBase64,
                displayName: entryExtensionProtocolDisplayName,
                repoLink: entryExtensionProtocolRepoLink,
                description: entryExtensionProtocolDescription,
            }
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
    limitCount: number,
    skipCount: number,
    entryExtensionProtocolName: string,
    entryExtensionProtocolVersion: string,
): Stream<packageImplementInfos> => {
    return getDataByKeyContainFunc(
        "publishedpackages",
        // buildPartialKeyByEntryProcoltolData(entryExtensionProtocolName, entryExtensionProtocolVersion)
        limitCount,
        skipCount,
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
            description,
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
                description
            }
        })
    })
}

export let findPublishPackage = ([getDataByKeyContainFunc, downloadFileFunc]: [any, any],
    limitCount: number,
    skipCount: number,
    account: string,
    packageName: string,
    packageVersion: string
): Stream<nullable<ArrayBuffer>> => {
    return getDataByKeyContainFunc(
        "publishedpackages",
        limitCount,
        skipCount,
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

export let findNewestPublishPackage = ([findNewestData, downloadFileFunc]: [any, any],
    // account: string,
    entryExtensionProtocolName: string,
    packageName: string,
): Stream<ArrayBuffer> => {
    return findNewestData(
        // [
        //     (stream) => stream.where({
        //         account: account,
        //         entryExtensionProtocolName: entryExtensionProtocolName,
        //         packageName: packageName
        //     }),
        //     (stream) => stream.orderBy("entryExtensionProtocolVersion", "desc").orderBy("packageVersion", "desc")
        // ],
        "publishedpackages",
        {
            // account: account,
            entryExtensionProtocolName: entryExtensionProtocolName,
            packageName: packageName
        },
        // ["entryExtensionProtocolVersion", "packgeVersion"]
        "entryExtensionProtocolVersion",
        ["packageVersion", gt]
    ).flatMap((data: any) => {
        return downloadFileFunc(data.fileID).map(file => {
            return [file, data.entryExtensionProtocolVersion, data.packageVersion, data.entryExtensionProtocolIconBase64]
        })
    })
}