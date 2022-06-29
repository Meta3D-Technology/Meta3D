import { getDatabase, getFile, init as initCloundbase } from "../cloudbase/CloundbaseService"
import { empty, fromPromise, mergeArray } from "most"
import { satisfies } from "semver";

export let init = async () => {
    await initCloundbase()
}

let _getAllPublishProtocolData = (collectionName: string) => {
    return fromPromise(getDatabase().collection(collectionName)
        .get()).map((res: any) => {
            return res.data.reduce((result, { protocols }) => {
                return result.concat(protocols.reduce((result, { name, version, iconBase64 }) => {
                    result.push({ name, version, iconBase64 })

                    return result
                }, []))
            }, [])
        })
}

export let getAllPublishExtensionProtocols = () => {
    return _getAllPublishProtocolData("publishedExtensionProtocols")
}

export let getAllPublishContributeProtocols = () => {
    return _getAllPublishProtocolData("publishedContributeProtocols")
}

let _getAllPublishData = (collectionName: string, protocolName: string, protocolVersion: string) => {
    return fromPromise(getDatabase().collection(collectionName)
        .get()).flatMap((res: any) => {
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

                    return getFile(fileID).map(arrayBuffer => {
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
    return _getAllPublishData("publishedExtensions",
        protocolName, protocolVersion
    )
}

export let getAllPublishContributes = (protocolName: string, protocolVersion: string) => {
    return _getAllPublishData("publishedContributes",
        protocolName, protocolVersion
    )
}