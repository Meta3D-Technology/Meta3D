import { fromPromise, just } from "most"

type account = string

type collectionData = any

type allCollectionData = {
    data: Array<collectionData>
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

let _buildFirstAddDataToBodyFunc = () => (allCollectionData, data) => null

export let addShopProtocolDataToDataFromShopProtocolCollectionData = (allCollectionData: dataFromShopProtocolCollectionData, data: shopProtocolData): Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve(null)
    })
}

export let addShopImplementDataToDataFromShopImplementCollectionData = (allCollectionData: dataFromShopImplementCollectionData, data: shopImplementData): Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve(allCollectionData.concat([data]))
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

export let handleKeyToLowercase = (key: string) => {
    return key.toLowerCase()
}

export let addDataToShopProtocolCollection = (app: any, addShopProtocolDataToDataFromShopProtocolCollectionData: (allCollectionData: allCollectionData, data: any) => Promise<any>, collectionName: string, key: string, allCollectionData: allCollectionData, data: any) => {
    return _getDatabase(app).collection(collectionName)
        .add({
            ...data,
            // key: handleKeyToLowercase(key)
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
    return _hasData(app, collectionName, handleKeyToLowercase(account))
}

export let hasData = (app: any, collectionName: string, key: string) => {
    return _hasData(app, collectionName, handleKeyToLowercase(key))
}

export let getDataFromShopProtocolCollection = (allCollectionData: allCollectionData): dataFromShopProtocolCollectionData => {
    return allCollectionData.data
}

export let getDataFromShopImplementAccountData = (data: shopImplementAccountData): dataFromShopImplementCollectionData => {
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


export let getShopProtocolCollection = (app: any, parseShopCollectionDataBody, collectionName: string): Promise<allCollectionData> => {
    return _getDatabase(app).collection(collectionName).get()
}

export let getShopImplementAccountData = (app: any, parseShopCollectionDataBody, collectionName: string, account: account): Promise<[shopImplementAccountData, shopImplementCollectionData]> => {
    return _getDatabase(app).collection(collectionName)
        .where({ key: handleKeyToLowercase(account) })
        .get()
        .then(res => [res.data[0], []])
}

// export let updateCollection = (app: any, collectionName: string, updateData: any) => {
//     return _getDatabase(app).collection(collectionName)
//         .update(updateData)
// }

export let updateShopImplementData = (app: any, collectionName: string, account: account, updateData: shopImplementAccountData, _oldShopImplementCollectionData: shopImplementCollectionData) => {
    return _getDatabase(app).collection(collectionName)
        .where({ key: handleKeyToLowercase(account) })
        .update(updateData)
}

// export let getShopImplementCollectionFunc = (app: any, collectionName: string): Promise<allCollectionData> => {
//     return _getDatabase(app).collection(collectionName).get()
// }
export let getShopImplementCollection = getShopProtocolCollection

export let mapShopImplementCollection = (allCollectionData: allCollectionData, func) => {
    return allCollectionData.data.map(func)
}

export let getAccountFromShopImplementCollectionData = (data: collectionData) => {
    return data.key
}

export let getFileDataFromShopImplementCollectionData = (data: collectionData) => {
    return data.fileData
}

export let getFile = (app: any, parseShopCollectionDataBody, fileID: string) => {
    return fromPromise(app.getTempFileURL({
        fileList: [fileID]
    })).flatMap(({ fileList }) => {
        return fromPromise(fetch(fileList[0].tempFileURL).then(response => response.arrayBuffer()))
    })
}

export let parseShopCollectionDataBodyForNodejs = null