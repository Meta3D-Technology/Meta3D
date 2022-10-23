import { S3, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { fromPromise } from "most";

type collectionData = Array<any>

let _parseBody = (collectionData: GetObjectCommandOutput): Promise<collectionData> => {
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

export let addDataToBody = (collectionData: collectionData, data: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        collectionData.push(data)

        resolve(JSON.stringify(collectionData))
    })
}

export let addData = (s3: S3, addDataToBody: (collectionData: collectionData, data: any) => Promise<string>, collectionName: string, key: string, collectionData: collectionData, data: any) => {
    return addDataToBody(collectionData, data).then(body => {
        console.log("add data", key, body)

        return s3.putObject({
            Bucket: collectionName,
            Key: key,
            Body: body
            ,
        })
    })
}

let _buildEmptyBody = () => ""

let _buildAccountAsKey = (account) => "meta3d_" + account

let _buildEmptyCollectionData = () => null

let _buildFirstAddDataToBodyFunc = () => (collectionData, data): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify(data))
    })
}

export let handleLogin = (s3: S3, account: string) => {
    return fromPromise(addData(s3,
        _buildFirstAddDataToBodyFunc(),
        "user", _buildAccountAsKey(account),
        _buildEmptyCollectionData(),
        _buildEmptyBody()))
}

let _hasData = (s3: S3, collectionName: string, key: string) => {
    console.log(collectionName, key)

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

export let hasAccount = (s3: S3, collectionName: string, account: string) => {
    return _hasData(s3, collectionName, _handleKeyToLowercase(_buildAccountAsKey(account)))
}

export let isContain = (find: (collectionData: collectionData) => boolean, collectionData: collectionData) => {
    console.log("isContain")

    return new Promise((resolve, reject) => {
        resolve(
            collectionData.findIndex((data) => {
                return find(data)
            }) !== -1
        )
    })
}

let _buildEmptyArrBody = () => []

export let getCollection = (s3: S3, collectionName: string): Promise<collectionData> => {
    console.log("get collection")

    return s3.getObject({
        Bucket: collectionName,
        Key: collectionName
    })
        .then(_parseBody)
        .catch(err => {
            if (err.name === 'NoSuchKey') {
                console.log("add")

                return addData(s3,
                    _buildFirstAddDataToBodyFunc(),
                    collectionName, collectionName,
                    _buildEmptyCollectionData(),
                    _buildEmptyArrBody()).then(_ => {
                        console.log("after add")
                        return getCollection(s3, collectionName)
                    })
            }

            throw err
        })
}
