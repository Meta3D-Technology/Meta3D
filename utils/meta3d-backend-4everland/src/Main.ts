import { S3, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { fromPromise } from "most";

type account = string

type collectionData = any

type allCollectionData = Array<collectionData>

type dataFromShopProtocolCollectionData = any

type dataFromShopImplementCollectionData = any

type shopProtocolData = any

type shopImplementData = any

type shopImplementAccountData = {
    key: account,
    fileData: Array<shopImplementData>
}

export type shopImplementCollectionData = Array<shopImplementAccountData>

export let addShopProtocolDataToDataFromShopProtocolCollectionData = (allCollectionData: dataFromShopProtocolCollectionData, data: shopProtocolData): Promise<any> => {
    return new Promise((resolve, reject) => {
        allCollectionData = allCollectionData.slice()

        allCollectionData.push(data)

        resolve(JSON.stringify(allCollectionData))
    })
}

export let addShopImplementDataToDataFromShopImplementCollectionData = (allCollectionData: dataFromShopImplementCollectionData, data: shopImplementData): Promise<any> => {
    return new Promise((resolve, reject) => {
        console.log("addShopImplementDataToDataFromShopImplementCollectionData:", allCollectionData, data)

        allCollectionData = allCollectionData.slice()

        allCollectionData.push(data)

        resolve(allCollectionData)
    })
}

export let addDataToShopProtocolCollection = (s3: S3, addShopProtocolDataToDataFromShopProtocolCollectionData: (allCollectionData: allCollectionData, data: any) => Promise<any>, collectionName: string, key: string, allCollectionData: allCollectionData, data: any) => {
    return addShopProtocolDataToDataFromShopProtocolCollectionData(allCollectionData, data).then(body => {
        console.log("add data", key, body)

        return s3.putObject({
            Bucket: collectionName,
            Key: key,
            Body: body
            ,
        })
    })
}

let _addDataToShopImplementCollection = addDataToShopProtocolCollection

export let addDataToUserCollection = addDataToShopProtocolCollection

let _buildEmptyBody = () => ""

let _buildAccountAsKey = (account) => "meta3d_" + account

let _buildEmptyCollectionData = () => null

let _buildFirstAddDataToBodyFunc = () => (allCollectionData, data): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify(data))
    })
}

export let handleLogin = (s3: S3, account: account) => {
    return fromPromise(addDataToUserCollection(s3,
        _buildFirstAddDataToBodyFunc(),
        "user", _buildAccountAsKey(account),
        _buildEmptyCollectionData(),
        _buildEmptyBody()))
}

let _hasData = (s3: S3, collectionName: string, key: string) => {
    return fromPromise(
        s3.headObject({
            Bucket: collectionName,
            Key: key,
        }).then(
            () => {
                console.log("find")
                return true
            },
            err => {
                if (err.name === 'NotFound') {
                    return false
                }

                throw err
            }
        ))
}

export let handleKeyToLowercase = (key: string) => {
    return key.toLowerCase()
}

export let hasAccount = (s3: S3, collectionName: string, account: account) => {
    return _hasData(s3, collectionName, handleKeyToLowercase(_buildAccountAsKey(account)))
}


export let hasData = (s3: S3, collectionName: string, key: string) => {
    return _hasData(s3, collectionName, handleKeyToLowercase(key))
}

export let getDataFromShopProtocolCollection = (allCollectionData: allCollectionData): dataFromShopProtocolCollectionData => {
    return allCollectionData
}

export let getDataFromShopImplementAccountData = (data: shopImplementAccountData): dataFromShopImplementCollectionData => {
    console.log("getDataFromShopImplementAccountData->data: ", data)

    return data.fileData
}

export let buildShopImplementAccountData = (data: dataFromShopImplementCollectionData, account: account): shopImplementAccountData => {
    return {
        key: handleKeyToLowercase(account),
        fileData: data
    }
}

export let isContain = (find: (dataFromShopCollectionData: dataFromShopProtocolCollectionData | dataFromShopImplementCollectionData) => boolean, dataFromShopCollectionData: dataFromShopProtocolCollectionData | dataFromShopImplementCollectionData) => {
    return new Promise((resolve, reject) => {
        resolve(
            dataFromShopCollectionData.findIndex((data) => {
                return find(data)
            }) !== -1
        )
    })
}

let _buildEmptyArrBody = () => []

