import { handleKeyToLowercase } from "meta3d-backend-cloudbase";
import { empty, from, fromPromise, just, mergeArray } from "most"
import { gt, neq, minVersion } from "semver";

export let getAllPublishNewestData = (
    [
        getMarketImplementCollectionFunc,
        mapMarketImplementCollectionFunc,
        getAccountFromMarketImplementCollectionDataFunc,
        downloadFileFunc
    ]: [any, any, any, any],
    collectionName: string,
    limitCount: number, skipCount: number,
    protocolName: string) => {
    return fromPromise(getMarketImplementCollectionFunc(collectionName, limitCount, skipCount, {
        protocolName: protocolName
    })).flatMap((res: any) => {
        return fromPromise(mergeArray(
            mapMarketImplementCollectionFunc(res, (marketImplementCollectionData) => {
                let account = getAccountFromMarketImplementCollectionDataFunc(marketImplementCollectionData)

                let {
                    fileID, version, protocolVersion
                } = marketImplementCollectionData

                return downloadFileFunc(fileID).map(arrayBuffer => {
                    return {
                        id: fileID, file: arrayBuffer, version, account,
                        protocolVersion: minVersion(protocolVersion),
                    }
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
    getMarketImplementAccountDataWithWhereDataFunc: any,
    account: string,
    elementName: string,
    elementVersion: string,
) => {
    return fromPromise(
        getMarketImplementAccountDataWithWhereDataFunc(
            "publishedelementassembledata",
            {
                key: handleKeyToLowercase(account),
                elementName,
                elementVersion
            }
        )
    )
        .flatMap((marketImplementAccountData: any) => {
            if (marketImplementAccountData.length === 0) {
                return just(null)
            }

            return just(marketImplementAccountData[0])
        })

}

export let findAllElementAssembleData = (
    getDataFunc: any,
    limitCount: number,
    skipCount: number,
) => {
    return fromPromise(getDataFunc("publishedelementassembledata", limitCount, skipCount)).flatMap((data: any) => {
        return just(data.map(({
            account,
            elementName,
            elementVersion,
            inspectorData,
            customInputs
        }) => {
            return {
                account,
                elementName,
                elementVersion,
                inspectorData,
                customInputs
            }
        }))
    })
}