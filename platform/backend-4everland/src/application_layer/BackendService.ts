import { S3, GetObjectCommandOutput, RestoreObjectOutputFilterSensitiveLog } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { empty, fromPromise, just, mergeArray } from "most";
import { getBackend, setBackend } from "../domain_layer/repo/Repo";
import * as BackendService from "meta3d-backend-4everland";
import { curry2, curry3_1, curry4_1 } from "meta3d-fp/src/Curry";

export let init = () => {
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


export let handleLogin = (account) => BackendService.handleLogin(getBackend(), account)

export let hasAccount = (collectionName, account) => BackendService.hasAccount(getBackend(), collectionName, account)

let _onDownloadProgressFuncForJson = console.log

let _parseShopCollectionDataBody = (
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

export let getShopProtocolCollection = (collectionName) => BackendService.getShopProtocolCollection(getBackend(), curry3_1(_parseShopCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName)

export let getShopImplementCollection = (collectionName) => BackendService.getShopImplementCollection(getBackend(), curry3_1(_parseShopCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName)

export let getShopImplement = (
    collectionName: string,
    account: string,
    name: string,
    version: string
) => {
    return _getObjectWithJsonBody(collectionName, collectionName).then((body: BackendService.shopImplementCollectionData) => {
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


export let getDataFromShopProtocolCollection = BackendService.getDataFromShopProtocolCollection

export let mapShopImplementCollection = BackendService.mapShopImplementCollection

export let getAccountFromShopImplementCollectionData = BackendService.getAccountFromShopImplementCollectionData

export let getFileDataFromShopImplementCollectionData = BackendService.getFileDataFromShopImplementCollectionData

export let downloadFile = (onDownloadProgressFunc, fileID) => BackendService.downloadFile(getBackend(), curry3_1(_parseShopCollectionDataBody)(onDownloadProgressFunc), fileID)

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
    return BackendService.getShopProtocolCollection(getBackend(),
        curry3_1(_parseShopCollectionDataBody)(_onDownloadProgressFuncForJson),
        collectionName
    ).then(oldCollectionData => {
        return BackendService.updateShopImplementData(getBackend(), collectionName, key, updateData,
            oldCollectionData
        )
    })
}

export let addData = (collectionName: string, key: string, data: any) => {
    return BackendService.getShopProtocolCollection(getBackend(),
        curry3_1(_parseShopCollectionDataBody)(_onDownloadProgressFuncForJson),
        collectionName
    ).then(allCollectionData => {
        return BackendService.addDataToShopProtocolCollection(
            getBackend(),
            BackendService.addShopProtocolDataToDataFromShopProtocolCollectionData,
            collectionName, key, allCollectionData, data
        )
    })
}

let _getObjectWithJsonBody = (collectionName, key) => {
    return getBackend().getObject({
        Bucket: collectionName,
        Key: key
    })
        .then(data => _parseShopCollectionDataBody(_onDownloadProgressFuncForJson, "json", data))
}

export let getDataByKey = (collectionName: string, key: string) => {
    return _getObjectWithJsonBody(collectionName, key)
        .then((body) => {
            console.log("getDataByKey:", key, body)

            return body
        })
}

export let getDataByKeyContain = (collectionName: string, value: string) => {
    return fromPromise(getBackend().listObjects({
        Bucket: collectionName
    }).then(data => {
        if (data.Contents === undefined) {
            return []
        }

        return data.Contents.filter(({ Key }) => {
            return Key.includes(value)
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

export let getShopImplementAccountData = (collectionName, account) => BackendService.getShopImplementAccountData(getBackend(), curry3_1(_parseShopCollectionDataBody)(_onDownloadProgressFuncForJson), collectionName, account)

export let updateShopImplementData = (collectionName, account, updateData, oldShopImplementCollectionData) =>
    BackendService.updateShopImplementData(getBackend(), collectionName, account, updateData, oldShopImplementCollectionData)

export let getDataFromShopImplementAccountData = BackendService.getDataFromShopImplementAccountData

export let isContain = BackendService.isContain

export let buildShopImplementAccountData = BackendService.buildShopImplementAccountData

export let addShopImplementDataToDataFromShopImplementCollectionData = BackendService.addShopImplementDataToDataFromShopImplementCollectionData
