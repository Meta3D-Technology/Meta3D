import { S3 } from "@aws-sdk/client-s3";
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

export let addData = (addDataToBody, collectionName, key, collectionData, data) => BackendService.addData(getBackend(), addDataToBody, collectionName, key, collectionData, data)

export let hasAccount = (collectionName, account) => BackendService.hasAccount(getBackend(), collectionName, account)

export let getShopCollection = (collectionName) => BackendService.getShopCollection(getBackend(), collectionName)