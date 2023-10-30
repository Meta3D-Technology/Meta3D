import { empty, from, fromPromise, just, mergeArray, Stream } from "most"
import { satisfies } from "semver";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { getExn, isNullable } from "../../utils/NullableUtils";
import { implementInfos, protocolConfigs, protocolName, protocols, protocolVersion } from "./MarketType";

export let getAllPublishProtocolData = (
    [getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc]: [any, any],
    collectionName: string, limitCount: number, skipCount: number): Stream<protocols> => {
    return fromPromise(getMarketProtocolCollectionFunc(collectionName, limitCount, skipCount)).map((res: any) => {
        let resData = getDataFromMarketProtocolCollectionFunc(res)

        return resData.map(({ name, version, account, iconBase64, displayName, repoLink, description }) => {
            return { name, version, account, iconBase64, displayName, repoLink, description }
        })
    })
}

let _batchFindPublishProtocolData = (
    [batchFindMarketProtocolCollection, getDataFromMarketProtocolCollectionFunc,
        mapFunc
    ]: [any, any, any],
    collectionName: string,
    protocolNames: Array<protocolName>
) => {
    return fromPromise(batchFindMarketProtocolCollection(collectionName, protocolNames)).map((res: any) => {
        let resData = getDataFromMarketProtocolCollectionFunc(res)

        return resData.map(mapFunc)
    })
}

export let batchFindPublishProtocolData = (
    [batchFindMarketProtocolCollection, getDataFromMarketProtocolCollectionFunc]: [any, any],
    collectionName: string,
    protocolNames: Array<protocolName>
): Stream<protocols> => {
    return _batchFindPublishProtocolData(
        [batchFindMarketProtocolCollection, getDataFromMarketProtocolCollectionFunc,
            ({ name, version, account, iconBase64, displayName, repoLink, description }) => {
                return { name, version, account, iconBase64, displayName, repoLink, description }
            }
        ],
        collectionName,
        protocolNames
    )
}


export let getAllPublishProtocolDataCount = (
    getMarketProtocolCollectionCount: any,
    collectionName: string): Stream<protocols> => {
    return fromPromise(getMarketProtocolCollectionCount(collectionName))
}

export let getAllPublishProtocolConfigData = (
    [getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc]: [any, any],
    collectionName: string,
    limitCount: number,
    skipCount: number
): Stream<protocolConfigs> => {
    return fromPromise(getMarketProtocolCollectionFunc(collectionName, limitCount, skipCount)).map((res: any) => {
        let resData = getDataFromMarketProtocolCollectionFunc(res)

        return resData.map(({ name, version, account, configStr }) => {
            return { name, version, account, configStr }
        })
    })
}

export let batchFindPublishProtocolConfigData = (
    [batchFindMarketProtocolCollection, getDataFromMarketProtocolCollectionFunc]: [any, any],
    collectionName: string,
    protocolNames: Array<protocolName>
): Stream<protocolConfigs> => {
    return _batchFindPublishProtocolData(
        [batchFindMarketProtocolCollection, getDataFromMarketProtocolCollectionFunc,
            ({ name, version, account, configStr }) => {
                return { name, version, account, configStr }
            }
        ],
        collectionName,
        protocolNames
    )
}

export let getAllPublishImplementInfo = (
    [
        getMarketImplementCollectionFunc,
        mapMarketImplementCollectionFunc,
        filterMarketImplementCollection,
        getAccountFromMarketImplementCollectionDataFunc,
    ]: [any, any, any, any],
    collectionName: string,
    limitCount: number,
    skipCount: number,
    protocolName: string, protocolVersion: string): Stream<implementInfos> => {
    return fromPromise(getMarketImplementCollectionFunc(collectionName, limitCount, skipCount, {
        protocolName: protocolName
    })).flatMap((res: any) => {
        return fromPromise(mergeArray(
            mapMarketImplementCollectionFunc(
                filterMarketImplementCollection(res, (marketImplementCollectionData => {
                    return satisfies(
                        protocolVersion,
                        marketImplementCollectionData.protocolVersion
                    )
                })), (marketImplementCollectionData) => {
                    let account = getAccountFromMarketImplementCollectionDataFunc(marketImplementCollectionData)

                    let { fileID, name, version,
                        displayName, repoLink, description
                    } = marketImplementCollectionData

                    return just({
                        id: fileID, name, version, account,
                        displayName, repoLink, description
                    })
                })
        ).reduce(
            (result, data) => {
                result.push(data)

                return result
            }, []
        )
        )
    })
}

export let findPublishImplement = ([getMarketImplementFunc, downloadFileFunc]: [any, any],
    collectionName: string,
    limitCount: number,
    skipCount: number,
    account: string,
    name: string,
    version: string
) => {
    return fromPromise(getMarketImplementFunc(collectionName,
        limitCount, skipCount,
        account, name, version)).flatMap((data: nullable<any>) => {
            if (isNullable(data)) {
                return just(null)
            }

            return downloadFileFunc(getExn(data).fileID)
        })
}
