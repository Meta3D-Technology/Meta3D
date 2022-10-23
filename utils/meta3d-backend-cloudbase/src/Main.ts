import { fromPromise, just } from "most"

type collectionData = {
    data: Array<any>
}

let _getDatabase = (app: any) => {
    return app.database()
}

let _notHasData = (app: any, collectionName: string, data: object) => {
    return fromPromise(_getDatabase(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0))
}


let _checkUserName = (app: any, account: string) => {
    return _notHasData(app, "user", { key: account })
}

let _buildEmptyCollectionData = () => null

let _buildFirstAddDataToBodyFunc = () => (collectionData, data) => null

export let addDataToBody = (collectionData: collectionData, data: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(null)
    })
}

export let handleLogin = (app: any, account: string) => {
    return _checkUserName(app, account).flatMap((isNotHasData: boolean) => {
        if (isNotHasData) {
            return fromPromise(
                addData(app, _buildFirstAddDataToBodyFunc(), "user", account, _buildEmptyCollectionData(), {})
            ).concat(fromPromise(
                addData(app, _buildFirstAddDataToBodyFunc(), "publishedextensions", account, _buildEmptyCollectionData(), {
                    fileData: []
                })
            )).concat(fromPromise(
                addData(app, _buildFirstAddDataToBodyFunc(), "publishedcontributes", account, _buildEmptyCollectionData(), {
                    fileData: []
                })
            )).concat(fromPromise(
                addData(app, _buildFirstAddDataToBodyFunc(), "publishedelementassembledata", account, _buildEmptyCollectionData(), {
                    fileData: []
                })
            )).concat(fromPromise(
                addData(app, _buildFirstAddDataToBodyFunc(), "publishedskinassembledata", account, _buildEmptyCollectionData(), {
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

export let addData = (app: any, addDataToBody: (collectionData: collectionData, data: any) => Promise<string>, collectionName: string, key: string, collectionData: collectionData, data: any) => {
    return _getDatabase(app).collection(collectionName)
        .add({
            ...data,
            // key: _handleKeyToLowercase(key)
            key: key
        })
}

let _hasData = (app: any, collectionName: string, key: string) => {
    return fromPromise(_getDatabase(app).collection(collectionName)
        .where({ key: key })
        .get()
        .then(res => res.data.length > 0))
}

export let hasAccount = (app: any, collectionName: string, account: string) => {
    return _hasData(app, collectionName, _handleKeyToLowercase(account))
}

export let isContain = (find: (collectionData: collectionData) => boolean, collectionData: collectionData) => {
    return new Promise((resolve, reject) => {
        resolve(
            collectionData.data.findIndex((data) => {
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

export let uploadFile = (app: any, cloudPath: string, fileContent: Buffer) => {
    return fromPromise(app.uploadFile({
        cloudPath,
        fileContent
    }))
}

export let getCollection = (app: any, collectionName: string): Promise<collectionData> => {
    return _getDatabase(app).collection(collectionName).get()
}

export let getData = (app: any, collectionName: string, data: any) => {
    return _getDatabase(app).collection(collectionName)
        .where(data)
        .get()
}

export let updateCollection = (app: any, collectionName: string, updateData: any) => {
    return _getDatabase(app).collection(collectionName)
        .update(updateData)
}

export let updateData = (app: any, collectionName: string, whereData: any, updateData: any) => {
    return _getDatabase(app).collection(collectionName)
        .where(whereData)
        .update(updateData)
}