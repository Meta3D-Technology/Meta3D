import { fromPromise, just } from "most"

type account = string

type collectionData = {
    data: Array<any>
}


type dataFromShopProtocolCollectionData = any

type dataFromShopImplementCollectionData = any

type shopProtocolData = any

type shopImplementData = any

type shopImplementAccountData = {
    key: account,
    fileData: Array<shopImplementData>
}

type shopImplementCollectionData = Array<shopImplementAccountData>

let _getDatabase = (app: any) => {
    return app.database()
}

let _notHasData = (app: any, collectionName: string, data: object) => {
    return fromPromise(_getDatabase(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0))
}


let _checkUserName = (app: any, account: account) => {
    return _notHasData(app, "user", { key: account })
}

let _buildEmptyCollectionData = () => null

let _buildFirstAddDataToBodyFunc = () => (collectionData, data) => null

export let addShopProtocolDataToDataFromShopProtocolCollectionData = (collectionData: dataFromShopProtocolCollectionData, data: shopProtocolData): Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve(null)
    })
}

export let addShopImplementDataToDataFromShopImplementCollectionData = (collectionData: dataFromShopImplementCollectionData, data: shopImplementData): Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve(collectionData.concat([data]))
    })
}

export let handleLogin = (app: any, account: account) => {
    return _checkUserName(app, account).flatMap((isNotHasData: boolean) => {
        if (isNotHasData) {
            return fromPromise(
                addDataToUserCollection(app, _buildFirstAddDataToBodyFunc(), "user", account, _buildEmptyCollectionData(), {})
            ).concat(fromPromise(
                addDataToShopImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedextensions", account, _buildEmptyCollectionData(), {
                    fileData: []
                })
            )).concat(fromPromise(
                addDataToShopImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedcontributes", account, _buildEmptyCollectionData(), {
                    fileData: []
                })
            )).concat(fromPromise(
                addDataToShopImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedelementassembledata", account, _buildEmptyCollectionData(), {
                    fileData: []
                })
            )).concat(fromPromise(
                addDataToShopImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedskinassembledata", account, _buildEmptyCollectionData(), {
                    fileData: []
                })
            ))
        }

        return just(account)
    })
}

let _handleKeyToLowercase = (key: string) => {
    return key.toLowerCase()
}

export let addDataToShopProtocolCollection = (app: any, addShopProtocolDataToDataFromShopProtocolCollectionData: (collectionData: collectionData, data: any) => Promise<any>, collectionName: string, key: string, collectionData: collectionData, data: any) => {
    return _getDatabase(app).collection(collectionName)
        .add({
            ...data,
            // key: _handleKeyToLowercase(key)
            key: key
        })
}

export let addDataToShopImplementCollection = addDataToShopProtocolCollection

export let addDataToUserCollection = addDataToShopProtocolCollection

let _hasData = (app: any, collectionName: string, key: string) => {
    return fromPromise(_getDatabase(app).collection(collectionName)
        .where({ key: key })
        .get()
        .then(res => res.data.length > 0))
}

export let hasAccount = (app: any, collectionName: string, account: account) => {
    return _hasData(app, collectionName, _handleKeyToLowercase(account))
}

export let getDataFromShopProtocolCollection = (collectionData: collectionData): dataFromShopProtocolCollectionData => {
    return collectionData.data
}

export let getDataFromShopImplementAccountData = (data: shopImplementAccountData): dataFromShopImplementCollectionData => {
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

export let notHasData = (app: any, collectionName: string, data: object) => {
    return fromPromise(_getDatabase(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0))
}

export let getFileID = ({ fileID }, filePath: string) => {
    return fileID
}

let _arrayBufferToBuffer = (arrayBuffer: ArrayBuffer): Buffer => {
    return Buffer.from(arrayBuffer)
}

export let uploadFile = (app: any, filePath: string, fileContent: ArrayBuffer) => {
    return fromPromise(app.uploadFile({
        cloudPath: filePath,
        fileContent: _arrayBufferToBuffer(fileContent)
    }))
}

export let getShopProtocolCollection = (app: any, collectionName: string): Promise<collectionData> => {
    return _getDatabase(app).collection(collectionName).get()
}

export let getShopImplementAccountData = (app: any, collectionName: string, account: account): Promise<[shopImplementAccountData, shopImplementCollectionData]> => {
    return _getDatabase(app).collection(collectionName)
        .where({ key: _handleKeyToLowercase(account) })
        .get()
        .then(res => [res.data[0], []])
}

// export let updateCollection = (app: any, collectionName: string, updateData: any) => {
//     return _getDatabase(app).collection(collectionName)
//         .update(updateData)
// }

export let updateShopImplementData= (app: any, collectionName: string, account: account, updateData: shopImplementAccountData, _oldShopImplementCollectionData: shopImplementCollectionData) => {
    return _getDatabase(app).collection(collectionName)
        .where({ key: _handleKeyToLowercase(account) })
        .update(updateData)
}