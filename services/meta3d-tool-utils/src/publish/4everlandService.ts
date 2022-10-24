import { S3 } from "@aws-sdk/client-s3";
import { empty, fromPromise, just } from "most";
import * as BackendService from "meta3d-backend-4everland";

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

    return just(s3)
}

export let addDataToShopProtocolCollection = BackendService.addDataToShopProtocolCollection

export let hasAccount = BackendService.hasAccount

export let isContain = BackendService.isContain

export let getShopProtocolCollection = BackendService.getShopProtocolCollection

export let addShopProtocolDataToDataFromShopProtocolCollectionData = BackendService.addShopProtocolDataToDataFromShopProtocolCollectionData

export let getShopImplementAccountData = BackendService.getShopImplementAccountData

export let getDataFromShopProtocolCollection = BackendService.getDataFromShopProtocolCollection

export let getDataFromShopImplementAccountData = BackendService.getDataFromShopImplementAccountData

export let buildShopImplementAccountData = BackendService.buildShopImplementAccountData

export let addShopImplementDataToDataFromShopImplementCollectionData = BackendService.addShopImplementDataToDataFromShopImplementCollectionData

export let getFileID = BackendService.getFileID

export let updateShopImplementData = BackendService.updateShopImplementData

export let uploadFile = BackendService.uploadFile

export let parseShopCollectionDataBodyForNodejs = BackendService.parseShopCollectionDataBodyForNodejs