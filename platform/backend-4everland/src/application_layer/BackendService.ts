import { S3, GetObjectCommandOutput, RestoreObjectOutputFilterSensitiveLog } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { empty, fromPromise, just, mergeArray } from "most";
import { getBackend, setBackend } from "../domain_layer/repo/Repo";
import * as BackendService from "meta3d-backend-4everland";
import { curry2, curry3_1, curry4_1 } from "meta3d-fp/src/Curry";

export let init = (_env) => {
    let s3 = new S3({
        endpoint: "https://endpoint.4everland.co",
        signatureVersion: "v4",
        credentials: {
            accessKeyId: "P7SHR2MYU5CHLXKXCOG7",
            secretAccessKey: "5yhjyVdcpNNKjZ9X5sBe3738Lh9KftfDHQ6zkZKL",
            // sessionToken,
        },
        // region: "us-west-2",
        region: "cn-north-1"
        // region: "cn-northwest-1"
        // region: "ap-east-1"

    } as any);


    setBackend(s3)

    return empty()
}


export let handleLoginForWeb3 = (account) => BackendService.handleLoginForWeb3(getBackend(), account)

export let hasAccount = (collectionName, account) => BackendService.hasAccount(getBackend(), collectionName, account)

let _onDownloadProgressFuncForJson = console.log

let _parseMarketCollectionDataBody = (
    onDownloadProgressFunc,
    returnDataType: "arrayBuffer" | "json", allCollectionData: GetObjectCommandOutput): Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve(allCollectionData.Body)
    }).then((body: ReadableStream<any>) => {
        let reader = body.getReader();

        let contentLength = allCollectionData.ContentLength !== undefined ? allCollectionData.ContentLength : 0

        let receivedLength = 0

        return new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            return;
                        }

                        receivedLength += value.length

                        onDownloadProgressFunc(contentLength === 0 ? 0 : Math.floor(receivedLength / contentLength * 100))

                        controller.enqueue(value);
                        return pump();
                    });
                }
            }
        })
    })
        .then((stream) => new Response(stream))
        .then((response) => {
            switch (returnDataType) {
                case "arrayBuffer":
                    return response.arrayBuffer()
                case "json":
                    return response.json()
            }
        }
        )
}

