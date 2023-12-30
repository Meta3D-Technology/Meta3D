export type targetVersion = string

type collectionName = "user" | "publishedapps"

// type dataType = "database" | "storage"

export type databaseData = {
    mapFunc: (oldData: any) => any,
    collectionName: collectionName
}

export type storageData = {
    mapFunc: (oldFile: ArrayBuffer) => ArrayBuffer,
    // buildFileNameFunc: (oldData: any) => string,
    buildFilePathFunc: (oldData: any) => string,
    collectionName: collectionName
}



// export type typeData = Record<targetVersion, Array<data>>

let _removeIdAndKey = (data) => {
    let newData = {
        ...data
    }

    delete newData._id
    delete newData._openid
    delete newData.key

    return newData
}

// export const historyData: Record<dataType, typeData> = {
export const historyData: {
    "database": Record<targetVersion, Array<databaseData>>,
    "storage": Record<targetVersion, Array<storageData>>,
} = {
    "database": {
        "newest": [{
            mapFunc: (oldData) => {
                return {
                    ..._removeIdAndKey(oldData),
                    Mbi: 2,
                    score: null
                }
            },
            collectionName: "user"
        }]
    },
    "storage": {
        "newest": [{
            mapFunc: (oldFile) => {
                // return new ArrayBuffer(10)
                console.log("use old File: ", oldFile)
                return oldFile
            },
            buildFilePathFunc: (oldData) => {
                let fileName = oldData.account + "_" + oldData.appName

                return "apps/" + fileName + ".arraybuffer"
            },
            collectionName: "publishedapps"
        }]
    }
}