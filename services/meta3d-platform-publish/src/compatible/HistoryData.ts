export type targetVersion = string

type collectionName = "user"

export type data = {
    mapFunc: (oldData: any) => any,
    collectionName: collectionName
}

let _removeIdAndKey = (data) => {
    let newData = {
        ...data
    }

    delete newData._id
    delete newData._openid
    delete newData.key

    return newData
}

export const historyData: Record<targetVersion, Array<data>> = {
    "newest": [{
        mapFunc: (data) => {
            return {
                ..._removeIdAndKey(data),
                Mbi: 0,
                score: null
            }
        },
        collectionName: "user"
    }]
}