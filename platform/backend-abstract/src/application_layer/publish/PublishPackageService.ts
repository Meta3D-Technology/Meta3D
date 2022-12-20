import { fromPromise } from "most"

export let _buildKey = (
    entryProtocolName: string,
    entryProtocolVersion: string,
    packageName: string, packageVersion: string, account: string) => account + "_" +
    entryProtocolName + "_" +
    entryProtocolVersion + "_" +
    packageName + "_" + packageVersion


let _buildFileName = (
    packageName: string, packageVersion: string, account: string) => account + "_" +
    packageName + "_" + packageVersion


export let buildPartialKeyByEntryProcoltolData = (
    entryProtocolName: string,
    entryProtocolVersion: string,
) => entryProtocolName + "_" + entryProtocolVersion

export let buildPartialKeyByPackageData = _buildFileName

export let publish = (
    [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc]: [any, any, any, any, any, any],
    entryProtocolName: string,
    entryProtocolVersion: string,
    entryProtocolIconBase64: string,
    entryExtensionName: string,
    packageBinaryFile: ArrayBuffer,
    packageName: string,
    packageVersion: string,
    account: string
) => {
    let key = _buildKey(
        entryProtocolName,
        entryProtocolVersion,
        packageName, packageVersion, account
    )

    return hasDataFunc("publishedpackages", key).concatMap((isExist) => {
        let fileName = _buildFileName
            (
                packageName, packageVersion, account
            )
        let filePath = "packages/" + fileName + ".arrayBuffer"

        return uploadFileFunc(onUploadProgressFunc, filePath, packageBinaryFile, fileName).concatMap((uploadData) => {
            let fileID = getFileIDFunc(uploadData, filePath)

            if (isExist) {
                return fromPromise(updateDataFunc(
                    "publishedpackages",
                    key,
                    {
                        account,
                        entryProtocolName,
                        entryProtocolVersion,
                        entryProtocolIconBase64,
                        entryExtensionName,
                        packageName,
                        packageVersion,
                        fileID
                    }
                ))
            }

            return fromPromise(addDataFunc("publishedpackages",
                key,
                {
                    account,
                    entryProtocolName,
                    entryProtocolVersion,
                    entryProtocolIconBase64,
                    entryExtensionName,
                    packageName,
                    packageVersion,
                    fileID
                }))
        })
    })
}
