import { empty, from, fromPromise, mergeArray } from "most"
import { satisfies } from "semver";

export let getAllPublishProtocolData = (
    [getShopProtocolCollectionFunc, getDataFromShopProtocolCollectionFunc]: [any, any],
    collectionName: string) => {
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

export let getAllPublishData = (
    [
        getShopImplementCollectionFunc,
        mapShopImplementCollectionFunc,
        getAccountFromShopImplementCollectionDataFunc,
        getFileDataFromShopImplementCollectionDataFunc,
        getFileFunc
    ]: [any, any, any, any, any],
    collectionName: string, protocolName: string, protocolVersion: string) => {
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

                return from(result.map(({ fileID, version }) => {
                    return [fileID, version]
                })).flatMap(([fileID, version]) => {
                    return getFileFunc(fileID).map(arrayBuffer => {
                        return { id: fileID, file: arrayBuffer, version, account: account }
                    })
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
