import { S3, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { fromPromise } from "most";

type account = string

type collectionData = Array<any>

type dataFromShopProtocolCollectionData = any

type dataFromShopImplementCollectionData = any

type shopProtocolData = any

type shopImplementData = any

type shopImplementAccountData = {
    key: account,
    fileData: Array<shopImplementData>
}

type shopImplementCollectionData = Array<shopImplementAccountData>

let _parseShopCollectionDataBody = (collectionData: GetObjectCommandOutput): Promise<any> => {
    let stream = collectionData.Body as any


    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    }).then(v => {
        return JSON.parse(v as string)
    })
}

export let addShopProtocolDataToDataFromShopProtocolCollectionData = (collectionData: dataFromShopProtocolCollectionData, data: shopProtocolData): Promise<any> => {
    return new Promise((resolve, reject) => {
        collectionData.push(data)

        resolve(JSON.stringify(collectionData))
    })
}

export let addShopImplementDataToDataFromShopImplementCollectionData = (collectionData: dataFromShopImplementCollectionData, data: shopImplementData): Promise<any> => {
    return new Promise((resolve, reject) => {
        console.log("addShopImplementDataToDataFromShopImplementCollectionData:", collectionData, data)

        collectionData.push(data)

        resolve(collectionData)
    })
}

export let addDataToShopProtocolCollection = (s3: S3, addShopProtocolDataToDataFromShopProtocolCollectionData: (collectionData: collectionData, data: any) => Promise<any>, collectionName: string, key: string, collectionData: collectionData, data: any) => {
    return addShopProtocolDataToDataFromShopProtocolCollectionData(collectionData, data).then(body => {
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

let _buildFirstAddDataToBodyFunc = () => (collectionData, data): Promise<string> => {
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

let _handleKeyToLowercase = (key: string) => {
    return key.toLowerCase()
}

export let hasAccount = (s3: S3, collectionName: string, account: account) => {
    return _hasData(s3, collectionName, _handleKeyToLowercase(_buildAccountAsKey(account)))
}

export let getDataFromShopProtocolCollection = (collectionData: collectionData): dataFromShopProtocolCollectionData => {
    return collectionData
}

export let getDataFromShopImplementAccountData = (data: shopImplementAccountData): dataFromShopImplementCollectionData => {
    console.log("getDataFromShopImplementAccountData->data: ", data)

    return data.fileData
}

export let buildShopImplementAccountData = (data: dataFromShopImplementCollectionData, account: account): shopImplementAccountData => {
    return {
        key: _handleKeyToLowercase(account),
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

export let getShopProtocolCollection = (s3: S3, collectionName: string): Promise<collectionData> => {
    console.log("get collection")

    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(_parseShopCollectionDataBody)
        .catch(err => {
            if (err.name === 'NoSuchKey') {
                console.log("add")

                return addDataToShopProtocolCollection(s3,
                    _buildFirstAddDataToBodyFunc(),
                    collectionName, collectionName,
                    _buildEmptyCollectionData(),
                    _buildEmptyArrBody()).then(_ => {
                        console.log("after add")
                        return getShopProtocolCollection(s3, collectionName)
                    })
            }

            throw err
        })
}

export let getShopImplementAccountData = (s3: S3, collectionName: string, account: account): Promise<[shopImplementAccountData, shopImplementCollectionData]> => {
    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    }).then(_parseShopCollectionDataBody)
        .then((body: shopImplementCollectionData): [shopImplementAccountData, shopImplementCollectionData] => {
            console.log("getShopImplementAccountData->body:", body)

            account = _handleKeyToLowercase(account)

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
                        return getShopImplementAccountData(s3, collectionName, account)
                    })
            }

            throw err
        })

}

let _getFileBucketName = () => "meta3d-files"

let _arrayBufferToBuffer = (arrayBuffer: ArrayBuffer): Buffer => {
    return Buffer.from(arrayBuffer)
}

export let getFileID = (_, filePath: string) => {
    return _handleKeyToLowercase(filePath)
}

export let uploadFile = (s3: S3, filePath: string, fileContent: ArrayBuffer) => {
    console.log("uploadFile:", filePath, fileContent)

    return fromPromise(s3.putObject({
        Bucket: _getFileBucketName(),
        Key: _handleKeyToLowercase(filePath),
        Body: _arrayBufferToBuffer(fileContent)
        ,
    }))
}

export let updateShopImplementData = (s3: S3, collectionName: string, account: account, updateData: shopImplementAccountData, oldShopImplementCollectionData: shopImplementCollectionData) => {
    account = _handleKeyToLowercase(account)

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