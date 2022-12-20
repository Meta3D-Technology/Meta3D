import { empty, from, fromPromise, just, mergeArray, Stream } from "most"
import { satisfies } from "semver";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { getExn, isNullable } from "../../utils/NullableUtils";
import { implementInfos, protocols } from "./ShopType";

export let getAllPublishProtocolData = (
    [getShopProtocolCollectionFunc, getDataFromShopProtocolCollectionFunc]: [any, any],
    collectionName: string): Stream<protocols> => {
    return fromPromise(getShopProtocolCollectionFunc(collectionName)).map((res: any) => {
        let resData = getDataFromShopProtocolCollectionFunc(res)

        return resData.map(({ name, version, account, iconBase64 }) => {
            return { name, version, account, iconBase64 }
        })
    })
}

export let getAllPublishProtocolConfigData = (
    [getShopProtocolCollectionFunc, getDataFromShopProtocolCollectionFunc]: [any, any],
    collectionName: string) => {
    return fromPromise(getShopProtocolCollectionFunc(collectionName)).map((res: any) => {
        let resData = getDataFromShopProtocolCollectionFunc(res)

        return resData.map(({ name, version, account, configStr }) => {
            return { name, version, account, configStr }
        })
    })
}

export let getAllPublishImplementInfo = (
    [
        getShopImplementCollectionFunc,
        mapShopImplementCollectionFunc,
        getAccountFromShopImplementCollectionDataFunc,
        getFileDataFromShopImplementCollectionDataFunc,
    ]: [any, any, any, any],
    collectionName: string, protocolName: string, protocolVersion: string): Stream<implementInfos> => {
    return fromPromise(getShopImplementCollectionFunc(collectionName)).flatMap((res: any) => {
        return fromPromise(mergeArray(
            mapShopImplementCollectionFunc(res, (shopImplementCollectionData) => {
                let account = getAccountFromShopImplementCollectionDataFunc(shopImplementCollectionData)
                let fileData = getFileDataFromShopImplementCollectionDataFunc(shopImplementCollectionData)

                let result = fileData.filter(data => {
                    return data.protocolName === protocolName &&
                        satisfies(
                            protocolVersion,
                            data.protocolVersion
                        )
                })

                if (result.length === 0) {
                    return empty()
                }

                return from(result.map(({ fileID, name, version }) => {
                    return { id: fileID, name, version, account: account }
                }))
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

export let findPublishImplement = ([getShopImplementFunc, downloadFileFunc]: [any, any],
    collectionName: string,
    account: string,
    name: string,
    version: string
) => {
    return fromPromise(getShopImplementFunc(collectionName, account, name, version)).flatMap((data: nullable<any>) => {
        if (isNullable(data)) {
            return just(null)
        }

        return downloadFileFunc(getExn(data).fileID)
    })
}
