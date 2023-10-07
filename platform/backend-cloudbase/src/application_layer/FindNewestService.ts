import { concat, empty, fromPromise, just, Stream } from "most";
import { getDatabase } from "./BackendService";
import { satisfies, gt } from "semver";
import { protocol, protocolConfig } from "backend-abstract/src/application_layer/market/MarketType";
import { nullable } from "meta3d-commonlib-ts/src/nullable";

export let findNewestPublishPackage = (
    collectionName: string,
    whereData: any,
    firstOrderByFieldName: string,
    [secondOrderByFieldName, gtFunc]: [string, any]
) => {
    return fromPromise(getDatabase().collection(collectionName)
        .where(whereData)
        .orderBy(firstOrderByFieldName, "desc")
        // .orderBy(secondOrderByFieldName, "desc")
        .get()
        .then(res => {
            let firstOrderByFieldValue = res.data[0][firstOrderByFieldName]

            return res.data.filter(data => {
                return data[firstOrderByFieldName] == firstOrderByFieldValue
            }).sort((a, b) => {
                if (gtFunc(a[secondOrderByFieldName], b[secondOrderByFieldName])) {
                    return -1
                }

                return 1
            })[0]
        })
    )
}

let _findNewestImplements = (res, isJudgeProtocolVersion, implementName, protocolName, protocolVersion) => {
    return res.data.reduce((result, { fileData, key }) => {
        return result.concat(fileData.map(data => {
            return { ...data, account: key }
        }))
    }, [])
        .filter((data) => {
            if (isJudgeProtocolVersion) {
                return data.name == implementName &&
                    data.protocolName == protocolName
                    && satisfies(
                        protocolVersion,
                        data.protocolVersion
                    )
            }

            return data.name == implementName &&
                data.protocolName == protocolName

        })
        .sort((a, b) => {
            if (gt(a.version, b.version)) {
                return -1
            }

            return 1
        })
}

let _findNewestPublishExtensionOrContribute = (
    downloadFileFunc,
    [
        protocolCollectionName,
        protocolConfigCollectionName,
        implementCollectionName,
    ],
    implementName, protocolName
) => {
    return fromPromise(
        getDatabase().collection(protocolCollectionName)
            .where({
                name: protocolName
            })
            .orderBy("version", "desc")
            .get()
            .then(res => {
                return res.data[0]
            })
    ).flatMap((protocol: protocol) => {
        let protocolVersion = protocol.version
        let protocolIconBase64 = protocol.iconBase64

        return fromPromise(
            getDatabase().collection(protocolConfigCollectionName)
                .where({
                    name: protocolName,
                    version: protocolVersion
                })
                .get()
                .then(res => {
                    if (res.data.length > 0) {
                        let { name, version, account, configStr } = res.data[0]

                        return { name, version, account, configStr }
                    }

                    return null
                })
        ).flatMap((protocolConfig: nullable<protocolConfig>) => {
            return fromPromise(
                getDatabase().collection(implementCollectionName)
                    // .where({
                    //     fileData: getDatabase().command.in([
                    //         getDatabase().command.eq({
                    //             name: implementName,
                    //             protocolName: protocolName
                    //         })
                    //     ])
                    // })
                    .where({
                        fileData: getDatabase().command.neq([])
                    })
                    .skip(0)
                    .limit(1000)
                    .get()
                    .then(res => {
                        let extensionOrContribute = null

                        let result = _findNewestImplements(res, true, implementName, protocolName, protocolVersion)

                        if (result.length == 0) {
                            extensionOrContribute = _findNewestImplements(res, false, implementName, protocolName, protocolVersion)[0]
                        }
                        else {
                            extensionOrContribute = result[0]
                        }

                        return [
                            extensionOrContribute,
                            [
                                protocolVersion,
                                protocolIconBase64,
                                protocol.displayName,
                                protocol.repoLink,
                                protocol.description
                            ],
                            protocolConfig
                        ]
                    })
            )
        })
    })
        .flatMap(([
            { fileID,
                description, displayName,
                // protocolVersion,
                repoLink,
                version,
                account },
            protocolData,
            protocolConfig
        ]: any) => {
            return downloadFileFunc(fileID).map(file => {
                return [
                    [
                        description, displayName,
                        // protocolVersion,
                        repoLink,
                        version, file,
                        account
                    ],
                    protocolData,
                    protocolConfig
                ]
            })
        })
}

export let findNewestPublishExtension = (
    downloadFileFunc,
    implementName, protocolName
) => {
    return _findNewestPublishExtensionOrContribute(downloadFileFunc, ["publishedextensionprotocols", "publishedextensionprotocolconfigs", "publishedextensions"], implementName, protocolName)
}

export let findNewestPublishContribute = (
    downloadFileFunc,
    implementName, protocolName
) => {
    return _findNewestPublishExtensionOrContribute(downloadFileFunc, ["publishedcontributeprotocols", "publishedcontributeprotocolconfigs", "publishedcontributes"], implementName, protocolName)
}