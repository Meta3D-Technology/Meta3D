import { getData, getFile } from "../cloudbase/CloundbaseService"
import { empty, fromPromise, mergeArray } from "most"
import { satisfies } from "semver";

export let _getAllPublishProtocolData = (
    getDataFunc: any,
    collectionName: string) => {
    return fromPromise(getDataFunc(collectionName)).map((res: any) => {
        return res.data.reduce((result, { protocols }) => {
            return result.concat(protocols.map(({ name, version, iconBase64 }) => {
                return { name, version, iconBase64 }
            }, []))
        }, [])
    })
}

export let getAllPublishExtensionProtocols = () => {
    return _getAllPublishProtocolData(
        getData,
        "publishedExtensionProtocols")
}

export let getAllPublishContributeProtocols = () => {
    return _getAllPublishProtocolData(getData, "publishedContributeProtocols")
}

export let _getAllPublishData = (
    [getDataFunc, getFileFunc]: [any, any],
    collectionName: string, protocolName: string, protocolVersion: string) => {
    return fromPromise(getDataFunc(collectionName)).flatMap((res: any) => {
        return fromPromise(mergeArray(
            res.data.map(({ fileData }) => {
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
                else if (result.length > 1) {
                    throw new Error("length should == 1")
                }

                let { fileID } = result[0]

                return getFileFunc(fileID).map(arrayBuffer => {
                    return { id: fileID, file: arrayBuffer }
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

export let getAllPublishExtensions = (protocolName: string, protocolVersion: string) => {
    return _getAllPublishData([getData, getFile],
        "publishedExtensions",
        protocolName, protocolVersion
    )
}

export let getAllPublishContributes = (protocolName: string, protocolVersion: string) => {
    return _getAllPublishData([getData, getFile],
        "publishedContributes",
        protocolName, protocolVersion
    )
}