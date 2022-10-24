import { empty, from, fromPromise, just, mergeArray } from "most"
import { gt, neq, minVersion } from "semver";

export let getAllPublishNewestData = (
    [getShopCollectionFunc, getFileFunc]: [any, any],
    collectionName: string, protocolName: string) => {
    return fromPromise(getShopCollectionFunc(collectionName)).flatMap((res: any) => {
        return fromPromise(
            mergeArray(
                res.data.map(({ fileData, username }) => {
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
                                id: fileID, file: arrayBuffer, version, username,
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
                }, []).map(({ id, file, version, username }) => {
                    return { id, file, version, username }
                })
            })
        )
    })
}

export let getElementAssembleData = (
    getShopDataFunc: any,
    username: string,
    elementName: string,
    elementVersion: string,
) => {
    return fromPromise(
        getShopDataFunc(
            "publishedelementassembledata",
            {
                username: username
            },
        )
    ).flatMap((res: any) => {
        let { fileData } = res.data[0]

        let result = fileData.filter(data => {
            return data.elementName === elementName && data.elementVersion === elementVersion
        })

        if (result.length === 0) {
            return empty()
        }

        return just(result[0])
    })
}