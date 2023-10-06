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

            debugger

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

export let findNewestPublishExtension = (
    downloadFileFunc,
    extensionName, extensionProtocolName
) => {
    return fromPromise(
        getDatabase().collection("publishedextensionprotocols")
            .where({
                name: extensionProtocolName
            })
            .orderBy("version", "desc")
            .get()
            .then(res => {
                return res.data[0]
            })
    ).flatMap((protocol: protocol) => {
        let extensionProtocolVersion = protocol.version
        let extensionProtocolIconBase64 = protocol.iconBase64

        return fromPromise(
            getDatabase().collection("publishedextensionprotocolconfigs")
                .where({
                    name: extensionProtocolName,
                    version: extensionProtocolVersion
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
                getDatabase().collection("publishedextensions")
                    // .where({
                    //     fileData: getDatabase().command.in([
                    //         getDatabase().command.eq({
                    //             name: extensionName,
                    //             protocolName: extensionProtocolName
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
                        debugger

                        let extension = res.data.reduce((result, { fileData, key }) => {
                            return result.concat(fileData.map(data => {
                                return { ...data, account: key }
                            }))
                        }, [])
                            .filter(({ name, protocolName, protocolVersion }) => {
                                return name == extensionName &&
                                    protocolName == extensionProtocolName && satisfies(
                                        extensionProtocolVersion,
                                        protocolVersion
                                    )
                            })
                            .sort((a, b) => {
                                if (gt(a.version, b.version)) {
                                    return -1
                                }

                                return 1
                            })[0]

                        return [
                            extension,
                            [extensionProtocolVersion, extensionProtocolIconBase64],
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