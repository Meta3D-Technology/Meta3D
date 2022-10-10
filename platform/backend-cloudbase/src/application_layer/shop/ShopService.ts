import { empty, from, fromPromise, mergeArray } from "most"
import { satisfies, gt, neq, minVersion } from "semver";

export let getAllPublishProtocolData = (
    getCollectionFunc: any,
    collectionName: string) => {
    return fromPromise(getCollectionFunc(collectionName)).map((res: any) => {
        return res.data.map(({ name, version, username, iconBase64 }) => {
            return { name, version, username, iconBase64 }
        })
    })
}

export let getAllPublishProtocolConfigData = (
    getCollectionFunc: any,
    collectionName: string) => {
    return fromPromise(getCollectionFunc(collectionName)).map((res: any) => {
        return res.data.map(({ name, version, username, configStr }) => {
            return { name, version, username, configStr }
        })
    })
}

export let getAllPublishData = (
    [getCollectionFunc, getFileFunc]: [any, any],
    collectionName: string, protocolName: string, protocolVersion: string) => {
    return fromPromise(getCollectionFunc(collectionName)).flatMap((res: any) => {
        return fromPromise(mergeArray(
            res.data.map(({ fileData, username }) => {
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
                        return { id: fileID, file: arrayBuffer, version, username }
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

export let getAllPublishNewestData = (
    [getCollectionFunc, getFileFunc]: [any, any],
    collectionName: string, protocolName: string) => {
    return fromPromise(getCollectionFunc(collectionName)).flatMap((res: any) => {
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