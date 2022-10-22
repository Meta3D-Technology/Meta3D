import { S3 } from "@aws-sdk/client-s3";
import { empty, fromPromise, just } from "most";
import { getBackend, setBackend } from "../domain_layer/repo/Repo";

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

let _buildEmptyBody = () => ""

export let handleLogin = (account: string) => {
    return fromPromise(addData("user", account, _buildEmptyBody()))
}

export let addData = (collectionName: string, key: string, data: any) => {
    // console.log(
    //     data,
    //     JSON.stringify(data)
    // )

    return getBackend().putObject({
        Bucket: collectionName,
        Key: key,
        Body: JSON.stringify(data),
    })
}