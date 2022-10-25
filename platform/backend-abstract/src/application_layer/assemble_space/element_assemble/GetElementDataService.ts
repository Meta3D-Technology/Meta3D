import { empty, from, fromPromise, just, mergeArray } from "most"
import { gt, neq, minVersion } from "semver";

export let getAllPublishNewestData = (
    [
        getShopImplementCollectionFunc,
        mapShopImplementCollectionFunc,
        getAccountFromShopImplementCollectionDataFunc,
        getFileDataFromShopImplementCollectionDataFunc,
        getFileFunc
    ]: [any, any, any, any, any],
    collectionName: string, protocolName: string) => {
    return fromPromise(getShopImplementCollectionFunc(collectionName)).flatMap((res: any) => {
        return fromPromise(mergeArray(
            mapShopImplementCollectionFunc(res, (shopImplementCollectionData) => {
                let account = getAccountFromShopImplementCollectionDataFunc(shopImplementCollectionData)
                let fileData = getFileDataFromShopImplementCollectionDataFunc(shopImplementCollectionData)

                let result = fileData.filter(data => {
                    return data.protocolName === protocolName

                })

                if (result.length === 0) {
                    return empty()
                }

                return from(result.map(({ fileID, version, protocolVersion }) => {
                    return [fileID, version, protocolVersion]
                })).flatMap(([fileID, version, protocolVersion]) => {
                    return getFileFunc(fileID).map(arrayBuffer => {
                        return {
                            id: fileID, file: arrayBuffer, version, account,
                            protocolVersion: minVersion(protocolVersion),
                        }
                    })
                })

            })
        ).reduce(
            (result, data) => {
                result.push(data)

                return result
            }, []
        ).then((result) => {
            result.sort((a, b) => {
                if (gt(a.protocolVersion, b.protocolVersion)) {
                    return -1
                }

                return 1
            })

            return result.reduce((r, data) => {
                if (r.length > 0 && neq(data.protocolVersion, r[0].protocolVersion)) {
                    return r
                }

                r.push(data)

                return r
            }, []).map(({ id, file, version, account }) => {
                return { id, file, version, account }
            })
        })
        )
    })
}

export let getElementAssembleData = (
    [getShopImplementAccountDataFunc, parseShopCollectionDataBodyFunc, getDataFromShopImplementAccountDataFunc]: [any, any, any],
    account: string,
    elementName: string,
    elementVersion: string,
) => {
    return fromPromise(
        getShopImplementAccountDataFunc(
            parseShopCollectionDataBodyFunc,
            "publishedelementassembledata",
            account
        )
    ).flatMap(([shopImplementAccountData, shopImplementAllCollectionData]) => {
        let fileData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData)

        let result = fileData.filter(data => {
            return data.elementName === elementName && data.elementVersion === elementVersion
        })

        if (result.length === 0) {
            return empty()
        }

        return just(result[0])
    })
}