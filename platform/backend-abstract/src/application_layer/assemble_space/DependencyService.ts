import { gt } from "semver";
import { Stream, just } from "most"
import { isNullable } from "../../utils/NullableUtils";

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
    ).flatMap((data) => {
        if (isNullable(data)) {
            return just(null)
        }

        return downloadFileFunc(data.fileID).map(file => {
            return [file, data.entryExtensionProtocolVersion, data.packageVersion, data.entryExtensionProtocolIconBase64, data.entryExtensionProtocolConfigStr]
        })
    })
}