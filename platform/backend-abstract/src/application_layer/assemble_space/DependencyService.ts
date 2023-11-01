import { gt } from "semver";
import { Stream } from "most"

export let findNewestPublishPackage = ([findNewestPublishPackage, downloadFileFunc]: [any, any],
    entryExtensionProtocolName: string,
    packageName: string,
) => {
    return findNewestPublishPackage(
        "publishedpackages",
        {
            entryExtensionProtocolName: entryExtensionProtocolName,
            packageName: packageName
        },
        ["entryExtensionProtocolVersion", gt],
        ["packageVersion", gt]
    ).flatMap((data: any) => {
        return downloadFileFunc(data.fileID).map(file => {
            return [file, data.entryExtensionProtocolVersion, data.packageVersion, data.entryExtensionProtocolIconBase64]
        })
    })
}