import { S3, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { fromPromise } from "most";

type account = string

type collectionData = any

type allCollectionData = Array<collectionData>

type dataFromMarketProtocolCollectionData = any

type dataFromMarketImplementCollectionData = any

type marketProtocolData = any

type marketImplementData = any

type marketImplementAccountData = {
    key: account,
    fileData: Array<marketImplementData>
}

export type marketImplementCollectionData = Array<marketImplementAccountData>

export let addMarketProtocolDataToDataFromMarketProtocolCollectionData = (allCollectionData: dataFromMarketProtocolCollectionData, data: marketProtocolData): Promise<any> => {
    return new Promise((resolve, reject) => {
        allCollectionData = allCollectionData.slice()

        allCollectionData.push(data)

        resolve(JSON.stringify(allCollectionData))
    })
}

export let addMarketImplementDataToDataFromMarketImplementCollectionData = (allCollectionData: dataFromMarketImplementCollectionData, data: marketImplementData): Promise<any> => {
    return new Promise((resolve, reject) => {
        console.log("addMarketImplementDataToDataFromMarketImplementCollectionData:", allCollectionData, data)

        allCollectionData = allCollectionData.slice()

        allCollectionData.push(data)

        resolve(allCollectionData)
    })
}

export let addDataToMarketProtocolCollection = (s3: S3, addMarketProtocolDataToDataFromMarketProtocolCollectionData: (allCollectionData: allCollectionData, data: any) => Promise<any>, collectionName: string, key: string, allCollectionData: allCollectionData, data: any) => {
    return addMarketProtocolDataToDataFromMarketProtocolCollectionData(allCollectionData, data).then(body => {
        console.log("add data", key, body)

        return s3.putObject({
            Bucket: collectionName,
            Key: key,
            Body: body
            ,
        })
    })
}

let _addDataToMarketImplementCollection = addDataToMarketProtocolCollection

export let addDataToUserCollection = addDataToMarketProtocolCollection

let _buildEmptyBody = () => ""

let _buildAccountAsKey = (account) => "meta3d_" + account

let _buildEmptyCollectionData = () => null

let _buildFirstAddDataToBodyFunc = () => (allCollectionData, data): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify(data))
    })
}

export let handleLoginForWeb3 = (s3: S3, account: account) => {
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

export let getDataFromMarketProtocolCollection = (allCollectionData: allCollectionData): dataFromMarketProtocolCollectionData => {
    return allCollectionData
}

export let getDataFromMarketImplementAccountData = (data: marketImplementAccountData): dataFromMarketImplementCollectionData => {
    console.log("getDataFromMarketImplementAccountData->data: ", data)

    return data.fileData
}

export let buildMarketImplementAccountData = (data: dataFromMarketImplementCollectionData, account: account): marketImplementAccountData => {
    return {
        key: handleKeyToLowercase(account),
        fileData: data
    }
}

export let isContain = (find: (dataFromMarketCollectionData: dataFromMarketProtocolCollectionData | dataFromMarketImplementCollectionData) => boolean, dataFromMarketCollectionData: dataFromMarketProtocolCollectionData | dataFromMarketImplementCollectionData) => {
    return new Promise((resolve, reject) => {
        resolve(
            dataFromMarketCollectionData.findIndex((data) => {
                return find(data)
            }) !== -1
        )
    })
}

let _buildEmptyArrBody = () => []

export let getMarketProtocolCollection = (s3: S3, parseMarketCollectionDataBody, collectionName: string): Promise<allCollectionData> => {
    console.log("get collection: ", collectionName)

    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(data => parseMarketCollectionDataBody("json", data))
        .catch(err => {
            if (err.name === 'NoSuchKey') {
                console.log("add")

                return addDataToMarketProtocolCollection(s3,
                    _buildFirstAddDataToBodyFunc(),
                    collectionName, collectionName,
                    _buildEmptyCollectionData(),
                    _buildEmptyArrBody()).then(_ => {
                        console.log("after add")
                        return getMarketProtocolCollection(s3, parseMarketCollectionDataBody, collectionName)
                    })
            }

            throw err
        })
}

export let getMarketImplementAccountData = (s3: S3, parseMarketCollectionDataBody, collectionName: string, account: account): Promise<[marketImplementAccountData, marketImplementCollectionData]> => {
    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(data => parseMarketCollectionDataBody("json", data))
        .then((body: marketImplementCollectionData): [marketImplementAccountData, marketImplementCollectionData] => {
            console.log("getMarketImplementAccountData->body:", body)

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

            console.log("getMarketImplementAccountData->return:", [result, JSON.stringify(body)])

            return [result, body]
        })
        .catch(err => {
            if (err.name === 'NoSuchKey') {
                console.log("add")

                return _addDataToMarketImplementCollection(s3,
                    _buildFirstAddDataToBodyFunc(),
                    collectionName, collectionName,
                    _buildEmptyCollectionData(),
                    _buildEmptyArrBody()).then(_ => {
                        console.log("after add")
                        return getMarketImplementAccountData(s3, parseMarketCollectionDataBody, collectionName, account)
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

export let updateMarketImplementData = (s3: S3, collectionName: string, account: account, updateData: marketImplementAccountData, oldMarketImplementCollectionData: marketImplementCollectionData) => {
    account = handleKeyToLowercase(account)

    let newMarketImplementCollectionData = []

    let index = oldMarketImplementCollectionData.findIndex((data) => {
        data.key === account
    })

    if (index === -1) {
        newMarketImplementCollectionData.push(updateData)
    }
    else {
        newMarketImplementCollectionData = oldMarketImplementCollectionData.slice()

        newMarketImplementCollectionData[index] = updateData
    }

    console.log("updateMarketImplementData->putObject Body:", newMarketImplementCollectionData,
        newMarketImplementCollectionData[0].fileData,
        JSON.stringify(newMarketImplementCollectionData)
    )

    return s3.putObject({
        Bucket: collectionName,
        Key: collectionName,
        Body: JSON.stringify(newMarketImplementCollectionData)
        ,
    })
}

export let getMarketImplementCollection = getMarketProtocolCollection

export let mapMarketImplementCollection = (allCollectionData: allCollectionData, func) => {
    return allCollectionData.map(func)
}

export let getAccountFromMarketImplementCollectionData = (data: collectionData) => {
    return data.key
}

export let getFileDataFromMarketImplementCollectionData = (data: collectionData) => {
    return data.fileData
}

export let downloadFile = (s3: S3, parseMarketCollectionDataBody, fileID: string) => {
    return fromPromise(s3.getObject({
        Bucket: getFileBucketName(),
        Key: handleKeyToLowercase(fileID)
    })
        .then(data => parseMarketCollectionDataBody("arrayBuffer", data))
    )
}

export let parseMarketCollectionDataBodyForNodejs = (returnDataType: "json", allCollectionData: GetObjectCommandOutput): Promise<any> => {
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