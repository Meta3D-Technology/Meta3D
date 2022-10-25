import { S3, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { empty, fromPromise, just, mergeArray } from "most";
import { getBackend, setBackend } from "../domain_layer/repo/Repo";
import * as BackendService from "meta3d-backend-4everland";
import { curry2, curry3_1, curry4_1 } from "meta3d-fp/src/Curry";

export let init = () => {
    const s3 = new S3({
        endpoint: "https://endpoint.4everland.co",
        signatureVersion: "v4",
        credentials: {
            accessKeyId: "P7SHR2MYU5CHLXKXCOG7",
            secretAccessKey: "5yhjyVdcpNNKjZ9X5sBe3738Lh9KftfDHQ6zkZKL",
            // sessionToken,
        },
        region: "us-west-2",
    } as any);


    setBackend(s3)

    return empty()
}

// let _buildEmptyBody = () => ""

// export let handleLogin = (account: string) => {
//     return fromPromise(addData("user", "meta3d_" + account, _buildEmptyBody()))
// }

// export let handleLogin = curry2(BackendService.handleLogin)(getBackend())

// export let addData = curry4_1(BackendService.addData)(getBackend())

// export let hasAccount = curry3_1(BackendService.hasAccount)(getBackend())

// export let getShopCollection = curry2(BackendService.getShopCollection)(getBackend())


export let handleLogin = (account) => BackendService.handleLogin(getBackend(), account)

// export let addData = (addDataToBody, collectionName, key, collectionData, data) => BackendService.addData(getBackend(), addDataToBody, collectionName, key, collectionData, data)

export let hasAccount = (collectionName, account) => BackendService.hasAccount(getBackend(), collectionName, account)

let _parseShopCollectionDataBody = (returnDataType: "arrayBuffer" | "json", allCollectionData: GetObjectCommandOutput): Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve(allCollectionData.Body)
    }).then((body: ReadableStream<any>) => {
        const reader = body.getReader();
        return new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            return;
                        }
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

export let getShopProtocolCollection = (collectionName) => BackendService.getShopProtocolCollection(getBackend(), _parseShopCollectionDataBody, collectionName)

export let getShopImplementCollection = (collectionName) => BackendService.getShopImplementCollection(getBackend(), _parseShopCollectionDataBody, collectionName)

export let getDataFromShopProtocolCollection = BackendService.getDataFromShopProtocolCollection

export let mapShopImplementCollection = BackendService.mapShopImplementCollection

export let getAccountFromShopImplementCollectionData = BackendService.getAccountFromShopImplementCollectionData

export let getFileDataFromShopImplementCollectionData = BackendService.getFileDataFromShopImplementCollectionData

export let getFile = (fileID) => BackendService.getFile(getBackend(), _parseShopCollectionDataBody, fileID)

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
        const percentCompleted = ((e.loaded / e.total) * 100) | 0

        onUploadProgressFunc(percentCompleted)
    })

    return task.done()
}

export let updateData = (collectionName: string, key: string, updateData: any) => {
    return BackendService.getShopProtocolCollection(getBackend(),
        _parseShopCollectionDataBody,
        collectionName
    ).then(oldCollectionData => {
        return BackendService.updateShopImplementData(getBackend(), collectionName, key, updateData,
            oldCollectionData
        )
    })
}

export let addData = (collectionName: string, key: string, data: any) => {
    return BackendService.getShopProtocolCollection(getBackend(),
        _parseShopCollectionDataBody,
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
        .then(data => _parseShopCollectionDataBody("json", data))
}

export let getDataByKey = (collectionName: string, key: string) => {
    return _getObjectWithJsonBody(collectionName, collectionName)
        .then((body) => {
            console.log("getDataByKeyFunc:", key, body)

            key = BackendService.handleKeyToLowercase(key)

            return body.filter((data) => {
                return data.key === key
            })
        })
}

export let getDataByKeyContain = (collectionName: string, value: string) => {
    return fromPromise(getBackend().listObjects({
        Bucket: collectionName
    }).then(data => {
        return data.Contents.filter(({ Key }) => {
            return Key.includes(value)
        })
    })).map(data => {
        return mergeArray(
            data.map(({ Key }) => {
                return fromPromise(_getObjectWithJsonBody(collectionName, Key))
            })
        ).reduce(
            (result, data) => {
                result.push(data)

                return result
            }, []
        )
    })
}

export let hasData = (collectionName: string, key: string) => BackendService.hasData(getBackend(), collectionName, key)

export let getFileID = BackendService.getFileID

export let getShopImplementAccountData = (collectionName, account) => BackendService.getShopImplementAccountData(getBackend(), _parseShopCollectionDataBody, collectionName, account)

export let updateShopImplementData = (collectionName, account, updateData, oldShopImplementCollectionData) =>
    BackendService.updateShopImplementData(getBackend(), collectionName, account, updateData, oldShopImplementCollectionData)

export let getDataFromShopImplementAccountData = BackendService.getDataFromShopImplementAccountData

export let isContain = BackendService.isContain

export let buildShopImplementAccountData = BackendService.buildShopImplementAccountData

export let addShopImplementDataToDataFromShopImplementCollectionData = BackendService.addShopImplementDataToDataFromShopImplementCollectionData
