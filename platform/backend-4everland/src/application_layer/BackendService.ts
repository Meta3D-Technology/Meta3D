import { S3, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { empty, fromPromise, just } from "most";
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