export let getMarketProtocolCollection = (collectionName) => BackendService.getMarketProtocolCollection(getBackend(), curry3_1(_parseMarketCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName)

export let getMarketImplementCollection = (collectionName) => BackendService.getMarketImplementCollection(getBackend(), curry3_1(_parseMarketCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName)

export let getMarketImplement = (
    collectionName: string,
    account: string,
    name: string,
    version: string
) => {
    return _getObjectWithJsonBody(collectionName, collectionName).then((body: BackendService.marketImplementCollectionData) => {
        account = BackendService.handleKeyToLowercase(account)

        let result = body.find(data => data.key === account)

        if (result === undefined) {
            return null
        }

        result = result.fileData.find(data => data.name === name && data.version === version)

        if (result === undefined) {
            return null
        }

        return result
    })
}


export let getDataFromMarketProtocolCollection = BackendService.getDataFromMarketProtocolCollection

export let mapMarketImplementCollection = BackendService.mapMarketImplementCollection

export let getAccountFromMarketImplementCollectionData = BackendService.getAccountFromMarketImplementCollectionData

export let getFileDataFromMarketImplementCollectionData = BackendService.getFileDataFromMarketImplementCollectionData

export let downloadFile = (onDownloadProgressFunc, fileID) => BackendService.downloadFile(getBackend(), curry3_1(_parseMarketCollectionDataBody)(onDownloadProgressFunc), fileID)

let _arrayBufferToUint8Array = (arrayBuffer: ArrayBuffer) => {
    return new Uint8Array(arrayBuffer)
}


export let uploadFile = (onUploadProgressFunc, filePath: string, fileContent: ArrayBuffer, fileName: string) => {
    console.log("uploadFile:", filePath, fileContent)

    // return fromPromise(getBackend().putObject({
    //     Bucket: BackendService.getFileBucketName(),
    //     Key: BackendService.handleKeyToLowercase(filePath),
    //     Body: _arrayBufferToUint8Array(fileContent)
    //     ,
    // }))

    let task = new Upload({
        client: getBackend(),
        queueSize: 3, // 3 MiB
        params: {
            Bucket: BackendService.getFileBucketName(),
            Key: BackendService.handleKeyToLowercase(filePath),
            Body: _arrayBufferToUint8Array(fileContent)
        },
    })

    task.on("httpUploadProgress", (e) => {
        let percentCompleted = ((e.loaded / e.total) * 100) | 0

        onUploadProgressFunc(percentCompleted)
    })

    return fromPromise(task.done())
}

export let updateData = (collectionName: string, key: string, updateData: any) => {
    return BackendService.getMarketProtocolCollection(getBackend(),
        curry3_1(_parseMarketCollectionDataBody)(_onDownloadProgressFuncForJson),
        collectionName
    ).then(oldCollectionData => {
        return BackendService.updateMarketImplementData(getBackend(), collectionName, key, updateData,
            oldCollectionData
        )
    })
}

export let addData = (collectionName: string, key: string, data: any) => {
    return BackendService.getMarketProtocolCollection(getBackend(),
        curry3_1(_parseMarketCollectionDataBody)(_onDownloadProgressFuncForJson),
        collectionName
    ).then(allCollectionData => {
        return BackendService.addDataToMarketProtocolCollection(
            getBackend(),
            BackendService.addMarketProtocolDataToDataFromMarketProtocolCollectionData,
            collectionName, key, allCollectionData, data
        )
    })
}

let _getObjectWithJsonBody = (collectionName, key) => {
    return getBackend().getObject({
        Bucket: collectionName,
        Key: key
    })
        .then(data => _parseMarketCollectionDataBody(_onDownloadProgressFuncForJson, "json", data))
}

export let getDataByKey = (collectionName: string, key: string) => {
    return _getObjectWithJsonBody(collectionName, key)
        .then((body) => {
            console.log("getDataByKey:", key, body)

            return body
        })
}

export let getDataByKeyContain = (collectionName: string, values: Array<string>) => {
    return fromPromise(getBackend().listObjects({
        Bucket: collectionName
    }).then(data => {
        if (data.Contents === undefined) {
            return []
        }

        return data.Contents.filter(({ Key }) => {
            return values.reduce((result, value) => {
                if (!result) {
                    return result
                }

                return Key.includes(value)
            }, true)
        })
    })).flatMap(data => {
        return fromPromise(mergeArray(
            data.map(({ Key }) => {
                return fromPromise(_getObjectWithJsonBody(collectionName, Key)).map(d => d[0])
            })
        ).reduce(
            (result, data) => {
                result.push(data)

                return result
            }, []
        ))
    })
}

export let hasData = (collectionName: string, key: string) => BackendService.hasData(getBackend(), collectionName, key)

export let getFileID = BackendService.getFileID

export let getMarketImplementAccountData = (collectionName, account) => BackendService.getMarketImplementAccountData(getBackend(), curry3_1(_parseMarketCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName, account)

export let updateMarketImplementData = (collectionName, account, updateData, oldMarketImplementCollectionData) =>
    BackendService.updateMarketImplementData(getBackend(), collectionName, account, updateData, oldMarketImplementCollectionData)

export let getDataFromMarketImplementAccountData = BackendService.getDataFromMarketImplementAccountData

export let isContain = BackendService.isContain

export let buildMarketImplementAccountData = BackendService.buildMarketImplementAccountData

export let addMarketImplementDataToDataFromMarketImplementCollectionData = BackendService.addMarketImplementDataToDataFromMarketImplementCollectionData

export let getData = (collectionName: string) => {
    return fromPromise(getBackend().listObjects({
        Bucket: collectionName
    }).then(data => {
        if (data.Contents === undefined) {
            return []
        }

        // return data.Contents.filter(({ Key }) => {
        //     return Key.includes(value)
        // })
        return data.Contents
    })).flatMap(data => {
        return fromPromise(mergeArray(
            data.map(({ Key }) => {
                return fromPromise(_getObjectWithJsonBody(collectionName, Key)).map(d => d[0])
            })
        ).reduce(
            (result, data) => {
                result.push(data)

                return result
            }, []
        ))
    })
}