import { getDatabase, getFile, init as initCloundbase } from "../cloudbase/CloundbaseService"
import { getEditor } from "../../domain_layer/repo/CloundbaseRepo"
import { fromPromise, mergeArray } from "most"


export let init = async () => {
    await initCloundbase()
}

let _getAllPublishData = (collectionName: string) => {
    let app = getEditor()

    return fromPromise(getDatabase().collection(collectionName)
        .get()).flatMap((res: any) => {
            return fromPromise(mergeArray(
                res.data.map(({ fileIDs }) => {
                    return mergeArray(
                        fileIDs.map(fileID => {
                            return getFile(fileID).map(arrayBuffer => {
                                return { id: fileID, file: arrayBuffer }
                            })
                        })
                    )
                })
            ).reduce(
                (result, data) => {
                    result.push(data)

                    return result
                }, []
            )
            )
        })
}

export let getAllPublishExtensions = () => {
    return _getAllPublishData("publishedExtensions")
}

export let getAllPublishContributes = () => {
    return _getAllPublishData("publishedContributes")
}