export let getShopProtocolCollection = (s3: S3, parseShopCollectionDataBody, collectionName: string): Promise<allCollectionData> => {
    console.log("get collection: ", collectionName)

    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(data => parseShopCollectionDataBody("json", data))
        .catch(err => {
            if (err.name === 'NoSuchKey') {
                console.log("add")

                return addDataToShopProtocolCollection(s3,
                    _buildFirstAddDataToBodyFunc(),
                    collectionName, collectionName,
                    _buildEmptyCollectionData(),
                    _buildEmptyArrBody()).then(_ => {
                        console.log("after add")
                        return getShopProtocolCollection(s3, parseShopCollectionDataBody, collectionName)
                    })
            }

            throw err
        })
}

export let getShopImplementAccountData = (s3: S3, parseShopCollectionDataBody, collectionName: string, account: account): Promise<[shopImplementAccountData, shopImplementCollectionData]> => {
    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(data => parseShopCollectionDataBody("json", data))
        .then((body: shopImplementCollectionData): [shopImplementAccountData, shopImplementCollectionData] => {
            console.log("getShopImplementAccountData->body:", body)

            account = handleKeyToLowercase(account)

            let result = body.find((data) => {
                return data.key === account
            })

            if (result === undefined) {
                result = {
                    key: account,
                    fileData: []
                }
            }

            console.log("getShopImplementAccountData->return:", [result, JSON.stringify(body)])

            return [result, body]
        })
        .catch(err => {
            if (err.name === 'NoSuchKey') {
                console.log("add")

                return _addDataToShopImplementCollection(s3,
                    _buildFirstAddDataToBodyFunc(),
                    collectionName, collectionName,
                    _buildEmptyCollectionData(),
                    _buildEmptyArrBody()).then(_ => {
                        console.log("after add")
                        return getShopImplementAccountData(s3, parseShopCollectionDataBody, collectionName, account)
                    })
            }

            throw err
        })

}

export let getFileBucketName = () => "meta3d-files"

let _arrayBufferToBuffer = (arrayBuffer: ArrayBuffer): Buffer => {
    return Buffer.from(arrayBuffer)
}

export let getFileID = (_, filePath: string) => {
    return handleKeyToLowercase(filePath)
}

export let uploadFile = (s3: S3, filePath: string, fileContent: ArrayBuffer) => {
    console.log("uploadFile:", filePath, fileContent)

    return fromPromise(s3.putObject({
        Bucket: getFileBucketName(),
        Key: handleKeyToLowercase(filePath),
        Body: _arrayBufferToBuffer(fileContent)
        ,
    }))
}

export let updateShopImplementData = (s3: S3, collectionName: string, account: account, updateData: shopImplementAccountData, oldShopImplementCollectionData: shopImplementCollectionData) => {
    account = handleKeyToLowercase(account)

    let newShopImplementCollectionData = []

    let index = oldShopImplementCollectionData.findIndex((data) => {
        data.key === account
    })

    if (index === -1) {
        newShopImplementCollectionData.push(updateData)
    }
    else {
        newShopImplementCollectionData = oldShopImplementCollectionData.slice()

        newShopImplementCollectionData[index] = updateData
    }

    console.log("updateShopImplementData->putObject Body:", newShopImplementCollectionData,
        newShopImplementCollectionData[0].fileData,
        JSON.stringify(newShopImplementCollectionData)
    )

    return s3.putObject({
        Bucket: collectionName,
        Key: collectionName,
        Body: JSON.stringify(newShopImplementCollectionData)
        ,
    })
}

export let getShopImplementCollection = getShopProtocolCollection

export let mapShopImplementCollection = (allCollectionData: allCollectionData, func) => {
    return allCollectionData.map(func)
}

export let getAccountFromShopImplementCollectionData = (data: collectionData) => {
    return data.key
}

export let getFileDataFromShopImplementCollectionData = (data: collectionData) => {
    return data.fileData
}

export let downloadFile = (s3: S3, parseShopCollectionDataBody, fileID: string) => {
    return fromPromise(s3.getObject({
        Bucket: getFileBucketName(),
        Key: handleKeyToLowercase(fileID)
    })
        .then(data => parseShopCollectionDataBody("arrayBuffer", data))
    )
}

export let parseShopCollectionDataBodyForNodejs = (returnDataType: "json", allCollectionData: GetObjectCommandOutput): Promise<any> => {
    let stream = allCollectionData.Body as any

    return new Promise((resolve, reject) => {
        const chunks = [];

        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
    })
        .then((buffer: Buffer) => {
            switch (returnDataType) {
                // case "arrayBuffer":
                // return buffer.buffer
                case "json":
                    return JSON.parse(buffer.toString("utf8") as string)
                default:
                    throw new Error("unkndown returnDataType:" + returnDataType)
            }
        })
}